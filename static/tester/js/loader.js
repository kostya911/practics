$(document).ready(function () {
   $('#runTest').click(function (event) {
        event.preventDefault();


        var downloadDuration = 0;
        var uploadDuration = 0;

        var counter = 0;
        var file = $('#sizeSelector option:selected').attr('id');
        var server =$('#serverSelector option:selected').val();
        var downloadSize = $('#sizeSelector option:selected').val();
        var data = 'a'.repeat(downloadSize/2);

        var url =server+"random"+file+".jpg";
        function onStartMsg()
        {
            document.getElementById("event").innerHTML= "Start testing. Please wait"
        }
        function onEndMsg() {
            document.getElementById("event").innerHTML= "Finished testing"
        }

        function MeasureDownloadSpeed() {
            if(counter < 5) {
                var startTime, endTime;
                var download = new Image();

                download.onload = function () {
                    endTime = (new Date()).getTime();
                    downloadDuration += endTime - startTime;
                    counter++;
                    MeasureDownloadSpeed();
                }

                download.onerror = function (err, msg) {
                    alert("Invalid image, or error downloading");
                }

                startTime = (new Date()).getTime();
                var cacheBuster = "?nnn=" + startTime;
                download.src = url + cacheBuster;
            }
            else
            {
                downloadDuration /= 1000;
                        var bitsLoaded = downloadSize * 8 * 5;
                        var speedBps = (bitsLoaded / downloadDuration).toFixed(2);
                        var speedKbps = (speedBps / 1024).toFixed(2);
                        var speedMbps = (speedKbps / 1024).toFixed(2);
                        alert("Your avarage download speed is\n" + speedBps + " bps;\n" + speedKbps + " kbs;\n" + speedMbps + " mbs;");
                        onEndMsg();
                        counter = 0;
                        MeasureUploadSpeed();
            }
        }


        function MeasureUploadSpeed()
        {
            if(counter < 5) {
                //api для cors запросов
                jQuery.ajaxPrefilter(function (options) {
                    if (options.crossDomain && jQuery.support.cors && !(options.url.includes("cors-anywhere"))) {
                        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
                    }
                });

                var startTime = (new Date()).getTime();
                $.ajax({
                    type: 'POST',
                    crossDomain: true,
                    crossOrigin: true,
                    url: url,
                    data: data,
                    success: function () {
                        var endTime = (new Date()).getTime();
                        uploadDuration += endTime - startTime;
                        counter++;
                        MeasureUploadSpeed();
                    }
                });
            }
            else
            {
                uploadDuration /= 1000;
                var bitsLoaded = downloadSize * 8*5;
                var speedBps = (bitsLoaded / uploadDuration).toFixed(2);
                var speedKbps = (speedBps / 1024).toFixed(2);
                var speedMbps = (speedKbps / 1024).toFixed(2);
                alert("Your avarage upload speed is\n" + speedBps + " bps;\n" + speedKbps + " kbs;\n" + speedMbps + " mbs;");
            }
        }

        onStartMsg();
        MeasureDownloadSpeed();

   });
});