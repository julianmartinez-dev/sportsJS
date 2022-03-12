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

export default Iterator;
