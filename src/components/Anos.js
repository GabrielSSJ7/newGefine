import React, { Component } from "react";
import {
  Text,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicator 
} from "react-native";
import { connect } from "react-redux";
import firebase from "firebase";
import b64 from "base-64";
import _ from "lodash";
import { anosFetch } from "../actions/AppActions";
import PureChart from "react-native-pure-chart";
import { Actions } from "react-native-router-flux";

class Anos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rendaFixa: 0,
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidMount() {
    this.props.anosFetch(this.props.mes);
    this.getRendaFromDatabase();
    //this.criaFonteDeDados(this.props.anos);

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.anos !== prevState.anos) {
      return { anos: nextProps.anos };
    }

    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.anos !== this.props.anos) {
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.anos)
      });
    }
  }

  // UNSAFE_componentWillReceiveProps(nextProps) {
  //     if(this.props.anos !== nextProps.anos){
  //         this.criaFonteDeDados(nextProps.anos);
  //     }
  // }

  criaFonteDeDados(anos) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });

    this.fonteDadosGastos = ds.cloneWithRows(anos);
  }

  getRendaFromDatabase() {
    const { currentUser } = firebase.auth();
    const emailB64 = b64.encode(currentUser.email);
    const ano = new Date().getFullYear();

    firebase
      .database()
      .ref(`/gastos/${emailB64}/${this.props.mes}/${ano}/renda/`)
      .on("value", snapshot => {
        let rendaFixa = _.map(snapshot.val(), (val, uid) => {
          return { ...val, uid };
        });
        if (snapshot.val() !== null) {
          this.setState({
            rendaFixa: parseFloat(rendaFixa[0].renda).toFixed(2)
          });
        }
      });
  }

  renderRow(data) {
    const tamanho = data.length;
    let total = 0;
    for (let x = 0; x < data[0].length; x++) {
      total += parseFloat(data[0][x].valor);
    }
    const porcentagemGasto = (total * 100) / this.state.rendaFixa;
    let sampleData = [];

    if (!isNaN(total)) {
      let sobra = parseFloat(this.state.rendaFixa) - parseFloat(total);

      sampleData = [
        {
          value: parseFloat(total),
          label: "Total Gasto",
          color: "#fcb040"
        },
        {
          value: sobra,
          label: "Renda",
          color: "#50c4eb"
        }
      ];
    } else {
      sampleData = [
        {
          value: 0,
          label: "Total Gasto",
          color: "#fcb040"
        },
        {
          value: parseFloat(this.state.rendaFixa),
          label: "Renda",
          color: "#50c4eb"
        }
      ];
    }

    const jsx = (
      <TouchableHighlight
        underlayColor="#aaa"
        onPress={() => {
          Actions.extratoMes({
            title: `Extrato mês de ${this.props.mes}`,
            ano: data[1],
            mes: this.props.mes
          });
        }}
      >
        <View
          style={{
            flex: 1,
            padding: 15,
            borderBottomWidth: 2,
            borderColor: "#2cc5f9",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <View style={{ flex: 2 }}>
            <PureChart data={sampleData} type="pie" />
          </View>

          <View style={{ flex: 1, marginTop: 20 }}>
            <Text
              style={{
                fontSize: 22,
                paddingRight: 10,
                textAlign: "center",
                fontWeight: "bold",
                color: "#2cc5f9"
              }}
            >
              {data[1]}
            </Text>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 18, paddingRight: 3, fontWeight: "bold" }}
              >
                Renda de {this.props.mes}:
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  paddingRight: 10,
                  fontWeight: "bold",
                  color: "#2cc5f9"
                }}
              >
                R${this.state.rendaFixa}
              </Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text
                style={{ fontSize: 18, paddingRight: 3, fontWeight: "bold" }}
              >
                Total dos gastos
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  paddingRight: 10,
                  fontWeight: "bold",
                  color: "#2cc5f9"
                }}
              >
                R${total.toFixed(2)}
              </Text>
            </View>

            <View style={{flexDirection: "row"}}>
              <Text
                style={{ fontSize: 18, paddingRight: 4, fontWeight: "bold" }}
              >
                Você gastou
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: "#2cc5f9"
                }}
              >
                {porcentagemGasto.toFixed(2)}%
              </Text>
              <Text
                style={{ fontSize: 18, paddingLeft: 4, fontWeight: "bold" }}
              >
                da renda.
              </Text>
            </View>
          </View>
        </View>
      </TouchableHighlight>
    );

    if (this.props.anos_fetch_andamento) {
      return <ActivityIndicator size="large" />;
    }
    return jsx;
  }

  render() {
    return (
      <View style={{ backgroundColor: "#fff", flex: 1 }}>
        <ListView
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    );
  }
}

const mapStateToProps = state => {
  const array = state.AppReducer.anosList;
  let map = [];

  if (array) {
    const _2018 = _.map(array, (val, uid) => {
      return { ...val, uid };
    });
    let ob = [];
    map = _.map(Object.values(_2018), gastos => {
      ob.push(_.values(gastos.gastos));
      ob.push(gastos.uid);
      return { ...ob };
    });
  }

  return {
    anos: map,
    anos_fetch_andamento: state.AppReducer.anos_fetch_andamento
  };
};

export default connect(
  mapStateToProps,
  { anosFetch }
)(Anos);
