var mousePressed = false;
var lastX, lastY;
var ctx;

function InitThis() {
    ctx = document.getElementById('myCanvas').getContext("2d");

    ctx.beginPath();
    ctx.rect(0, 0, 200, 200);
    ctx.fillStyle = "white";
    ctx.fill();

    $('#myCanvas').mousedown(function (e) {
        mousePressed = true;
        Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, false);
    });

    $('#myCanvas').mousemove(function (e) {
        if (mousePressed) {
            Draw(e.pageX - $(this).offset().left, e.pageY - $(this).offset().top, true);
        }
    });

    $('#myCanvas').mouseup(function (e) {
        mousePressed = false;
    });

    $('#myCanvas').mouseleave(function (e) {
        mousePressed = false;
    });
}

function Draw(x, y, isDown) {
    if (isDown) {
        ctx.beginPath();
        ctx.strokeStyle = "black";
        ctx.lineWidth = "9";
        ctx.lineJoin = "round";
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.closePath();
        ctx.stroke();
    }
    lastX = x;
    lastY = y;
}

function clearArea() {
    ctx.beginPath();
    ctx.rect(0, 0, 200, 200);
    ctx.fillStyle = "white";
    ctx.fill();
    $("#res").html(" ");
}

function classify(){
    $("#res").html(" ");

    document.getElementById("myCanvas").toBlob(function(blob){
        $("#res").html("Classifying....<br>");
        var fd = new FormData();
        fd.append("images_file",blob,"digit.png");
        var parameters = {"classifier_ids":[ "digits_1152789331" ], "threshold":0.0};
        var parameters_blob = new Blob([JSON.stringify(parameters)],{type: "application/json"});
        fd.append("parameters",parameters_blob,"parameters.json");

        $.ajax({
            url:"https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=6e267eaa6ca854c378ec346dab705b94a8e29ea1&version=2016-05-20",
            type:"POST",
            data:fd,
            processData: false,  // tell jQuery not to process the data
            contentType: false   // tell jQuery not to set contentType
        }).done(function(data) {
            //$("#res").html(JSON.stringify(data));
            var lista = data.images[0].classifiers[0].classes;
            lista.sort(function(a,b){
                return b.score-a.score;
            });
            document.getElementById("res").innerHTML += "You probably drew the number "+lista[0].class+".<br>";
            document.getElementById("res").innerHTML += "Scores:<br>";
            for(i of lista){
                document.getElementById("res").innerHTML += i.class+": "+i.score+"<br/>";
            }
        })
        .fail(function() {
            alert("Ajax failed to fetch data");
            $("#res").html("Error :(");
        });

    },"image/jpeg",0.9);
}

