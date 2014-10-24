function EmoticonCtrl (EmoticonService) {
  var self = this;
    
  EmoticonService.getEmoticons().then(function(data) {
    self.emoticons = data;
  });

}
EmoticonCtrl.$inject = ['EmoticonService'];

function StorageService () {
  var service = {};
  
  service.get = function(key) {
    return localStorage.getItem(key);
  };

  service.set = function(key, value) {
    localStorage.setItem(key, value);
  };

  return service;
}


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

function copyEmoticon () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      function copy(text) {
        var header = document.querySelector('form#search');
        var input = document.createElement('textarea');
       
        input.style.height = '0px';
        input.style.width = '0px';

        header.appendChild(input);

        input.value = text;
        input.focus();
        input.select();
       
        document.execCommand('Copy');
       
        input.remove();
      }

      element.on('click', function(e) {
        e.preventDefault();
        if(attrs.copyEmoticon.length) {
          copy(attrs.copyEmoticon);
        }
      });
    }
  };
}

function star (StorageService) {
  return {
    restrict: 'EA',
    template: '<span class="star">&hearts;</span>',
    link: function (scope, element, attrs) {

      function isFavorite (emoticon, favorites) {
        var present = false;
        angular.forEach(favorites, function(favorite) {
          if(favorite === emoticon)
            present = true;
        });
        return present;
      }

      element.on('click', function(e) {
        var favorites = StorageService.get('twitchEmoteFavorites');
        console.log(StorageService.get('twitchEmoteFavorites'));
        if(Array.isArray(favorites) && favorites.length === 0) {
          element.addClass('favorited');
          return StorageService.set('twitchEmoteFavorites', [scope.emoticon]);
        }

        if(!isFavorite(scope.emoticon, favorites)) {
          StorageService.set('twitchEmoteFavorites', [scope.emoticon]);
        }


        console.log(scope);
        console.log(attrs);
      });
    }
  };
}

star.$inject = ['StorageService'];



angular
	.module('TwitchEmotes', [])
  .controller('EmoticonCtrl', EmoticonCtrl)
  .factory('EmoticonService', EmoticonService)
	.factory('StorageService', StorageService)
  .directive('copyEmoticon', copyEmoticon)
  .directive('star', star);