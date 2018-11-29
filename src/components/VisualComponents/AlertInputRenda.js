import React, { Component } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableHighlight
} from "react-native";
import { connect } from "react-redux";

import {
  modificaAlertRendaTextInput,
  updateRenda,
  ChangeDialogRendaVisible
} from "../../actions/AppActions";

import { styles } from "../../css/styles";

class AlertInputRenda extends Component {
  render() {
    return this.props.DialogRendaVisible ? (
      <ScrollView style={styles.masker} keyboardDismissMode={"on-drag"}>
        <View style={[styles.container, this.props.style]}>
          <Text style={styles.title}>Gefine</Text>

          <View style={{ padding: 20 }}>
            <View>
              <TextInput
                placeholder="Informe-nos quanto você ganha no momento"
                onChangeText={inputText =>
                  this.props.modificaAlertRendaTextInput(inputText)
                }
                inputStyle={{
                  borderBottomColor: "#aaa",
                  borderBottomWidth: 1,
                  fontSize: 14
                }}
                value={this.props.alertRendaInput}
                keyboardType="numeric"
              />
              <Text style={{ color: "red", fontSize: 15 }}>
                {this.props.rendaMsg}
              </Text>
            </View>
          </View>

          <View style={styles.btn_container}>
            <Text
              style={[styles.btn, this.props.cancelStyle]}
              onPress={() => this.props.ChangeDialogRendaVisible(false)}
            >
              Cancelar
            </Text>

            <Text
              style={[styles.btn, this.props.submitStyle]}
              onPress={() => {
                this.props.updateRenda(this.props.alertRendaInput);
                
              }}
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
  alertRendaInput: state.AppReducer.alertRendaInput,
  rendaMsg: state.AppReducer.rendaMsg,
  DialogRendaVisible: state.AppReducer.DialogRendaVisible
});

export default connect(
  mapStateToProps,
  { modificaAlertRendaTextInput, updateRenda, ChangeDialogRendaVisible }
)(AlertInputRenda);
