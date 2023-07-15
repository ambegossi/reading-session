import React, {useEffect, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): JSX.Element {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  const timerId = useRef<NodeJS.Timeout | null>(null);

  const isDarkMode = useColorScheme() === 'dark';

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerId.current = setTimeout(updateTimer, 1000);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedTime(0);
    if (timerId.current) {
      clearTimeout(timerId.current);
    }
  };

  const updateTimer = () => {
    setElapsedTime(prev => prev + 1);
    timerId.current = setTimeout(updateTimer, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerId.current) {
        clearTimeout(timerId.current);
      }
    };
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={isDarkMode ? Colors.darker : Colors.lighter}
      />
      <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
        <View style={styles.container}>
          <View style={styles.timer}>
            <Text style={styles.elapsedTime}>{elapsedTime}</Text>
          </View>

          {elapsedTime ? (
            <TouchableOpacity style={styles.button} onPress={pauseTimer}>
              <Text style={styles.buttonTitle}>Pausar sessão</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={startTimer}>
              <Text style={styles.buttonTitle}>Iniciar sessão</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={StyleSheet.compose(styles.resetSessionButton, {
              opacity: elapsedTime ? 1 : 0,
            })}
            onPress={resetTimer}>
            <Text style={styles.buttonTitle}>Resetar sessão</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: Colors.lighter,
  },
  container: {
    backgroundColor: Colors.lighter,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContentContainer: {
    flex: 1,
  },
  timer: {
    height: 150,
    width: 150,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 1000,
    marginBottom: 24,
  },
  elapsedTime: {
    fontSize: 24,
  },
  button: {
    padding: 16,
    backgroundColor: 'orange',
    borderRadius: 12,
    marginBottom: 8,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetSessionButton: {
    padding: 16,
    backgroundColor: 'gray',
    borderRadius: 12,
  },
});

export default App;
