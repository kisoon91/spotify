var dataAlbum;
var dataTrack;
var baseUrl = 'https://api.spotify.com/v1/search?type=album&query='
var myApp = angular.module('myApp', [])

var myCtrl = myApp.controller('myCtrl', function($scope, $http) {
  $scope.audioObject = {}
  $scope.getSongs = function() {
    $http.get(baseUrl + $scope.album).success(function(response){
      dataAlbum = $scope.albums = response.albums.items;
    });
  };

  $scope.getTracks = function(list){
    $scope.selectedAlbum = list;
      $http.get('https://api.spotify.com/v1/albums/' + list.id + '/tracks').success(function(nextResponse){
        dataTrack = $scope.tracks = nextResponse.items;
        $scope.tracking = nextResponse
      });
  };

  $scope.result = function(){
    $scope.select = true;
  }

  $scope.play = function(song) {
    if($scope.currentSong == song) {
      $scope.audioObject.pause()
      $scope.currentSong = false
      return
    }
    else {
      if($scope.audioObject.pause != undefined) $scope.audioObject.pause()
      $scope.audioObject = new Audio(song);
      $scope.audioObject.play()  
      $scope.currentSong = song
    }
  }
})

$('body').tooltip({
  selector: '[title]'
});







// Add tool tips to anything with a title property