import {
  SET_CURRENT_MONTH,
  GET_RENDA,
  CALCULATE_SALDO,
  SOMA_GASTOS,
  MODIFICA_ALERT_RENDA_INPUT,
  DIALOG_RENDA_VISIBLE,
  DIALOG_TCC_VISIBLE,
  UPDATE_RENDA,
  UPDATE_RENDA_ERRO,
  GASTOS_FETCH,
  MODIFICA_ALERT_VALOR_GASTO,
  MODIFICA_ALERT_DESC_GASTO,
  INSERIR_GASTO_ERRO,
  INSERIR_GASTO_SUCESSO,
  ALTERAR_GASTO_SUCESSO,
  ALTERAR_GASTO_ERRO,
  DIALOG_GASTO_VISIBLE,
  ANOS_FETCH_ANDAMENTO,
  ANOS_FETCH,
  EXTRATO_MES_FETCH,
  DIALOG_ALTERAR_GASTO_VISIBLE,
  MODIFICA_UID_GASTO
} from "../types";
import _ from "lodash";
import firebase from "firebase";
import b64 from "base-64";

const mesAtual = undefined;

export const setCurrentMonth = () => {
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro"
  ];
  const month = new Date().getMonth() + 1;
  mesAtual = monthNames[month - 1];

  return {
    type: SET_CURRENT_MONTH,
    payload: monthNames[month - 1]
  };
};

export const getRendaFromDatabase = () => {
  return dispatch => {
    setCurrentMonth();
    const { currentUser } = firebase.auth();

    const emailB64 = b64.encode(currentUser.email);
    const ano = new Date().getFullYear();

    firebase
      .database()
      .ref(`/gastos/${emailB64}/${mesAtual}/${ano}/renda/`)
      .on("value", snapshot => {
        if (snapshot.val() !== null) {
          let rendaFixa = _.map(snapshot.val(), (val, uid) => {
            return { ...val, uid };
          });

          dispatch({
            type: GET_RENDA,
            payload: parseFloat(rendaFixa[0].renda).toFixed(2)
          });
        }
      });
  };
};

export const ChangeDialogRendaVisible = DialogRendaVisible => {
  return {
    type: DIALOG_RENDA_VISIBLE,
    payload: DialogRendaVisible
  };
};

export const ChangeDialogTCCVisible = isDialogVisibleTCC => {
  //(isDialogVisibleTCC);
  return {
    type: DIALOG_TCC_VISIBLE,
    payload: isDialogVisibleTCC
  };
};

export const ChangeDialogAlterarGastosVisible = DialogGastoVisible => {
  return {
    type: DIALOG_ALTERAR_GASTO_VISIBLE,
    payload: DialogGastoVisible
  };
}

export const ChangeDialogGastoVisible = DialogGastoVisible => {
  return {
    type: DIALOG_GASTO_VISIBLE,
    payload: DialogGastoVisible
  };
};

export const modificaAlertRendaTextInput = texto => {
  return {
    type: MODIFICA_ALERT_RENDA_INPUT,
    payload: texto
  };
};

export const modificaTextoValorGastos = texto => {
 
  return {
    type: MODIFICA_ALERT_VALOR_GASTO,
    payload: texto
  };
};

export const modificaTextoDescGastos = texto => {

  return {
    type: MODIFICA_ALERT_DESC_GASTO,
    payload: texto
  };
};

export const modificaUidGastos = texto => {

  return {
    type: MODIFICA_UID_GASTO,
    payload: texto
  };
};

export const inserirGasto = (descricaoGastoTxt, valorGastoTxt) => {
  if (descricaoGastoTxt === "" && valorGastoTxt === "") {
    return {
      type: INSERIR_GASTO_ERRO,
      payload:
        "A descrição é obrigatória. É necessário um digitar um valor, nada é de graça!"
    };
  } else if (descricaoGastoTxt === "") {
    return {
      type: INSERIR_GASTO_ERRO,
      payload: "A descrição é obrigatória"
    };
  } else if (valorGastoTxt === "") {
    return {
      type: INSERIR_GASTO_ERRO,
      payload: "É necessário um digitar um valor, nada é de graça!"
    };
  } else if (isNaN(valorGastoTxt)) {
    return {
      type: INSERIR_GASTO_ERRO,
      payload: "Digite apenas números"
    };
  } else {
    return dispacth => {
      const date = new Date();

      let dataHora = date.getDate();
      let minutos = date.getMinutes();
      if (minutos.lenght == 1) {
        minutos = `0${minutos}`;
      }
      dataHora = `${dataHora}/${date.getMonth() +
        1}/${date.getFullYear()} - ${date.getHours()}:${minutos}`;

      const year = new Date().getFullYear();

      const emailUsuarioB64 = b64.encode(firebase.auth().currentUser.email);
      setCurrentMonth();
      firebase
        .database()
        .ref(`/gastos/${emailUsuarioB64}/${mesAtual}/${year}/gastos/`)
        .push({ descricao: descricaoGastoTxt, valor: valorGastoTxt, dataHora })
        .then(() => {
          dispacth({
            type: INSERIR_GASTO_SUCESSO,
            payload: false
          });
        })
        .catch(err => {
          dispacth({
            type: INSERIR_GASTO_ERRO,
            payload: err.message
          });
        });
    };
  }
};

export const alterarGasto = (descricaoGastoTxt, valorGastoTxt, uid) => {
  if (descricaoGastoTxt === "" && valorGastoTxt === "") {
    return {
      type: INSERIR_GASTO_ERRO,
      payload:
        "A descrição é obrigatória. É necessário um digitar um valor, nada é de graça!"
    };
  } else if (descricaoGastoTxt === "") {
    return {
      type: INSERIR_GASTO_ERRO,
      payload: "A descrição é obrigatória"
    };
  } else if (valorGastoTxt === "") {
    return {
      type: INSERIR_GASTO_ERRO,
      payload: "É necessário um digitar um valor, nada é de graça!"
    };
  } else if (isNaN(valorGastoTxt)) {
    return {
      type: INSERIR_GASTO_ERRO,
      payload: "Digite apenas números"
    };
  } else {
    return dispacth => {
      const date = new Date();

      let dataHora = date.getDate();
      let minutos = date.getMinutes();
      if (minutos.lenght == 1) {
        minutos = `0${minutos}`;
      }
      dataHora = `${dataHora}/${date.getMonth() +
        1}/${date.getFullYear()} - ${date.getHours()}:${minutos}`;

      const year = new Date().getFullYear();

      const emailUsuarioB64 = b64.encode(firebase.auth().currentUser.email);
      setCurrentMonth();
      console.log("AppActions", uid)
      firebase
        .database()
        .ref(`/gastos/${emailUsuarioB64}/${mesAtual}/${year}/gastos/${uid}/`)
        .update({ descricao: descricaoGastoTxt, valor: valorGastoTxt, dataHora })
        .then(() => {
          dispacth({
            type: ALTERAR_GASTO_SUCESSO,
            payload: false
          });
        })
        .catch(err => {
          dispacth({
            type: ALTERAR_GASTO_ERRO,
            payload: err.message
          });
        });
    };
  }
};

export const updateRenda = renda => {
  return dispatch => {
    if (renda === "") {
      updateRendaError("É necessário digitar sua renda", dispatch);
    } else if (isNaN(renda)) {
      updateRendaError("Digite apenas números", dispatch);
    } else {
      const { currentUser } = firebase.auth();

      setCurrentMonth();

      const emailB64 = b64.encode(currentUser.email);
      const ano = new Date().getFullYear();

      firebase
        .database()
        .ref(`/gastos/${emailB64}/${mesAtual}/${ano}/renda/`)
        .once("value", snapshot => {
          if (snapshot.val() !== null) {
            let rendaFixa = _.map(snapshot.val(), (val, uid) => {
              return { ...val, uid };
            });

            firebase
              .database()
              .ref(
                `/gastos/${emailB64}/${mesAtual}/${ano}/renda/${
                  rendaFixa[0].uid
                }/`
              )
              .update({ renda: renda })
              .then(value => {});

            dispatch({
              type: UPDATE_RENDA,
              payload: ""
            });
          } else {
            firebase
              .database()
              .ref(`/gastos/${emailB64}/${mesAtual}/${ano}/renda/`)
              .push({ renda });

            dispatch({
              type: UPDATE_RENDA,
              payload: ""
            });
          }
        });
    }
  };
};

const updateRendaError = (erro, dispatch) => {
  dispatch({
    type: UPDATE_RENDA_ERRO,
    payload: erro
  });
};

export const gastosFetch = () => {
  if (firebase.auth().currentUser !== null) {
    const emailUsuarioB64 = b64.encode(firebase.auth().currentUser.email);

    setCurrentMonth();
    const mes = mesAtual;
    const ano = new Date().getFullYear();

    return dispacth => {
      firebase
        .database()
        .ref(`/gastos/${emailUsuarioB64}/${mes}/${ano}/gastos`)
        .on("value", snapshot => {
          let dadosGastos = _.map(snapshot.val(), (val, uid) => {
            return { ...val, uid };
          });
         
          const total = saldoAtual(dadosGastos);

          dispacth({
            type: GASTOS_FETCH,
            payload: snapshot.val(),
            saldo: total
          });
        });
    };
  }

  return { type: "" };
};

export const anosFetch = mes => {
  return dispatch => {
    dispatch({
      type: ANOS_FETCH_ANDAMENTO,
      payload: true
    });
    const emailB64 = b64.encode(firebase.auth().currentUser.email);
    firebase
      .database()
      .ref(`gastos/${emailB64}/${mes}`)
      .once("value", snapshot => {
        dispatch({ type: ANOS_FETCH, payload: snapshot.val() });
      });
  };
};

const saldoAtual = dadosGastos => {
  let totalGastos = 0;
  for (let x = 0; x < dadosGastos.length; x++) {
    totalGastos += parseFloat(dadosGastos[x].valor);
  }
  //const Saldo = renda - totalGastos;

  // return {
  //   type: CALCULATE_SALDO,
  //   payload: totalGastos
  // };

  return totalGastos;
};


export const extratoMesFetch = (mes, ano) => {
  return dispacth => {
      const emailB64 = b64.encode(firebase.auth().currentUser.email);
      firebase.database().ref(`gastos/${emailB64}/${mes}/${ano}/gastos/`)
          .once('value', snapshot => {
              dispacth({type: EXTRATO_MES_FETCH, payload: snapshot.val()});
          });
  }
}