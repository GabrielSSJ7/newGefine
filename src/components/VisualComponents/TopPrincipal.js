import React from "react";
import { View, TouchableHighlight, Text } from "react-native";

import { principalTopStyle as styles } from "./../../css/styles";

import { Actions } from "react-native-router-flux";

export default props => (
  <View style={styles.rootView}>
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>

      <TouchableHighlight
        underlayColor="#ddd"
        onPress={() => props.ClickHandleDialogRenda(true)}
      >
        <View>
          <Text style={styles.TextoRendaFixa}>Renda mensal atual:</Text>
          <Text style={styles.ValorRendaFixa}>R${props.rendaFixa}</Text>
        </View>
      </TouchableHighlight>

      <View style={{ alignSelf: "flex-end", flex: 1, paddingLeft: 65, paddingRight: 5}}>
        <TouchableHighlight
          onPress={() => {
            Actions.gastosMeses({
              title: "Novembro",
              rendaFixa: props.rendaFixa
            });
          }}
          underlayColor="#ddd"
          style={{
            borderColor: "#50c4eb",
            borderWidth: 1,
            padding: 5,
            borderRadius: 3
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 14,
              color: "#50c4eb",
              fontWeight: "bold"
            }}
          >
            Meses anteriores
          </Text>
        </TouchableHighlight>
      </View>
    </View>
    <View>
      <TouchableHighlight underlayColor="#ddd" onPress={() => false}>
        <View>
          <Text style={styles.TextoSaldoAtual}>Saldo atual:</Text>
          <Text style={styles.ValorSaldoAtual}>R${props.saldo.toFixed(2)}</Text>
        </View>
      </TouchableHighlight>
    </View>

    {/* <View style={{ flex: 1, justifyContent: "space-around" }}>
      <View>
        <TouchableHighlight
          onPress={() => props.ChangeDialogGastoVisible(true)}
          underlayColor="#ddd"
          style={{
            backgroundColor: "#50c4eb",
            padding: 10,
            borderRadius: 3
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              color: "#fff",
              fontWeight: "bold"
            }}
          >
            Inserir gastos
          </Text>
        </TouchableHighlight>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => {
            Actions.gastosMeses({
              title: "Novembro",
              rendaFixa: props.rendaFixa
            });
          }}
          underlayColor="#ddd"
          style={{
            backgroundColor: "#50c4eb",
            padding: 10,
            borderRadius: 3
          }}
        >
          <Text
            style={{
              alignSelf: "center",
              fontSize: 16,
              color: "#fff",
              fontWeight: "bold"
            }}
          >
           Meses anteriores
          </Text>
        </TouchableHighlight>
      </View>
    </View> */}
  </View>
);
