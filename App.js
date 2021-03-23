import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducer from "./reducers/index";
import AppContainer from "./AppContainer";

export default function App() {
  return (
    <Provider store={createStore(reducer, applyMiddleware(thunk))}>
      <View style={{ flex: 1 }}>
        <StatusBar style="light" translucent barStyle='light-content'/>
        <AppContainer />
      </View>
    </Provider>
  );
}
