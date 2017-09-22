import {
  createStore,
  Reducer,
  ActionCreator,
  applyMiddleware
} from "redux";

import thunk from "redux-thunk";
import * as Rx from "rxjs/Rx";

import { Graph, Company } from "./schema";
import {
  SEARCH,
  ADD_GRAPH,
  REM_GRAPH,
  TOGGLE_MODAL,
  ADD_WATCH,
  ValidAction
} from "./actions";


// Shape of the App State
export interface IState {
  searchResults: Array<Company>,
  graphs: Array<Graph>,
  showModal: boolean,
  modalSymbol: string
}


function reducer(state: IState, action: ValidAction): IState {
  switch (action.type) {
    case SEARCH:
      return Object.assign({}, state, { searchResults: action.results });
    case ADD_GRAPH:
      const count: number = state.graphs.length;
      const index: number = count > 0 ? state.graphs[count - 1].index + 1 : 0;
      const newGraph: Graph = {
        index: index,
        graphId: `graph${index}`,
        company: action.company,
        dataset: action.dataPoints,
        labels: action.labels
      }

      return Object.assign({}, state,
      {
        graphs: [
          ...state.graphs,
          newGraph
        ],
        searchResults: []
      });

    case REM_GRAPH:
      const indexToRemove = state.graphs.findIndex(elm => {
        return elm.graphId === action.graphId;
      });

      const newGraphList = [...state.graphs];
      newGraphList.splice(indexToRemove, 1);

      return Object.assign({}, state,
      {
        graphs: newGraphList
      });

    case TOGGLE_MODAL || ADD_WATCH:
      return Object.assign({}, state, 
      {
        showModal: !state.showModal,
        modalSymbol: action.symbol
      })
    default:
      return state;
  }
}

const initialState: IState = {
  searchResults: [],
  graphs: [],
  showModal: false,
  modalSymbol: ""
};

export default createStore(reducer, initialState, applyMiddleware(thunk));