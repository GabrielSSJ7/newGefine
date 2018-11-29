import React, { Component } from "react";
import { View, BackHandler, ToastAndroid  } from "react-native";
import { Router, Scene, Stack, Actions } from "react-native-router-flux";

import Principal from "./components/Principal";
import SplashScreen from "./components/SplashScreen";
import Login from "./components/Login";
import Cadastro from "./components/Cadastro";
import GastosMeses from "./components/GastosMeses";
import Anos from "./components/Anos";
import ExtratoMes from "./components/ExtratoMes";
import EsqueciSenha from "./components/EsqueciSenha";

var backButtonPressedOnceToExit = false;

export default class Routes extends Component {
  componentDidMount() {
    backButtonPressedOnceToExit = false
    BackHandler.addEventListener(
      "hardwareBackPress",
      this.onBackPress.bind(this)
    );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener(
      "hardwareBackPress",
      this.onBackPress.bind(this)
    );
  }

  onBackPress() {
    console.log("BackPress", backButtonPressedOnceToExit)
    if (backButtonPressedOnceToExit) {
      BackHandler.exitApp();
    } else {
      if (Actions.currentScene !== "principal" && Actions.currentScene !== "login") {
        Actions.pop();
        return true;
      } else {
    
        ToastAndroid.show(
          "Aperte novamente para sair.",
          ToastAndroid.SHORT
        );
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
      <Router
        navigationBarStyle={{ backgroundColor: "#50c4eb" }}
        titleStyle={{ color: "#fff" }}
        backAndroidHandler={this.onBackPress}
      >
        <Stack>
          <Scene
            key="principal"
            component={Principal}
            hideNavBar={true}
            renderLeftButton={<View />}
          />
          <Scene key="login" component={Login} hideNavBar={true} />
          <Scene
            key="esquecisenha"
            component={EsqueciSenha}
            hideNavBar={true}
          />
          <Scene
            key="splashScreen"
            component={SplashScreen}
            hideNavBar={true}
            initial
          />
          <Scene key="cadastro" component={Cadastro} hideNavBar={true} />

          <Scene key="gastosMeses" component={GastosMeses} hideNavBar={false} />

          <Scene key="anos" component={Anos} hideNavBar={false} />

          <Scene key="extratoMes" component={ExtratoMes} hideNavBar={false} />
        </Stack>
      </Router>
    );
  }
}
