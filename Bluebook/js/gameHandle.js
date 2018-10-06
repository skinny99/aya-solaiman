
var choosedGame = '';
function GameHover(id,status){
    var game = document.getElementById(id);
    var gameTxt = document.getElementById(id+'TXT');

    if(status == 'on'){
        game.style.boxShadow = '0px 0px 18px 0px '+(color == 'purple'?'rgba(126, 81, 111, 0.75)':'rgba(15, 111, 146, 0.75)');
        gameTxt.style.fontWeight = 'bold';
    }
    else if (status == 'off'){
        if(choosedGame != id){
            game.style.boxShadow = '0px 1px 4px 0px rgba(0, 0, 0, 0.35)';
            gameTxt.style.fontWeight = 'normal';
        }
    }
    else if (status == 'click'){
        var HTML ;
        if(id == 'g1')
            HTML = '<embed width="605" height="494" base="https://external.kongregate-games.com/gamez/0000/6057/live/" src="https://external.kongregate-games.com/gamez/0000/6057/live/embeddable_6057.swf" type="application/x-shockwave-flash"></embed>';
        else if (id == 'g2')
            HTML = '<embed width="605" height="494" base="https://external.kongregate-games.com/gamez/0026/4222/live/" src="https://external.kongregate-games.com/gamez/0026/4222/live/embeddable_264222.swf" type="application/x-shockwave-flash"></embed>';
        else if (id == 'g3')
            HTML = '<embed width="640" height="480" base="https://external.kongregate-games.com/gamez/0017/9179/live/" src="https://external.kongregate-games.com/gamez/0017/9179/live/embeddable_179179.swf" type="application/x-shockwave-flash"></embed>';
        else if (id == 'g4')
            HTML = '<embed width="605" height="494" base="https://external.kongregate-games.com/gamez/0013/8540/live/" src="https://external.kongregate-games.com/gamez/0013/8540/live/embeddable_138540.swf" type="application/x-shockwave-flash"></embed>';

        choosedGame = id;

        for(var i=1;i<5;i++){
            document.getElementById('g'+i).style.boxShadow = '0px 1px 4px 0px rgba(0, 0, 0, 0.35)';
            document.getElementById('g'+i+'TXT').style.fontWeight = 'normal';
        }

        game.style.boxShadow = '0px 0px 18px 0px '+(color == 'purple'? 'rgba(126, 81, 111, 0.75)':'rgba(15, 111, 146, 0.75)');
        gameTxt.style.fontWeight = 'bold';
        document.getElementById('gameScreen').innerHTML = HTML;

    }

}