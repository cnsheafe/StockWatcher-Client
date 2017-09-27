import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import * as actions from "./actions";
import { Company } from "./schema";

const middleware = [thunk];

const mockStore = configureMockStore(middleware);

describe("fetchCompaniesAsync", () => {
  let store;
  beforeAll(() => {
    store = mockStore({
      searchResults: []
    });
  });

  it(`should fetch the matching companies
    and dispatch SearchResults
    and return true after a successful call`, () => {
      const actionCreator = actions.fetchCompaniesAsync;
      const searchPhrase: string = "msf";
      const isSymbol: boolean = true;

      const res = true;
    function mockResponse(status: number, response) {
      let blobbedRes = new Blob([JSON.stringify(response)]);
      return new Response(blobbedRes,
        {
          status: status,
          headers: new Headers({ "Content-Type": "application/json" })
        });
    }

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(200, res)));

    const expectedActions = [{
      type: actions.SEARCH,
      results: Promise.resolve({})
    }];

    return store.dispatch(actionCreator(searchPhrase, isSymbol))
      .then((status) => {
        console.log(status);
        expect(status).toBe(true);
        expect(store.getActions()).toEqual(expectedActions);
      });
    });
})

describe("addWatchAsync", () => {
  let store;
  beforeAll(() => {
    store = mockStore({
      showModal: true
    });
  });

  it(`should dispatch ToggleModalDisplay 
    and return true after a successful call`, () => {

    const actionCreator = actions.addWatchAsync;
    const symbol = "msft";
    const price = 1.99;
    const phone = "+15555555555";

    let mockBody = new Blob([
      JSON.stringify(
        {
          symbol: symbol,
          price: price,
          phone: phone
        }
      )
    ]);

    function mockResponse(status: number, response) {
      let blobbedRes = new Blob([JSON.stringify(response)]);
      return new Response(blobbedRes,
        {
          status: status,
          headers: new Headers({ "Content-Type": "application/json" })
        });
    }

    let expectedActions = [{
      type: actions.TOGGLE_MODAL
    }];


    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(201, {})));


    return store.dispatch(actions.addWatchAsync(symbol, price, phone))
      .then((status) => {
        expect(status).toBe(true);
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

describe("addGraphAsync", () => {
  let store;
  beforeAll(() => {
    store = mockStore({
      graphs: []
    });
  });

  it("should dispatch addGraph", () => {
    const company: Company = 
    {
      symbol: "msft",
      name: "Microsoft"
    };

    function mockResponse(status: number, response) {
      let blobbedRes = new Blob([JSON.stringify(response)]);
      return new Response(blobbedRes,
        {
          status: status,
          headers: new Headers({ "Content-Type": "application/json" })
        });
    }

    window.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve(mockResponse(201, 
      [
        {
          price: 1,
          timeStamp: "1"
        },
        {
          price: 2,
          timeStamp: "2"
        },
        {
          price: 3,
          timeStamp: "3"
        },
        {
          price: 4,
          timeStamp: "4"
        },
        {
          price: 5,
          timeStamp: "5"
        }
      ]
      )));


    let expectedActions = [{
      type: actions.ADD_GRAPH,
      company: company,
      dataPoints: [5,4,3,2,1],
      labels:["5", "4", "3", "2", "1"]
    }];

    return store.dispatch(actions.addGraphAsync(company))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
  })
})