angular.module("app").controller('PostDetails', function (postListSelect,$http,$state,$stateParams,getMsg) {
    let vm = this
    //下拉框关联
    vm.recommendSelect = postListSelect.recommend
    vm.recommend = postListSelect.recommend[0].id
    vm.experienceSelect = postListSelect.experience
    vm.experience = postListSelect.experience[0].id
    vm.educationSelect = postListSelect.education
    vm.education = postListSelect.education[0].id
    vm.compensationSelect = postListSelect.compensation
    vm.compensation = postListSelect.compensation[0].id
    vm.categorySelect = postListSelect.category
    vm.category = postListSelect.category[0].id
    vm.subCategorySelect = postListSelect.subCategory
    vm.subCategory = postListSelect.subCategory[0].id
    //编辑职位获取职位信息
    if($stateParams.PostId != null) {
        let data = {}
        // 发起AJAX请求并设置页面各选项的状态
        getMsg.ajax('get',"/carrots-admin-ajax/a/profession/" + Number($stateParams.PostId),data).then(res => {
            //渲染列表数据
             let postInfo = res.data.data
             console.log(postInfo)
             //职位信息
             vm.name = postInfo.name
             vm.companyName = postInfo.companyName
             vm.experience = postListSelect.experience[Number(postInfo.experience) + 1].id
             vm.compensation = postListSelect.compensation[Number(postInfo.compensation) + 1].id
             vm.education = postListSelect.education[Number(postInfo.education) + 1].id
            //  vm.category = postListSelect.category[Number(postInfo.category) + 1].id
            //  vm.subCategory = postListSelect.subCategory[Number(postInfo.subCategory) + 1].id
             vm.recommend = postListSelect.recommend[Number(postInfo.recommend) + 1].id
             vm.responsibility = postInfo.responsibility
             vm.requisite = postInfo.requisite
             vm.boon = postInfo.boon

        })
    }
    //保存
    vm.save = function() {
        //设置请求参数数据
        let data = {
            profession: {
                id: $stateParams.PostId,
                name: vm.name,
                companyName: vm.companyName,
                experience: vm.experience,
                education:Number(vm.education),
                compensation: vm.compensation,
                // category: vm.category,
                // subCategory: vm.subCategory,
                recommend: vm.recommend,
                responsibility: vm.responsibility,
                requisite: vm.requisite,
                boon: vm.boon
            }
        }
        console.log(data);
        
        //编辑职位
        if($stateParams.PostId != null) {
            //直接使用了ajax请求，一个BUG处理
            $http({
                url: "/carrots-admin-ajax/a/u/profession/" + Number($stateParams.PostId),
                method: "put",
                data: JSON.stringify(data),
                contentType: 'application/json',
            }).then(res => {
                console.log(res)
                $state.go("backstage.PostList",{},{
                    reload: true
                });  
            })
        }
        //新增职位
        else {
            getMsg.ajax('post',"/carrots-admin-ajax/a/u/profession/",JSON.stringify(data)).then(res => {
                console.log(res);
                $state.go("backstage.PostList",{},{
                    reload: true
                });  
            })
        }
    }
})