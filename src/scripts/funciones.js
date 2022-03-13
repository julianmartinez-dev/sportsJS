const Iterator = function (elements) {
  this.elements = elements;
  this.index = 0;
};

Iterator.prototype = {
  hasNext: function () {
    return this.index < this.elements.length;
  },
  next: function () {
    return this.elements[this.index++];
  },
  reset: function () {
    return (this.index = 0);
  },
};


export function validar(obj) {
  //Validamos que los campos del objeto no esten vacios con el array method "every !== ''""
  return Object.values(obj).every((input) => input !== '');
}

export default Iterator;
