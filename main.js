objects = [];
status = "";

function preload(){
    video = createVideo("video.mp4");
}


function setup(){
    canvas = createCanvas(800,600);
    canvas.position(600,260);
    video.hide();
}

function start(){
    objectDetector = ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded(){
    console.log("MODEL LOADED!!");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects = results;
}

function draw(){
    image(video, 0, 0, 800, 600);
    if(status !="")
    {
        objectDetector.detect(video, gotResults);
        for(i = 0; i< objects.length; i++){
            document.getElementById("status").innerHTML = "Status : Objects Detected";
            document.getElementById("detections").innerHTML = "Number of objects detected are : "+ objects.length;
            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}