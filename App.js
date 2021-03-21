import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {View } from 'react-native';
import AppContainer from './AppContainer';

export default function App() {
  return (
    <View style={{flex: 1}}>
      <StatusBar style="light" translucent barStyle='light-content'/>
      <AppContainer />
    </View>
  );
}

