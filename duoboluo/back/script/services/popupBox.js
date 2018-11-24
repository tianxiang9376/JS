    app.factory('popupBox', function () {
        return {
            alert: function (message,callback) {
                bootbox.alert({
                    title:'提示',
                    message:"<div style='text-align:center;font-size:0.3rem;font-weight: bold;'>" + message + "</div>",
                    buttons:{
                        ok:{
                            label:'确定',
                            className:'btn-success'
                        }
                    },
                    callback: function () {
                        if(callback){
                            callback();
                        }
                    }
                })
            },
            confirm: function (message,callback,cancle) {
                bootbox.confirm({
                    title:'提示',
                    message: "<div style='text-align:center;font-size:0.3rem;font-weight: bold;'>" + message + "</div>",
                    buttons: {
                        confirm: {
                            label: '确定',
                            className: 'btn-success'
                        },
                        cancel: {
                            label: '取消',
                            className: 'btn-danger'
                        }
                    },
                    callback: function (result) {
                        if(result){
                            callback()   //callback 为传入的回调函数
                        }else if(!result && cancle){
                            cancle()
                        }
                        
                    }
                })
            }
        }
    })