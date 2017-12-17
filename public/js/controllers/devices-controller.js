angular.module('monitora').controller('DevicesController', function($scope, resourceDevice, deviceManager){

	$scope.devices = [];
	$scope.filter = '';
	$scope.message = {"type":"info", "show": false, "text":""};

	resourceDevice.query(
		function(data) {
	 		$scope.devices = data;
		},
		function(error) {
	 		console.log("Error "+error);
		});

	$scope.remove = function(device) {
		deviceManager.delete(device)
			.then(dados => {
				let index = $scope.devices.indexOf(device);
				$scope.devices.splice(index, 1);
				$scope.message = {
					"type" : "success",
					"show" : true,
					"text" : dados.mensagem
				};
			})
			.catch(dados => {
				$scope.message = {
					"type" : "danger",
					"show" : true,
					"text" : dados.mensagem
				};
			});
	};

	$scope.turnOn = function(device) {
		changeStatus(device, !device.status);
		let status = device.status? 'Enabled' : 'Disabled';
		$scope.message = {
			"type" : "info",
			"show" : true,
			"text" : "Device: \""+device.name+"\" "+status
		};
	}

	$scope.turnOnAll = function() {
		$scope.devices.forEach(device => changeStatus(device, true));
		$scope.message = {
			"type" : "success",
			"show" : true,
			"text" : "All devices enabled"
		};
	}

	$scope.turnOffAll = function() {
		$scope.devices.forEach(device => changeStatus(device, false));
		$scope.message = {
			"type" : "warning",
			"show" : true,
			"text" : "All devices disabled"
		};
	}

	function changeStatus(device, status) {
		device.status = status;
		deviceManager.save(device)
			.catch(dados => $scope.message = {"type":"success", "show":true, "text":dados.mensagem});
	}
});