import React, { Component } from "react";
import {
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Text,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  ScrollView,
  Keyboard
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import firebase from "firebase";
import {
  autenticarUsuario,
  modificaEmailCadastro,
  modificaSenhaCadastro,
  loginWithFacebook
} from "../actions/AutenticacaoActions";

import { authStyle as styles } from "../css/styles";

const facebookLogo = require("./../images/facebook-logo.png");

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = { erro: "" };
  }

  componentDidMount() {}

  _autenticarUsuario() {
    const { email, senha } = this.props;

    if (email && senha) this.props.autenticarUsuario({ email, senha });
    else this.setState({ erro: "Você deixou de preencher os campos." });
  }

  onFBButtonPress() {
    this.props.loginWithFacebook();
  }

  renderBtn() {
    if (!this.props.login_em_andamento) {
      return (
        <TouchableHighlight
          onPress={() => {
            Keyboard.dismiss();
            this._autenticarUsuario();
          }}
        >
          <Text style={styles.btnEntrar}>Login</Text>
        </TouchableHighlight>
      );
    } else {
      return <ActivityIndicator size="large" />;
    }
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          padding: 20,
          backgroundColor: "#50c4eb"
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 2, alignItems: "center", justifyContent: "center" }}
          behavior="position"
        >
          <Image
            source={require("../images/bank.png")}
            style={{ height: 120, width: 120 }}
          />
        </KeyboardAvoidingView>

        <View style={{ flex: 2, justifyContent: "center" }}>
          <View style={styles.viewTextInput}>
            <Image
              source={require("../images/email-icon.png")}
              style={styles.emailIcon}
            />
            <TextInput
              placeholder="E-mail"
              onChangeText={texto => this.props.modificaEmailCadastro(texto)}
              style={styles.TextInput}
              placeholderTextColor="#fff"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              value={this.props.email}
            />
          </View>

          <View style={styles.viewTextInput}>
            <Image
              source={require("../images/key.png")}
              style={styles.emailIcon}
            />
            <TextInput
              secureTextEntry={true}
              placeholder="Senha"
              onChangeText={texto => this.props.modificaSenhaCadastro(texto)}
              style={styles.TextInput}
              placeholderTextColor="#fff"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              value={this.props.senha}
            />
          </View>
          <View style={{ flex: 2 }}>
            {this.renderBtn()}
            <TouchableHighlight
              style={styles.FBbutton}
              onPress={() => this.onFBButtonPress()}
              title="Continue with Facebook"
              underlayColor="#ddd"
            >
              <View style={{ flexDirection: "row" }}>
                <Image
                  source={facebookLogo}
                  style={{ width: 20, height: 20, marginRight: 10 }}
                />
                <Text style={styles.FBbuttonText}>Logar com Facebook</Text>
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <KeyboardAvoidingView
          style={{ flex: 1, justifyContent: "flex-end" }}
          behavior="position"
        >
          <Text style={{ color: "#ff1a1a", fontSize: 15, textAlign: "center" }}>
            {this.props.autenticar_usuario_txt_erro}
            {this.state.erro}
          </Text>
          <TouchableHighlight
            onPress={() => Actions.cadastro()}
            underlayColor="#ddd"
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 18
              }}
            >
              Ainda não tem um cadastro?
            </Text>
          </TouchableHighlight>
          <TouchableHighlight
            onPress={() => Actions.esquecisenha()}
            underlayColor="#ddd"
          >
            <Text
              style={{
                textAlign: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: 18
              }}
            >
              Esqueceu sua senha?
            </Text>
          </TouchableHighlight>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapsStateToProps = state => {
  console.log(state);
  return {
    autenticar_usuario_txt_erro:
      state.AutenticacaoReducer.autenticar_usuario_txt_erro,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    login_em_andamento: state.AutenticacaoReducer.login_em_andamento
  };
};

export default connect(
  mapsStateToProps,
  {
    autenticarUsuario,
    modificaEmailCadastro,
    modificaSenhaCadastro,
    loginWithFacebook
  }
)(Login);
