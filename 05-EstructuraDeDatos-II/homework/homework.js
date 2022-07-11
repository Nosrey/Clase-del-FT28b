"use strict";

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado; en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

function LinkedList() {
  this.head = null;
}

function Node(value) {
  this.value = value;
  this.next = null;
}

LinkedList.prototype.add = function(elemento) {
  var node = new Node(elemento);
  var actual = this.head;
  if (!this.head) {
      this.head = node;
      return node;
  }
  else {
      while (actual.next) {
          actual = actual.next;
      }
      actual.next = node;
      return node;
  }
}

LinkedList.prototype.remove = function() {
  var actual = this.head;
  var borrar = null;
  if (!actual) {
      return null;
  }
  else if (!actual.next) {
      borrar = this.head.value;
      this.head = null;
      return borrar;
  }
  else {
      while (actual.next.next) {
        actual = actual.next;
      }
      borrar = actual.next.value;
      actual.next = null;
      return borrar;
  }
}

LinkedList.prototype.search = function(objetivo) {
  var actual = this.head;
  if (!actual) {
    return null;
  }
  if (objetivo instanceof Function) {
    if (!actual.next) {
      if (objetivo(actual.value)) {return actual.value;}
      else return null;
    }
    else {
      while (actual.next) {
        if (objetivo(actual.value)) {return actual.value}
        actual = actual.next;
      }
      if (objetivo(actual.value)) {return actual.value}
      else return null;
    }
  }
  else {
    if (!actual.next) {
      if (actual.value === objetivo) {return actual.value;}
      else return null;
    }
    else {
      while (actual.next) {
        if (actual.value === objetivo) {return actual.value;}
        actual = actual.next;
      }
      if (actual.value === objetivo) {return actual.value;}
      else return null;
    }
  }
}

/*
Implementar la clase HashTable.

Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). (Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) y calcula el módulo de ese número total por la cantidad de buckets; de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash, y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey, si ya hay algo en la tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'), se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/

function HashTable() {
  this.array = [];  
  this.numBuckets = 35;
}

HashTable.prototype.hash = function(valor) {
  var total = 0;
  for (var i = 0; i < valor.length; i++) {
    total += valor[i].charCodeAt(0);
  }
  return (total % this.numBuckets);
}

HashTable.prototype.set = function(clave,valor) {
  if (typeof(clave) !== 'string') {throw new TypeError('Keys must be strings');}

  var hashed = this.hash(clave);

  if (!this.array[hashed]) {
    this.array[hashed] = {}
  }
  
  this.array[hashed][clave] = valor;
}

HashTable.prototype.get = function(clave) {
  var hashed = this.hash(clave);
  return this.array[hashed][clave];
}

HashTable.prototype.hasKey = function(clave) {
  var hashed = this.get(clave);
  if (hashed) {
    return true;
  }
  else return false;
}

var ejemplo = new HashTable();

ejemplo.set('hola','pa');

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  Node,
  LinkedList,
  HashTable,
};
