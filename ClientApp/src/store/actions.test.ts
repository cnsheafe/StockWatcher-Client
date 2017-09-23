import * as actions from "./actions";
import { Company } from "./schema";

describe("ListSearchResults", () => {
  it("should return action of type SearchResult", () => {
    const actionCreator = actions.ListSearchResults;
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
    const action = actionCreator(companies);
    expect(action).toHaveProperty("type");
    expect(action).toHaveProperty("results");
    expect(action.type).toEqual(actions.SEARCH);
    expect(action.results).toHaveLength(2);
    expect(action.results[0].symbol).toEqual("msft");
  });
});

describe("toggleModalDisplay", () => {
  it("should return action of type ToggleModalDisplay", () => {
    const actionCreator = actions.toggleModalDisplay;
    const action = actionCreator("msft");
    expect(action).toHaveProperty("type");
    expect(action).toHaveProperty("symbol");
    expect(action.type).toEqual(actions.TOGGLE_MODAL);
    expect(action.symbol).toEqual("msft");
  });
});

describe("RemoveGraph", () => {
  it("should return action of type RemoveGraph", () => {
    const actionCreator = actions.removeGraph;
    const action = actionCreator("graph1");
    expect(action).toHaveProperty("type");
    expect(action).toHaveProperty("graphId");
    expect(action.type).toEqual(actions.REM_GRAPH);
    expect(action.graphId).toEqual("graph1");
  });
});


