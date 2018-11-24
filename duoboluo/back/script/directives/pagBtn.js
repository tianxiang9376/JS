app.directive('pagBtn', function () {
    return {
        restrict: 'E',
        template: "<div class='pages'><div><span>每页显示</span><input class='form-control input-sm' ng-model='vm.goSize' type='text' onkeyup='if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}'><span>条</span></div><ul uib-pagination ng-change='vm.pageChange()' total-items='vm.bigTotalItems' ng-model='vm.currentPage'boundary-link-numbers='false' items-per-page='vm.size' first-text='首页' previous-text='《' next-text='》'last-text='末页' max-size='maxSize' class='pagination-sm' boundary-links='true' rotate='false'></ul><div><span>第</span><input class='form-control input-sm' ng-model='vm.goPage' type='text' onkeyup='if(this.value.length==1){this.value=this.value.replace(/[^1-9]/g,'')}else{this.value=this.value.replace(/\D/g,'')}'><span>页</span></div><button type='button' class='btn btn-default' ng-click='vm.sizeGo()'>确认</button></div>",
        replace: true,
     
    };
});