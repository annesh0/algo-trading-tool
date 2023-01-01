import config as cf
from alpaca.trading.client import TradingClient
from alpaca.trading.requests import MarketOrderRequest
from alpaca.trading.enums import OrderSide, TimeInForce
import matplotlib.pyplot as plt
import numpy as np

# Base URL for fetching data, portfolio, etc. from Alpaca
BASE_URL = "https://paper-api.alpaca.markets"

API_KEY = "<Your API Key>"
SECRET_KEY = "<Your Secret Key>"

trading_client = TradingClient(API_KEY, SECRET_KEY, paper=True)

market_order_data = MarketOrderRequest(
                      symbol="BTC/USD",
                      qty=1,
                      side=OrderSide.BUY,
                      time_in_force=TimeInForce.GTC
                  )

market_order = trading_client.submit_order(market_order_data)
for property_name, value in market_order:
  print(f"\"{property_name}\": {value}")
