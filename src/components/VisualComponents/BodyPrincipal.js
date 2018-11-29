import React from "react";
import { View, Text, ListView, TouchableHighlight, Image } from "react-native";
import { Actions } from "react-native-router-flux";
import { bodyPrincipalStyle as styles } from "../../css/styles";

import { connect } from "react-redux";

import {
  modificaTextoValorGastos,
  modificaTextoDescGastos,
  modificaUidGastos
} from "../../actions/AppActions";


const dolar = require("./../../images/dollar.png");
const moeda = require("./../../images/moedas.png");
const calendar = require("./../../images/calendar.png");

let x = 0;

const renderRow = (data, listaDeGastos, props, rowID) => {
  
  return (
    <TouchableHighlight
      onPress={() => {setDialogAlterarGasto(props, listaDeGastos[rowID]); props.ChangeDialogAlterarGastosVisible(true)}}
      underlayColor="#bbb"
    >
      <View style={styles.ViewRootRenderRow}>
        <View style={{ flexDirection: "row", paddingBottom: 10 }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image source={moeda} style={styles.imgRenderRow} />
            <Text style={styles.valorDateRenderRow}>R${data.valor}</Text>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Image source={calendar} style={styles.imgRenderRow} />
            <Text style={styles.valorDateRenderRow}>{data.dataHora}</Text>
          </View>
        </View>

        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Image source={dolar} style={styles.imgRenderRow} />
          <Text style={styles.itemRenderRow}>{data.descricao}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

const setDialogAlterarGasto = (props, dadosGasto) => {
  props.modificaTextoDescGastos(dadosGasto.descricao);
  props.modificaTextoValorGastos(dadosGasto.valor);
  props.modificaUidGastos(dadosGasto.uid);
}

BodyPrincipal = props => (
  <View style={styles.rootView}>
    <View style={{ flex: 4 }}>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#2cc5f9",
          justifyContent: "space-around"
        }}
      >
        <View>
          <Text style={styles.TextoGastoMes}>Gastos do mês:</Text>
          <Text style={styles.TotalGastoMes}>
            Total R${props.saldo ? props.saldo.toFixed(2) : ""}
          </Text>
        </View>

        <View style={{ justifyContent: "center" }}>
          <TouchableHighlight
            onPress={() => props.ChangeDialogGastoVisible(true)}
            underlayColor="#ddd"
            style={{
              paddingHorizontal: 18,
              paddingVertical: 10,
              borderRadius: 3,
              borderWidth: 1,
              borderColor: "white"
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
      </View>

      <ListView
        enableEmptySections
        dataSource={props.dataSource}
        renderRow={(rowData, sectionID, rowID, higlightRow) => renderRow(rowData, props.listaDeGastos, props, rowID)}
      />
    </View>
  </View>
);

export default connect(null, {modificaTextoDescGastos, modificaTextoValorGastos, modificaUidGastos})(BodyPrincipal);