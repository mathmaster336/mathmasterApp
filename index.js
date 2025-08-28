/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { PaperProvider } from 'react-native-paper';
import 'react-native-gesture-handler';
import { CommonProvider } from './src/ContextApi/commonContext';


export default function Main() {
  return (
    <PaperProvider>
      <CommonProvider>

        <App />
      </CommonProvider>

    </PaperProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
