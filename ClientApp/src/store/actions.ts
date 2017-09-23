import { ActionCreator, Dispatch } from "redux";
import thunk, { ThunkAction } from "redux-thunk";
require("isomorphic-fetch");

import { Company, Graph } from "./schema";
import { IState } from "./store";

// Action Commands
export const SEARCH = "SEARCH_RESULT";
const LOGIN = "LOGGED_IN";
export const ADD_GRAPH = "ADD_GRAPH";
export const REM_GRAPH = "REMOVE_GRAPH";
export const TOGGLE_MODAL = "TOGGLE_MODAL";
export const ADD_WATCH = "ADD_WATCH";

// Action Interfaces
export interface LoginAction { type: "LOGGED_IN" }

export interface SearchResult {
  type: "SEARCH_RESULT",
  results: Array<Company>
}

export interface AddGraph {
  type: "ADD_GRAPH",
  company: Company,
  dataPoints: Array<number>,
  labels: Array<string>
}

export interface RemoveGraph {
  type: "REMOVE_GRAPH",
  graphId: string
}

export interface ToggleModalDisplay {
  type: "TOGGLE_MODAL",
  symbol?: string
}

// Action for updating state with list of matching company names from database
// Used on Search.tsx
export const ListSearchResults: ActionCreator<SearchResult> =
  (results: Array<Company>) => {
    return {
      type: SEARCH,
      results: results
    }
  }
// Action for Adding a Graph
export const addGraphAsync = 
  (company: Company) => {

    return function(dispatch: Dispatch<IState>) {
      let stockRequest = new Request(
        `/stockprice?stocksymbol=${company.symbol}`,
        { method: "GET" });
      
      return fetch(stockRequest)
        .then(res => {
          return res.json();
        })
        .then((json) => {
          console.log(json);
          let dataPoints = [];
          let labels = [];

          for (var i = json.length - 1; i >= 0 ; i--) {
            dataPoints.push(json[i].price);
            labels.push(json[i].timeStamp);
          }

          dispatch<AddGraph>({
            type: ADD_GRAPH,
            company: company,
            dataPoints: dataPoints,
            labels: labels
          });
        })
    }
  }


export const removeGraph: ActionCreator<RemoveGraph> = (graphId: string) => {
  return {
    type: REM_GRAPH,
    graphId: graphId
  }
}

export const toggleModalDisplay: ActionCreator<ToggleModalDisplay> = (symbol?: string) => {
  return {
    type: TOGGLE_MODAL,
    symbol: symbol
  }
}
export const addWatchAsync = 
  (symbol: string, 
  targetPrice: number, 
  phoneNumber: string) => {
  console.log(symbol);
  console.log(targetPrice);
  console.log(phoneNumber);
  return function(dispatch: Dispatch<IState>): Promise<boolean> {
    let header;
      header = new Headers({"Content-Type": "application/json"});
      
    let bodyBlob = new Blob(
      [
        JSON.stringify(
        {
          symbol: symbol,
          phone: phoneNumber,
          price: targetPrice
        })
      ]
    );

    let watchRequest = new Request(
      "https://stock-watcher-app.herokuapp.com/notifications/watchprice", {
      method: "POST",
      body: bodyBlob,
      headers: header
    });

    return fetch(watchRequest)
      .then(res => {
        return res.status;
      })
      .then(status => {
        console.log(status);
        if (status === 201) {
          dispatch<ToggleModalDisplay>({
            type: TOGGLE_MODAL
          });
          return true;
        }
        return false;
      });
  }
}