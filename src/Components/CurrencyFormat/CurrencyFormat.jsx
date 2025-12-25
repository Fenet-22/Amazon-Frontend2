import numeral from 'numeral';

function CurrencyFormat({ price }) {
  // Format as currency with $ sign and 2 decimal places
  return numeral(price).format('$0,0.00');
}

export default CurrencyFormat;