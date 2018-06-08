$(document).ready(function () {

    $.ajax({
                    type: 'POST',
                    url: "/tester/save/",
                    data: {
                        'csrfmiddlewaretoken': $('input[name=\'csrfmiddlewaretoken\']').val()
                    },
                    success: function () {
                        console.log("Saved in db");
                    }
                });
}
