$(function () {
    // events
    $(document).on("click", ".crashLog", showCrashInfo);
    var socket = io();
    toastr.options.closeButton = true;
    toastr.options.timeOut = 30000; // How long the toast will display without user interaction
    toastr.options.extendedTimeOut = 5000; // How long the toast will display after a user hovers over it
    socket.on('new_task', function (date) {
        var taskElement = getMomentText(date);
        $("#platform").text(taskElement);
        setTimeout(function(){
            showCrashInfo();
        },5000);
        
    });
    socket.on('connect', function () {
        console.log("hi!")
    });
    function getMomentText(date) {
        var ss = moment(date, 'YYYY-MM-DD');
        return ss.format('D MMMM YYYY');
    }
    function showCrashInfo() {
        $('#infoModal').modal('show');
    }

});
