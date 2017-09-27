"use strict";
exports.__esModule = true;
require("isomorphic-fetch");
// Action Commands
exports.SEARCH = "SEARCH_RESULT";
exports.ADD_GRAPH = "ADD_GRAPH";
exports.REM_GRAPH = "REMOVE_GRAPH";
exports.TOGGLE_MODAL = "TOGGLE_MODAL";
exports.ADD_WATCH = "ADD_WATCH";
exports.FETCH_COMPANIES = "FETCH_COMPANIES";
// Action for updating state with list of matching company names from database
// Used on Search.tsx
exports.ListSearchResults = function (results) {
    return {
        type: exports.SEARCH,
        results: results
    };
};
// Action for Adding a Graph
exports.addGraphAsync = function (company) {
    return function (dispatch) {
        var headers = new Headers({
            "Accept": "application/json"
        });
        var stockRequest = new Request("https://stock-watcher-app.herokuapp.com/stockprice/?stocksymbol=" + company.symbol, {
            method: "GET",
            headers: headers
        });
        return fetch(stockRequest)
            .then(function (res) {
            return res.json();
        })
            .then(function (json) {
            console.log(json);
            var dataPoints = [];
            var labels = [];
            for (var i = json.length - 1; i >= 0; i--) {
                dataPoints.push(json[i].price);
                labels.push(json[i].timeStamp);
            }
            dispatch({
                type: exports.ADD_GRAPH,
                company: company,
                dataPoints: dataPoints,
                labels: labels
            });
        });
    };
};
exports.removeGraph = function (graphId) {
    return {
        type: exports.REM_GRAPH,
        graphId: graphId
    };
};
exports.fetchCompaniesAsync = function (searchPhrase, isSymbol) {
    var headers = new Headers({
        "Accept": "application/json"
    });
    var searchRequest = new Request("https://stock-watcher-app.herokuapp.com/company/?searchphrase=" + searchPhrase + "&issymbol=" + isSymbol.toString(), {
        method: "GET",
        headers: headers
    });
    return function (dispatch) {
        return fetch(searchRequest)
            .then(function (res) {
            return {
                json: res.json(),
                status: res.status
            };
        })
            .then(function (blob) {
            if (blob.status === 200) {
                dispatch(exports.ListSearchResults(blob.json));
                return true;
            }
            return false;
        });
    };
};
exports.toggleModalDisplay = function (symbol) {
    return {
        type: exports.TOGGLE_MODAL,
        symbol: symbol
    };
};
exports.addWatchAsync = function (symbol, targetPrice, phoneNumber) {
    return function (dispatch) {
        var header;
        header = new Headers({ "Content-Type": "application/json" });
        var bodyBlob = new Blob([
            JSON.stringify({
                symbol: symbol,
                phone: phoneNumber,
                price: targetPrice
            })
        ]);
        var watchRequest = new Request("https://stock-watcher-app.herokuapp.com/notifications/watchprice", {
            method: "POST",
            body: bodyBlob,
            headers: header
        });
        return fetch(watchRequest)
            .then(function (res) {
            return res.status;
        })
            .then(function (status) {
            console.log(status);
            if (status === 201) {
                dispatch({
                    type: exports.TOGGLE_MODAL
                });
                return true;
            }
            return false;
        });
    };
};
