import { ActionCreator, Dispatch } from "redux";
import { Company } from "./schema";
import { IState } from "./store";
export declare const SEARCH = "SEARCH_RESULT";
export declare const ADD_GRAPH = "ADD_GRAPH";
export declare const REM_GRAPH = "REMOVE_GRAPH";
export declare const TOGGLE_MODAL = "TOGGLE_MODAL";
export declare const ADD_WATCH = "ADD_WATCH";
export declare const FETCH_COMPANIES = "FETCH_COMPANIES";
export interface LoginAction {
    type: "LOGGED_IN";
}
export interface SearchResult {
    type: "SEARCH_RESULT";
    results: Array<Company>;
}
export interface AddGraph {
    type: "ADD_GRAPH";
    company: Company;
    dataPoints: Array<number>;
    labels: Array<string>;
}
export interface RemoveGraph {
    type: "REMOVE_GRAPH";
    graphId: string;
}
export interface ToggleModalDisplay {
    type: "TOGGLE_MODAL";
    symbol?: string;
}
export declare const ListSearchResults: ActionCreator<SearchResult>;
export declare const addGraphAsync: (company: Company) => (dispatch: Dispatch<IState>) => Promise<void>;
export declare const removeGraph: ActionCreator<RemoveGraph>;
export declare const fetchCompaniesAsync: (searchPhrase: string, isSymbol: boolean) => (dispatch: Dispatch<IState>) => Promise<boolean>;
export declare const toggleModalDisplay: ActionCreator<ToggleModalDisplay>;
export declare const addWatchAsync: (symbol: string, targetPrice: number, phoneNumber: string) => (dispatch: Dispatch<IState>) => Promise<boolean>;
