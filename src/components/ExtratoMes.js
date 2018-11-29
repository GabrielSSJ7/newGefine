import React, { Component } from "react";
import { ListView, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import { extratoMesFetch } from "../actions/AppActions";
import _ from "lodash";
import { Actions } from "react-native-router-flux";

import { bodyPrincipalStyle as styles } from "../css/styles";

const dolar = require("./../images/dollar.png");
const moeda = require("./../images/moedas.png")
const calendar = require("./../images/calendar.png");

class ExtratoMes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fonteDeDados: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }
  componentDidMount() {
    this.props.extratoMesFetch(this.props.mes, this.props.ano);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.extratoList !== prevProps.extratoList) {
      this.setState({
        fonteDeDados: this.state.fonteDeDados.cloneWithRows(
          this.props.extratoList
        )
      });
    }
  }

  renderRow(data) {
    return (
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
    );
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <ListView
          enableEmptySections
          dataSource={this.state.fonteDeDados}
          renderRow={this.renderRow}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  let extratoList = _.map(state.AppReducer.extratoMes, (val, uid) => {
    return { ...val, uid };
  });

  console.log(extratoList);

  return {
    extratoList
  };
};

export default connect(
  mapStateToProps,
  { extratoMesFetch }
)(ExtratoMes);
