function copyEmoticon () {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      function copy(text) {
        var input = document.createElement('textarea');
        document.body.appendChild(input);
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
