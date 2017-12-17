angular.module('monitora').controller('DeviceController', function($scope, $routeParams, resourceDevice, deviceManager){

	$scope.device = {'name':'', 'features':[], 'xml':''};
	$scope.message = {"type":"info", "show": false, "text":""};
	$scope.func = {'name':'', 'status':true};

	if($routeParams.deviceId) {

		resourceDevice.get({deviceId: $routeParams.deviceId}, function(device) {
			$scope.device = device;
		}, function(error) {
			$scope.message = {
				"type" : "warning",
				"show" : true,
				"text" : "Device not found."
			};
			console.log(error);
		});
	};

	$scope.post = function() {
		if($scope.formulario.$invalid) return;

		deviceManager.save($scope.device)
			.then(function(dados){
				$scope.message = {
					"type" : "success",
					"show" : true,
					"text" : dados.mensagem
				};
			})
			.catch(function(dados) {
				$scope.message = {
					"type" : "danger",
					"show" : true,
					"text" : dados.mensagem
				};
			});
	};

	$scope.addFeature = function() {
		if($scope.formulario.$invalid) return;
		$scope.device.features.push(angular.copy($scope.func));		
		$scope.message = {
			"type" : "success",
			"show" : true,
			"text" : "Feature \""+$scope.func.name+"\" added"
		};
		$scope.func.name = '';
	}

	$scope.removeFeature = function (f) {
		let index = $scope.device.features.indexOf(f);
		$scope.device.features.splice(index, 1);
		$scope.message = {
			"type" : "info",
			"show" : true,
			"text" : 'Feature: '+f.name+' removed'
		};
	}

});