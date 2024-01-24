import React from 'react';
import RootNavigator from './navigations/RootNavigator';
import {LogBox} from 'react-native';

const App = () => {
  LogBox.ignoreAllLogs();
  return <RootNavigator />;
};

export default App;
