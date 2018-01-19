#!/usr/bin/env node
const axios = require('axios')
const ora = require('ora')
const Table = require('cli-table2')
const colors = require('colors')
const humanize = require('humanize-plus')

let symbol = process.argv.length > 2 ? process.argv[2] : 'XRP',
	quantity = process.argv.length > 3 ? process.argv[3] : undefined;

const tableChars = {
	'top': '-',
	'top-mid': '-',
	'top-left': '-',
	'top-right': '-',
	'bottom': '-',
	'bottom-mid': '-',
	'bottom-left': '-',
	'bottom-right': '-',
	'left': '║',
	'left-mid': '-' ,
	'mid': '-' ,
	'mid-mid': '-',
	'right': '║',
	'right-mid': '-',
	'middle': '│'
};

let summaryHead = ['Symbol', 'Avg Price (USD)', 'Change (1H)'];
if (quantity) {
	summaryHead.push('Quantity');
	summaryHead.push('Value');	
}

const summaryTable = new Table({
		chars: tableChars,
		head: summaryHead.map(title => title.yellow),
		colWidths: quantity ? [10, 18, 15, 12, 16] : [10, 18, 15]
	}),
	exchangeTable = new Table({
		chars: tableChars,
		head: ['Exchange', 'Price (USD)', 'Value (USD)'].map(title => title.yellow),
		colWidths: [12, 15, 15]
	});

const spinner = ora('Loading data').start()
axios.get(`https://api.cryptonator.com/api/full/${symbol.toLowerCase()}-usd`)
	.then(function (response) {
		spinner.stop()
		if (response.data.error && response.data.error !== "") {
			console.log('Error: ' + response.data.error.red);
		} else {
			let data = response.data.ticker,
				hourChange = parseFloat(data.change*100).toFixed(2);
				hourChange = hourChange > 0 ? hourChange.green : hourChange.red,
				summaryRow = [data.base, '$' + parseFloat(data.price).toFixed(4), hourChange + '%'];

			if (quantity) {
				summaryRow.push(numberWithCommas(quantity));
				summaryRow.push('$' + numberWithCommas(parseFloat(quantity * data.price).toFixed(2)));
			}

			summaryTable.push(summaryRow)
			
			data.markets
				.map(record => {
					return [record.market, '$' + parseFloat(record.price).toFixed(4), '$' + numberWithCommas(parseFloat(record.price * quantity).toFixed(2))]
				})
				.forEach(record => exchangeTable.push(record))
			
			console.log(summaryTable.toString())
			console.log(exchangeTable.toString())
		}
	})
	.catch(function (error) {
		spinner.stop()
		console.error('Please try again later.'.red)
	})

const numberWithCommas = (x) => {
	return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}