angular.module('deviceDirectives', [])
	.directive('changeStatus', function(){

		var ddo = {};

		ddo.restrict = "E";

		ddo.scope = {
			status : '@',
			action : '&',
			title : '=',
		};

		ddo.templateUrl = "js/directives/templates/change-status.html";

		return ddo;
	})
	.directive("message", function() {

		var ddo = {};

		ddo.restrict = "E";

		ddo.scope = {
			type : '@',
			show : '=',
			message : '@',
		};

		ddo.templateUrl = "js/directives/templates/message.html";

		ddo.controller =  function($scope, $timeout) {
			$scope.close =  function() {
				$scope.show = false;
			}
			$timeout($scope.close, 200);
		};

		return ddo;
	});