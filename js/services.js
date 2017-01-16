angular.module('app.services', [])

.factory('ProductService',['$http','$q',function($http,$q){
	return{
		name: 'Product Service',
		getProducts:function(callback){
			$http.get('https://bnfserv.000webhostapp.com/client/produk.php').success(function(data) {
				// prepare data here
				callback(data);
			});
		},getProduct:function(id){            
			var deferred = $q.defer();            
            //temp			
			$http.get('https://bnfserv.000webhostapp.com/client/lihat_baju.php?id='+id).success(function(data) {
				var product = data;
				deferred.resolve(product);
			 });
           return deferred.promise;
		}		
	}
}])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);