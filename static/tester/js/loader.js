$(document).ready(function ()
{
        var _downloadSpeed = 0;
        var _uploadSpeed =  0;

        var downloadDuration = 0;
        var uploadDuration = 0;

        var counter = 0;
        var file = "";
        var server ="";
        var downloadSize = 0;
        var data = 0;




        function getRandomNum(minimum, maximum) {
            return Math.floor(Math.random() * (maximum - minimum + 1)) + minimum; //generate random id
        }
        function onDownload()
        {
            document.getElementById("event").innerHTML= "Тестування швидкості завантаження. Будь ласка зачекайте..."
        }
        function onUpload() {
            document.getElementById("event").innerHTML= "Тестування швидкості вивантаження. Будь ласка зачекайте..."
        }
        function onEnd(){
            document.getElementById("event").innerHTML= "Тестування завершено"
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
                        document.getElementById("download").innerHTML= "Середня швидкість завантаження:\n"  + speedKbps + " kbs;\n" + speedMbps + " mbs;"
                        onUpload();
                        counter = 0;

                        _downloadSpeed = speedMbps;
                        onUpload();
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
                    url: server+"/latency.txt?nnn="+startTime,
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
                onEnd();
                uploadDuration /= 1000;
                var bitsLoaded = downloadSize * 8*5;
                var speedBps = (bitsLoaded / uploadDuration).toFixed(2);
                var speedKbps = (speedBps / 1024).toFixed(2);
                var speedMbps = (speedKbps / 1024).toFixed(2);
                document.getElementById("upload").innerHTML= "Середня швидкість завантаження:\n" + speedKbps + " kbs;\n" + speedMbps + " mbs;"
                $.ajax({
                    type: 'POST',
                    url: "/tester/save/",
                    data: {
                        upload:speedMbps,
                        download: _downloadSpeed,
                        'csrfmiddlewaretoken': $('input[name=\'csrfmiddlewaretoken\']').val()
                    },
                    success: function () {
                        console.log("Saved in db");
                    }
                });
            }
            function getRandom(min, max)
            {
                return Math.random()*(max - min) + min;
            }
        }


   $('#runTest').click(function (event) {
       event.preventDefault();
         _downloadSpeed = 0;
         _uploadSpeed =  0;

         downloadDuration = 0;
         uploadDuration = 0;

         counter = 0;
        event.preventDefault();
         file = $('#sizeSelector option:selected').attr('id');
         server =$('#serverSelector option:selected').val();
         downloadSize = $('#sizeSelector option:selected').val();
         data = 'a'.repeat(downloadSize/2);

         url =server+"random"+file+".jpg";

        onDownload();
        MeasureDownloadSpeed();



   });
   $('#randomServer').click(function(event)
   {
       event.preventDefault();
         _downloadSpeed = 0;
         _uploadSpeed =  0;

         downloadDuration = 0;
         uploadDuration = 0;
         counter = 0;

         //var minimum = 0;
         //var maximum = 1 ;

         var id = getRandomNum(0,1);

         file = $('#sizeSelector option:selected').attr('id');
         server =$('#'+id).val();
         downloadSize = $('#sizeSelector option:selected').val();
         data = 'a'.repeat(downloadSize/2);

        $('#'+id).attr('selected','selected');
         url =server+"random"+file+".jpg";
         console.log(id+file+server+downloadSize);

         onDownload();
        MeasureDownloadSpeed();

   })
});