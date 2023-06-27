import { registerRootComponent } from 'expo';
import { AppRegistry } from 'react-native';
import database from '@react-native-firebase/database';

import App from './App';
database().setPersistenceEnabled(true);
AppRegistry.registerComponent('X', () => App);




// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
