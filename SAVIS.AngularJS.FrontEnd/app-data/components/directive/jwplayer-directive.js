'use strict';
define(['app', 'jwplayer'], function(app) {
    app.directive('jwplayerDirective', [function() {
        return function(scope, elm, attrs) {

        	jwplayer(attrs.id).setup({
		        file: attrs.video,
		        width: attrs.width,
		        height: attrs.height,
		        //autostart: true
        	});        	

		    // scope.$watch(attrs.video,function(newValue, oldValue) {
		    //     jwplayer(attrs.id).setup({
			   //      file: attrs.video,
			   //      width: attrs.width,
			   //      height: attrs.height
			   //  });
		    // });
		    
        };
    }]);
})
