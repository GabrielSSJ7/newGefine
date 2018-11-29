import React, { Component } from "react";
import { ScrollView, View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import { styles } from "../../css/styles";

import {
  modificaTextoValorGastos,
  modificaTextoDescGastos,
  inserirGasto,
  ChangeDialogGastoVisible
} from "../../actions/AppActions";

class AlertInserirGastos extends Component {
  render() {
    return this.props.DialogGastoVisible ? (
      <ScrollView style={styles.masker} keyboardDismissMode={"on-drag"}>
        <View style={[styles.container, this.props.style]}>
          <Text style={styles.title}>Gefine</Text>

          <View style={{ padding: 20 }}>
            <View>
              <TextInput
                placeholder="Com o que você está gastando?"
                onChangeText={texto => this.props.modificaTextoDescGastos(texto)}
                inputStyle={{ borderBottomColor: "#aaa", borderBottomWidth: 1 }}
              />
              <Text style={{ color: "red", fontSize: 15 }}>
                {this.props.msgGasto}
              </Text>
            </View>
            <View>
              <TextInput
                placeholder="Quanto custou?"
                onChangeText={texto => this.props.modificaTextoValorGastos(texto)}
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
              onPress={() => this.props.ChangeDialogGastoVisible(false)}
            >
              Cancelar
            </Text>
            <Text
              style={[styles.btn, this.props.submitStyle]}
              onPress={() =>
                this.props.inserirGasto(
                  this.props.textoDescGasto,
                  this.props.textoValorGasto
                )
              }
            >
              Inserir
            </Text>
          </View>
        </View>
      </ScrollView>
    ) : null;
  }
}

const mapStateToProps = state => ({
  textoValorGasto: state.AppReducer.textoValorGasto,
  textoDescGasto: state.AppReducer.textoDescGasto,
  msgGasto: state.AppReducer.msgGasto,
  DialogGastoVisible: state.AppReducer.DialogGastoVisible
});

export default connect(
  mapStateToProps,
  { modificaTextoDescGastos, modificaTextoValorGastos, inserirGasto, ChangeDialogGastoVisible  }
)(AlertInserirGastos);
