angular.module( 'sample.login', [
  'ui.router',
  'angular-storage'
])
.config(function($stateProvider) {
  $stateProvider.state('login', {
    url: '/login',
    controller: 'LoginCtrl',
    templateUrl: 'login/login.html'
  });
})
.controller( 'LoginCtrl', function LoginController( $scope, $http, store, $state) {

  $scope.user = {
  };

  $scope.login = function() {
    $http({
      //url: 'http://localhost:3001/sessions/create',
      url:'https://www.yuhongtech.net/admin/api/v1/auth/login',
      method: 'POST',
      data: $scope.user
    }).then(function(response) {
      store.set('jwt', response.data.token);
      $state.go('home');
    }, function(error) {
      alert(error.data);
    });
  }

});
