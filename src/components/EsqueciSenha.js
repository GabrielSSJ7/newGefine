import React, { Component } from "react";
import {
  View,
  TextInput,
  TouchableHighlight,
  Text,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  Alert
} from "react-native";
import { connect } from "react-redux";
import { modificaEmailCadastro } from "../actions/AutenticacaoActions";
import firebase from "firebase";

import { authStyle as styles } from "../css/styles";
import { Actions } from "react-native-router-flux";

class EsqueciSenha extends Component {
  constructor(props) {
    super(props);

    this.state = { em_andamento: false, erro: "" };
  }

  renderBtn() {
    if (!this.state.em_andamento) {
      return (
        <TouchableHighlight
          onPress={() => {
            Keyboard.dismiss();
            this.setState({ em_andamento: true });
            this.sendResetPasswordEmail(this.props.email);
          }}
        >
          <Text style={styles.btnEntrar}>Verificar e-mail</Text>
        </TouchableHighlight>
      );
    } else {
      return <ActivityIndicator size="large" />;
    }
  }

  sendResetPasswordEmail(email) {
    firebase
      .auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ em_andamento: false });
        Alert.alert("Verifique seu e-mail");
        Actions.login();
      })
      .catch(err => {
        this.setState({ em_andamento: false });
        switch (err.code) {
          case "auth/user-not-found":
            this.setState({
              erro: "Nenhum usuário foi encontrado com este e-mail."
            });
            break;

          case "auth/invalid-email":
            this.setState({
              erro: "O e-mail digitado é inválido. Verifique o e-mail e tente novamente."
            });
            break;

          default:
            this.setState({ erro: err.code });
            break;
        }
      });
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
          <Text style={{ color: "#ff1a1a", fontSize: 15, textAlign: "center" }}>
            {this.state.erro}
          </Text>
        </View>

        <View style={{ flex: 2 }}>{this.renderBtn()}</View>
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
    modificaEmailCadastro
  }
)(EsqueciSenha);
