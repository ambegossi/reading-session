import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
  Text,
  AppState,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import ReadingSessionModule from './ReadingSessionModule';

function App(): JSX.Element {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [elapsedSeconds, setElapsedSeconds] = useState<number>(0);

  const startTimerTime = useRef<number>(0);
  const timerId = useRef<NodeJS.Timeout | null>(null);
  const appState = useRef<string>(AppState.currentState);

  const isDarkMode = useColorScheme() === 'dark';

  const elapsedTime = useMemo(() => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;

    let formattedTime = '';

    if (hours > 0) {
      formattedTime += `${hours.toString()}:`;
    }

    formattedTime += `${minutes.toString()}:${seconds
      .toString()
      .padStart(2, '0')}`;

    return formattedTime;
  }, [elapsedSeconds]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerId.current = setTimeout(updateTimer, 1000);

      const bookTitle = '12 Rules For Life';
      const bookAuthor = 'Jordan B. Peterson';

      if (elapsedSeconds) {
        ReadingSessionModule.startLiveActivity(
          elapsedSeconds,
          bookTitle,
          bookAuthor,
        );
      } else {
        startTimerTime.current = Date.now();
        ReadingSessionModule.startLiveActivity(0, bookTitle, bookAuthor);
      }
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      if (timerId.current) {
        clearTimeout(timerId.current);
      }

      ReadingSessionModule.endLiveActivity();
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setElapsedSeconds(0);
    if (timerId.current) {
      clearTimeout(timerId.current);
    }

    ReadingSessionModule.endLiveActivity();
  };

  const updateTimer = () => {
    setElapsedSeconds(prev => prev + 1);
    timerId.current = setTimeout(updateTimer, 1000);
  };

  useEffect(() => {
    const handleAppStateChange = (nextAppState: string) => {
      if (!isRunning) {
        return;
      }

      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const currentTime = Date.now();

        setElapsedSeconds(
          Math.floor((currentTime - startTimerTime.current) / 1000),
        );
      }

      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [isRunning]);

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

          {elapsedSeconds ? (
            <>
              {isRunning && (
                <TouchableOpacity style={styles.button} onPress={pauseTimer}>
                  <Text style={styles.buttonTitle}>Pausar sessão</Text>
                </TouchableOpacity>
              )}

              {!isRunning && (
                <TouchableOpacity style={styles.button} onPress={startTimer}>
                  <Text style={styles.buttonTitle}>Continuar sessão</Text>
                </TouchableOpacity>
              )}
            </>
          ) : (
            <TouchableOpacity style={styles.button} onPress={startTimer}>
              <Text style={styles.buttonTitle}>Iniciar sessão</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={StyleSheet.compose(styles.resetSessionButton, {
              opacity: elapsedSeconds ? 1 : 0,
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
    fontSize: 14,
    fontWeight: 'bold',
  },
  resetSessionButton: {
    padding: 16,
    backgroundColor: 'gray',
    borderRadius: 12,
  },
});

export default App;
