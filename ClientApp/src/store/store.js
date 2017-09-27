"use strict";
exports.__esModule = true;
var redux_1 = require("redux");
var redux_thunk_1 = require("redux-thunk");
var actions_1 = require("./actions");
function reducer(state, action) {
    switch (action.type) {
        case actions_1.SEARCH:
            var searchAction = action;
            return Object.assign({}, state, { searchResults: searchAction.results });
        case actions_1.ADD_GRAPH:
            var graphAction = action;
            var count = state.graphs.length;
            var index = count > 0 ? state.graphs[count - 1].index + 1 : 0;
            var newGraph = {
                index: index,
                graphId: "graph" + index,
                company: graphAction.company,
                dataset: graphAction.dataPoints,
                labels: graphAction.labels
            };
            return Object.assign({}, state, {
                graphs: state.graphs.concat([
                    newGraph
                ]),
                searchResults: []
            });
        case actions_1.REM_GRAPH:
            var indexToRemove = state.graphs.findIndex(function (elm) {
                return elm.graphId === action.graphId;
            });
            var newGraphList = state.graphs.slice();
            newGraphList.splice(indexToRemove, 1);
            return Object.assign({}, state, {
                graphs: newGraphList
            });
        case actions_1.TOGGLE_MODAL:
            return Object.assign({}, state, {
                showModal: !state.showModal,
                modalSymbol: action.symbol
            });
        default:
            return state;
    }
}
exports.reducer = reducer;
var initialState = {
    searchResults: [],
    graphs: [],
    showModal: false,
    modalSymbol: ""
};
exports["default"] = redux_1.createStore(reducer, initialState, redux_1.applyMiddleware(redux_thunk_1["default"]));
