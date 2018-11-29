import React, { Component } from "react";
import {
  TextInput,
  Button,
  View,
  Text,
  ActivityIndicator,
  Image,
  TouchableHighlight,
  Keyboard,
  KeyboardAvoidingView
} from "react-native";
import { connect } from "react-redux";
import {
  modificaNomeCadastro,
  modificaEmailCadastro,
  modificaSenhaCadastro,
  cadastrarUsuario,
  hideDialogMessage
} from "../actions/AutenticacaoActions";

import { authStyle as styles } from "../css/styles";

import DialogMessage from "./VisualComponents/DialogMessage";

class Cadastro extends Component {
  _cadastrarUsuario() {
    const { email, nome, senha } = this.props;
    this.props.cadastrarUsuario({ nome, email, senha });
  }

  renderBtn() {
    if (!this.props.cadastro_em_andamento) {
      return (
        <TouchableHighlight
          onPress={() => {
            Keyboard.dismiss();
            this._cadastrarUsuario();
          }}
        >
          <Text style={styles.btnEntrar}>Cadastrar</Text>
        </TouchableHighlight>
      );
    } else {
      return <ActivityIndicator size="large" />;
    }
  }

  render() {
    return (
      <View style={{ flex: 1, padding: 20, backgroundColor: "#50c4eb" }}>
        <DialogMessage
          isVisible={this.props.isVisible}
          hideDialogMessage={() => this.props.hideDialogMessage()}
          erro={this.props.cadastro_usuario_erro}
        />
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 65
          }}
        >
          <KeyboardAvoidingView
            style={{ flexDirection: "row", justifyContent: "space-between" }}
            behavior="position"
          >
            <Image
              source={require("../images/signup-image.png")}
              style={{ width: 300, height: 150 }}
            />
          </KeyboardAvoidingView>
          <KeyboardAvoidingView>
            <Text
              style={{
                fontSize: 15,
                color: "#FFF",
                marginTop: 25,
                fontWeight: "bold"
              }}
            >
              Faça parte dos gestores financeiros pessoais
            </Text>
          </KeyboardAvoidingView>
        </View>
        <View style={{ flex: 2, justifyContent: "center" }}>
          <View style={styles.viewTextInput}>
            <Image
              source={require("../images/avatar.png")}
              style={styles.emailIcon}
            />
            <TextInput
              placeholder="Nome"
              onChangeText={texto => this.props.modificaNomeCadastro(texto)}
              style={styles.TextInput}
              placeholderTextColor="#fff"
              underlineColorAndroid="transparent"
              autoCapitalize="none"
              value={this.props.nome}
            />
          </View>

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
        </View>

        {/* <KeyboardAvoidingView behavior="position">
          <Text style={{ color: "red", fontSize: 15, textAlign: "center" }}>
            {this.props.cadastro_usuario_erro}
          </Text>
        </KeyboardAvoidingView> */}
        <View style={{ flex: 1, justifyContent: "center" }}>
          {this.renderBtn()}
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.AutenticacaoReducer.isVisible);
  return {
    nome: state.AutenticacaoReducer.nome,
    email: state.AutenticacaoReducer.email,
    senha: state.AutenticacaoReducer.senha,
    cadastro_usuario_erro: state.AutenticacaoReducer.cadastro_usuario_erro,
    cadastro_em_andamento: state.AutenticacaoReducer.cadastro_em_andamento,
    isVisible: state.AutenticacaoReducer.isVisible
  };
};

export default connect(
  mapStateToProps,
  {
    modificaNomeCadastro,
    modificaEmailCadastro,
    modificaSenhaCadastro,
    cadastrarUsuario,
    hideDialogMessage
  }
)(Cadastro);
