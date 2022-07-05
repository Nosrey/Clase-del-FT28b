'use strict'

function BinarioADecimal(num) {
  // tu codigo aca
  var arr = num.split('').map(function(num) {
    return Number(num)
  })

  var total = 0;

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === 0) {
      continue;
    } 
    total += (arr[i] * (2 ** ((arr.length - 1) - i)))
  }

  return total;
}

function DecimalABinario(num) {
  // tu codigo aca
  var final = [];
  var numero = num;
  while (numero != 0) {
    final.unshift(numero % 2);
    numero = Math.floor(numero/2);
  }
  return final.join('');
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}