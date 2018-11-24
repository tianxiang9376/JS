angular.module("app").controller('CompanyDetails', function ($scope, $http, $state, $stateParams, getMsg, compDetailsSelect, Upload, popupBox, areaData) {
    let vm = this
    // 下拉框关联
    vm.industrySelect = compDetailsSelect.industry
    vm.industry = compDetailsSelect.industry[0].id
    vm.financingSelect = compDetailsSelect.financing
    vm.financing = compDetailsSelect.financing[0].id
    vm.approvedStatusSelect = compDetailsSelect.approvedStatus
    vm.approvedStatus = compDetailsSelect.approvedStatus[0].id

    //wangEditor富文本编辑器
    var E = window.wangEditor
    var editor1 = new E('#editor1')
    var editor2 = new E('#editor2')
    //富文本编辑器z-index设置
    editor1.customConfig.zIndex = 0
    editor2.customConfig.zIndex = 0
    // 保存按钮的一个禁用判断
    //公司介绍文本
    editor1.customConfig.onchange = function () {
        $scope.$apply(function () {
            vm.companyText = editor1.txt.text()
        })
    }
    editor1.create()
    editor2.create()

    //设置省份下拉列表
    vm.getProvince = function () {
        vm.provinceSelect = areaData.provinces
        if (vm.pro == null) {
            vm.pro = areaData.provinces[0].ProID
        }
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

        if (vm.city != null && vm.pro != "") {
            vm.citySelect.forEach(function (item, index) {
                if (item.CityID == vm.city) {
                    vm.city = vm.citySelect[index].CityID
                }
            })
        } else {
            vm.city = vm.citySelect[0].CityID
        }

        vm.getCounty(vm.city)


    }
    //获取地区下拉列表
    vm.getCounty = function (cityId) {
        vm.countySelect = []
        vm.countySelect.push({
            "Id": "",
            "countyName": "请选择",
        })
        areaData.districts.forEach(item => {
            if (item.CityID == cityId) {
                vm.countySelect.push(item)
            }

        })

        if (vm.county != null && vm.city != "") {
            vm.countySelect.forEach(function (item, index) {
                if (item.Id == vm.county) {
                    vm.county = vm.countySelect[index].Id
                }
            })
            
            vm.areaCheck()
        } else {
            vm.county = vm.countySelect[0].Id
        }

    }
    //地区数据检查。一个BUG处理
    //公共后台中存在两种地区数据，其中一种不能兼容，需要重新设置下拉框
    vm.areaCheck = function () {
        let numCnt = vm.city.toString().length;
        if (numCnt == 6) {
            //初始化地区数据
            vm.pro = null
            vm.city = null
            vm.county = null
            vm.getProvince()
        }
    }
    //编辑公司获取公司信息
    vm.getCompanyInfo = function () {
        if ($stateParams.CompanyId != null) {
            let data = {}
            // 发起AJAX请求并设置页面各选项的状态
            getMsg.ajax('get', "/carrots-admin-ajax/a/company/" + Number($stateParams.CompanyId), data).then(res => {
                //渲染列表数据
                let companyInfo = res.data.data.company
                let productInfo = res.data.data.productList[0]
                vm.test = res
                //地区数据设置
                vm.pro = areaData.provinces[Number(res.data.data.company.province)].ProID
                vm.city = Number(res.data.data.company.city)
                vm.county = Number(res.data.data.company.county)

                // 公司信息

                vm.companyName = companyInfo.name
                vm.companySlogan = companyInfo.slogan
                vm.companyNum = companyInfo.totalNum
                vm.financing = companyInfo.financing
                vm.approvedStatus = companyInfo.approved
                vm.freezedStatus = companyInfo.freezed
                vm.companyIndustryList = res.data.data.industryList
                vm.companyLogo = companyInfo.logo
                editor1.txt.text(companyInfo.summary);
                //编辑公司时，一个按钮禁用的判断变量，公司介绍被赋值
                vm.companyText = editor1.txt.text()
                vm.companyTagList = res.data.data.tagList
                //公司产品信息
                if (productInfo != null) {
                    vm.productName = productInfo.name
                    vm.productSlogan = productInfo.slogan
                    vm.productLogo = productInfo.logo,
                        editor2.txt.text(productInfo.summary)
                }
                //公司招聘信息
                vm.companyPhone = companyInfo.phone
                vm.companyMail = companyInfo.mail
                vm.companyAddress = companyInfo.address
                vm.companyMap = companyInfo.map
                //编辑公司，在获取到地区数据后重新设置地区下拉框列表
                vm.getProvince()

            })
        }
    }
    vm.Start = function () {
        vm.getCompanyInfo()
        //新增公司，直接执行地区选择下拉框数组获取事件
        if ($stateParams.CompanyId == null) {
            vm.getProvince()
        }


    }
    vm.Start()

    // 保存
    vm.online = function () {
        // 设置请求参数
        let data = {
            company: {
                id: $stateParams.CompanyId,
                approved: Number(vm.approvedStatus),
                freezed: vm.freezedStatus,
                name: vm.companyName,
                slogan: vm.companySlogan,
                totalNum: Number(vm.companyNum),
                financing: Number(vm.financing),
                logo: vm.companyLogo,
                summary: editor1.txt.text(),
                phone: vm.companyPhone,
                mail: vm.companyMail,
                address: vm.companyAddress,
                map: vm.companyMap,
                province: vm.pro,
                city: vm.city,
                county: vm.county
            },
            tagList: vm.companyTagList,
            productList: [{
                name: vm.productName,
                slogan: vm.productSlogan,
                logo: vm.productLogo,
                summary: editor2.txt.text()
            }],
            industryList: vm.companyIndustryList

        }
        //编辑公司
        if ($stateParams.CompanyId != null) {
            let text = "确定要保存该公司信息？"
            callback = function () {
                //直接使用了ajax请求，一个BUG处理
                $http({
                    url: "/carrots-admin-ajax/a/u/company/" + Number($stateParams.CompanyId),
                    method: "put",
                    data: JSON.stringify(data),
                    contentType: 'application/json'
                }).then(res => {
                    goback = function () {
                        $state.go("backstage.CompanyList", {}, {
                            reload: true
                        });
                    }
                    popupBox.alert("操作成功", goback)

                })
            }
            popupBox.confirm(text, callback)
        }
        //新增公司 
        else {
            let text = "确定要保存该公司信息？"
            callback = function () {
                //直接使用了ajax请求，一个BUG处理
                getMsg.ajax('post', "/carrots-admin-ajax/a/u/company", JSON.stringify(data)).then(res => {
                    // console.log(res)
                    goback = function () {
                        $state.go("backstage.CompanyList", {}, {
                            reload: true
                        });
                    }
                    popupBox.alert("操作成功", goback)
                })
            }
            popupBox.confirm(text, callback)

        }


    }
    // 上传LOGO
    vm.imgUpload = function (file, logoStyle) {
        //公司logo
        if (logoStyle == 1) {
            file.upload = Upload.upload({
                url: '/carrots-admin-ajax/a/u/img/3',
                data: {
                    //把选中的图片命名为file上传
                    file: file
                },
            });
            // 请求成功，获取返回的url，展示图片
            file.upload.then(function (rsp) {
                // console.log(rsp);
                //返回的图片url
                vm.companyLogo = rsp.data.data.url

            }, function (rsp) {

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                // console.log("图片上传成功！");
            });
        }
        //产品Logo 
        else if (logoStyle == 2) {
            file.upload = Upload.upload({
                url: '/carrots-admin-ajax/a/u/img/3',
                data: {
                    //把选中的图片命名为file上传
                    file: file
                },
            });
            // 请求成功，获取返回的url，展示图片
            file.upload.then(function (rsp) {
                // console.log(rsp);
                //返回的图片url

                vm.productLogo = rsp.data.data.url


            }, function (rsp) {

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                // console.log("图片上传成功！");
            });
        }
        //公司地图
        else if (logoStyle == 3) {
            file.upload = Upload.upload({
                url: '/carrots-admin-ajax/a/u/img/3',
                data: {
                    //把选中的图片命名为file上传
                    file: file
                },
            });
            // 请求成功，获取返回的url，展示图片
            file.upload.then(function (rsp) {
                // console.log(rsp);
                //返回的图片url

                vm.companyMap = rsp.data.data.url

            }, function (rsp) {

            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
                // console.log("图片上传成功！");
            });
        }

    };
    //删除LOGO
    vm.imgDelete = function (logoStyle) {
        switch (logoStyle) {
            //公司logo
            case 1:
                vm.companyLogo = null
                vm.companyLogoUp = null
                //产品logo
            case 2:
                vm.productLogo = null
                vm.productLogoUp = null
                //公司地图
            case 3:
                vm.companyMap = null
                vm.companyMapUp = null
        }
    }
    //添加行业类型
    vm.addIndustry = function (id) {
        //初始化行业类型的请求参数
        if (vm.companyIndustryList == null) {
            vm.companyIndustryList = []
        }
        //BUG处理
        //如果直接用id != ""进行判断
        //数字0会被判定为"",从而不能添加约定字符0
        var x = String(id)
        if (x != "") {
            //行业类型查重
            let check = vm.companyIndustryList.every(function (value) {
                return value.industry != id
            });
            //添加行业类型
            if (check == true) {
                vm.companyIndustryList.push({
                    industry: id
                })
            }
        }
    }
    //删除行业类型
    vm.delIndustry = function (idx) {
        vm.companyIndustryList.splice(idx, 1);
    }
    //添加公司标签
    vm.addTag = function (tag) {
        //初始化公司标签
        if (vm.companyTagList == null) {
            vm.companyTagList = []
        }
        vm.companyTagList.push({
            tag: tag
        })
        // console.log(vm.companyTagList)
    }
    //删除公司标签
    vm.delTag = function (idx) {
        vm.companyTagList.splice(idx, 1);
    }

})