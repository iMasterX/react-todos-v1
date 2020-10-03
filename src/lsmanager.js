export default function LSManager() {
  this.set = function(key, value) {
    window.localStorage.setItem(key, value);
  }
  this.get = function(key) {
    return window.localStorage.getItem(key);
  }
  this.del = function(key) {
    window.localStorage.removeItem(key);
  }
}
