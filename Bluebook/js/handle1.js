var steps = 0; // number of moves
var animation, loader , load_count = 0;
var next = ["618px","905px","1172px","1453px","1732px","2014px"];
var i = 0;
var gender = "" , confirm = false ;
var loading2 , sign_load_count = 1;


function anim(value){ // function for the animation movement
			
			var elements = [document.getElementById('learn'),document.getElementById('animation')];
            if(!elements[0]){
                return '';
            }
				// first initialization ( run once )
				if(elements[0].style.marginTop == ""){
					elements[0].style.marginTop = "-80px";
					elements[1].style.opacity = "0";
				}
			
			if(elements[0].style.marginTop != value){
				elements[0].style.marginTop = (parseFloat(elements[0].style.marginTop)+1)+"px";
				
				if(elements[1].style.opacity != "1"){
					
					if(++steps % 35 == 0 ){
							elements[1].style.opacity = parseFloat(elements[1].style.opacity)+0.1;
						}
				}
			}
			else {
					clearInterval(animation);
					var duration = i == 6 ? 2:5000; 
					
					setTimeout(function(){
					animation = setInterval(anim,2,next[i]);
					i++;
							
					if (i == 7){
						clearInterval(animation);
						elements[0].style.marginTop = "-80px";
						animation = setInterval(anim,0,"285px");
						i = 0 ;
						steps = 0 ;
					}
				},duration);	
			}
		}
		
function loading(status){
			
			var load_element = document.getElementById('loading');
			
			if (status == "run"){
				load_element.style.opacity = "1"; // show loading
				// setInterval if not running
				if(!loader){
					loader = setInterval(function(){
						
						if(++load_count == 360){
							load_count = 0;
						}
						
						$('.loading').css('transform','rotate('+load_count+'deg)');
						
					},0);
				}
				
				// else run animation code
				
			}
			else if (status == "stop"){
				load_element.style.opacity = "0"; // hide loading
				clearInterval(loader);
				loader = null;
				load_count = 0;
				// clear inerval
			}
		}

function loading_signup(status){
            
            var all = document.getElementById('signup_loading');
            
            if(status == "run"){
                all.style.opacity = "1";
                
                if(!loading2){
                    loading2 = setInterval(function(){
                        
                        if(sign_load_count != 1){
                            $('#l'+(sign_load_count-1)).css('background-color','rgb(226, 226, 226)');
                        }
                        else {
                            $('#l3').css('background-color','rgb(226, 226, 226)');
                        }
                        
                        $('#l'+(sign_load_count++)).css('background-color','#80c8e2');
                        
                        if(sign_load_count > 3 ){
                            sign_load_count = 1;
                        }
                        
                        
                    },500);
                }
            }
            else if(status == "stop") {
                
                all.style.opacity = "0";
                sign_load_count = 1;
                for (var i=1;i<4;i++){
                    $('#l'+i).css('background-color','rgb(226, 226, 226)');
                }
                clearInterval(loading2);
                loading2 = null;
                
            }
            
        }
		
function arrange_footer(){ // get footer to bottom
			
			if (parseFloat(innerHeight)-430-120-80 >= 10){
				$('.footer').css('bottom','0px');
			}
			else {
				$('.footer').css('bottom','');
				$('.footer').css('margin-top','-6px');
			}
			
		}
		
function confirm_check(){
			var checkbox = document.getElementById('confirm');
			
			if(confirm == false){
				checkbox.style.backgroundPositionX = "-219px";
                wendy_changeTxt('Accepting the terms means we are friends');
				confirm = true;
			}
			else {
				checkbox.style.backgroundPositionX = "0px";
				confirm = false;
                wendy_changeTxt('Ok.. do you wanna make a fight ?');
			}
			
		}
		
function inputEvent(CS,action){
			
			if(action == "in"){
				if(CS == "email"){
					$('.e_bar').css('background-color','#0f6f92');
					$('.email').css('color','#0f6f92');
					$('.email').css('font-style','normal');
                    
                    if(document.getElementById('email').type == "password"){
                        wendy_changeTxt('Enter your password');
                    }
                    else {
                        wendy_changeTxt('Enter your email account');
                    }
				}
				else {
					
					var e;
					if(CS == "name"){
						e = 1;
						wendy_changeTxt('Type your full name');
					}
					else if (CS == "email2"){
						e = 2;
						wendy_changeTxt('Type your email');
					}
					else if (CS == "password2"){
						e = 3;
						wendy_changeTxt('Try to type a secure password');
					}
					else if (CS == "date_birth"){
						e = 4;
					}
					
					$("#"+CS+"box").css('background-color','#0f6f92');
					$("#"+CS+"box").css('border-color','rgb(64,64,64)');
					$("#txt"+e).css('font-style','normal');
				}
			}
			else if (action == "out"){
				
				if (CS == "email"){

					if (document.getElementById('email').value.trim() == ""){
						$('.email').css('font-style','italic');
					}
					$('.email').css('color','rgb(64, 64, 64)');
					$('.e_bar').css('background-color','rgb(64, 64, 64)');
				}
				else if (CS == "date_birth"){
					
					if(document.getElementById('day').value.length == 0 || document.getElementById('month').value.length == 0 || document.getElementById('year').value.length == 0){
						$('#'+CS+"box").css('background-color','rgb(64, 64, 64)');
						$("#txt4").css('font-style','italic');
					}
				}
				else {
					
					var e;
					if(CS == "name"){
						e = 1;
					}
					else if (CS == "email2"){
						e = 2;
					}
					else if (CS == "password2"){
						e = 3;
					}
					
					if(document.getElementById(CS).value.length == 0){
						$('#'+CS+"box").css('background-color','rgb(64, 64, 64)');
						$("#txt"+e).css('font-style','italic');
					}
                    
				}
			}
			else if (action == "click"){
				
				if (CS == "radio1"){
					gender = "male";
					$('#radio1').css('background-position','-16px');
					$('#radio2').css('background-position','0px');
					$('#genderbox').css('background-color','#0f6f92');
					$("#genderbox").css('border-color','rgb(64,64,64)');
					$("#txt5").css('font-style','normal');
					wendy_changeTxt('It is good to be a man');
				}
				else if (CS == "radio2"){
					gender = "female";
					$('#radio2').css('background-position','-16px');
					$('#radio1').css('background-position','0px');
					$('#genderbox').css('background-color','#0f6f92');
					$("#txt5").css('font-style','normal');
					wendy_changeTxt('Oh.. I\'m a girl too');
				}
			}
			
		}
		
animation = setInterval(anim,0,"285px");
arrange_footer();

function error(ids){
    
    for(var i=0;i<ids.length;i++){
        
        if(ids[i] == "day" || ids[i] == "month" || ids[i] == "year"){
            document.getElementById("date_birthbox").style.borderColor = "#bf4949";
            document.getElementById("date_birthbox").style.backgroundColor = "#e05656";
        
            continue;
        }
        
        if(ids[i] == "confirm"){
            document.getElementById(ids[i]).style.backgroundPositionX = "219px";
            continue;
        }
        
        document.getElementById(ids[i]+"box").style.borderColor = "#bf4949";
        document.getElementById(ids[i]+"box").style.backgroundColor = "#e05656";
        
        if(ids[i] == "gender"){
            document.getElementById('radio1').style.backgroundPosition = "-32px";
            document.getElementById('radio2').style.backgroundPosition = "-32px";
        }
        
    }
    
}

function login_action(status ,active , image){
    
    var under = document.getElementById('under_btn');
    
    if(status == "forward"){

        under.innerHTML = '<div onclick="login_action(\'back\');" class="signBtn" style="margin-top:69px;"><p style="margin-top:12px;">Back</p></div>';
        
        
        if(active){
            document.getElementById('btn_txt').innerHTML = 'Login';
            document.getElementById('email').placeholder = "password";
            document.getElementById('email').type = "password";
            document.getElementById('email').value = '';
            document.getElementById('Btn').onclick = function(){ login_request(2,false); };
			if(image != "none" && image){
                $('.circle').css('border-style','solid');
                $('.circle').css('left','630px');
                $('.circle').css('top','114px');
                $('#profile_img').css('opacity','1');
                $('.person').css('opacity','0');
                document.getElementById('profile_img').src = image ;
            }
        }
        else {
            document.getElementById('btn_txt').innerHTML = 'Re-send confirmation';
            document.getElementById('btn_txt').style.fontSize = '14px';
            document.getElementById('email').placeholder = "email account";
        }
        
        document.getElementById('forgotEmail').style.display = 'block';
        
        
    }
    else if (status == "back"){
        under.innerHTML = '<div onclick="loginFB();" class="fbBtn"><label style="background: url(/images/facebk.png); width: 13px; height: 24px;float: left; margin-left: 20px; margin-top: 10px;"></label><p style="margin-top: 14px; margin-right: 8px;">Login with Facebook</p></div>';
        
        
        document.getElementById('forgotEmail').style.display = 'none';
        $('.circle').css('border-style','none');
        $('#profile_img').css('opacity','0');
        $('.person').css('opacity','1');
        $('.circle').css('left','636px');
        $('.circle').css('top','120px');
        
        document.getElementById('btn_txt').innerHTML = 'Verify';
        document.getElementById('email').placeholder = "email account";
        document.getElementById('btn_txt').style.fontSize = '16px';
        document.getElementById('email').value = '';
        document.getElementById('email').type = "text";
        document.getElementById('Btn').onclick = function(){ login_request(1); };
        
        wendy_changeTxt('Hi you gonna miss some stuff');
        
    }
    
    
}