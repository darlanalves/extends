/**
 * extends
 * Author: Darlan Alves <darlan@moovia.com>
 * Built on 2013-08-14
 */
!function(a){function b(a,b,d){c(a,b),d&&c(a,d)}function c(a,b){if(Object.keys)Object.keys(b).forEach(function(c){a[c]=b[c]});else{var c;for(c in b)f.call(b,c)&&(a[c]=b[c])}return a}function d(a,b,c){return function(){var d=this._super;this._super=b[a];var e=c.apply(this,arguments);return this._super=d,e}}function e(a,i){var j,k,l,m,n,m=a.prototype,o=function(){},p=!1;f.call(i,"statics")&&(p=i.statics,i.statics=null,delete i.statics),j=f.call(i,"constructor")?i.constructor:typeof m.constructor===h?m.constructor:function(){},j=g.test(j)?d("constructor",m,j):j,n=function(){return j.apply(this,arguments)},o.prototype=a.prototype,o.prototype.__initialize__=!1,n.prototype=new o,n.prototype.__initialize__=!0;for(k in i)"self"!==k&&"superclass"!==k&&(l=i[k],n.prototype[k]=typeof l===h&&typeof m[k]===h&&g.test(l)?d(k,m,l):l);return n.prototype.clone=function(){return c(new this.self,this)},b(n,a,p),n.extend=function(a){return e(this,a)},n.superclass=n.prototype.superclass=m,n.prototype.self=n,n}var f={}.hasOwnProperty,g=/xyz/.test(function(){xyz()})?/\b_super\b/:/.*/,h="function";a.extend=function(a,b){var c=arguments.length,d=typeof a===h,f=function(){};return 1===c?d?e(a,{}):e(f,"object"==typeof a&&null!==a&&a||{}):2===c?e(d&&a||f,"object"==typeof b&&null!==b&&b||{}):e(f,{})}}("object"==typeof exports&&exports||this);