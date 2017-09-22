import * as React from "react";

import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";


export default class Header extends React.Component {

  render() {
    return (
        <div className="header" role="header">
          <h1 className="header-title">StockWatcher</h1>
        </div>
    );
  }
}

const mapStatetoProps = state => state;