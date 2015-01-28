angular.module( 'sample.home', [
  'ui.router',
  'angular-storage',
  'angular-jwt'
])
.config(function($stateProvider) {
  $stateProvider.state('home', {
    url: '/',
    controller: 'HomeCtrl',
    templateUrl: 'home/home.html'
  });
})
.controller( 'HomeCtrl', function HomeController( $scope, $http, store, jwtHelper, $state) {

  $scope.jwt = store.get('jwt');
  $scope.decodedJwt = $scope.jwt && jwtHelper.decodeToken($scope.jwt);

  $scope.callAnonymousApi = function() {
    // Just call the API as you'd do using $http
    //callApi('Anonymous', 'http://localhost:3001/api/random-quote');
    callApi('Anonymous', 'https://www.yuhongtech.net/mobile/api/v1/lottery/lotteryHall');
  }

  $scope.logout = function() {
    store.set('jwt',undefined);
    $scope.jwt=undefined;
  }

  $scope.login = function() {
    $state.go("login");
  }

  $scope.callSecuredApi = function() {
    //callApi('Secured', 'http://localhost:3001/api/protected/random-quote');
    callApi('Secured', 'https://www.yuhongtech.net/mobile/api/v1/lottery/orders');
  }

  function callApi(type, url) {
    $scope.response = null;
    $scope.api = type;
    $http({
      url: url,
      method: 'GET'
    }).then(function(quote) {
      $scope.response = quote.data;
    }, function(error) {
      $scope.response = error.data;
    });
  }

});
