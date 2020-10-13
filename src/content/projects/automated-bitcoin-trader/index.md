---
templateKey: project-post
featured: true
name: Automated Bitcoin Trader
description: Configurable, automated Bitcoin trader, leveraging technical analysis
images:
  - btc-trader-logo.png
  - btc-trader-macd.png
  - btc-trader-tema.png
files:
  - name: Bitcoin Trader Report
    file: bitcoin-trader.pdf
year: "2014"
tags:
  - Node.js
  - PostgreSQL
  - Angular.js
  - Bootstrap
  - Bitcoin
  - Trading
  - Technical Analysis
  - Visualisation
---
## Motivation

This project was an introduction into my curiosity over trading, as well as my desire to experiment with some emerging technology stacks at the time.

With no prior economic knowledge, Bitcoin seemed like a great market to explore and learn through, and thus, I built an Automated Bitcoin Trader.

## Solution

An end-to-end platform for configuring custom trading bots, with differing configurations. Bots can be configured to use real capital, or trade on paper with live data.

Each bot analyses Bitcoin price data from various exchanges, to determine and execute profitable trades using a variety of configurable technical analysis methods, which produce trading indicators based on historical pricing data.

This allows the user to run multiple strategies in parallel, and configure the signals which signify a trade.

The full write-up can be downloaded at the end of this post.

### Technology

The platform consists of some key components - data streaming, data processing, and trade execution.

Pricing data is streamed from the various Bitcoin exchanges through a short-polling mechanism, and exposed as a common interface to the platform, allowing for source-agnostic access to different exchanges.

The data processing component involves transforming the data into viable inputs for any configured strategies. Data aggregation is a common requirement to strategies, as it is often a requirement to view pricing data in fixed intervals. Thus, if a strategy is configured to use 15-minute intervals for grouping the pricing data, each interval will expose the opening price, highest price, lowest price, and closing price for that interval. 

The next data processing step involves carrying out computing the signals using the aggregated pricing data - for example, computing two moving averages that take into account the last 21 and 10 days' pricing into account, respectively. The [node-talib](https://github.com/oransel/node-talib) library is leveraged for many of the technical analysis methods.

Finally, the trade execution component will determine if a signal indicates a trade, and attempt to execute the trade using the exchange's API.

The Angular.js frontend (yes, Angular v1!) is a dashboard that can be used to configure the bots, run backtests, and view any terminal output from the trading bots. The graphs are rendered using Google's Chart API, and the general user interface is built with Bootstrap.