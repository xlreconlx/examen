angular.module('Examen', [])
  .controller('ExamenController', function($scope,$http,$window) {
    $scope.url = "http://localhost:8080/Test/service";
    $scope.error = ""; 
    $scope.session = true; 
    $scope.categoriaText = {
     idcategoria:0,
     nombre:""
    };
    $scope.user = {
      email:'',
      password:'',
      id:'',
      idRol:'',
      nombreRol:''
    };
    $scope.newProducto = {};
    $scope.productoSeleccionado = {
    };

if(localStorage.getItem("id")!=="undefined" && localStorage.getItem("id")!==null){
 $scope.session = false; 
 $scope.user.id = localStorage.getItem("id");
 $scope.user.idRol = localStorage.getItem("idRol");
 $scope.user.nombreRol = localStorage.getItem("nombreRol");
 $scope.user.email = localStorage.getItem("email");

 $http.get($scope.url + "/usuarios/todos")
.then(function (response) {$scope.usuarios = response.data;});
 
$http.get($scope.url + "/categoria")
.then(function (response) {$scope.categorias = response.data;});

$http.get($scope.url + "/productos")
.then(function (response) {$scope.productos = response.data;});

 $http.get($scope.url + "/rol")
.then(function (response) {$scope.roles = response.data;});


}else{
  $scope.session = true; 
   $scope.user = {
      email:'',
      password:'',
      id:'',
      idRol:'',
      nombreRol:''
    };
}


$scope.ingresar = function(){
  
 $http.get($scope.url+"/usuarios/"+ $scope.user.email +"," +$scope.user.password)
    .then(function(response) {
      if(response.data.id!==0){
        $scope.user.id = response.data.id;
        $scope.user.idRol = response.data.idRol;
        $scope.user.nombreRol = response.data.nombreRol;
        $scope.user.email = response.data.email;
        $scope.error = "";
        $scope.session = false; 
        localStorage.setItem("id",  $scope.user.id);
        localStorage.setItem("idRol",  $scope.user.idRol);
        localStorage.setItem("nombreRol",  $scope.user.nombreRol);
        localStorage.setItem("email",  $scope.user.email);
         $window.location.reload();
      }else{
       $scope.error = "Error correo o contraseña incorrectos"; 
      }

    });

};


$scope.salir = function(){
localStorage.removeItem("id");
localStorage.removeItem("idRol");
localStorage.removeItem("nombreRol");
localStorage.removeItem("email");
 $scope.user = {
      email:'',
      password:'',
      id:'',
      idRol:'',
      nombreRol:''
    };
     $scope.session = true; 
};

$scope.cargar = function(){

$http.get($scope.url+"/usuarios/todos")
.then(function (response) {$scope.usuarios = response.data;});
};


 $scope.registraCategoria = function(){
     $http.post($scope.url + "/categoria", $scope.categoriaText).
        then(function (data, status, headers, config) { 
          $http.get($scope.url + "/categoria")
             .then(function (response) {$scope.categorias = response.data;});
              $scope.categoriaText.nombre="";
             Materialize.toast('Correcto se ha Registrado', 4000) // 4000 is the duration of the toast
            },
             function (data, status, headers, config) { 
              Materialize.toast('Ocurrio un Error', 4000) // 4000 is the duration of the toast
              });
  };

$scope.registraProducto = function(){
     $http.post($scope.url + "/productos", $scope.newProducto).
        then(function (data, status, headers, config) { 
          $http.get($scope.url + "/productos")
             .then(function (response) {$scope.productos = response.data;});
              $scope.categoriaText.nombre="";
             Materialize.toast('Correcto se ha Registrado', 4000) // 4000 is the duration of the toast
            },
             function (data, status, headers, config) { 
              Materialize.toast('Ocurrio un Error', 4000) // 4000 is the duration of the toast
              });
};

$scope.cargaProducto = function(producto){
$scope.productoSeleccionado = producto;
};

$scope.actualizaProducto = function(){
 $http.put($scope.url + "/productos/"+$scope.productoSeleccionado.idproductos, $scope.productoSeleccionado).
        then(function (data, status, headers, config) { 
          $http.get($scope.url + "/productos")
             .then(function (response) {$scope.productos = response.data;});
              $scope.categoriaText.nombre="";
             Materialize.toast('Correcto se ha Actualizado', 4000) // 4000 is the duration of the toast
            },
             function (data, status, headers, config) { 
              Materialize.toast('Ocurrio un Error', 4000) // 4000 is the duration of the toast
              });
};

$scope.eliminaProducto = function(id){
$http.delete($scope.url + "/productos/"+id).
        then(function (data, status, headers, config) { 
          $http.get($scope.url + "/productos")
             .then(function (response) {$scope.productos = response.data;});
              Materialize.toast('Correcto se ha Eliminado', 4000) // 4000 is the duration of the toast
            },
             function (data, status, headers, config) { 
              Materialize.toast('Ocurrio un Error', 4000) // 4000 is the duration of the toast
              });
};

  });


 