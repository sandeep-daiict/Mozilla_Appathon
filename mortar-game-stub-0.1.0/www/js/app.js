
// This uses require.js to structure javascript:
// http://requirejs.org/docs/api.html#define

// A cross-browser requestAnimationFrame
// See https://hacks.mozilla.org/2011/08/animating-with-javascript-from-setinterval-to-requestanimationframe/
var requestAnimFrame = (function(){
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function(callback){
            window.setTimeout(callback, 1000 / 60);
        };
})();

define(function(require) {
    // Zepto provides nice js and DOM methods (very similar to jQuery,
    // and a lot smaller):
    // http://zeptojs.com/
    var $ = require('zepto');

    // Need to verify receipts? This library is included by default.
    // https://github.com/mozilla/receiptverifier
    require('receiptverifier');

    // Want to install the app locally? This library hooks up the
    // installation button. See <button class="install-btn"> in
    // index.html
    require('./install-button');

    // Simple input library for our game
    var input = require('./input');

    // Create the canvas
//    var canvas = document.createElement("canvas");

	var c=document.getElementById("myCanvas");
	var ctx=c.getContext("2d");
	
	var flag=0;
	var turn=1;
	var player1_score=0, player2_score=0;
	var i1=-1;
	var j1=-1;

	document.getElementById('player').innerHTML="Player 1 Turn";
	document.getElementById('p1').innerHTML="Player 1: " + player1_score.toString();
	document.getElementById('p2').innerHTML="Player 2: " + player2_score.toString();

	var x = new Array(10);
	  for (var i = 0; i < 10; i++) {
	    x[i] = new Array(10);
	  }

	  for (i = 0; i < 10; i++) 
	  for (j = 0; j < 10; j++) 
	  {
	    x[i][j] = 0;
	  }

	var square = new Array(5);
	  for (var i = 0; i < 5; i++) {
	    square[i] = new Array(5);
	  }

	  for (i = 0; i < 5; i++) 
	  for (j = 0; j < 5; j++) 
	  {
	    square[i][j] = 0;
	  }

	var line = new Array(36);
	  for (var i = 0; i < 36; i++) {
	    line[i] = new Array(36);
	  }

	  for (i = 0; i < 36; i++) 
	  for (j = 0; j < 36; j++) 
	  {
	    line[i][j] = 0;
	  }

	var cord_x=75;
	var cord_y=75;

	for(i=0;i<6;i++)
	{
		for(j=0;j<6;j++)
		{	
			ctx.beginPath();
			ctx.arc(cord_x,cord_y,5,0,2*Math.PI);
			ctx.fillStyle = 'LightGray';
			ctx.fill();
			ctx.stroke();

			cord_x+=35;
		}
		cord_x=75;
		cord_y+=35;
	}


    // The player's state
    var player = {
        x: 0,
        y: 0,
        sizeX: 50,
        sizeY: 50
    };

    // Reset game to original state
    function reset() {
        player.x = 0;
        player.y = 0;
    };

    // Pause and unpause
    function pause() {
        running = false;
    }

    function unpause() {
        running = true;
        then = Date.now();
        main();
    }

    // Update game objects
    function update(dt) {

	var flag_player=0;
	for(i=0;i<5;i++)
	{
		for(j=0;j<5;j++)
		{
			if((line[i*6+j][i*6+j+1]==1) && (line[i*6+j+1][i*6+j+7]==1) && (line[i*6+j+7][i*6+j+6]==1) && (line[i*6+j+6][i*6+j]==1))
			{

//				alert(turn + "  " + square[i][j]);
				if(turn==1)
				{
					if(square[i][j]==0)
					{
						flag_player=1;
						square[i][j]=1;

						ctx.font="25px Arial";
						ctx.fillStyle='LightCoral';
						ctx.fillText("1",75+(j*35)+7,75+(i*35)+27);
						
						aud=document.createElement('audio');
						aud.src='sq.ogg';
						aud.volume=0.6;					
						aud.play();


						player1_score+=10;
					}
				}
				else
				{
					if(square[i][j]==0)
					{
						flag_player=1;
						square[i][j]=2;

						ctx.font="25px Arial";
						ctx.fillStyle='MediumAquaMarine';
						ctx.fillText("2",75+(j*35)+7,75+(i*35)+27);

						aud=document.createElement('audio');
						aud.src='sq.ogg';
						aud.volume=0.6;					
						aud.play();


						player2_score+=10;
					}
				}
				
			}

		}
	}
//	draw();
	if(player2_score + player1_score ==250)
	{
		aud=document.createElement('audio');
		aud.src='gameover.ogg';
		aud.volume=1;					
		aud.play();
		if(player2_score>player1_score)
			alert("Player 2 wins !!!");
		else
			alert("Player 1 wins !!!");
	}

	if(flag_player==0)
	{
		if(turn==1)
		{
			turn=2;
			document.getElementById('player').innerHTML="Player 2 Turn";
			//p.innerHTML="2";
		}
		else
		{
			turn=1;
			document.getElementById('player').innerHTML="Player 1 Turn";
			//p.innerHTML="1";
		}
	}
	document.getElementById('p1').innerHTML="Player 1: " + player1_score.toString();
	document.getElementById('p2').innerHTML="Player 2: " + player2_score.toString();
};




    // Draw everything
    function render() {

/*	var cord_x=75;
	var cord_y=75;

	for(i=0;i<6;i++)
	{
		for(j=0;j<6;j++)
		{
				if((i==0 && j==0) || (i==5 && j==5) || (i==0 && j==5) || (i==5 && j==0))
				{
					if(x[i][j]==2)	
						ctx.fillStyle = 'red';
					else
						ctx.fillStyle = 'green';
				}
				else if (i==0 || j==0 || i==5 || j==5)
				{
					if(x[i][j]==3)	
						ctx.fillStyle = 'red';
					else
						ctx.fillStyle = 'DeepSkyBlue';
				}
				else
				{
					if(x[i][j]==4)	
						ctx.fillStyle = 'red';
					else
						ctx.fillStyle = 'DeepSkyBlue';
				}
			
			ctx.fill();
			ctx.stroke();
			cord_x+=35;
		}
		cord_y+=35;
		cord_x=75;
	}

*/

    };

    // The main game loop
    function main() {
        if(!running) {
            return;
        }

        var now = Date.now();
        var dt = (now - then) / 1000.0;

//	update(dt);
        render();

        then = now;
        requestAnimFrame(main);
    };

    // Don't run the game when the tab isn't visible
/*    window.addEventListener('focus', function() {
        unpause();
    });

    window.addEventListener('blur', function() {
        pause();
    });
*/
    c.addEventListener("mousedown", selectDot, false);

    function selectDot(event){

/*	event.preventDefault();
	canvas_x = event.targetTouches[0].pageX;
	canvas_y = event.targetTouches[0].pageY;
*/
	canvas_x = event.pageX;
	canvas_y = event.pageY;

	var tmp=75;

	for(i =0;i<6;i++)
	{
		for(j=0;j<6;j++)
		{
	
			if(canvas_x>(tmp-7 +j*35) && canvas_x<(tmp+7 +j*35) && canvas_y>(tmp-7 +i*35) && canvas_y<(tmp+7 +i*35))
			{
				setColor(i,j);					
			}
		}

	}

	}


    function setColor(i,j)
	{
				if(((i==0 && j==0) || (i==5 && j==5) || (i==0 && j==5) || (i==5 && j==0)) && (x[i][j]==2))
				{
					if(i1==-1 && j1==-1)
					{
						flag=0;
					}
					else
					{ 
						x[i1][j1]--;
						setDot(i1,j1);
						flag=0;
						i1=-1;
						j1=-1;
					}	
					
				}
				else if ((i==0 || j==0 || i==5 || j==5) && (x[i][j]==3))
				{
					if(i1==-1 && j1==-1)
					{
						flag=0;
					}
					else
					{ 
						x[i1][j1]--;
						setDot(i1,j1);
						flag=0;
						i1=-1;
						j1=-1;
					}	
				}
				else if(x[i][j]==4)
				{
					if(i1==-1 && j1==-1)
					{
						flag=0;
					}
					else
					{ 
						x[i1][j1]--;
						setDot(i1,j1);
						flag=0;
						i1=-1;
						j1=-1;
					}	
				}
				else
				{
					aud=document.createElement('audio');
					aud.src='dot.ogg';
					aud.volume=1;					
					aud.play();
					x[i][j]++;
							ctx.beginPath();
							ctx.arc(75+j*35,75+i*35,5,0,2*Math.PI);
							ctx.fillStyle = 'green';
							ctx.fill();
							ctx.stroke();

					flag++;
				}


		
		if(flag==1)
			{i1=i;j1=j;}
		if(flag==2)
			{
				if(i1==i && j1==j)
				{
					flag=0;
					x[i][j]-=2;
					setDot(i1,j1);
				}
				else
				{
					if(i1==i && (j1==j-1 || j1==j+1))
					{
												
						if(line[6*i1+j1][6*i+j]==1)
						{	
							x[i][j]--;
							x[i1][j1]--;
							setDot(i1,j1);
							setDot(i,j);
						}
						else
						{
							line[6*i1+j1][6*i+j]=1;				
							line[6*i+j][6*i1+j1]=1;	
							setDotNew(i1, j1);
							setDotNew(i, j);
							ctx.beginPath();
							ctx.moveTo(75+(j1*35)+2,75+(i1*35)+2);
							ctx.lineTo(75+(j*35)-2,75+(i*35)-2);
				
							ctx.lineWidth=3;
							ctx.strokeStyle='LightGoldenRodYellow';
							ctx.stroke();
							ctx.lineWidth=1;
							ctx.strokeStyle='Black';
							update();			
						}
						flag=0;
					}
					else if(j1==j && (i1==i-1 || i1==i+1))
					{
												
						if(line[6*i1+j1][6*i+j]==1)
						{	
							x[i][j]--;
							x[i1][j1]--;
							setDot(i1,j1);
							setDot(i,j);
						}
						else
						{
							line[6*i1+j1][6*i+j]=1;				
							line[6*i+j][6*i1+j1]=1;
							setDotNew(i1, j1);
							setDotNew(i, j);
							ctx.beginPath();
							ctx.moveTo(75+(j1*35)+2,75+(i1*35)+2);
							ctx.lineTo(75+(j*35)-2,75+(i*35)-2);
				
							ctx.lineWidth=3;
							ctx.strokeStyle='LightGoldenRodYellow';
							ctx.stroke();
							ctx.lineWidth=1;
							ctx.strokeStyle='Black';
							update();				
						}
						flag=0;
					}
					else
					{
						flag=0;
						x[i][j]--;
						x[i1][j1]--;
						setDot(i1,j1);
						setDot(i,j);
					}
				}
				i1=-1;
				j1=-1;
				//boundary
			        //update();
			}

	}


		function setDot(x1, y1)
		{

						if(x[x1][y1]==0)
						{
							ctx.beginPath();
							ctx.arc(75+y1*35,75+x1*35,5,0,2*Math.PI);
							ctx.fillStyle = 'LightGray';
							ctx.fill();
							ctx.stroke();
						}
						else
						{
							ctx.beginPath();
							ctx.arc(75+y1*35,75+x1*35,5,0,2*Math.PI);
							ctx.fillStyle = 'DeepSkyBlue';
							ctx.fill();
							ctx.stroke();
						}

		}

		function setDotNew(x1, y1)
		{
			var i,j;
			i=x1;
			j=y1;
				if((i==0 && j==0) || (i==5 && j==5) || (i==0 && j==5) || (i==5 && j==0))
				{
					if(x[i][j]==2)	
					{
							ctx.beginPath();
							ctx.arc(75+y1*35,75+x1*35,5,0,2*Math.PI);
							ctx.fillStyle = 'red';
							ctx.fill();
							ctx.stroke();
					}
					else
					{
							ctx.beginPath();
							ctx.arc(75+y1*35,75+x1*35,5,0,2*Math.PI);
							ctx.fillStyle = 'DeepSkyBlue';
							ctx.fill();
							ctx.stroke();
					}
				}
				else if (i==0 || j==0 || i==5 || j==5)
				{
					if(x[i][j]==3)	
					{
							ctx.beginPath();
							ctx.arc(75+y1*35,75+x1*35,5,0,2*Math.PI);
							ctx.fillStyle = 'red';
							ctx.fill();
							ctx.stroke();
					}
					else
					{
							ctx.beginPath();
							ctx.arc(75+y1*35,75+x1*35,5,0,2*Math.PI);
							ctx.fillStyle = 'DeepSkyBlue';
							ctx.fill();
							ctx.stroke();
					}

				}
				else
				{
					if(x[i][j]==4)	
					{
							ctx.beginPath();
							ctx.arc(75+y1*35,75+x1*35,5,0,2*Math.PI);
							ctx.fillStyle = 'red';
							ctx.fill();
							ctx.stroke();
					}
					else
					{
							ctx.beginPath();
							ctx.arc(75+y1*35,75+x1*35,5,0,2*Math.PI);
							ctx.fillStyle = 'DeepSkyBlue';
							ctx.fill();
							ctx.stroke();
					}

				}
		}


	function draw()
	{

		for(i=0;i<5;i++)
		{
			for(j=0;j<5;j++)
			{
				if(square[i][j]==1)
				{
//					draw(i,j,1);
//					var ctx1=c.getContext("2d");
					
				}
				else if(square[i][j]==2)
				{
//					draw(i,j,2);
					ctx.fillText("2",75+(j*35)+7,75+(i*35)+27);
				}
			}
		}
	}

    // Let's play this game!
    reset();
    var then = Date.now();
    var running = true;
    main();
});
