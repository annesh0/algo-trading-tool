import os
import nest_asyncio

nest_asyncio.apply()
import asyncio
from collections import defaultdict

import msgpack

import websockets
import threading
from alpaca.trading.client import TradingClient
from alpaca.trading.stream import TradingStream
from websockets import protocol

from shared import data
from shared import messages

# class alpaca.trading.stream.TradingStream(api_key: str, secret_key:str,
# paper: bool = True, raw_data: bool = False, 
# url_override: Optional[str] = None, 
# websocket_params: Optional[Dict] = None)
# https://alpaca.markets/docs/python-sdk/api_reference/trading/stream.html

from threading import Lock

lock = Lock()





