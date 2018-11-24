angular.module("app").controller('CompanyList', function ($http, $state, $stateParams, getMsg, popupBox, compListSelect, AccessBtn, areaData) {
    let vm = this

    // 下拉框选项关联
    vm.setSelect = function () {
        vm.industrySelect = compListSelect.industry
        vm.industry = compListSelect.industry[0].id
        vm.financingSelect = compListSelect.financing
        vm.financing = compListSelect.financing[0].id
        vm.approvedStatusSelect = compListSelect.approvedStatus
        vm.approvedStatus = compListSelect.approvedStatus[0].id
        vm.freezedStatusSelect = compListSelect.freezedStatus
        vm.freezedStatus = compListSelect.freezedStatus[0].id
    }

    //设置省份下拉列表
    vm.getProvince = function () {
        vm.provinceSelect = areaData.provinces
        if ($stateParams.province != null) {
            vm.pro = areaData.provinces[Number($stateParams.province)].ProID
        } else {
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

        if ($stateParams.city != null && vm.pro != "") {
            vm.citySelect.forEach(function (item, index) {
                if (item.CityID == Number($stateParams.city)) {
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

        if ($stateParams.county != null && vm.city != "") {
            vm.countySelect.forEach(function (item, index) {
                if (item.Id == Number($stateParams.county)) {
                    vm.county = vm.countySelect[index].Id
                }
            })
        } else {
            vm.county = vm.countySelect[0].Id
        }
    }

    //发起AJAX请求获取公司列表渲染数据
    vm.getCompanyList = function () {
        //设置AJAX请求参数
        let data = {
            name: $stateParams.name,
            industry: $stateParams.industry,
            province: $stateParams.province,
            city: $stateParams.city,
            county: $stateParams.county,
            financing: $stateParams.financing,
            approved: $stateParams.approvedStatus,
            freezed: $stateParams.freezedStatus,
            size: $stateParams.size,
            page: $stateParams.page,
        }
        // 发起AJAX请求并设置页面各选项的状态
        getMsg.ajax('get', "/carrots-admin-ajax/a/company/search", data).then(res => {
            //渲染列表数据
            vm.companyList = res.data.data
            vm.test = res
            //总行数
            vm.bigTotalItems = res.data.total
            //行数
            vm.size = res.data.size
            vm.goSize = res.data.size
            //页码
            if ($stateParams.page != null) {
                vm.goPage = $stateParams.page
                vm.currentPage = $stateParams.page
            } else {
                vm.goPage = 1
                vm.currentPage = 1
            }
            //公司名称
            vm.name = $stateParams.name
            //设置下拉框选项
            if ($stateParams.industry != null) {
                vm.industry = compListSelect.industry[Number($stateParams.industry) + 1].id
            }
            if ($stateParams.financing != null) {
                vm.financing = compListSelect.financing[Number($stateParams.financing) + 1].id
            }
            if ($stateParams.approvedStatus != null) {
                vm.approvedStatus = compListSelect.approvedStatus[Number($stateParams.approvedStatus) + 1].id
            }
            if ($stateParams.freezedStatus != null) {
                vm.freezedStatus = compListSelect.freezedStatus[Number($stateParams.freezedStatus) + 1].id
            }
            //一个地区数据的显示BUG处理
            //公共后台中的一些地区数据并不兼容当前的地区数据
            //因为地区数据是以常量而非过滤器形式引入
            //在渲染页面的时候，直接对渲染数据进行修改
            vm.companyList.forEach(item1 => {
                //一个异常处理
                let numCnt = item1.city.replace(/\D/g, '').length;
                if (numCnt == 6) {
                    item1.city = "-"
                }
                areaData.cities.forEach(item2 => {
                    if (item1.city == item2.CityID) {
                        item1.city = item2.CityName
                    }
                });
            });

            // console.log(vm.companyList)
        })
    }
    //按钮操作权限判断
    vm.BtnCheck = function () {
        let BtnCheck = AccessBtn.check()
        //新增按钮
        vm.createBtn = BtnCheck.create
        //编辑按钮
        vm.updateBtn = BtnCheck.update
        //删除按钮
        vm.deleteBtn = BtnCheck.delete
    }
    //页面加载执行函数集合
    vm.Start = function () {
        vm.getProvince()
        vm.setSelect()
        vm.getCompanyList()
        vm.BtnCheck()
    }
    //执行页面加载函数
    vm.Start()

    // 搜索
    vm.search = function () {
        $state.go("backstage.CompanyList", {
            name: vm.name,
            industry: vm.industry,
            financing: vm.financing,
            province: vm.pro,
            city: vm.city,
            county: vm.county,
            approvedStatus: vm.approvedStatus,
            freezedStatus: vm.freezedStatus,
            page: vm.goPage,
            size: vm.goSize
        }, {
            reload: true
        })
    }
    //清空
    vm.empty = function () {
        $state.go("backstage.CompanyList", {
            name: "",
            industry: "",
            financing: "",
            province: "",
            city: "",
            county: "",
            approvedStatus: "",
            freezedStatus: "",
            page: null,
            size: null
        }, {
            reload: true
        })
    }
    //翻页
    vm.pageChange = function () {
        $state.go("backstage.CompanyList", {
            page: vm.currentPage
        }, {
            reload: true
        });
    }
    //跳转到第几页,展示多少行
    vm.sizeGo = function () {
        if (vm.goPage == "") {
            vm.goPage = 1
        }
        if (vm.goSize == "") {
            vm.goSize = 10
        }
        $state.go("backstage.CompanyList", {
            size: vm.goSize,
            page: vm.goPage
        }, {
            reload: true
        })
    }

    //新增公司（编辑公司）
    vm.companyEdit = function (id) {
        $state.go("backstage.CompanyDetails", {
            CompanyId: id
        }, {
            reload: true
        })
    }
    //认证按钮文字改变
    vm.approvedBtnStatus = function (approved) {
        if (approved == 0) {
            return "认证"
        } else if (approved == 1) {
            return "解除"
        }
    }
    //冻结按钮文字改变
    vm.freezedBtnStatus = function (freezed) {
        if (freezed == 1) {
            return "解冻"
        } else if (freezed == 0) {
            return "冻结"
        }
    }
    //职位
    vm.companyPosition = function (id) {
        $state.go("backstage.PostList", {
            CompanyId: id
        }, {
            reload: true
        })
    }
    //认证/解除认证
    vm.companyApproved = function (id, approved) {
        let text = ""
        let companyId = id
        if (approved == 1) {
            approved = 0
            text = "是否要解除该公司认证状态？"
        } else if (approved == 0) {
            approved = 1
            text = "是否要认证该公司？"
        }
        //模态框确认后执行函数
        callback = function () {
            let data = {
                id: companyId,
                type: 1,
                status: approved
            }
            getMsg.ajax("put", "/carrots-admin-ajax/a/u/company/status", data).then(function () {
                goback = function () {
                    $state.go($state.current, {}, {
                        reload: true
                    })
                }
                popupBox.alert("操作成功", goback)
            })
        }
        popupBox.confirm(text, callback)
    }
    //冻结/解冻
    vm.companyFreezed = function (id, freezed) {
        let text = ""
        let companyId = id
        if (freezed == 1) {
            freezed = 0
            text = "是否要解冻该公司？"
        } else if (freezed == 0) {
            freezed = 1
            text = "是否要冻结该公司？"
        }
        //模态框确认后执行函数
        callback = function () {
            let data = {
                id: companyId,
                type: 0,
                status: freezed
            }
            getMsg.ajax("put", "/carrots-admin-ajax/a/u/company/status", data).then(function () {
                popupBox.alert("操作成功")
                $state.go($state.current, {}, {
                    reload: true
                })
            })
        }
        popupBox.confirm(text, callback)
    }
    //删除公司
    vm.companyDelete = function (id) {
        let companyId = id
        let text = "确定要删除该公司信息？"
        callback = function () {
            getMsg.ajax('delete', "/carrots-admin-ajax/a/u/company/" + companyId).then(function () {
                goback = function () {
                    $state.go($state.current, {}, {
                        reload: true
                    })
                }
                popupBox.alert("操作成功", goback)

            })
        }
        popupBox.confirm(text, callback)
    }
})