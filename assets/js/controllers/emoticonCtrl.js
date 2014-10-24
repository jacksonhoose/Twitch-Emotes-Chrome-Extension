function EmoticonCtrl (EmoticonService) {
  var self = this;
    
  EmoticonService.getEmoticons().then(function(data) {
    self.emoticons = data;
  });

}
EmoticonCtrl.$inject = ['EmoticonService'];

