var requestType = 'main';
var cur_side = ['HOME','Box_1'];
var requesting = false;

function sideBox(id,box){

    var last = document.getElementById(cur_side[0]);
    var cur = document.getElementById(id);
    var container = document.getElementById('side_box');

    if(id != cur_side){

        last.innerHTML = '<p class="unboxTxt" style="margin: 0px; padding: 0px; margin-top: 9px; margin-left: '+(cur_side[0]=="HOME"? 29:23)+'px;">'+ cur_side[0]+'</p>';
        $('.'+cur_side[1]).css('background-color',(color=='blue'? '#5c95aa':'#9f6e8f'));

        cur.innerHTML = '<p class="boxTxt" style="margin: 0px; padding: 0px; margin-top: 9px; margin-left: '+(id == "HOME"? 27:19)+'px;">'+ id +'</p>';
        
        $('.'+box).css('background-color',(color=='blue'? '#0f6f92':'#7e516f'));

        cur_side[0] = id;
        cur_side[1] = box;

        if(id == "HOME"){
            container.innerHTML = '<div class="friends_box"></div><div class="friends_ico" onmouseover="boxes_actions(\'friends\',\'in\',\'42px\');" onclick="boxes_actions(\'friends\',\'click\');" onmouseout="boxes_actions(\'friends\',\'out\');"></div><div class="posts_box"></div><div class="posts_ico" onmouseover="boxes_actions(\'posts\',\'in\',\'29px\');" onmouseout="boxes_actions(\'posts\',\'out\');" onclick="boxes_actions(\'posts\',\'click\');"></div><div class="events_box"></div><div class="events_ico" onclick="boxes_actions(\'events\',\'click\');" onmouseover="boxes_actions(\'events\',\'in\',\'33px\');" onmouseout="boxes_actions(\'events\',\'out\');"></div><div class="games_box"></div><div class="games_ico" onmouseover="boxes_actions(\'games\',\'in\',\'39px\');" onmouseout="boxes_actions(\'games\',\'out\');" onclick="boxes_actions(\'games\',\'click\');"></div>';
        }
        else if (id == "SETTINGS"){
            // request user selected settings
            
            container.innerHTML = '<div id="generalS" style="left: 24px;top: 30px;" onclick="switchSettings(\'generalS\');" class="selectSettingsBox"><label class="selectSettingsTxt">General</label></div><div id="privacyS" onclick="switchSettings(\'privacyS\');" style="left: 99px;top: 30px;" class="noneSettingsBox"><label class="noneSettingsTxt">Privacy</label></div><div id="generalSettings" class="sContainer"><br/><p style="margin-left: 3px;margin-top: 30px;font-family: arialbold;cursor:default;color:white;">Default page : &nbsp;<select onchange="changeDefaultPage();" id="defaultPage" style="width:80px;color:#404040;"><option id="currentOption" >Posts</option><option id="op1">Events</option><option id="op2">Games</option><option id="op3">Friends</option></select></p><p style="margin-left: 3px;margin-top: 40px;font-family: arialbold;cursor:default;color:white;">Background Image : </p> <div style="width:186px;overflow:hidden;margin-left:3px;"><input style="color:white;" onchange="changeBackgroundImg(event);" style="margin-left:10px;" id="backgroundImage" type="file" accept="image/*"><label class="removePro" style="color:white;top:180px;left:19px;" onclick="removeBackgroundImg();">Remove background image</label></div> </div><div id="privacySettings" class="sContainer" style="display:none;"> <br/><p style="margin-left: 3px;margin-top: 30px;font-family: arialbold;cursor:default;color:white;">Who can see my posts ?</p><p><select onchange="changeWhoCanSee();" id="whoCanSee" style="width:90px;color:#404040;"><option id="currentOption2" >Everybody</option><option id="op2.1">Friends</option><option id="op2.2">Me</option></select></p> <div onclick="removeMyAccount();" class="deActBtn"> <label style="color:white;position:absolute;left:23px;top:2px;font-family:arialNarrow;font-size:16px;">De-Activate My Account</label> </div> </div><div id="settingsLoading" style="display:none;width:205px;height:358px;top:0px;left:0px;position:absolute;background:#404040;color:white;"><label style="font-family:arialBold; font-size:18px; top:100px;left:60px;position:absolute;">Loading ...</label><label style="font-family:arialNarrow; font-size:16px; top:120px;left:60px;position:absolute;">Please wait</label></div>'; // html for Settings
            
            
            $.ajax({
                    type: "Get",
                    contentType: 'application/json',
                    url: 'https://192.168.1.7:3000/userSettings',
                    beforeSend: function(){
                        document.getElementById('settingsLoading').style.display = 'block';
                    },
                    success: function(response){
                        
                        response = JSON.parse(response);
                        var currentID = document.getElementById('currentOption');
                        var current2ID = document.getElementById('currentOption2');
                        var all = ['Posts','Events','Games','Friends'];
                        var all2 = ['Everybody','Friends','Me'];
                        
                        currentID.innerHTML = response[0].default_page.toString().toUpperCase().charAt(0) + response[0].default_page.toString().substring(1,response[0].default_page.toString().length);
                        current2ID.innerHTML = response[1].who_see_posts.who;
                        
                        var count = 1,count2 = 1;
                        for(var i=0;i<all.length;i++){
                            if(response[0].default_page.toString() != all[i].toLowerCase()){
                                document.getElementById('op'+count).innerHTML = all[i];
                                count++;
                            }
                            if(i<3){
                                if(response[1].who_see_posts.who != all2[i]){
                                    document.getElementById('op2.'+count2).innerHTML = all2[i];
                                    count2++;
                                }
                            }
                            
                        }
                        
                        document.getElementById('settingsLoading').style.display = 'none';
                    }
            });
            
        }

    }

}

function switchSettings(to){
    
    var box = document.getElementById(to);
    var containerShow = document.getElementById(to+'ettings');
    
    box.className = 'selectSettingsBox';
    containerShow.style.display = 'block';
    
    if(to == 'generalS'){
        box.innerHTML = '<label class="selectSettingsTxt">General</label>';
        document.getElementById('privacyS').className = 'noneSettingsBox';
        document.getElementById('privacyS').innerHTML = '<label class="noneSettingsTxt">Privacy</label>';
        document.getElementById('privacySettings').style.display = 'none';
    }
    else{
        box.innerHTML = '<label class="selectSettingsTxt">Privacy</label>';
        document.getElementById('generalS').className = 'noneSettingsBox';
        document.getElementById('generalS').innerHTML = '<label class="noneSettingsTxt">General</label>';
        document.getElementById('generalSettings').style.display = 'none';
    }
    
    
}

function changeDefaultPage(){
    
    var newPage = document.getElementById('defaultPage').value;
    
    $.ajax({
        type: "Get",
        url: 'https://192.168.1.7:3000/change_settings/defaultPage/'+newPage,
        beforeSend: function(){ document.getElementById('settingsLoading').style.display = 'block'; },
        success: function(){
            document.getElementById('settingsLoading').style.display = 'none';
        }
    });
    
}

function changeWhoCanSee(){
    
    var newSee = document.getElementById('whoCanSee').value;
    
    var friends ;
    
    if(newSee == 'Friends'){
        friends = prompt('Enter Friends Email (use comma to add more than one)');
    }
    
    $.ajax({
        type: "Get",
        data: {friends:(friends? friends.split(','):null)},
        dataType:"json",
        contentType: 'application/json',
        url: 'https://192.168.1.7:3000/change_settings/whoCanSee/'+newSee,
        beforeSend: function(){ document.getElementById('settingsLoading').style.display = 'block'; },
        success: function(response){
            document.getElementById('settingsLoading').style.display = 'none';
            if(response.error){
                alert(response.error);
            }
            else{
                document.getElementById('who').innerHTML = newSee;
                var note1 = document.getElementById('note1');
                if(newSee == 'Friends'){
                    note1.innerHTML = 'Choosen friends in privacy settings';
                }
                else if(newSee == 'Everybody'){
                    note1.innerHTML = "This post is set to public";
                }
                else if (newSee == 'Me'){
                    note1.innerHTML = 'Only you can see this post';
                }
            }
            
        }
    });
    
}

function headerAction(id,action){

    if(action == "click"){
        // header buttons action on click
    }
    else if (action == "over"){
        if(id == "logout"){
            $('.logout_box').css('display','block');
        }
    }
    else if (action == "out"){
        if(id == "logout"){
            $('.logout_box').css('display','none');
        }
    }

}

function screenBtn(action){
    var btn = document.getElementById('screenBtn');

    if(!btn.style.backgroundPosition){
        btn.style.backgroundPosition ="0px";
        btn.style.width = "25px";
    }

    if(action == "over"){

        if(btn.style.width == "25px"){
            btn.style.backgroundPosition = "54px";
        }
        else {
            btn.style.backgroundPosition = "-79px";
        }

    }
    else if (action == "out"){

        if(btn.style.width == "25px"){
            btn.style.backgroundPosition = "0px";
        }
        else {
            btn.style.backgroundPosition = "-25px";
        }
    }
    else if(action == "click"){

        if(btn.style.width == "25px"){
            btn.style.width = "29px";
            btn.style.backgroundPosition = "-79px";
            requestType = 'side';
        }
        else {
            btn.style.width = "25px";
            btn.style.backgroundPosition = "54px";
            requestType = 'main';
        }

    }

}

function boxes_actions(id,action,value){ 
    if(action == "in"){
        $('.'+id+'_box').css('opacity','1');$('.'+id+'_ico').css('background-position',value);
    }
    else if (action == "out")
    { 
        $('.'+id+'_box').css('opacity','0');$('.'+id+'_ico').css('background-position','0px');
    }
    else if(action == "click"){
        if(requesting){
            return '';
        }
        
        if(requestType == 'main'){
            requesting = true;
            $.ajax({
                type: "Get",
                contentType: 'text/plain',
                url: 'https://192.168.1.7:3000/myaccount?basic&content='+id,
                success: function(response){
                    document.getElementById('main').innerHTML = response;
                    requesting = false;
                    
                    if(id == 'events'){
                        eventcount = 0;   // change idea to range of events to load 
                        upevent_request(true); // change this to upcoming request
                    }
                    else if (id =='friends'){
                        friends_request();
                    }
                    
                }
            });
        }
        else {
            // the side request here
        }
    }
}

var lastRequest = {search:null,req:null};

function friends_request(){
    
    
    if(document.getElementById('friendSearch').value != lastRequest.search){
        var container = document.getElementById('friendList');
        container.innerHTML = '<p style="position:absolute; top:105px; left:288px; color:rgb(154, 172, 179); font-size: 18px; font-family: arial; font-weight: bold;cursor: default;">Loading ...</p>';

        var Data = {};
        Data.name = document.getElementById('friendSearch').value;

        if(!Data.name.trim().length){
            Data.all = 'all';
        }

        
        if(lastRequest.req){
            lastRequest.req.abort();
        }
        
        lastRequest.req = $.ajax({
            type: "Get",
            data: Data,
            dataType:"text",
            contentType: 'text/plain',
            url: 'https://192.168.1.7:3000/tag/friend',
            success: function(response){
                var res = JSON.parse(response);
                friendsView(res);
                lastRequest = {search:null,req:null};
            }
        });
    }
    
}

function changeWhoSee(){
    var who = document.getElementById('who');
    var list = ["Me","Tagged Friends","Everybody"];
    var notes = ["Only you can see this post","Only tagged friends can see this post","This post is set to public"];
    
    var count = list.indexOf(who.innerHTML) +1;
    
    if(count == 3){
        count = 0;
    }
    
    who.innerHTML = list[count];
    
    document.getElementById('note1').innerHTML = notes[count];
    
}

var attachmentsLength = 0;
var post_boxAnimation;

// show or hide Attachments Box 
function attachmentVisibility(visible){
    
    if(!post_boxAnimation){
        if(visible && attachmentsLength == 0){
            
            document.getElementById("attachments_box").innerHTML = '';
            
            var divs_margin=10; 
            for(var i=0;i<10;i++){
                document.getElementById("attachments_box").innerHTML += '<div id="a'+i+'" class="attach" style="margin-left:'+divs_margin+'px;"></div>';
                
                if(i==9){
                    document.getElementById("attachments_box").innerHTML += '<div id="ender" style="margin-left:'+(divs_margin+140)+'px;width:10px; height:140px; position:absolute; top:10px; background-color:white;"></div>';
                } 
                
                divs_margin += 160;
            }
            
            var move = 0;
            var opacity = 0;
            
                post_boxAnimation = setInterval(function(){
                if(move != 83){

                    opacity = opacity + 0.015;
                    $('.post_boxContainer').css('left',(++move)+"px");
                    $('.attachments_box').css('opacity',(opacity));
                    
                    if(opacity >= 1){
                        $('.attachments_box').css('display','block');
                    }
                    
                }
                else{
                    clearInterval(post_boxAnimation);
                    post_boxAnimation = null;
                }
            },6);
            
        }
        else if(visible == false ){
            var move = 83;
            var opacity = 0;
            post_boxAnimation = setInterval(function(){
                if(move != 0){

                    opacity = opacity - 0.015;
                    $('.post_boxContainer').css('left',(--move)+"px");
                    $('.attachments_box').css('opacity',(opacity));
                    
                    if(opacity <= 0){
                        $('.attachments_box').css('display','none');
                    }
                }
                else{
                    clearInterval(post_boxAnimation);
                    post_boxAnimation = null;
                }
            },6);
            
        }
    }
    
}

// add an attachment in the attachments box  : maximum length of attachments is 10
function attachmentAdd(html,close){
    var attachments = document.getElementById('attachments_box');
    
    if(attachmentsLength == 10){
        return false ;
    }
    else {
        
        var attach_select = document.getElementById('a'+attachmentsLength);
        
        
        if(close){
            html += '<div style="background-color:white; width:20px; height:20px; position:absolute; right:0px; top:0px;"><p class="attachment_close" onclick="attachmentRemove(\''+('a'+attachmentsLength)+'\');">X</p></div>';
        }
        
        attach_select.innerHTML = html;
        attach_select.style.display = "block";
        
        document.getElementById('ender').style.marginLeft = ((attachmentsLength*160)+10+140)+"px";
        document.getElementById('ender').scrollIntoView(document.getElementById('ender'));
        
        attachmentsLength++;
        
        return true;
    }
    
}

function attachmentRemove(id){
    
    document.getElementById(id).innerHTML = '';
    
    if(parseInt(id.toString().charAt(1)) == attachmentsLength - 1){
        
        attachmentsLength--;
        document.getElementById('ender').style.marginLeft = (((attachmentsLength-1)*160)+10+140)+"px";
        document.getElementById(id).style.display = 'none';
        
        if(attachmentsLength == 0){
            attachmentVisibility(false);
        }
        return '';
    }
    
    for(var i=parseInt(id.toString().charAt(1));i<attachmentsLength;i++){
        document.getElementById('a'+i).innerHTML = document.getElementById('a'+(i+1)).innerHTML.replace("attachmentRemove('a"+(i+1),"attachmentRemove('a"+i);
    }
    
    attachmentsLength--;
    document.getElementById('ender').style.marginLeft = (((attachmentsLength-1)*160)+10+140)+"px";
    
    document.getElementById('a'+(attachmentsLength)).style.display = 'none';
    
}

function addImage(file) {
    if(attachmentsLength < 10){
        var input = file.target;

        var reader = new FileReader();
        reader.onload = function(){

            //reader.result;
            var image = reader.result.replace(/^data:image\/jpeg;base64,/, "");
            image = image.replace(/^data:image\/jpg;base64,/, "");
            image = image.replace(/^data:image\/png;base64,/, "");
            var counter = 0;
            
            $.ajax({
                    type: "Post",
                    data: JSON.stringify({imageDataURL:image}),
                    dataType:"json",
                    contentType: 'application/json',
                    url: 'https://192.168.1.7:3000/upload/image',
                    beforeSend: function(){
                        attachmentVisibility(true);
                        attachmentAdd('<p id="'+image.slice(30,50)+'" style="position:absolute; left:20px;color:white">Loading</p>',false);
                        setInterval(function(){
                            var text = 'Loading ';
                            for (var i=0;i<counter;i++){
                                text += '.';  // 
                            }
                            if(++counter > 3){
                                counter = 0;
                            }
                            if(document.getElementById(image))
                                document.getElementById(image).innerHTML = text;
                            else
                                clearInterval(this);
                        },500);

                    },
                    success: function(responseURL){
                        
                            for(var i=0;i<10;i++){
                                var attach = document.getElementById('a'+i);

                                if(attach.innerHTML.indexOf('<p id="'+image.slice(30,50)+'" style="position:absolute; left:20px;color:white">') == 0){
                                    attach.innerHTML = '<img src="'+responseURL.image+'" />' + '<div style="background-color:white; width:20px; height:20px; position:absolute; right:0px; top:0px;"><p class="attachment_close" onclick="attachmentRemove(\''+('a'+i)+'\');">X</p></div>';
                                    
                                    document.getElementById('photoUploader').innerHTML = '<input style="opacity:0;position:absolute; top:-1px;" title="Photo" type="file" onchange="addImage(event);" accept="image/*"/><input style="opacity:0;position:absolute; bottom:0px;" title="Photo" type="file" onchange="addImage(event);" accept="image/*"/>';
                                    break;
                                }
                            }
                        
                    }
            });


        };

          for(var i=0;i<input.files.length;i++){
              if(input.files[i].type.includes('image/jpg') || input.files[i].type.includes('image/jpeg') || input.files[i].type.includes('image/png')){

                  if((parseInt(input.files[i].size)/1024/1024) <= 15)
                        reader.readAsDataURL(input.files[i]);   
              }  
          }

    }
}

function addVideo(file) {
    if(attachmentsLength < 10){
        var input = file.target;
        var reader = new FileReader();
        reader.onload = function(){

            var video = reader.result.replace(/^data:video\/mp4;base64,/, "");
            var videoID = video.slice(60,70);
            var counter =0;
            
            $.ajax({
                    type: "Post",
                    data: JSON.stringify({videoDataURL:video}),
                    dataType:"json",
                    contentType: 'application/json',
                    url: 'https://192.168.1.7:3000/upload/video',
                    beforeSend: function(){
                        attachmentVisibility(true);
                        attachmentAdd('<p id="'+videoID+'" style="position:absolute; left:20px;color:white">Loading</p>',false);
                        setInterval(function(){
                            var text = 'Loading ';
                            for (var i=0;i<counter;i++){
                                text += '.';  // 
                            }
                            if(++counter > 3){
                                counter = 0;
                            }
                            if(document.getElementById(videoID))
                                document.getElementById(videoID).innerHTML = text;
                            else
                                clearInterval(this);
                        },500);

                    },
                    success: function(responseURL){
                        
                            for(var i=0;i<10;i++){
                                var attach = document.getElementById('a'+i);

                                if(attach.innerHTML.indexOf('<p id="'+videoID+'" style="position:absolute; left:20px;color:white">') == 0){
                                    attach.innerHTML = '<video src="'+responseURL.video+'" style="width:140px;height:140px;" controls></video><div style="background-color:white; width:20px; height:20px; position:absolute; right:0px; top:0px;"><p class="attachment_close" onclick="attachmentRemove(\''+('a'+i)+'\');">X</p></div>';
                                    document.getElementById('videoUploader').innerHTML = '<input style="opacity:0;position:absolute; top:-1px;" title="Video" type="file" onchange="addVideo(event);" accept="video/mp4"/><input style="opacity:0;position:absolute; bottom:0px;" title="Video" type="file" onchange="addVideo(event);" accept="video/mp4"/>';
                                    break;
                                }
                            }
                        
                    }
            });
        };

          for(var i=0;i<input.files.length;i++){
              if(input.files[i].type.includes('video/mp4')){

                  if((parseInt(input.files[i].size)/1024/1024) <= 15)
                        reader.readAsDataURL(input.files[i]);   
              }  
          }
    }
    
}

function addYoutube(url){
    
    if(url.indexOf('https://www.youtube.com/') != -1){
        
        var URL = '';

        for(var i=0;i<url.length;i++){
            if(i == 24){
                URL += 'embed/';
            }
            URL += url.charAt(i);
        }
        attachmentVisibility(true);
        attachmentAdd('<iframe src="'+URL+'" style="width:140px;height:140px;border-style:none;"></iframe>',true);
        
    }
    else{
        alert('This is not a Youtube URL');
    }
    
}

function addFile(file){

    if(attachmentsLength < 10){
        var input = file.target;
        var filename;
        var reader = new FileReader();
        reader.onload = function(){
            var ufile = reader.result;
            var fileID = ufile.slice(30,50);
            var counter = 0;
            
            document.getElementById('fileUploader').value = '';
            
        $.ajax({
                type: "Post",
                data: JSON.stringify({DataURL:ufile,Extension:filename.split('.')[1]}),
                dataType:"json",
                contentType: 'application/json',
                url: 'https://192.168.1.7:3000/upload/file',
                beforeSend: function(){
                    attachmentVisibility(true);
                    attachmentAdd('<p id="'+fileID+'" style="position:absolute; left:20px;color:white">Loading</p>',false);
                    setInterval(function(){
                        var text = 'Loading ';
                        for (var i=0;i<counter;i++){
                            text += '.';  
                        }
                        if(++counter > 3){
                            counter = 0;
                        }
                        if(document.getElementById(fileID))
                            document.getElementById(fileID).innerHTML = text;
                        else
                            clearInterval(this);
                    },500);

                },
                success: function(responseURL){
                    
                        for(var i=0;i<10;i++){
                            var attach = document.getElementById('a'+i);

                            if(attach.innerHTML.indexOf('<p id="'+fileID+'" style="position:absolute; left:20px;color:white">') == 0){
                                attach.innerHTML = '<div onclick="window.location = \''+responseURL.file+'\';"><div class="fileUpload"></div><label class="fileNameTitle">Filename:</label><label class="fileName">'+filename+'</label></div><div style="background-color:white; width:20px; height:20px; position:absolute; right:0px; top:0px;"><p class="attachment_close" onclick="attachmentRemove(\''+('a'+i)+'\');">X</p></div>';
                                
                                document.getElementById('fileUploader').innerHTML = '<input style="opacity:0;position:absolute; top:-1px;" title="File" type="file" onchange="addFile(event);" accept="*/*"/><input style="opacity:0;position:absolute; bottom:0px;" title="File" type="file" onchange="addFile(event);" accept="*/*"/>';
                                break;
                            }
                        }
                    
                }
        });

        }
         for(var i=0;i<input.files.length;i++){
              if(!input.files[i].type.includes('image') || !input.files[i].type.includes('video')){

                  if((parseInt(input.files[i].size)/1024/1024) <= 15){
                      filename = input.files[i].name;
                      reader.readAsDataURL(input.files[i]);   
                  }
              }  
          }

    }


}

function addMic(Event){
    if (navigator.mediaDevices.getUserMedia && Event.button == 0) {

    navigator.mediaDevices.getUserMedia ({audio: true}).then(function(stream) {
        var mediaRecorder = new MediaRecorder(stream);
        var chunks = [];
        
            $('.microBtn').css('background-position','15px');
            $('.recordBar').css('display','block');
        mediaRecorder.start();
           
        mediaRecorder.ondataavailable = function(e) {
            chunks.push(e.data);
        };
        

        mediaRecorder.onstop = function(){
            
            stream.getTracks()[0].stop();
            var blob = new Blob(chunks, { 'type' : 'audio/mp3' });
            
            var reader = new FileReader();
            reader.readAsDataURL(blob); 
            reader.onloadend = function() {
            var base64data = reader.result;
            var audioID = base64data.slice(30,50);
            var counter = 0;
                
            $.ajax({
                type: "Post",
                data: JSON.stringify({AudioDataURL:base64data}),
                dataType:"json",
                contentType: 'application/json',
                url: 'https://192.168.1.7:3000/upload/audio',
                beforeSend: function(){
                    attachmentVisibility(true);
                    attachmentAdd('<p id="'+audioID+'" style="position:absolute; left:20px;color:white">Loading</p>',false);
                    setInterval(function(){
                        var text = 'Loading ';
                        for (var i=0;i<counter;i++){
                            text += '.';  
                        }
                        if(++counter > 3){
                            counter = 0;
                        }
                        
                        if(document.getElementById(audioID))
                            document.getElementById(audioID).innerHTML = text;
                        else
                            clearInterval(this);
                    },500);
                },
                success: function(responseURL){
                    
                        for(var i=0;i<10;i++){
                            var attach = document.getElementById('a'+i);

                            if(attach.innerHTML.indexOf('<p id="'+audioID+'" style="position:absolute; left:20px;color:white">') == 0){
                                attach.innerHTML = '<audio src="'+responseURL.audio+'" style="width:140px; position:absolute; top:55px;" controls></audio><div style="background-color:white; width:20px; height:20px; position:absolute; right:0px; top:0px;"><p class="attachment_close" onclick="attachmentRemove(\''+('a'+i)+'\');">X</p></div>';
                                
                                break;
                            }
                        }
                    
                    
                }
            });
        };


    };
        
        document.getElementById('record').onmouseup = function(){
          mediaRecorder.stop();
            $('.microBtn').css('background-position','0px');
            $('.recordBar').css('display','none');
            document.getElementById('record').onmouseup = '';
            document.getElementById('record').onmouseout = '';
        };
        
        document.getElementById('record').onmouseout = function(){
          mediaRecorder.stop();
            $('.microBtn').css('background-position','0px');
            $('.recordBar').css('display','none');
            document.getElementById('record').onmouseup = '';
            document.getElementById('record').onmouseout = '';
        };

        });
    }
}

function addEvent(upEvent,eventJSON,today,packageID){
    var eventHolder = document.getElementById('eventBox');
    var html ;

    if(eventHolder.innerHTML.includes('<p id="EV_loading"')){
        eventHolder.innerHTML = '';
        EV_load(false);
    }

    if(!eventJSON){
        eventHolder.innerHTML = '<p style="text-align: center;font-size: 18px; font-family: arial; font-weight: bold;cursor: default;">'+(upEvent? 'No upcoming events yet':'You didn\'t create any events yet')+'</p>';
        return '';
    }

    var title = (eventJSON.title=='Birthday'? '\'s Birthday':' invites you to '+eventJSON.title);
    var height = Math.floor(title.length/46) * 10;
    
    html = '<div class="'+ (today? 'todayEvent" ':'otherEvent"') + 'style="height:'+(40+height)+'px;" >'+(today? '<label style="color:white;font-size:16px;font-family:arial;position:absolute;margin-top:10px;margin-left:27px;">Today</label>':'')+'<div class="calendarEV" style="position:absolute;margin-left:'+(today ? '104':'27')+'px;color:white;"><label style="font-size:12px;font-family:arialBold;width:19px;text-align:center;position:absolute;margin-left:2.5px;margin-top:8px;">'+eventJSON.date.split('/')[0]+'</label><label style="font-size:15px;font-family:arialBold;position:absolute;margin-left:34px;margin-top:5px;">'+getMonth(parseInt(eventJSON.date.split('/')[1]))+'</label></div><label style="position:absolute;margin-top:15px;left:570px;color:white;font-family:arialNarrow;">'+eventJSON.time+'</label><label class="'+(today? 'todayProfile':'profileEV')+'" '+(eventJSON.owner_img!= 'none' ? 'style="background:url('+eventJSON.owner_img+'); border-style:solid;border-width: 2px;border-color: white;margin-top:2.5px;"':'')+'></label><label class="nameEV">'+eventJSON.owner_name.split(' ')[0]+' '+eventJSON.owner_name.split(' ')[1]+title+'</label></div><div class="moreInfoEV"><br/><label class="InvitedEV">Invited <label style="color:'+(today ? '#eccc39':'#e76c6c')+';font-weight:bold;">Friends</label></label><div class="invitedBox">'+(eventJSON.invited_friends?getFriendsDIV(eventJSON.invited_friends):'<label style="position:absolute;margin-top:13px;left:67px;font-size:14px;font-family:arial;color:#404040;">All Friends</label>')+'</div><label class="InvitedEV" style="left:263px;">About the <label style="color:'+(today ? '#eccc39':'#e76c6c')+';font-weight:bold;">Event</label></label><div class="aboutEventBox"><label class="aboutEventTXT">'+eventJSON.description+'</label>'+(!upEvent? '<div class="event_removeBtn" onclick="removeEvent(\''+packageID+'\',\''+eventJSON.id+'\');" onmouseover="eventRemoveBtn(\'hover\','+today+');" onmouseout="eventRemoveBtn(\'out\');" ><label style="position: absolute;margin-top: 9px;width: 197px;text-align: center;">Remove this Event</label></div>':'')+'</div></div><p style="margin:4px;"></p>';
    
    eventHolder.innerHTML += html;
}

function eventRemoveBtn(status,today){
    
    if(status == 'hover'){
        
        if(today){
            $('.event_removeBtn').css('background-color','#eccc39');
        }
        else{
            $('.event_removeBtn').css('background-color','#e76c6c');
        }
        
    }
    else{
        $('.event_removeBtn').css('background-color','rgb(128, 128, 128)');
    }
}

function removeEvent(P_ID,E_ID){
    $.ajax({
        type: "Get",
        dataType:"json",
        contentType: 'application/json',
        url: 'https://192.168.1.7:3000/delete/event/'+P_ID+'_'+E_ID,
        beforeSend:  function(){document.getElementById('eventBox').innerHTML = '<p style="text-align: center;font-size: 18px; font-family: arial; font-weight: bold;cursor: default;">Loading ...</p>';},
        success: function(response){
            console.log(response);
            eventcount = 0;
            myevent_request(true);
        }
    });
}

function getMonth(number){
    var months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
    return months[number-1];
}

function getFriendsDIV(FriendsJSONs){

    var html = '';

    for(var i=0;i<FriendsJSONs.length;i++){
        var image = '';

        if(FriendsJSONs[i].friend_img != "none"){
           image = 'style="background:url('+FriendsJSONs[i].friend_img+');"'; 
        }

        html += '<div style="height:40px;"><label class="showEventProfile"'+image+'></label><label style="font-family:arial; font-weight:bold; font-size:12px;color:#404040;position:absolute; margin-top:14px;left:62px;">'+FriendsJSONs[i].friend_name+'</label></div>';


    }

    return html;

}

function createEvent(backTo){
    var eventBox = document.getElementById('eventBox');
    var btns = [document.getElementById('eventBtn'),document.getElementById('eventCBtn')];
    
    var lastbtnsHTML = [btns[0].innerHTML,btns[1].innerHTML];
    
    btns[0].innerHTML = '<label style="top: 8.5px;position: absolute;text-align: center;width: 130px;height: 26.5px;">Cancel</label>';
    btns[1].innerHTML = '<label style="top: 8.5px;position: absolute;text-align: center;width: 130px;height: 26.5px;">Done</label>';
    
    document.getElementById('e_title1').innerHTML = 'Create <label id="e_title2" style="color: #e76c6c;font-size: 19px;"><b>Event</b></label>';
    
    $('#e_title1').css('left','270px');
    
    if(backTo == 'myevent'){
        btns[0].onclick = function(){
            btns[0].innerHTML = lastbtnsHTML[0];
            btns[1].innerHTML = lastbtnsHTML[1];
            eventcount = 0;
            myevent_request(true);
        };
    }
    else{
        btns[0].onclick = function(){
            btns[0].innerHTML = lastbtnsHTML[0];
            btns[1].innerHTML = lastbtnsHTML[1];
            eventcount = 0;
            upevent_request(true);
        };
    }
    
    // btns[1] on click effect done btn request
    
    btns[1].onclick = function(){
        
        var eventdata={};
        
        eventdata.day = document.getElementById('eventCDay').value;
        eventdata.month = document.getElementById('eventCMonth').value;
        eventdata.year = document.getElementById('eventCYear').value;
        eventdata.title = document.getElementById('eventCTitle').value;
        eventdata.hour = document.getElementById('eventCHour').value;
        eventdata.minute = document.getElementById('eventCMinute').value;
        eventdata.description = document.getElementById('eventDescription').value;
        eventdata.friends = friendList;
        if(eventdata.day.length!=0&&eventdata.month.length!=0&&eventdata.year.length!=0&&eventdata.title.length!=0&&eventdata.description.length!=0)
        {

            $.ajax({
                type: "Post",
                data: JSON.stringify(eventdata),
                dataType:"json",
                contentType: 'application/json',
                url: 'https://192.168.1.7:3000/create/event',
                beforeSend: function(){    document.getElementById('eventBox').innerHTML = '<p style="text-align: center;font-size: 18px; font-family: arial; font-weight: bold;cursor: default;">Loading ...</p>';

                    if(document.getElementById("eventCBtn")){
                        document.getElementById("eventCBtn").style.display = 'none';
                        document.getElementById("eventBtn").style.display = 'none';
                    }
            },
                success: function(responseJSON){
                    if(responseJSON.error)
                    { 
                        alert("wrong "+responseJSON.error);


                    }
                    else 
                    {
                    console.log('it has');
                    btns[0].innerHTML = lastbtnsHTML[0];
                    btns[1].innerHTML = lastbtnsHTML[1];
                        myevent_request(true);     
                }
                    }
            });
        }
        else{

            alert("make sure to enter the date and title and description");
        }
    };
    
    
    eventBox.innerHTML = '<div class="otherEvent"><label style="position:absolute;left:0px;top:11px;color:white;font-family:arial;font-size:14px;width:638px;text-align:center;" ><input id="eventCTitle" style="border-style: none;background: transparent;color: white;text-align: center;border-bottom-style: solid;padding-bottom: 4px;width:200px;" maxlength="26" placeholder="type a title" /></label><label style="position:absolute;left:28px;top:11px;color:white;font-family:arial;font-size:16px;font-weight:bold;" >Date : &nbsp;<label><input id="eventCDay" style="width: 30px;border-style: none;text-align: center;color:white;background:transparent;" placeholder="DD" maxlength="2" />/<input id="eventCMonth" style="width: 30px;border-style: none;text-align: center;color:white;background:transparent;" placeholder="MM" maxlength="2" />/<input id="eventCYear" style="width: 60px;border-style: none;text-align: center;color:white;background:transparent;" placeholder="YYYY" maxlength="4" /></label></label><label style="position:absolute;right:40px;top:11px;color:white;font-family:arial;font-size:16px;font-weight:bold;" >Time &nbsp;<label><input id="eventCHour" style="width: 30px;border-style: none;text-align: center;color:white;background:transparent;" placeholder="Hr" maxlength="2" />:<input id="eventCMinute" style="width: 30px;border-style: none;text-align: center;color:white;background:transparent;" placeholder="Min" maxlength="2" /></label></label></div><div style="width:638px;position:absolute;margin-top:6px;color:#404040;font-size:12px;"><label style="font-family:arialBold;position:absolute;left:310px;">maximum 26 character</label><label style="position:absolute;margin-top:3px;right:8px;font-family:arial;">Leave it empty if it\'s all day</label></div><div style="width:638px;margin-top:40px;color:#404040;"><label style="position:absolute;left:19px;font-family:arial;">Who is <label style="color:#e76c6c;"><b>Invited ?</b></label></label><label style="position:absolute;left:263px;font-family:arial;">What is that <label style="color:#e76c6c;"><b>Event ?</b></label></label></div><div id="eventFriendList" class="eventFriends"></div><textarea id="eventDescription" placeholder="talk about your event ..." maxlength="64" class="eventDescription"></textarea><label style="font-family:arialBold;font-size:12px;color:#8c8c8c;position:absolute;top:195px;left:518px;">maximum 64 character</label>';
    // loading <label style="position:absolute;left:15px;top:15px;">Loading ...</label>
    $.ajax({
            type: "Get",
            data: {name:'',all:'all'},
            dataType:"text",
            contentType: 'text/plain',
            url: 'https://192.168.1.7:3000/tag/post',
            beforeSend: function(){ document.getElementById('eventFriendList').innerHTML = '<label style="position:absolute;left:15px;top:15px;">Loading ...</label>'; },
            success: function(response){

                document.getElementById('eventFriendList').innerHTML = '';
                var res = JSON.parse(response);
                showFriendList(res);
                
            }
    });
    
}

function changeChat(to){
    
    // Text + Background Selection
    
    var oldSelect = [(chatSelect == 'chatPtxt' ? document.getElementById('chatP'):document.getElementById('chatF')),document.getElementById(chatSelect)];
    var newSelect = [document.getElementById('chat'+to.charAt(0)),document.getElementById('chat'+to.charAt(0)+'txt')];
    
    oldSelect[0].style.backgroundColor = 'rgb(214, 214, 212)';
    oldSelect[1].style.color = '#717171';
    oldSelect[1].style.fontWeight = 'normal';
    
    newSelect[0].style.backgroundColor = 'white';
    newSelect[1].style.color = (color == 'blue' ? 'rgb(15, 111, 146)':'#7e516f');
    newSelect[1].style.fontWeight = 'bold';
    
    chatSelect = 'chat'+to.charAt(0)+'txt';
    
    var html ;
    
    if(to == "Public"){
        document.getElementById('chatContent1').style.display = 'block';
        document.getElementById('chatContent2').style.display = 'none';
        
    }
    else{
        document.getElementById('chatContent1').style.display = 'none';
        document.getElementById('chatContent2').style.display = 'block';
    }
    
}

var optionOpened = false;
function profileOption(){
    if(!optionOpened){
        $('.profileClick').css('display','block');
        optionOpened = true;
    }
    else{
        $('.profileClick').css('display','none');
        optionOpened = false;
    }
}

var newImg ;
var oldImg ;

function changeProfileImg(file){
    var input = file.target;
    
    var reader = new FileReader();
        reader.onload = function(){

            //reader.result;
            var image = reader.result.replace(/^data:image\/jpeg;base64,/, "");
            image = image.replace(/^data:image\/jpg;base64,/, "");
            image = image.replace(/^data:image\/png;base64,/, "");
            
            
            $.ajax({
                    type: "Post",
                    data: JSON.stringify({imageDataURL:image}),
                    dataType:"json",
                    contentType: 'application/json',
                    url: 'https://192.168.1.7:3000/cloudaniryProfile/noSave',
                    beforeSend: function(){
                        document.getElementById('editLoading').style.display = 'block';
                    },
                    success: function(responseURL){
                        document.getElementById('editLoading').style.display = 'none';
                       
                        if(!oldImg)
                            oldImg = $('.inner_circle').css('background');
                        $('.inner_circle').css('background','url('+responseURL.image.replace('w_145,h_145,c_fill','w_115,h_115,c_fill')+')');
                        newImg = responseURL.image;
                    }
            });
            
            
        };

          for(var i=0;i<input.files.length;i++){
              if(input.files[i].type.includes('image/jpg') || input.files[i].type.includes('image/jpeg') || input.files[i].type.includes('image/png')){

                  if((parseInt(input.files[i].size)/1024/1024) <= 15)
                        reader.readAsDataURL(input.files[i]);   
              }  
          }
    
}

function changeBackgroundImg(file){
    var input = file.target;
    
    var reader = new FileReader();
        reader.onload = function(){

            //reader.result;
            var image = reader.result.replace(/^data:image\/jpeg;base64,/, "");
            image = image.replace(/^data:image\/jpg;base64,/, "");
            image = image.replace(/^data:image\/png;base64,/, "");
            
            
            $.ajax({
                    type: "Post",
                    data: JSON.stringify({imageDataURL:image}),
                    dataType:"json",
                    contentType: 'application/json',
                    url: 'https://192.168.1.7:3000/cloudaniryProfile/save',
                    beforeSend: function(){
                        document.getElementById('settingsLoading').style.display = 'block';
                    },
                    success: function(responseURL){
                        document.getElementById('settingsLoading').style.display = 'none';
                        $('.main').css('background','url('+responseURL.image.replace('w_145,h_145,c_fill','w_809,h_617,c_fill')+')');
                    }
            });
            
            
        };

          for(var i=0;i<input.files.length;i++){
              if(input.files[i].type.includes('image/jpg') || input.files[i].type.includes('image/jpeg') || input.files[i].type.includes('image/png')){

                  if((parseInt(input.files[i].size)/1024/1024) <= 15)
                        reader.readAsDataURL(input.files[i]);   
              }  
          }
    
}

function removeProfileImg(){
    
    if(oldImg != 'rgba(0, 0, 0, 0) url("https://192.168.1.7:3000/images/default_pro.png") repeat scroll 0% 0% / auto padding-box border-box')
        newImg = 'remove';
    else
        newImg = null;
    

    if(!oldImg)
        oldImg = $('.inner_circle').css('background');
    
    document.getElementById('newImg').value = null;
    $('.inner_circle').css('background','url(/images/default_pro.png)');
}

function removeBackgroundImg(){
    $.ajax({
        type: "Get",
        url: 'https://192.168.1.7:3000/change_settings/background/none',
        beforeSend: function(){ document.getElementById('settingsLoading').style.display = 'block'; },
        success: function(){
            document.getElementById('settingsLoading').style.display = 'none';
            $('.main').css('background','');
        }
    });
}

function saveProfileEdit(first){
    
    var profile = document.getElementById('profileOPTION');
    
    if(!first && changesMade()){
        
        var sentImg = (newImg? newImg:'none');
        var sentName = (document.getElementById('newName').value.trim().length ? document.getElementById('newName').value.trim():'empty');
        var sentPass = (document.getElementById('newPassword').value.length ? document.getElementById('newPassword').value:'empty');
        
        $.ajax({
            type: "Post",
            data: JSON.stringify({image:sentImg,full_name:sentName,new_password:sentPass,old_password:document.getElementById('oldPassword').value}),
            dataType:"json",
            contentType: 'application/json',
            url: 'https://192.168.1.7:3000/updateProfile',
            beforeSend: function(){
                document.getElementById('editLoading').style.display = 'block';
            },
            success: function(responseJSON){
                
                document.getElementById('editLoading').style.display = 'none';
                
                if(responseJSON.error){
                    alert(responseJSON.error);
                }
                else{
                    profileOption();
                    profile.onclick = function(){
                        saveProfileEdit(!first);
                    };
                    
                    var name = document.getElementById('newName').value;
                    
                    if(name.length){
                        document.getElementById('firstname').innerHTML = name.split(' ')[0]+'<label class="secondname">'+name.split(' ')[1]+'</label>';
                        document.querySelector('title').innerHTML = name;
                        document.getElementById('headerW').innerHTML = name;
                    }
                    
                    newImg = null;
                    oldImg = null;
                    document.getElementById('newImg').value = null;
                    document.getElementById('newName').value = '';
                    document.getElementById('newPassword').value = '';
                    document.getElementById('oldPassword').value = '';
                }
            }
        });
    }
    else{
        profileOption();
        profile.onclick = function(){
            saveProfileEdit(!first);
        };
    }
}

function cancelClick(){
    
    var profile = document.getElementById('profileOPTION');
    profileOption();
    profile.onclick = function(){
        saveProfileEdit(true);
    };
    
    newImg = null;
    
    if(oldImg)
        $('.inner_circle').css('background',oldImg);
    
    oldImg = null;
    
    document.getElementById('newImg').value = null;
    document.getElementById('newName').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('oldPassword').value = '';
}

function changesMade(){
    
    var inputs = [document.getElementById('newImg'),document.getElementById('newName'),document.getElementById('newPassword'),document.getElementById('oldPassword')];
    
    for (var i=0;i<inputs.length;i++){
        if(inputs[i].value.trim().length){
            return true;
        }
    }
    
    if(newImg == 'remove'){
        return true;
    }
    
    return false;
    
}

function removeMyAccount(){
    
    var confirmPass = prompt('Please enter your password to confirm');
    
    if(confirmPass.length){
        $.ajax({
            type: "Post",
            data: JSON.stringify({pass:confirmPass}),
            dataType:"json",
            contentType: 'application/json',
            url: 'https://192.168.1.7:3000/deleteMyAccount',
            success: function(response){
                
                if(response.error){
                    alert(response.error);
                }
                else{
                    window.location = 'https://192.168.1.7:3000/';
                }
                
            }
        });
    }
    
}

function friendsView(friendsData){
    
    var friendContainer = document.getElementById('friendList');
    friendContainer.innerHTML = '';
    
    var marginTop = 0;
    
    for(var i=0;i<friendsData.length;i++){
        var img = (friendsData[i].profile_img == 'none' ? '':'style="background:url('+friendsData[i].profile_img.replace('w_145,h_145,c_fill','w_53,h_53,c_fill')+');"');
        var bg = (friendsData[i].bg == 'none' ? 'none':friendsData[i].bg.replace('w_809,h_617,c_fill','w_640,h_77,c_fill'));
        
        friendContainer.innerHTML += '<div class="friendBG" style="margin-top:'+marginTop+'px;'+(bg =='none'? '':'background:url('+bg+');')+'" ><div class="friendProfile"'+img+'> </div><label class="firstname" style="width:200px;text-align:left;left:85px;top:14px;font-size:28px;">'+friendsData[i].name.split(' ')[0]+'<label class="secondname" style="font-size:19px;">'+friendsData[i].name.split(' ')[1]+'</label></label> <label class="friendEmail">'+friendsData[i].email+'</label> <label class="friendPostNo">'+friendsData[i].postNo+' post created</label></div>'+'<div class="friendPost" style="margin-top:'+marginTop+'px;"></div> <div class="friendChat" style="margin-top:'+(marginTop+2)+'px;"></div>';
        marginTop += 85;
    }
    document.getElementById('friendSearch').style.display = 'block';
    if(friendsData.length > 3){
        friendContainer.style.width = '665px';
    }
    else{
        friendContainer.style.width = '653px';
    }
}

function hoverFriend(id,status){
    
    if(!friendList.includes(id)){
        if(status == 'in')
            document.getElementById(id+'BG').style.background = (color == 'blue' ? 'rgb(192, 214, 222)':'#d8c0de');
        else
            document.getElementById(id+'BG').style.background = 'transparent';
    }
}

// function to get different content types and urls from post container 
function postContent(){
	
	var postTxt = document.getElementById('txt').value;
	var postData = {};
	//no text, no attachements
	if(!postTxt.length && attachmentsLength == 0){
		alert('Cannot create an empty post!'); 
	}else{
		//settings
		var whoSee = document.getElementById('who').innerHTML;
		var blocknames = document.getElementById('pSoption').value;
		var blockfor = (blocknames.length != 0 ? blocknames:'none');
		
		var postData = {text:'',data_url:'',contains:'',block_for:blockfor,tagged:tagged,who_can_see:whoSee,likesNo:0,commentsNo:0};
		
		var mainContent = 'text';
		//if there is a text
		if(postTxt.length){                           //contains = ['text','image_2']; || contains = ['image_2']
			postData.contains = 'text';
			postData.text = postTxt;
		}
		//if there is an attachements
		if(attachmentsLength > 0){
			
			var imageURL= ['image'],videoURL= ['video'],audioURL= ['audio'],youtubeURL= ['youtube'],fileURL= ['file'];
			var attachContent = [];
			
			var ordered_URL = [];
			
			for(var i =0;i <attachmentsLength;i++){
				
				attachContent[i] = document.getElementById('a'+i).innerHTML;
				attachContent[i] = attachContent[i].replace("window.location = '",'');
				attachContent[i] = attachContent[i].replace("';",'');
				
				
				var attachURL = attachContent[i].split('"')[1];
				
				if(attachContent[i].search(/img/) != -1){ 
					imageURL.push(attachURL);
					
					if(mainContent == 'text'){
						mainContent = 'image';
					}
					
					if(ordered_URL.indexOf(imageURL) == -1){
						ordered_URL.push(imageURL);
					}
					else {
						ordered_URL[ordered_URL.indexOf(imageURL)] = imageURL;
					}
					
				}
				else if(attachContent[i].search(/video/) != -1){
					videoURL.push(attachURL);
					
					if(ordered_URL.indexOf(videoURL) == -1){
						ordered_URL.push(videoURL);
					}
					else {
						ordered_URL[ordered_URL.indexOf(videoURL)] = videoURL;
					}
					
				}
				else if(attachContent[i].search(/iframe/) != -1){
					youtubeURL.push(attachURL);
					
					if(ordered_URL.indexOf(youtubeURL) == -1){
						ordered_URL.push(youtubeURL);
					}
					else {
						ordered_URL[ordered_URL.indexOf(youtubeURL)] = youtubeURL;
					}
				}
				else if(attachContent[i].search(/audio/) != -1){
					audioURL.push(attachURL);
					
					if(ordered_URL.indexOf(audioURL) == -1){
						ordered_URL.push(audioURL);
					}
					else {
						ordered_URL[ordered_URL.indexOf(audioURL)] = audioURL;
					}
				}
				else{
					fileURL.push(attachURL);
					
					if(ordered_URL.indexOf(fileURL) == -1){
						ordered_URL.push(fileURL);
					}
					else {
						ordered_URL[ordered_URL.indexOf(fileURL)] = fileURL;
					}
				}
				
			}
			
			if(mainContent != 'text'){
				for(var i=0;i<ordered_URL.length;i++){
					
					
					for(var j=1;j<ordered_URL[i].length;j++){
						postData.data_url = (postData.data_url.length ? postData.data_url+'|'+ordered_URL[i][j]:ordered_URL[i][j]);
					}
					
					postData.contains = (postData.contains.length ? postData.contains+','+ordered_URL[i][0]+'_'+(ordered_URL[i].length-1):ordered_URL[i][0]+'_'+(ordered_URL[i].length-1));
						
				}
			}
			
			return postData;
		}
		
	}
	
	
}

function post_request(){
	$.ajax({
        type: "Post",
        data: JSON.stringify(postContent()),
        dataType:"json",
        contentType: 'application/json',
        url: 'https://192.168.1.7:3000/create/post',
        success: function(responseJSON){
			//response with post view
        }
});
}