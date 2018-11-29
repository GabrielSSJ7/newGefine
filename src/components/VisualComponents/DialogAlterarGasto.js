import React, { Component } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import { styles } from "../../css/styles";

import {
  modificaTextoValorGastos,
  modificaTextoDescGastos,
  alterarGasto,
  ChangeDialogAlterarGastosVisible
} from "../../actions/AppActions";

class DialogAlterarGasto extends Component {
  render() {
    return this.props.DialogAlterarGastoVisible ? (
      <ScrollView style={styles.masker} keyboardDismissMode={"on-drag"}>
        <View style={[styles.container, this.props.style]}>
          <Text style={styles.title}>Gefine - Alterar gasto</Text>

          <View style={{ padding: 20 }}>
            <View>
              <TextInput
                placeholder="Com o que você está gastando?"
                onChangeText={texto =>
                  this.props.modificaTextoDescGastos(texto)
                }
                value={this.props.textoDescGasto}
                inputStyle={{ borderBottomColor: "#aaa", borderBottomWidth: 1 }}
              />
              <Text style={{ color: "red", fontSize: 15 }}>
                {this.props.msgGasto}
              </Text>
            </View>
            <View>
              <TextInput
                placeholder="Quanto custou?"
                onChangeText={texto =>
                  this.props.modificaTextoValorGastos(texto)
                }
                value={this.props.textoValorGasto}
                inputStyle={{ borderBottomColor: "#aaa", borderBottomWidth: 1 }}
                keyboardType="numeric"
              />
              <Text style={{ color: "red", fontSize: 15 }}>
                {this.props.valorGastoTxtErro}
              </Text>
            </View>
          </View>

          <View style={styles.btn_container}>
            <Text
              style={[styles.btn, this.props.cancelStyle]}
              onPress={() => this.props.ChangeDialogAlterarGastosVisible(false)}
            >
              Cancelar
            </Text>
            <Text
              style={[styles.btn, this.props.submitStyle]}
              onPress={() => {
                this.props.alterarGasto(
                  this.props.textoDescGasto,
                  this.props.textoValorGasto,
                  this.props.uidAlterarGasto
                );
              }}
            >
              Alterar
            </Text>
          </View>
        </View>
      </ScrollView>
    ) : null;
  }
}

const mapStateToProps = state => {
  return {
    textoValorGasto: state.AppReducer.textoValorGasto,
    textoDescGasto: state.AppReducer.textoDescGasto,
    uidAlterarGasto: state.AppReducer.uidAlterarGasto,
    msgGasto: state.AppReducer.msgGasto,
    DialogAlterarGastoVisible: state.AppReducer.DialogAlterarGastoVisible
  };
};

export default connect(
  mapStateToProps,
  {
    modificaTextoDescGastos,
    modificaTextoValorGastos,
    alterarGasto,
    ChangeDialogAlterarGastosVisible
  }
)(DialogAlterarGasto);
