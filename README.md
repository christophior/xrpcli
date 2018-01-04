## coin price ticker CLI

Check different crypto prices on your console.

All data comes from [cryptonator.com](https://cryptonator.com/) APIs.


### installation
**make sure you have node v6 or higher: https://nodejs.org/dist/latest-v6.x/**

```bash
npm install -g cryptotracker
```

### running
```bash
# gets average price and price on exchanges
coin xrp

# gets above info as well as total price for given quantity
coin xrp <number> 
```

### tips
You can also use the `watch` command in order to have the cli run continuously and stay up to date.
You can install watch on mac using brew or macports, more details can be found at http://osxdaily.com/2010/08/22/install-watch-command-on-os-x/

example using watch:
```bash
watch -d xrp

# output:
Every 2.0s: xrp
----------------------------------------------------
if you find this tool useful feel free to donate some ripple:
rswJLmNcH6vAXdtWTGK1ad2WTBWBK6xrfw
----------------------------------------------------

-----------------------------------------------
  Symbol     Avg Price (USD)    Change (1H)
-----------------------------------------------
  XRP        $1.9299            -3.00%
-----------------------------------------------
------------------------------
  Exchange     Price (USD)
------------------------------
  BitFinex     $1.9154
------------------------------
  Bittrex      $1.9320
------------------------------
  Exmo         $2.1100
------------------------------
  Hitbtc       $1.9200
------------------------------
  Kraken       $1.9700
------------------------------
  Poloniex     $1.9120
------------------------------
```

if you find this tool useful feel free to donate some ripple
```rswJLmNcH6vAXdtWTGK1ad2WTBWBK6xrfw```