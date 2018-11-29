/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import Routes from "./src/Routes";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./src/reducers";
import firebase from "firebase";
import ReduxThunk from "redux-thunk";
import { Actions } from "react-native-router-flux";

export default class App extends Component {
  constructor(props) {
    super(props);

    let config = {
      apiKey: "AIzaSyAQ2k5QcLlceTYZhEwtagdI9JH-20Z4K-w",
      authDomain: "ispent-e5e5f.firebaseapp.com",
      databaseURL: "https://ispent-e5e5f.firebaseio.com",
      projectId: "ispent-e5e5f",
      storageBucket: "ispent-e5e5f.appspot.com",
      messagingSenderId: "671490053639"
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
  }

  componentDidMount() {
    backButtonPressedOnceToExit = false;
    BackHandler.addEventListener("hardwareBackPress", () => {
      if (backButtonPressedOnceToExit) {
        BackHandler.exitApp();
      } else {
        if (
          Actions.currentScene !== "principal" &&
          Actions.currentScene !== "login"
        ) {
          Actions.pop();
          return true;
        } else {
          ToastAndroid.show("Aperte novamente para sair.", ToastAndroid.SHORT);
          backButtonPressedOnceToExit = true;
          //setting timeout is optional
          // setTimeout(() => {
          //   backButtonPressedOnceToExit = false;
          // }, 1000);
          return true;
        }
      }
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress"
    );
  }

  onBackPress() {
    ToastAndroid.show("BackPress", ToastAndroid.SHORT);
    if (backButtonPressedOnceToExit) {
      BackHandler.exitApp();
    } else {
      if (
        Actions.currentScene !== "principal" &&
        Actions.currentScene !== "login"
      ) {
        Actions.pop();
        return true;
      } else {
        ToastAndroid.show("Aperte novamente para sair.", ToastAndroid.SHORT);
        backButtonPressedOnceToExit = true;
        //setting timeout is optional
        // setTimeout(() => {
        //   backButtonPressedOnceToExit = false;
        // }, 1000);
        return true;
      }
    }
  }

  render() {
    return (
      <Provider store={createStore(reducers, {}, applyMiddleware(ReduxThunk))}>
        <Routes />
      </Provider>
    );
  }
}
