angular.module('houseList')
.component('houseList', {
	templateUrl: 'view/house-list/house-list.template.html',
	controller:['$http', 'AuthService', function($http, AuthService){

		var url = AuthService.hostName + '/api/houses';
		var list = this;
		list.currentPage = 0;
		list.pageSize = 20;
		
		$http.get(url).then(function success(response){
			list.houses = response.data.houses;
			console.log(list.houses);
			list.numberOfPages = function(){
				return Math.ceil(list.houses.length/list.pageSize); 
			};
			angular.forEach(list.houses, function(val, key){
				val.description = val.description.slice(0, 150) + '....';
			});
		});
		$http.get(AuthService.hostName + '/api/districts').then(function success(response){
			list.districts = response.data.districts;
			console.log(list.districts);
		});
		var url2 = AuthService.hostName + '/api/wards?districts=' + list.districtSelected;
		console.log(url2);
		$http.get(url2).then(function success(response){
			list.wards = response.data.wards;
			console.log(list.wards);
		});
		
	}],
	controllerAs: 'ctrl'
});	