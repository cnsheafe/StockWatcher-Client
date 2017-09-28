StockWatcher (Client-App)
=

View stock prices from different companies and set SMS Alerts when stocks reach a certain price.

About
-
This repository concerns the purely front-end component of StockWatcher. For the full-stack monolith, go 
[here](https://github.com/cnsheafe/StockWatcher).

Features
-
* NASDAQ stock symbol lookup
* Graphs generated from company stock price history
* Custom SMS Alerts

Technologies
-
* React-Redux
* RxJs
* Typescript
* Chart.js
* Fetch API

Third-Party APIs
-
* Twilio SMS and Notify
* AlphaVantage

Development Tools
-
* Webpack
* SCSS
* Jest
* Travis CI

Instructions for Development
-
Developing StockWatcher requires Node.js, Webpack, Sass/SCSS, and Typescript.

Always start with the following:
```bash
npm install
npm run build-dev
```

To view in browser:
```bash
npm run server
```

Future Plans
-
* Add accounts
* Add StripeJs