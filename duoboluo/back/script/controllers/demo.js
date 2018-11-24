angular.module("app").controller('demo', function ($scope, getMsg, $stateParams, $state, $location, areaData) {

    let vm = this
    //设置省份下拉列表
    vm.getProvince = function(){
        vm.provinceSelect = areaData.provinces
        vm.pro = areaData.provinces[0].ProID
        vm.getCity(vm.pro)
    }
    //获取城市下拉列表
    vm.getCity = function (proId) {
        vm.citySelect = []
        vm.citySelect.push({
            "CityID": '',
            "CityName": "请选择"
        })
        areaData.cities.forEach(item => {
            if (item.ProID == proId) {
                vm.citySelect.push(item)
            }
        });
        vm.city = vm.citySelect[0].CityID
        vm.getCounty(vm.city)
    }
    //获取地区下拉列表
    vm.getCounty = function (cityId) {
        vm.countySelect = []
        vm.countySelect.push({
            "Id": "",
            "countyName": "请选择",
        })
        areaData.districts.forEach(item =>{
            if(item.CityID == cityId){
                vm.countySelect.push(item)
            }
        })
        vm.county = vm.countySelect[0].Id
    }

    vm.getProvince()


})