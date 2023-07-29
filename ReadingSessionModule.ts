import {NativeModules} from 'react-native';

const {ReadingSessionModule} = NativeModules;

interface ReadingSessionModuleInterface {
  startLiveActivity: (
    elapsedSeconds: number,
    bookTitle: string,
    bookAuthor: string,
  ) => void;
  endLiveActivity: () => void;
}

export default ReadingSessionModule as ReadingSessionModuleInterface;
