$(document).ready(function () {
   $('#runTest').click(function (event) {
        event.preventDefault();


        var duration = 0;
        var counter = 0;
        var file = $('#sizeSelector option:selected').attr('id');
        var server =$('#serverSelector option:selected').val();
        var downloadSize = $('#sizeSelector option:selected').val();

        var url =server+"random"+file+".jpg";
        function onStartMsg()
        {
            document.getElementById("event").innerHTML= "Start testing. Please wait"
        }
        function onEndMsg() {
            document.getElementById("event").innerHTML= "Finished testing"
        }
        function MeasureDownloadSpeed() {
            onStartMsg();
            var startTime, endTime;
            var download = new Image();
            download.onload = function ()
            {
                endTime = (new Date()).getTime();
                check();
            }

            download.onerror = function (err, msg)
            {
                alert("Invalid image, or error downloading");
            }

            startTime = (new Date()).getTime();
            var cacheBuster = "?nnn=" + startTime;
            download.src = url + cacheBuster;

            function check() {
                if(counter < 5)
                {
                    duration += (endTime - startTime);
                    counter++;
                    MeasureDownloadSpeed();
                }
                else
                {
                    duration/=1000;
                    var bitsLoaded = downloadSize * 8 * 5;
                    var speedBps = (bitsLoaded / duration).toFixed(2);
                    var speedKbps = (speedBps / 1024).toFixed(2);
                    var speedMbps = (speedKbps / 1024).toFixed(2);
                    alert("Your avarage connection speed is\n" + speedBps +" bps;\n" + speedKbps+" kbs;\n"+speedMbps+" mbs;" );
                    onEndMsg();
                }

            }
        }

        //MeasureDownloadSpeed();

        function MeasureUploadSpeed()
        {
            var data = 'a'.repeat(downloadSize);

            sessionStorage.setItem("tmpdata", data);

        }
        MeasureUploadSpeed();

   });
});