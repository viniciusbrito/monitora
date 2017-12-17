angular.module('services', ['ngResource'])
	.factory('resourceDevice', function($resource) {
		return resourceDevice = $resource('http://localhost:8080/api/v1/devices/:deviceId', null, {
			"update" : {
				method: "PUT"
			},
			"delete" : {
				method: "DELETE",
				headers: {"X-Requested-With" : "XMLHttpRequest"}
			}

		});
	})
	.factory('deviceManager', function(resourceDevice, $q, $rootScope) {

		var service = {};

		service.save = function(device) {

			return $q(function(resolv, reject) {
				resourceDevice.save(device, function() {
					$rootScope.$broadcast('deviceSaved');
					resolv({
						mensagem : 'Device Saved with success',
						inclusao : true
					});						
				}, function(erro){
					console.log(erro);
					reject({
						mensagem : 'Something wrong on create',
					})
				});
			});
		};

		service.delete = function(device) {
			
			return $q(function(resolv, reject) {
				resourceDevice.delete({deviceId: device.id},function() {
					$rootScope.$broadcast('deviceDeleted');
					resolv({
						mensagem : 'Device deleted with success',
					});						
				}, function(erro){
					console.log(erro);
					reject({
						mensagem : 'Something wrong on delete',
					})
				});
			});
		};

		return service;

	});