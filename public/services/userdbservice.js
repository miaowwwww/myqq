angular.module('myApp')
  .factory('userdbservice', function() {
    // var user = null;
    var user = null;
    return {
      setUser: function(_user) {
        user = _user;
        console.log('set user ::::')
        console.log(user);
      },
      getUser: function() {
        return user;
      }
    };
  })