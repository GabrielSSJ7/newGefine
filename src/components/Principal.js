import React, { Component } from "react";
import {
  View,
  StatusBar,
  Text,
  TouchableHighlight,
  ListView,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import _ from "lodash";

import StatusBarComponent from "./VisualComponents/StatusBarComponent";
import TopPrincipal from "./VisualComponents/TopPrincipal";
import BodyPrincipal from "./VisualComponents/BodyPrincipal";
import AlertInputRenda from "./VisualComponents/AlertInputRenda";
import AlertDialogTcc from "./VisualComponents/AlertDialogTcc";
import DialogAlterarGasto from "./VisualComponents/DialogAlterarGasto";

import {
  setCurrentMonth,
  getRendaFromDatabase,
  ChangeDialogRendaVisible,
  ChangeDialogTCCVisible,
  ChangeDialogGastoVisible,
  ChangeDialogAlterarGastosVisible,
  modificaTextoDescGastos,
  modificaTextoValorGastos,
  gastosFetch
} from "../actions/AppActions";
import { styles } from "../css/styles";
import AlertInserirGastos from "./VisualComponents/AlertInserirGastos";

const listaDeGastos = [];

class Principal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      })
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.dadosGastos !== prevProps.dadosGastos) {
      //prevProps.gastosFetch();
      //this.preencheListViewGasto(prevProps.dadosGastos);
      this.setState({
        dataSource: this.state.dataSource.cloneWithRows(this.props.dadosGastos)
      });
    }
  }

  componentDidMount() {
    this.props.gastosFetch();
    this.props.setCurrentMonth();
    this.props.getRendaFromDatabase();
  }

  render() {
    return (
      <ScrollView contentContainerStyle={{ flex: 1 }}>
        <StatusBarComponent
          mesAtual={this.props.mesAtual}
          ChangeDialogTCCVisible={() => this.props.ChangeDialogTCCVisible(true)}
        />

        <View style={styles.MainContainer}>
          <AlertInputRenda />
          <AlertDialogTcc
            isDialogVisibleTCC={this.props.isDialogVisibleTCC}
            ChangeDialogTCCVisible={() =>
              this.props.ChangeDialogTCCVisible(false)
            }
          />
          <AlertInserirGastos />

          <DialogAlterarGasto />

          <TopPrincipal
            rendaFixa={this.props.rendaFixa}
            saldo={this.props.rendaFixa - this.props.saldo}
            ClickHandleDialogRenda={() =>
              this.props.ChangeDialogRendaVisible(true)
            }
            ChangeDialogTCCVisible={() =>
              this.props.ChangeDialogTCCVisible(true)
            }
          />

          <BodyPrincipal
            saldo={this.props.saldo}
            dataSource={this.state.dataSource}
            listaDeGastos={listaDeGastos}
            ChangeDialogAlterarGastosVisible={() =>
              this.props.ChangeDialogAlterarGastosVisible(true)
            }
            ChangeDialogGastoVisible={() =>
              this.props.ChangeDialogGastoVisible(true)
            }
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  let dadosGastos = _.map(state.AppReducer.dadosGastos, (val, uid) => {
    return {  ...val, uid };
  });
  listaDeGastos = dadosGastos;

  return {
    mesAtual: state.AppReducer.mesAtual,
    rendaFixa: state.AppReducer.rendaFixa,
    saldo: state.AppReducer.saldo,
    somaGastos: state.AppReducer.somaGastos,
    DialogRendaVisible: state.AppReducer.DialogRendaVisible,
    DialogGastoVisible: state.AppReducer.DialogGastoVisible,
    isDialogVisibleTCC: state.AppReducer.isDialogVisibleTCC,
    dadosGastos
  };
};

export default connect(
  mapStateToProps,
  {
    setCurrentMonth,
    getRendaFromDatabase,
    ChangeDialogRendaVisible,
    ChangeDialogTCCVisible,
    ChangeDialogGastoVisible,
    ChangeDialogAlterarGastosVisible,
    modificaTextoDescGastos,
    modificaTextoValorGastos,
    gastosFetch
  }
)(Principal);
