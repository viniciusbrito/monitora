angular.module('monitora').controller('DevicesController', function($scope, resourceDevice, deviceManager){

	$scope.devices = [];
	$scope.filter = '';
	$scope.message = {"type":"info", "show": false, "text":""};

	resourceDevice.query(
		(data) => {
	 		$scope.devices = data;
		},
		(error) => {
	 		console.log("Error "+error);
		});

	$scope.remove = (device) => {
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

	$scope.turnOnAll = () => {
		$scope.devices.forEach(device => changeActiveStatus(device, true));
		$scope.message = {
			"type" : "success",
			"show" : true,
			"text" : "All devices enabled"
		};
	}

	$scope.turnOffAll = () => {
		$scope.devices.forEach(device => changeActiveStatus(device, false));
		$scope.message = {
			"type" : "warning",
			"show" : true,
			"text" : "All devices disabled"
		};
	}	

	function changeActiveStatus(device, status) {
		device.status[0].status = status;
		deviceManager.save(device)
			.catch(dados => $scope.message = {"type":"danger", "show":true, "text":dados.mensagem});
	}

	$scope.turnOnStatus = (device) => {
		deviceManager.save(device)
			.then(dados => $scope.message = { "type": "success", "show": true, "text": dados.mensagem })
			.catch(dados => $scope.message = { "type": "danger", "show": true, "text": dados.mensagem });
			
	}
});