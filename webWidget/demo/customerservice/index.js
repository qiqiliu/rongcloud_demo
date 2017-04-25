var demo = angular.module("demo", ["RongWebIMWidget"]);

demo.controller("main", ["$scope", "$http", "RongCustomerService", function($scope, $http, RongCustomerService) {

    RongCustomerService.init({
        appkey: "p5tvi9dspjzt4",
        // token: "5KeZ5IyRRS0F+ZLZMU2xwjGj7o6kpGcggnrET/ofR/hw4D8syGIZR+cr1m5c+ysWjvtMECXGAbNoEcvNZ+5rHqyKTanDYUaGNU8oByUKkskQgtXjqCdk0w==",
        token: "2l9uV3XbNvlyMBcbSgkt9yaiM+p4JJZDDIwrB3VY2pNWyvLgcCXyX7kR+4RR6g3qillv4mUdt1LSrwE7qxTSEw==",
        customerServiceId: "KEFU149214044796592",
        reminder: "在线咨询",
        position: RongCustomerService.Position.right,
        style: {
            width: 320
        },
        onSuccess: function(e) {
            console.log('连接成功');
        },
        onError: function(e) {
            console.log('连接失败');
        }
    });

    $scope.show = function() {
        RongCustomerService.show();
    };

    $scope.hidden = function() {
        RongCustomerService.hidden();
    };

}]);