/*
*   Some useful array functions
*   @author Yufei Liu (yufeiliu.com)
*   Released under GPL3: http://www.gnu.org/licenses/gpl.html
*/
//Clone is shallow
Array.prototype.clone = function() {
  return this.slice(0);
}
Array.prototype.first = function() {
  if (arguments.length<1) return this[0];
  var resultant = [];
  for (var i = 0; i < arguments[0]; i++) resultant.push(this[i]);
  return resultant;
}
Array.prototype.last = function() {
  if (arguments.length<1) return this[this.length-1];
  var resultant = [];
  for (var i = this.length-arguments[0]; i < this.length; i++) resultant.push(this[i]);
  return resultant;
}
//Shuffle is not in-place
Array.prototype.shuffle = function() {
  var copy = this.clone();
  for (var i = 0; i < this.length; i++) {
    var rnd1 = Math.floor(Math.random() * this.length);
    var rnd2 = Math.floor(Math.random() * this.length);
    var tmp = copy[rnd1];
    copy[rnd1] = copy[rnd2];
    copy[rnd2] = tmp;
  }
  return copy;
};
//Take a random sample of given size of the array
Array.prototype.sample = function() {
  var resultant = [];
  var size = arguments.length<1 ? 1 : arguments[0];
  var curSize = size;
  for (var i=0; i<this.length; i++) {
    if (Math.random()<=curSize/(this.length-i)) resultant.push(this[i]);
    curSize = size-resultant.length;
    if (curSize==0) break;
  }
  if (resultant.length===1) return resultant[0];
  return resultant;
};
//E.g., .getEvery(3) gives every 3rd element in array
Array.prototype.getEvery = function(num) {
  var resultant = [];
  if (num<1) return resultant;
  for (var i = num-1; i < this.length; i+=num) resultant.push(this[i]);
  return resultant;
};
Array.prototype.map = function(fn) {
  var copy = [];
  for (var i = 0; i < this.length; i++) {
    copy.push(fn(this[i]));
  }
  return copy;
};
Array.prototype.reduce = function(fn, initial) {
  var aggregate = initial;
  for (var i = 0; i < this.length; i++) {
    aggregate = fn(this[i], aggregate);
  }
  return aggregate;
};
Array.prototype.filter = function(fn) {
  var resultant = [];
  this.map(function(obj) {
    if (fn(obj)) resultant.push(obj);
  });
  return resultant;
};
Array.prototype.reject = function(fn) {
  rf = function(obj) {
    if (fn(obj)) return false;
    return true;
  };
  return this.filter(rf);
};
//Can pass in either a value for direct comparison, or a function that returns true for
//  valid values
Array.prototype.count = function() {
  if (arguments.length<1) return this.length;
  var param = arguments[0];
  var count=0;
  this.map(function(o){
    if (typeof(param)==="function" && param(o)) {
      count++;
    } else if (param===o) {
      count++;
    }
  });
  return count;
};
Array.prototype.sum = function() {
  return this.reduce(function(o,a){return o+a;}, 0);
};
Array.prototype.mean = function() {
  return this.sum() / this.length;
};
Array.prototype.median = function() {
  var copy = this.clone();
  copy.sort(function(a,b) {return a-b;});
  var len = this.length;
  return (len % 2 == 1 ? copy[(len-1)/2] : (copy[len/2-1] + copy[len/2])/2);
};
Array.prototype.max = function() {
  var copy = this.clone();
  copy.sort(function(a,b) {return a-b;});
  return copy.pop();
};
Array.prototype.min = function() {
  var copy = this.clone();
  copy.sort(function(a,b) {return a-b;});
  return copy.shift();
};
Array.prototype.stdev = function() {
  var mean = this.mean();
  var stdevSum = 0;
  this.map(function(num) {stdevSum += (num-mean)*(num-mean); });
  return Math.sqrt(stdevSum/this.length);
};
//Pass in equality check function fn(o1,o2)
Array.prototype.frequencyMap = function() {
  var freqs = {};
  var fn = arguments[0];
  if (fn==undefined) { fn = function(a,b) { return a==b; }; }
  var uniqueKeys = [];
  this.map(function(obj){
    var key = null;
    for (var i = 0; i < uniqueKeys.length; i++) {
      if (fn(uniqueKeys[i],obj)) {
        key = uniqueKeys[i];
        break;
      }
    }
    if (key===null) {
      uniqueKeys.push(obj);
      freqs[obj]=1;
    } else {
      freqs[key]+=1;
    }

  });
  return freqs;
};
Array.prototype.inRange = function(low, high) {
  return this.filter(function(obj){
    return obj >= low && obj <= high;
  });
};