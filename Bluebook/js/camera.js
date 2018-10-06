var localstream; //...
var cameraImg = ''; //...

// start(): allow user for recording videos, audio, capture images
function start(){

    var video = document.getElementById('hiddenCamera');
    var canvas = document.getElementById('cameraCanvas');
    var windowURL = window.URL || window.webkitURL;

    //allow user for pesmission to use media inputs (opens camera, mic)
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia; 

    
    navigator.getMedia({video:true},function(stream){
        localstream = stream;
        video.src = windowURL.createObjectURL(stream);

    },function(error){
        alert('error');
    });
    
    video.addEventListener('play',function(){
        setInterval(function(){
            canvas.getContext('2d').drawImage(video,0,0,299.5,149.5);
        });
    },false);
}

// play(loading or reloading): sets some designs and start() media inputs
function play(l){
    document.getElementById('camera').style.display = "block";
    document.getElementById('CameraCanvas').innerHTML = '<canvas id="cameraCanvas" class="cameraScreen"><video id="hiddenCamera" style="display: none;"></video></canvas>';
    
    start();
    document.getElementById('hiddenCamera').play();
    document.querySelector('h2').style.display = 'block';
    document.querySelector('h2').innerHTML = l;
    setTimeout(function(){
        document.querySelector('h2').style.display = 'none';
    },1400);
}

//capture(): capture an image and allow some effects 
function capture(request){ //request = true --> gets effects urls from the server

    if(cameraImg == ''){
        var video = document.getElementById('hiddenCamera');
        video.src = "";
        localstream.getTracks()[0].stop(); //when pressing on any part of screen except camera canvas and effects, stop ??
        video.pause();
        cameraImg = document.getElementById('cameraCanvas').toDataURL();
        
        for(var i=1;i<4;i++){
            document.getElementById('e'+i).src = "";
        }
        
        if(request){
            $.ajax({
                type: "Post",
                data: JSON.stringify({imageDataURL:cameraImg}),
                dataType:"json",
                contentType: 'application/json',
                url: 'https://192.168.1.7:3000/camera',
                beforeSend: effectsLoading('run') ,
                success: function(responseURLs){
                    effectsLoading('stop');
                    document.getElementById('e1').src = responseURLs.images.split('-')[0];
                    document.getElementById('e2').src = responseURLs.images.split('-')[1];
                    document.getElementById('e3').src = responseURLs.images.split('-')[2];
                }
            });
        }
        
        $('.cameraIcon').css('background-position','44px');
        $('.cameraScreen').css('border-color',color == 'purple' ? '#7e516f':'#0f6f92');
        $('.cameraCircle').css('background-color',color == 'purple' ? '#7e516f':'#0f6f92');
        $('.cameraCircle').css('border-style','none');
        $('.cameraCircle').css('top','525px');
        $('.cameraCircle').css('left','615px');
        $('.cameraBtn_1').css('display','block');
        $('.cameraBtn_2').css('display','block');
        $('.E_question').css('display','block');
        $('.effects').css('display','block');
    }

}

// startAgain(): re-take a new image
function startAgain(){
    var video = document.getElementById('hiddenCamera');
    document.getElementById('cameraCanvas').getContext('2d').fillStyle = "white";
    document.getElementById('cameraCanvas').getContext('2d').fillRect(0, 0, 300, 200);
    play('Reloading ...');
    
    cameraImg = '';
    $('.cameraIcon').css('background-position','0px');
    $('.cameraScreen').css('border-color','white');
    $('.cameraCircle').css('background-color','white');
    $('.cameraBtn_1').css('display','none');
    $('.cameraBtn_2').css('display','none');
    $('.E_question').css('display','none');
    $('.effects').css('display','none');
    $('.loadingEffects').css('display','none');
    $('#e1').css('border-color','white');
    $('#e2').css('border-color','white');
    $('#e3').css('border-color','white');

}

//stop(): close the camera without saving anything
function stop(){
    capture(false);
    $('.cameraCircle').css('border-style','none');
    $('.cameraCircle').css('top','525px');
    $('.cameraCircle').css('left','615px');
    $('.cameraIcon').css('background-position','0px');
    $('.cameraCircle').css('background-color','white');
    document.getElementById('cameraCanvas').getContext('2d').fillStyle = "white";
    document.getElementById('cameraCanvas').getContext('2d').fillRect(0, 0, 300, 200);
    $('.cameraScreen').css('border-color','white');
    $('.cameraBtn_1').css('display','none');
    $('.cameraBtn_2').css('display','none');
    $('.E_question').css('display','none');
    $('.effects').css('display','none');
    $('#e1').css('border-color','white');
    $('#e2').css('border-color','white');
    $('#e3').css('border-color','white');
    $('.loadingEffects').css('display','none');
    
    
    cameraImg = '';

    document.getElementById('camera').style.display = 'none';
}

//cameraBtn(on or off): changing camera button style when mouseover & mouseout
function cameraBtn(status){

    if(document.querySelector('h2').style.display == 'none'){

        if(status == "on" && cameraImg == ''){
            $('.cameraCircle').css('border-style','solid');
            $('.cameraCircle').css('border-width','5px');
            $('.cameraCircle').css('border-color',(color == 'purple'? '#7e516f':'#0f6f92'));
            $('.cameraCircle').css('top','520px');
            $('.cameraCircle').css('left','610px');
        }
        else if (status == "off"){
            $('.cameraCircle').css('border-style','none');
            $('.cameraCircle').css('top','525px');
            $('.cameraCircle').css('left','615px');
        }
    }
}

//effectsLoading(run or stop): do some changes on effects boxes layout design
var effect_available = false; 
function effectsLoading(status){
    
    if(status == "run"){
        $('.loadingEffects').css('display','block');
        effect_available = false;
    }
    else if(status == "stop") {
        $('.loadingEffects').css('display','none');
        effect_available = true;
    }
    
}

//applyEffect(effect_id): changing the main image url to the effect url
function applyEffect(id){
    if(effect_available){
        var element = document.getElementById(id);

        var need_to_remove = '';

        if(element.style.borderColor == ''){

            element.style.borderColor = "white";
        }


        if(element.style.borderColor == "white"){

            need_to_remove = 'w_135,h_135,c_fill,';

            for (var i=1;i<4;i++){

                var borderColor = "white";

                if(i == parseInt(id.charAt(1))){
                    borderColor = (color == 'blue' ? '#0f6f92':'#7e516f');
                }

                document.getElementById('e'+i).style.borderColor = borderColor;
            }

        }
        else if(element.style.borderColor == "rgb(15, 111, 146)"){

            need_to_remove = (id=='e1'? 'w_135,h_135,c_fill,e_cartoonify':(id=='e2'? 'w_135,h_135,c_fill,e_blackwhite':'w_135,h_135,c_fill,e_oil_paint:0'));

            for (var i=1;i<4;i++){
                document.getElementById('e'+i).style.borderColor = "white";
            }
        }

        var image = new Image(299.5,149.5);
        image.src = element.src.replace(need_to_remove,(!need_to_remove.includes('e_')? "":"q_100"));
        cameraImg = image.src;
        
        image.onload = function(){
            document.getElementById('cameraCanvas').getContext('2d').drawImage(image,0,0);
        };
    }
    
}

function cameraSave(){
    // code for camera Save button
    var cameraImage = cameraImg;
    stop();
    attachmentVisibility(true);
    attachmentAdd('<img src="'+cameraImage+'" width="140" height="140" style="position:absolute; top:0px; left:0px;" />',true);
    
}
