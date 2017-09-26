import * as React from "react";

export class Footer extends React.Component {
  render() {
    return (
      <footer className="footer">
        <ul className="footer-links">
          <li><a href="https://twilio.com" target="_blank"><img src="twilio.ico" alt="Twilio API"/></a></li>
          <li><a href="https://alphavantage.co" target="_blank"><img src="alphavantage.ico" alt="AlphaVantage API"/></a></li>
          <li><a href="https://github.com/cnsheafe/StockWatcher" target="_blank"><img src="github.png" alt="Github Portfolio"/></a></li>
        </ul>
      </footer>
    );
  }
}