angular.module("app").controller('PostList', function (postListSelect,$state,$stateParams,getMsg) {
    let vm = this
    //下拉框关联
    vm.categorySelect = postListSelect.category
    vm.category = postListSelect.category[0].id
    vm.subCategorySelect = postListSelect.subCategory
    vm.subCategory = postListSelect.subCategory[0].id
    vm.educationSelect = postListSelect.education
    vm.education = postListSelect.education[0].id
    vm.experienceSelect = postListSelect.experience
    vm.experience = postListSelect.experience[0].id
    vm.compensationSelect = postListSelect.compensation
    vm.compensation = postListSelect.compensation[0].id
    vm.statusSelect = postListSelect.status
    vm.status = postListSelect.status[0].id
    //获取AJAX请求
    let data = {
        companyName: $stateParams.companyName,
        name: $stateParams.name,
        category: $stateParams.category,
        subCategory: $stateParams.subCategory,
        education: $stateParams.education,
        experience: $stateParams.experience,
        compensation: $stateParams.compensation,
        updateAt: $stateParams.updateAt,
        status: $stateParams.status,
        page: $stateParams.page,
        size: $stateParams.size,
    }
    //发起AJAX请求并设置页面各选项的状态
    getMsg.ajax('get',"/carrots-admin-ajax/a/profession/search",data).then(function(res) {
        //渲染列表数据
        vm.postList = res.data.data
        console.log(vm.postList)
        //总行数
        vm.bigTotalItems = res.data.total
        //行数
        vm.size = res.data.size
        vm.goSize = res.data.size
        //页码
        if($stateParams.page != null) {
            vm.goPage= $stateParams.page
            vm.currentPage = $stateParams.page
        } else {
            vm.goPage = 1
            vm.currentPage = 1
        }
        //公司名称
        vm.companyName = $stateParams.companyName
        //职位名称
        vm.name = $stateParams.name
        //发布时间
        
        //设置下拉框选项
        if($stateParams.category != null) {
            vm.category = postListSelect.category[Number($stateParams.category) + 1].id
        }
        if($stateParams.subCategory != null) {
            vm.subCategory = postListSelect.subCategory[Number($stateParams.subCategory) + 1].id
        }
        if($stateParams.education != null) {
            vm.education = postListSelect.education[Number($stateParams.education) + 1].id  
        }
        if($stateParams.experience != null) {
            vm.education = postListSelect.education[Number($stateParams.education) + 1].id  
        }
        if($stateParams.compensation != null) {
            vm.compensation = postListSelect.compensation[Number($stateParams.compensation) + 1].id
        }
        if($stateParams.status != null) {
            vm.status = postListSelect.status[Number($stateParams.status) + 1].id
        }
    })
    //搜索
    vm.search = function () {
        $state.go("backstage.PostList",{
            companyName: vm.companyName,
            name:vm.name,
            category:vm.category,
            education:vm.education,
            experience:vm.experience,
            compensation:vm.compensation,
            status:vm.status,
            page:vm.goPage,
            size:vm.goSize
        },{
            reload: true    
        })
    }
    //清空
    vm.empty = function () {
        $state.go("backstage.PostList",{
            companyName:"",
            name:"",
            category:"",
            education:"",
            experience:"",
            compensation:"",
            status:"",
            page:null,
            size:null
        },{
            reload: true    
        })
    }
    //翻页
    vm.pageChange = function () {
        $state.go("backstage.PostList",{
            page: vm.currentPage
        },{
            reload: true
        });
    } 
    //跳转第几页，张氏多少行
    vm.sizeGo = function () {
        $state.go("backstage.PostList",{
            size: vm.goSize,
            page: vm.goPage
        },{
            reload: true    
        })
    }
    //新增跳转
    vm.postAdd = function () {
        $state.go("backstage.PostDetails",{},{
            reload: true
        });
    }
    //编辑
    vm.postEdit = function(id) {
        $state.go("backstage.PostDetails",{
            PostId: id
        },{
            reload: true    
        })
         console.log(id)
    }
   
})