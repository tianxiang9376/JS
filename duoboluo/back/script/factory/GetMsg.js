app.factory("getMsg", function ($http, $q) { //注入http服务，$q 的promise；

  var obj = {};

  obj.ajax = function (method, url, data) {
    if (method == "post") {
      var promise = $q.defer(); //取到promise，promise是个比较高级的api，jQuery和各大框架都有，ES5没有这个概念，在ES6当中已经存在了
      $http({

          method: method,

          url: url,

          data: data,

          contentType:'application/json'

        }).then(function (data) {

          promise.resolve(data)

        }),
        function (err) {

          promise.reject(err)

        }

      return promise.promise;

    } else {
      var promise = $q.defer(); //取到promise，promise是个比较高级的api，jQuery和各大框架都有，ES5没有这个概念，在ES6当中已经存在了
      $http({

          method: method,

          url: url,

          params: data,

          contentType:'application/json'

        }).then(function (data) {

          promise.resolve(data)

        }),
        function (err) {

          promise.reject(err)

        }

      return promise.promise;
    }
  }
  return obj;
})