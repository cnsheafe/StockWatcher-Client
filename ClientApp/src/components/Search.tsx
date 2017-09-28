import * as React from "react";
import * as Rx from "rxjs";
import { connect } from "react-redux";
import store from "../store/store";
import { IState } from "../store/store";
import { Company } from "../store/schema";
import { ListSearchResults,  addGraphAsync, fetchCompaniesAsync } from "../store/actions";

export interface SearchProps {
  searchResults: Array<Company>
}

export class Search extends React.Component<SearchProps, {}> {

  suggestionHandler(event: React.MouseEvent<HTMLUListElement>) {
    let target = event.target as HTMLElement;
    let element = target.className === "search-suggestions-item" ? target : target.parentElement;

    const company: Company = {
      name: element.dataset.company,
      symbol: element.dataset.symbol
    }
    store.dispatch(addGraphAsync(company));
  }
  render() {
    const suggestions = this.props.searchResults.map<JSX.Element>((company, index) =>
      <li 
        key={index} 
        data-symbol={company.symbol}
        data-company={company.name}
        className="search-suggestions-item">
          <i className="material-icons purple700">add_circle</i>
          <p>{company.symbol}: {company.name}</p>
      </li>
    );

    return (
      <section className="search">
        <label htmlFor="search-companies" className="search-label">Search Stocks</label>
        <input id="search-companies" type="text" className="search-input" placeholder="Type in an Stock Symbol (e.g. MSFT)"/>
        <h2 className={this.props.searchResults.length > 0 ? "suggestions-title" : "hide"}>Possible Matches</h2>
        <ul 
          id="search-suggestions" 
          onClick={e => this.suggestionHandler(e)} 
          className={this.props.searchResults.length > 0 ? "search-suggestions-list" : "hide"}>
          {suggestions}
        </ul>
      </section>
    );
  }

  componentDidMount() {
    const searchElement = document.getElementById("search-companies") as HTMLInputElement;

    Rx.Observable.fromEvent(searchElement, "keyup")
      .debounceTime(300)
      .subscribe(() =>
        // store.dispatch(fetchCompaniesAsync(searchElement.value, true)));
        fetchCompanies(searchElement.value, true)
          .then(json => {
            store.dispatch(ListSearchResults(json));
          }));
  }
}

function fetchCompanies(searchPhrase: string, isSymbol: boolean): Promise<JSON> {
  const headers = new Headers({
    "Accept": "application/json"
  });
  let searchRequest = new Request(`https://stock-watcher-app.herokuapp.com/company/?searchphrase=${searchPhrase}&issymbol=${isSymbol.toString()}`, {
    method: "GET",
    headers: headers
  });

  return fetch(searchRequest)
    .then(res => {
      return res.json();
    });
}

function mapStateToProps(state: IState): SearchProps {
  return {
    searchResults: state.searchResults
  }
}


export default connect(mapStateToProps)(Search);