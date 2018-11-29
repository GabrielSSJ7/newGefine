import {
  GASTOS_FETCH,
  GASTOS_FETCH_ALL,
  ANOS_FETCH,
  LOG_OUT_APP,
  SET_CURRENT_MONTH,
  GET_RENDA,
  CALCULATE_SALDO,
  SOMA_GASTOS,
  MODIFICA_ALERT_RENDA_INPUT,
  DIALOG_RENDA_VISIBLE,
  UPDATE_RENDA,
  UPDATE_RENDA_ERRO,
  DIALOG_TCC_VISIBLE,
  MODIFICA_ALERT_VALOR_GASTO,
  MODIFICA_ALERT_DESC_GASTO,
  MODIFICA_UID_GASTO,
  INSERIR_GASTO_ERRO,
  INSERIR_GASTO_SUCESSO,
  ALTERAR_GASTO_ERRO,
  ALTERAR_GASTO_SUCESSO,
  DIALOG_GASTO_VISIBLE,
  DIALOG_ALTERAR_GASTO_VISIBLE,
  ANOS_FETCH_ANDAMENTO,
  EXTRATO_MES_FETCH
} from "../types";

const INITIAL_STATE = {
  dadosGastos: [],
  mesAtual: "",
  rendaFixa: "",
  rendaMsg: "",
  saldo: 0,
  somaGastos: "",
  alertRendaInput: "",
  DialogRendaVisible: false,
  isDialogVisibleTCC: false,
  DialogGastoVisible: false,
  DialogAlterarGastoVisible: false,
  textoValorGasto: false,
  textoDescGasto: "",
  uidAlterarGasto: "",
  msgGasto: "",
  anosList: [],
  extratoMes: ""
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SOMA_GASTOS:
      return { ...state, somaGastos: action.payload };

    case CALCULATE_SALDO:
      return { ...state, saldo: action.payload };

    case GET_RENDA:
      return { ...state, rendaFixa: action.payload };

    case SET_CURRENT_MONTH:
      return { ...state, mesAtual: action.payload };

    case GASTOS_FETCH:
      return { ...state, dadosGastos: action.payload, saldo: action.saldo };

    case LOG_OUT_APP:
      return { state: INITIAL_STATE };

    case MODIFICA_ALERT_RENDA_INPUT:
      return { ...state, alertRendaInput: action.payload };

    case DIALOG_RENDA_VISIBLE:
      return { ...state, DialogRendaVisible: action.payload };

    case DIALOG_TCC_VISIBLE:
      return { ...state, isDialogVisibleTCC: action.payload };

    case DIALOG_GASTO_VISIBLE:
      return { ...state, DialogGastoVisible: action.payload };

    case DIALOG_ALTERAR_GASTO_VISIBLE:
      return { ...state, DialogAlterarGastoVisible: action.payload };

    case UPDATE_RENDA_ERRO:
      return { ...state, rendaMsg: action.payload, DialogRendaVisible: true };

    case UPDATE_RENDA:
      return {
        ...state,
        DialogRendaVisible: false,
        alertRendaInput: "",
        rendaMsg: ""
      };

    case MODIFICA_ALERT_VALOR_GASTO:
      return { ...state, textoValorGasto: action.payload };

    case MODIFICA_ALERT_DESC_GASTO:
      return { ...state, textoDescGasto: action.payload };

    case MODIFICA_UID_GASTO:
      return { ...state, uidAlterarGasto: action.payload }

    case INSERIR_GASTO_ERRO:
      return { ...state, msgGasto: action.payload };

    case INSERIR_GASTO_SUCESSO:
      return { ...state, DialogGastoVisible: action.payload };

    case ALTERAR_GASTO_ERRO:
      return { ...state, msgGasto: action.payload };

    case ALTERAR_GASTO_SUCESSO:
      return { ...state, DialogAlterarGastoVisible: action.payload };

    case ANOS_FETCH:
      return {
        ...state,
        anos_fetch_andamento: false,
        anosList: action.payload
      };

    case ANOS_FETCH_ANDAMENTO:
      return { ...state, anos_fetch_andamento: action.payload };

    case EXTRATO_MES_FETCH:
      return { ...state, extratoMes: action.payload };

    default:
      return state;
  }
};
