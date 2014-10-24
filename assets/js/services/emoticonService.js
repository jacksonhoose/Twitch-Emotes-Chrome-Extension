function EmoticonService ($http) {
  var service = {};
  var getEmoticons = function () {
    return $http({
      method: 'GET',
      url: '/emoticons.json',
      cache: true
    });
  };

  service.getFavorites = function () {

  };

  service.getEmoticons = function () {
    return getEmoticons().then(function(data) {
      return data.data;
    });
  };

  return service;
}

EmoticonService.$inject = ['$http', '$q'];

angular
	.module('TwitchEmotes', [])
	.factory('EmoticonService', EmoticonService)

