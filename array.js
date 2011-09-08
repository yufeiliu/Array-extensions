/*
*   Some useful array functions
*   @author Yufei Liu (liu.yufei@gmail.com)
*   @date September 7, 2011
*   Released under GPL3: http://www.gnu.org/licenses/gpl.html
*/
Array.prototype.clone = function() {
  return this.slice(0);
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
Array.prototype.map = function(fn) {
  var copy = [];
  for (var i = 0; i < this.length; i++) {
    copy.push(fn(this[i]));
  }
  return copy;
};
Array.prototype.sum = function() {
  var sum = 0;
  this.map(function(num) { sum += num; });
  return sum;
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