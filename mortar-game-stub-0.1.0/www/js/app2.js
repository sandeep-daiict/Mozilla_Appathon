
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
	var player=1;
	var player1_score, player2_score;

	var x = new Array(10);
	  for (var i = 0; i < 10; i++) {
	    x[i] = new Array(10);
	  }

	  for (i = 0; i < 10; i++) 
	  for (j = 0; j < 10; j++) 
	  {
	    x[i][j] = 0;
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

	for(i=0;i<5;i++)
	{
		for(j=0;j<5;j++)
		{
			if((line[i*6+j][i*6+j+1]==1) && (line[i*6+j+1][i*6+j+7]==1) && (line[i*6+j+7][i*6+j+6]==1) && (line[i*6+j+6][i*6+j]==1))
			{
				ctx.font="32px Arial";
				ctx.fillStyle='blue';
				ctx.fillText("H",75+(j*35)+7,75+(i*35)+27);
			}

		}
	}

        // Speed in pixels per second
/*        var playerSpeed = 100;

        if(input.isDown('DOWN')) {
            // dt is the number of seconds passed, so multiplying by
            // the speed gives u the number of pixels to move
            player.y += playerSpeed * dt;
        }

        if(input.isDown('UP')) {
            player.y -= playerSpeed * dt;
        }

        if(input.isDown('LEFT')) {
            player.x -= playerSpeed * dt;
        }

        if(input.isDown('RIGHT')) {
            player.x += playerSpeed * dt;
        }
*/
    };

    // Draw everything
    function render() {

	var cord_x=75;
	var cord_y=75;

	for(i=0;i<6;i++)
	{
		for(j=0;j<6;j++)
		{
			ctx.beginPath();
			ctx.arc(cord_x,cord_y,7,0,2*Math.PI);
			if(x[i][j]==0)
				ctx.fillStyle = 'yellow';
			else
			{
				if((i==0 && j==0) || (i==5 && j==5) || (i==0 && j==5) || (i==5 && j==0))
				{
					if(x[i][j]==2)	
						ctx.fillStyle = 'red';
					else
						ctx.fillStyle = 'blue';
				}
				else if (i==0 || j==0 || i==5 || j==5)
				{
					if(x[i][j]==3)	
						ctx.fillStyle = 'red';
					else
						ctx.fillStyle = 'blue';
				}
				else
				{
					if(x[i][j]==4)	
						ctx.fillStyle = 'red';
					else
						ctx.fillStyle = 'blue';
				}
			}
			ctx.fill();
			ctx.stroke();
			cord_x+=35;
		}
		cord_y+=35;
		cord_x=75;
	}
	
	for(i=0;i<36;i++)
	{
		for(j=0;j<36;j++)
		{
			
			if(line[i][j]==1)
			{
				var cordy1=Math.floor(i/6);
				var cordy2=Math.floor(j/6);
				var cordx1=i%6;
				var cordx2=j%6;

				ctx.beginPath();
				ctx.moveTo(75+(cordx1*35),75+(cordy1*35));
				ctx.lineTo(75+(cordx2*35),75+(cordy2*35));
				
				ctx.lineWidth=3;
				ctx.stroke();
				ctx.lineWidth=1;
			}
		}
	}



/*      ctx.fillStyle = 'blue';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = 'white';
        ctx.fillRect(player.x, player.y, player.sizeX, player.sizeY);
*/    };

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
						flag=0;
						i1=-1;
						j1=-1;
					}	
				}
				else
				{
					x[i][j]++;
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
				}
				else
				{
					if(i1==i && (j1==j-1 || j1==j+1))
					{
												
						if(line[6*i1+j1][6*i+j]==1)
						{	
							x[i][j]--;
							x[i1][j1]--;
						}
						else
						{
							line[6*i1+j1][6*i+j]=1;				
							line[6*i+j][6*i1+j1]=1;	
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
						}
						else
						{
							line[6*i1+j1][6*i+j]=1;				
							line[6*i+j][6*i1+j1]=1;
							update();				
						}
						flag=0;
					}
					else
					{
						flag=0;
						x[i][j]--;
						x[i1][j1]--;
					}
				}
				i1=-1;
				j1=-1;
				//boundary
			        //update();
			}

	}
    // Let's play this game!
    reset();
    var then = Date.now();
    var running = true;
    main();
});
