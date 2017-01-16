angular.module('app.controllers', [])

  
.controller('bNFShopCtrl', function ($scope,$http,ProductService) {
	$scope.products = [];
	$scope.FS = {};
	ProductService.getProducts(function(res){
		$scope.products = res;
	});
	
	$scope.Bsearch = function(){
		$http.get('http://localhost/dnf_shop/client/SProduk.php?gender='+$scope.FS.Gender+'&model='+$scope.FS.model+'&ukuran='+$scope.FS.ukuran+'&max='+$scope.FS.Max+'&min=$'+$scope.FS.min).success(function(data) {	
			$scope.products = data;
		});
	};
	
})
  
.controller('signupCtrl',function ($scope,$http,$state, $stateParams) {
	$scope.FormSingUp = {};
	$scope.SingUp = function(){		
		$http.get('http://localhost/dnf_shop/client/signup.php?nama='+$scope.FormSingUp.user+'&alamat='+$scope.FormSingUp.alamat+'&tlfn='+$scope.FormSingUp.tlfn+'&email='+$scope.FormSingUp.email+'&pss='+$scope.FormSingUp.pss).success(function(data) {	
			if(data == true){
				$state.go('login');
			}		
		});
	};    


})
   
.controller('loginCtrl', function ($rootScope,$scope,$state,$http) {	
	$rootScope.user = {};
	$scope.Formlogin = {};
	$scope.login = function(){		
		$http.get('http://localhost/dnf_shop/client/login.php?email='+$scope.Formlogin.user+'&pss='+$scope.Formlogin.pass).success(function(data) {	
			if(data == false){
				$scope.resultLogin = "Email dan Password tidak jodoh";
			}else{
				$rootScope.user = data; 
				$state.go('bNFShop');
			}
		});
	};    
})
   
.controller('addToCartCtrl',function ($rootScope,$scope, $state, ProductService, $stateParams,$http) {    
    $scope.product = {};
	$scope.total = 0;
	$scope.addCart = {};
	
	ProductService.getProduct($stateParams.id).then(function(res) {
        $scope.product = res;
    });
	
	$scope.myFunc = function(){
		$scope.total = $scope.product.harga * $scope.addCart.jml;
	};	
	$scope.addCartShop = function(){		
		$http.get('http://localhost/dnf_shop/client/insert_pesan.php?custid='+$rootScope.user.id+'&idbrg='+$scope.product.id+'&uk='+$scope.addCart.Ukuran+'&jumlah='+$scope.addCart.jml+'&total='+$scope.addCart.Total+'&pengiriman='+$scope.addCart.Pengiriman+'&tglpesan='+$scope.addCart.Tangal).success(function(data) {	
			if(data != false){
				$state.go('bNFShop');
			}
		})
	};
})

/*.controller('addToCartCtrl',['$scope','$stateParams','$http',function ($scope, $stateParams,$http) {
		$http.get('http://localhost/dnf_shop/client/lihat_baju.php?id='+$stateParams.id).success(function(data) {	
			$scope.product = data;
			//$scope.product = {"id":"1"};
		});
		
}])*/