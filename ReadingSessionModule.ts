import {NativeModules} from 'react-native';

const {ReadingSessionModule} = NativeModules;

interface ReadingSessionModuleInterface {
  startLiveActivity: (elapsedSeconds: number) => void;
  endLiveActivity: () => void;
}

export default ReadingSessionModule as ReadingSessionModuleInterface;
