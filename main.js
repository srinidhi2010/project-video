objects=[];
video="";
status1="";

function preload(){
    video=createCapture(480, 380);
    video.hide();
}
function setup(){
    canvas=createCanvas(480, 380);
    canvas.center();
}
function draw(){
    image(video,0,0,480,380);
    if(status1 !="")
    {
        objectDetector.detect(video, gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "Status: Object Detected";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : "+objects.length;

            fill("#FF0000");
            percent = floor(objects[i].confidence *100);
            text(objects[i].label + " "+ percent + "%", objects[i].x + 15, objects[i].y +15 );
            noFill();
            stroke("FF0000");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label==object_name){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML =  object_name + " Found";
                speak();
        
            }
            else{
                document.getElementById("status").innerHTML =  object_name + " not found";
            }
        }
        

    }

    
}
function start(){
    objectDetector =ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name=document.getElementById("user").value;
    
}
function modelLoaded(){
    console.log("Model Loaded!");
    status1=true;
    video.loop();
    video.speed(1);
    video.volume(0);
}
function gotResult(error, results){
    if(error){
        console.log(error);
    }
    console.log(results);
    objects=results;
}
function speak(){
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(object_name + "Found");

    synth.speak(utterThis);

  
}