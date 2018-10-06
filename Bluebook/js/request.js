// get signup Data in JSON
function dataJSON(){
    
    var data = {};
    data.name = document.getElementById('name').value;
    data.email = document.getElementById('email2').value;
    data.password = document.getElementById('password2').value;
    data.day = document.getElementById('day').value;
    data.month = document.getElementById('month').value; 
    data.year = document.getElementById('year').value;
    data.gender = gender;
    data.confirm = confirm;
    
    return data;
    
}

function signup_request(data){
    
    $.ajax({
            type: "Post",
            data: JSON.stringify(data),
            dataType:"json",
            contentType: 'application/json',
            url: 'https://192.168.1.7:3000/signup/data',
            beforeSend: loading_signup('run'),
            success: function(responseJSON){
                loading_signup('stop');
                if(responseJSON.error.length != 0){
                    // change page style  guide : create an error function
                    if(responseJSON.error != "connection"){
                        error(responseJSON.error.split(','));
                    }
                    
                    wendy_changeTxt(responseJSON.wendy);
                    
                }
                else {
                    clearInterval(anim);
                    clearInterval(animation);
                    document.getElementById('body').innerHTML = responseJSON.html;
                    wendy_changeTxt(responseJSON.wendy);
                }
            }
    });
}

var req_data = {email:'',password:'',id:'',pass:''};
var user_data = {};

function login_request(id,pass){
	
	
    if(id == 1){
        req_data.email = document.getElementById('email').value;
    }
    else if (id == 2){
        req_data.password = document.getElementById('email').value;
    }
    
    req_data.id = id;
	req_data.pass=pass;
    
    
	 $.ajax({
            type: "Post",
            data: JSON.stringify(req_data),
            dataType:"json",
            contentType: 'application/json',
            url: 'https://192.168.1.7:3000/login',
            beforeSend: function(){ if(id == 1){ wendy_breathing('stop'); loading('run'); } else{ wendy_changeTxt('Connecting ...'); } },
            success: function(responseJSON){
                
                if(id == 1){

                    loading('stop');
                    wendy_breathing('run');

                    if(responseJSON.error.length == 0){
                        // retrieve image 
                        login_action('forward',true,responseJSON.image);
                        document.getElementById('email').focus();
                    }
                    else if (responseJSON.error == "not confirmed"){
                        login_action('forward',false,responseJSON.image);
                        document.getElementById('Btn').onclick = function(){
                            resend_btn(req_data);
                        };
                    }
                    
                    wendy_changeTxt(responseJSON.wendy);
                }
                else if (id == 2){
                    
                    if(responseJSON.error.length == 0 && !pass){
                            window.location = 'https://192.168.1.7:3000/myaccount';
                    }
                    else{
                        wendy_changeTxt(responseJSON.wendy);
                    }
                    
                }
            }
    });
	
}

function send_feedback(){
    var feed = {};
    feed.data = document.getElementById('textforfeed').value;
    $.ajax({
        type: "Post",
        data: JSON.stringify(feed),
        dataType:"json",
        contentType: 'application/json',
        url: 'https://192.168.1.7:3000/feedback',
        beforeSend: wendy_changeTxt('Sending ...'),
        success: function(responseJSON){
            wendy_changeTxt(responseJSON.wendy);
            document.getElementById('textforfeed').value = '';
        }
});
}

var resend_data = {email:''};

function fb_request(data){

    $.ajax({
        type: "Post",
        data: JSON.stringify(data),
        dataType:"json",
        contentType: 'application/json',
        url: 'https://192.168.1.7:3000/loginfb',
        beforeSend:wendy_changeTxt('Loading...'),
        success: function(responseJSON){
            
            if(responseJSON.error.length != 0){
                // change page style  guide : create an error function
                if(responseJSON.error != "connection"){

                    if(responseJSON.error == "Nopassword"){
                        login_action('forward',true,responseJSON.image);
                        document.getElementById('Btn').onclick = function(){
                            user_data.password = document.getElementById('email').value;
                            fb_request(user_data);
                        };
                    }
                    else if (responseJSON.error == "not confirmed"){
                        login_action('forward',false,responseJSON.image);
                        document.getElementById('Btn').onclick = function(){
                            resend_data.email=user_data.email;
                            resend_btn(resend_data);

                        };
                    }
                }
                
                wendy_changeTxt(responseJSON.wendy);
                
            }
            else {
                if(responseJSON.html.length !=0){
                    clearInterval(anim);
                    clearInterval(animation);
                    document.getElementById('body').innerHTML = responseJSON.html;
                    wendy_changeTxt(responseJSON.wendy);
                    setInterval(function(){
                        window.location = 'https://192.168.1.7:3000/';  
                    },10000);
                }
                else {
                    window.location = 'https://192.168.1.7:3000/myaccount'; 
                }
                
            }
        }
});
    
}

function resend_btn(data){

    $.ajax({
        type: "Post",
        data: JSON.stringify(data),
        dataType:"json",
        contentType: 'application/json',
        url: 'https://192.168.1.7:3000/resendmail',
        beforeSend:wendy_changeTxt('Sending...'),
        success: function(responseJSON){
            
            if(responseJSON.error.length != 0){
                wendy_changeTxt(responseJSON.wendy);
            }
            else {
                if(responseJSON.html.length !=0){
                    clearInterval(anim);
                    clearInterval(animation);
                    document.getElementById('body').innerHTML = responseJSON.html;
                    wendy_changeTxt(responseJSON.wendy);
                    setInterval(function(){
                        window.location = 'https://192.168.1.7:3000/';  
                    },10000);
                }
                else {
                    window.location = 'https://192.168.1.7:3000/';
                }
                
            }
        }
});
    
}

var tagDiv = []; //holds the whole divs --> <div>...</div>  taggDiv
var tagged = []; //holds tagged friends' ids

function addTag(fID,fName){
	
    var friend_data ={id:fID,name:fName};
    
    var taggedBox = document.getElementById('taggedNames');
	var marginTop = tagDiv.length? (tagDiv.length*4):0;

		var name = '' , originName = friend_data.name.split(' ')[0];
		for (var i=0;i<10;i++){
			
			if(originName.length > 4 && i > 4){
				name +="..&nbsp;";
				break;
			}
			
			if(originName.charAt(i)){
				name += friend_data.name.charAt(i);
			}
			else{
				name += "&nbsp;";
			}
		}
		

		var divHtml = '';
		
		if(!tagDiv.length){
			divHtml = '<div id="'+tagDiv.length+'" style="position:absolute; margin-top:'+marginTop+'px; width:45px; left:28px; height:31px;" ><label style="position:absolute;margin-top:7px;margin-left:-18px; font-family:if_font;" title="'+friend_data.name+'">'+name+'<label title="" onclick="removeTag('+tagDiv.length+');" class ="taggedClose">X</label></label></div>';
			
			
		}else{
			
			if(tagDiv.length == 1){
				taggedBox.innerHTML += '<br/><br/>';
			}
			
			divHtml = '<div id="'+tagDiv.length+'" style="position:absolute; margin-top:'+marginTop+'px; width:45px; left:28px; height:31px;" ><label style="position:absolute;margin-top:7px;margin-left:-18px; font-family:if_font;" title="'+friend_data.name+'">'+name+'<label title="" onclick="removeTag('+tagDiv.length+');" class ="taggedClose">X</label></label></div><br/><br/>';
		
		}
				
		tagDiv.push(divHtml);
		taggedBox.innerHTML += divHtml;
		tagged.push(friend_data.id);
		
		document.getElementById('tag').style.width = "105px";
		taggedBox.style.display = 'block';
		tag_request();
	
	
}

function removeTag(divIndex){
	
	var newTag = [], newIDs =[];
	var taggedBox = document.getElementById('taggedNames');
	
	//change the remainning divs' ids
	for(var i=divIndex+1;i<tagDiv.length;i++){
		tagDiv[i] = tagDiv[i].replace(/id="\d+"/,('id="'+(i-1)+'"'));
	}
	
	for (var i=0;i<tagDiv.length;i++){
        if(i != divIndex){
           	newTag.push(tagDiv[i]);
			newIDs.push(tagged[i]);
         }
		else{
			if(i != tagDiv.length -1){
				newTag.push(tagDiv[i+1]);
				newIDs.push(tagged[i+1]);
				i = i+1; //to skip the repeated index ex: 0 0 1 2 3 ??
			}
		}
     
	}
	    
    tagDiv = newTag;
	tagged = newIDs;
	taggedBox.innerHTML = '';
    
	//1 tagged left
	if(tagDiv.length == 1){
		tagDiv[0] = tagDiv[0].replace(new RegExp('removeTag(.*)'),'removeTag('+0+');" class="taggedClose">X</label></label></div>');
		taggedBox.innerHTML += tagDiv[0];
 
	}else if(!tagDiv.length){
		//no tagged left
		taggedBox.innerHTML = '';
		document.getElementById('tag').style.width = "201px";
		taggedBox.style.display = 'none';
				
	}else{
		for (var i=0;i<tagDiv.length;i++){
           	var cur_div = tagDiv[i];
            cur_div = cur_div.replace(new RegExp('removeTag(.*)'),'removeTag('+i+');" class="taggedClose">X</label></label></div><br/><br/>');
            taggedBox.innerHTML += cur_div;
         }

	}
	
	if(tagDiv.length == 1){
		document.getElementById('0').style.marginTop = '0px';
	}
	else{
		
		for (var i=0;i<tagDiv.length;i++){
			document.getElementById(i).style.marginTop = (i*4)+'px';
		}
	}
    
    tag_request();
	
}

function showTag(status,friends_data){

    var inputList = document.getElementById('inputlist');

    inputList.innerHTML = '';

    if(status){
        inputList.style.display = 'block';

        if(friends_data.length>3){
            inputList.style.overflowY = 'auto';
            inputList.style.overflowX = 'hidden';
            inputList.style.height = '150px';
        }
        else{

            inputList.style.overflowY = '';
            inputList.style.overflowX = '';

            var increase = 0;

            for(var i=0;i<friends_data.length;i++){

                increase = increase + 50;
                inputList.style.height = increase+"px";

            }
        }

        var magrinTop = 2;
        for(var i=0;i<friends_data.length;i++){

            if(tagged.indexOf(friends_data[i].id) == -1){
                
                var image = '',hide = '';
            
            if(friends_data[i].profile_img != "none"){
                var img_url = friends_data[i].profile_img.replace('w_145,h_145','w_35,h_35');
                
                image = 'style="background:url('+img_url+');"';
                hide = 'style="display:none"';
            }
            
            inputList.innerHTML += '<div class="personTag" onclick="addTag(\''+friends_data[i].id+'\',\''+friends_data[i].name+'\')" style="margin-top:'+magrinTop+'px;"><div class="profileTag" '+image+'><div class="tagImage" '+hide+'></div><label class="firstname" style="top:13px; font-size: 18px;text-align: left;left: 45px;">'+friends_data[i].name.split(' ')[0]+'<label class="secondname" style="font-size: 16px;">'+friends_data[i].name.split(' ')[1]+'</label></label></div></div>';

            magrinTop += 50;}

        }
        
        if(!inputList.innerHTML.length){
            inputList.style.display = 'none';
            return '';
        }
        
        inputList.innerHTML += '<div class="tagEnder"></div>';
        $('.tagEnder').css('margin-top',(magrinTop-5)+'px');

    }
    else{
        inputList.style.display = 'none';
    }
}

function tag_request(){
    
    $.ajax({
        type: "Get",
        data: {name:document.getElementById('tag').value},
        dataType:"text",
        contentType: 'text/plain',
        url: 'https://192.168.1.7:3000/tag/post',
        beforeSend: function(){ document.getElementById('inputlist').style.display ='none'; },
        success: function(response){
            var res = JSON.parse(response);
            if(res.length){
                showTag(true,res);
            }
            else{
                showTag(false);
            }
        }
    });
        
}

var eventcount = 0;
function myevent_request(first){
    
    document.getElementById('e_title1').innerHTML=document.querySelector('title').innerHTML+' <label id="e_title2" style="color: #e76c6c;font-size: 19px;"><b>Events</b></label>';

    $('#e_title1').css('left','254px');
    
    if(document.getElementById("eventCBtn")){
        document.getElementById("eventCBtn").style.display = 'none';
        document.getElementById("eventBtn").style.display = 'none';
    }
    
    
    if(first)
        document.getElementById('eventBox').innerHTML = '<p style="text-align: center;font-size: 18px; font-family: arial; font-weight: bold;cursor: default;">Loading ...</p>';
    
    $.ajax({
        type: "Get",
        dataType:"text",
        contentType: 'text/plain',
        url: 'https://192.168.1.7:3000/user_data/myevents/'+eventcount,
        success: function(response){
            var res = JSON.parse(response);
            
            if(first){
                document.getElementById('eventBox').innerHTML = '';
            }
            
            if(res.data == 'empty'){
                addEvent(false);
            }
            else if(res.data.length && res.data != 'finished'){
                for(var i=0;i<res.data.length;i++){
                    addEvent(false,res.data[i],res.today[i],res._id);
                }
                eventcount++;
            }
            
            var eventSection = document.getElementById('EV_Box');
            
            if(eventSection.innerHTML.search('<div id="eventBtn"') == -1 ){
                eventSection.innerHTML += '<div id="eventBtn" onclick="changeEventClick();" class="event_MCBtn"><label style="top: 8.5px;position: absolute;text-align: center;width: 130px;height: 26.5px;">My Events</label></div><div id="eventCBtn" class="event_MCBtn" style="left:508px;"><label style="top: 8.5px;position: absolute;text-align: center;width: 130px;height: 26.5px;">Create an Event</label></div>';
            }

            if(first){
                var eventBtn = document.getElementById("eventBtn");
                eventBtn.style.display = 'block';
                eventBtn.onclick = function(){
                    eventcount = 0;  
                    upevent_request(true);
                };
                eventBtn.innerHTML = '<label style="top: 8.5px;position: absolute;text-align: center;width: 130px;height: 26.5px;">Upcoming Events</label>';
                
                document.getElementById("eventCBtn").style.display = 'block';
                document.getElementById("eventCBtn").onclick = function(){
                  createEvent('myevent');
                };
            }
        }
    });
    
}

function upevent_request(first){
    
    document.getElementById('e_title1').innerHTML='Upcoming <label id="e_title2" style="color: #e76c6c;font-size: 19px;"><b>Events</b></label>';
    
    $('#e_title1').css('left','254px');
    
    if(first)
        document.getElementById('eventBox').innerHTML = '<p id="EV_loading" style="text-align: center;font-size: 18px; font-family: arial; font-weight: bold;cursor: default;">Loading ...</p>';
    
    
    if(document.getElementById("eventCBtn")){
        document.getElementById("eventCBtn").style.display = 'none';
        document.getElementById("eventBtn").style.display = 'none';
    }
    
    $.ajax({
        type: "Get",
        dataType:"text",
        contentType: 'text/plain',
        url: 'https://192.168.1.7:3000/user_data/upevents/'+eventcount,
        success: function(response){
            var res = JSON.parse(response);

            if(first)
                document.getElementById('eventBox').innerHTML = '';
            
            if(res.data == 'empty'){
                addEvent(true);
            }
            else if(res.data.length && res.data != 'finished'){
                for(var i=0;i<res.data.length;i++){
                    addEvent(true,res.data[i],res.today[i]);
                }
                eventcount+=20;
            }
            
            var eventSection = document.getElementById('EV_Box');
            
            if(eventSection.innerHTML.search('<div id="eventBtn"') == -1 ){
                eventSection.innerHTML += '<div id="eventBtn" onclick="changeEventClick();" class="event_MCBtn"><label style="top: 8.5px;position: absolute;text-align: center;width: 130px;height: 26.5px;">My Events</label></div><div id="eventCBtn" class="event_MCBtn" style="left:508px;"><label style="top: 8.5px;position: absolute;text-align: center;width: 130px;height: 26.5px;">Create an Event</label></div>';
            }
            
            if(first){
                var eventBtn = document.getElementById("eventBtn");
                eventBtn.style.display = 'block';
                eventBtn.onclick = function(){
                    eventcount = 0;  
                    myevent_request(true);
                };
                
                eventBtn.innerHTML = '<label style="top: 8.5px;position: absolute;text-align: center;width: 130px;height: 26.5px;">My Events</label>';

                document.getElementById("eventCBtn").style.display = 'block';
                document.getElementById("eventCBtn").onclick = function(){
                  createEvent('upevent');
                };
            }
            
        }
    });
    
}

function changeEventClick(){
    eventcount =0; 
    myevent_request(true); 
}

var colorRequest = false;

function changeColor(){
    var systemColor = document.getElementById('colorCSS');
    var count = 0;
    
    if(!colorRequest){
        colorRequest = true;
        var timer = setInterval(function(){
            count = count + 10;
            if(count == 360){
                if(color == 'blue'){
                    color = 'purple';
                    systemColor.href = '/css/myaccount2.css';
                }
                else {
                    color = 'blue';
                    systemColor.href = '/css/myaccount.css';
                }

                $.ajax({
                    type: "Get",
                    url: 'https://192.168.1.7:3000/change_settings/color/'+color,
                    success: function(){
                        colorRequest = false;
                    }
                });

                if(cur_side[0] == "HOME"){
                    $('.Box_1').css('background-color',(color=='blue'? '#0f6f92':'#7e516f'));
                    $('.Box_2').css('background-color',(color=='blue'? '#5c95aa':'#9f6e8f'));
                    $('.Box_3').css('background-color',(color=='blue'? '#5c95aa':'#9f6e8f'));
                }
                else if(cur_side[0] == "APPS"){
                    $('.Box_2').css('background-color',(color=='blue'? '#0f6f92':'#7e516f'));
                    $('.Box_1').css('background-color',(color=='blue'? '#5c95aa':'#9f6e8f'));
                    $('.Box_3').css('background-color',(color=='blue'? '#5c95aa':'#9f6e8f'));
                }
                else {
                    $('.Box_3').css('background-color',(color=='blue'? '#0f6f92':'#7e516f'));
                    $('.Box_1').css('background-color',(color=='blue'? '#5c95aa':'#9f6e8f'));
                    $('.Box_2').css('background-color',(color=='blue'? '#5c95aa':'#9f6e8f'));
                }
                
                document.getElementById(chatSelect).style.color = (color == 'blue'? '#0f6f92':'#7e516f');
                
                clearInterval(timer);
            }

            $('.colorMain').css('transform','rotate('+count+'deg)');

        },20);
    }
}

var friendList = [];

function showFriendList(friends_data){

    var inputList = document.getElementById('eventFriendList');
    
    friendList = [];
    var Top = 0;
    
    for(var i=0;i<friends_data.length;i++){

        var image = '',hide = '';
        
        if(friends_data[i].profile_img != "none"){
            var img_url = friends_data[i].profile_img.replace('w_145,h_145','w_35,h_35');

            image = 'style="background:url('+img_url+');"';
            hide = 'style="display:none"';
        }

        inputList.innerHTML += '<div onmouseover="hoverFriend(\''+friends_data[i].id+'\',\'in\');" onmouseout = "hoverFriend(\''+friends_data[i].id+'\',\'out\');" onclick="addRemoveFriend(\''+friends_data[i].id+'\');" id="'+friends_data[i].id+'BG"  class="personTag" style="width:216px;margin-top:'+(Top)+'px;margin-left:0px;"  ><div class="profileTag" '+image+'><div class="tagImage" '+hide+'></div><label class="firstname" style="top:13px; font-size: 18px;text-align: left;left: 45px;">'+friends_data[i].name.split(' ')[0]+'<label class="secondname" style="font-size: 16px;">'+friends_data[i].name.split(' ')[1]+'</label></label></div><div id="'+friends_data[i].id+'" class="correctTag"></div></div>'; 
        
        Top+= 45;
        
        
        if(i == friends_data.length-1){
            inputList.innerHTML += '<div style="width:2px;height:3px;margin-top:'+(Top-6)+'px;"></div>';
        }
    }

    if(!inputList.innerHTML.length){
        inputList.innerHTML = '<p style="position:absolute;left:20px;">None</p>';
    }
    
}

function addRemoveFriend(id){
    if(friendList.includes(id)){
        var newArr = [];
        
        for (var i=0;i<friendList.length;i++){
            if(friendList[i] != id){
                newArr.push(friendList[i]);
            }
        }
        
        friendList = newArr;
        
        document.getElementById(id).style.display = 'none';
        document.getElementById(id+'BG').style.background = 'transparent';
    }
    else{
        friendList.push(id);
        document.getElementById(id).style.display = 'block';
        document.getElementById(id+'BG').style.background = (color == 'blue' ? 'rgb(192, 214, 222)':'#d8c0de');
    }
}