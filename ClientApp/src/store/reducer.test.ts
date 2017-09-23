import { reducer, IState } from "./store";

import {
  SEARCH,
  ADD_GRAPH,
  REM_GRAPH,
  TOGGLE_MODAL,
  ListSearchResults,
  AddGraph,
  RemoveGraph,
  ToggleModalDisplay
} from "./actions";

import { Company } from "./schema";

// Prologue
// The reducer should accept incoming actions
//  and return the updated state correctly

describe("When the reducer", () => {
  let mockState: IState;
  beforeEach(() => {
    mockState = {
      searchResults: [],
      graphs: [],
      showModal: false,
      modalSymbol: ""
    };
  });

  describe(`receives a ${SEARCH} action`, () => {

    it("should update the searchResults", () => {
      const companies: Array<Company> = [
        {
          symbol: "msft",
          name: "Microsoft"
        },
        {
          symbol: "amd",
          name: "AMD"
        }
      ];

      const newState: IState = reducer(mockState, ListSearchResults(companies));
      expect(newState.searchResults).toHaveLength(2);
      expect(newState.searchResults).toEqual(companies);
    });
  });

  describe(`receives a ${ADD_GRAPH} action`, () => {
    it("should add a new graph to the list", () => {
      const newGraph: AddGraph = {
        type: ADD_GRAPH,
        company: {
          symbol: "msft",
          name: "Microsoft"
        },
        dataPoints: [1, 2, 3, 4, 5],
        labels: ["1", "2", "3", "4", "5"]
      };

      const newState:IState = reducer(mockState, newGraph);
      expect(newState.graphs).toHaveLength(1);
      expect(newState.graphs[0].index).toBe(0);
      expect(newState.graphs[0].graphId).toBe("graph0");
      expect(newState.graphs[0].company).toEqual(newGraph.company);
      expect(newState.graphs[0].dataset).toEqual(newGraph.dataPoints);
      expect(newState.graphs[0].labels).toEqual(newGraph.labels);
    });
  });

  describe(`receives a ${REM_GRAPH} action`, () => {
    let newGraph: AddGraph;
    beforeAll(() => {
      newGraph = {
        type: ADD_GRAPH,
        company: {
          symbol: "msft",
          name: "Microsoft"
        },
        dataPoints: [1, 2, 3, 4, 5],
        labels: ["1", "2", "3", "4", "5"]
      };

      mockState = reducer(mockState, newGraph);
    });

    it("should remove an existing graph", () => {
      const removeGraph: RemoveGraph = {
        type: REM_GRAPH,
        graphId: "graph0"
      }
      const newState: IState = reducer(mockState, removeGraph);
      expect(newState.graphs).toHaveLength(0);
    });
  });

  describe(`receives a ${TOGGLE_MODAL} action`, () => {
    let newAction: ToggleModalDisplay;
    beforeEach(() => {
      newAction = {
        type: TOGGLE_MODAL
      };
    });

    it("should toggle state property showModal", () => {
      const newState: IState = reducer(mockState, newAction);

      expect(newState.showModal).toBe(true);
    });

    it("should store modal stock symbol, ", () => {
      newAction.symbol = "msft";
      const newState: IState = reducer(mockState, newAction);
      expect(newState.modalSymbol).toBe("msft");
    });
  });
});