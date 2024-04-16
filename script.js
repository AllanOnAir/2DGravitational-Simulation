ballcount = 0;

MassList = [];


document.addEventListener('click', function() {
    createBall({x: 500, y: 0}, 0.5, {x: 1, y: 1});
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'q') {
        createMass(200);
    }
    if (e.key === 'c') {
        console.log("c");
        var elems = document.getElementsByClassName('cadran');
        if (document.getElementById("A").style.display === 'block') {
            for (var i = 0; i < elems.length; i++ ) {
                elems[i].style.display = "none";
                console.log("none");
            }
        }
        else {
            for (var i = 0; i < elems.length; i++ ) {
                elems[i].style.display = "block";
                console.log("block");
            }
        }
    }
});


function createMass(bodymass) {
    console.log(bodymass);
    var screen = document.getElementById('screen');


    // position de la mass 
    var x = document.getElementById('screen').offsetWidth / 2;
    var y = document.getElementById('screen').offsetHeight / 2;

    var mass = document.createElement('div');
    mass.className = 'mass';
    screen.appendChild(mass);
    mass.style.width = bodymass/10 + 'px';
    mass.style.height = bodymass/10 + 'px';
    mass.style.top = y + "px";
    mass.style.left = x + "px";
    mass.style.transform = 'translate(-50%, -50%)';
    mass.style.backgroundColor = 'white';
    mass.style.position = 'absolute';
    mass.style.borderRadius = '50%';
    mass.style.outline = bodymass + "px"+ ' solid rgba(200, 200, 200, 0.05)';

    massData = {
        mass: bodymass,
        x: x,
        y: y,
    };

    MassList.push(massData);
}


function createBall(position, speed, direction) {
    var screen = document.getElementById('screen');
    var ball = document.createElement('div');
    var top = ball.style.top = '25%';

    ball.className = 'ball';
    screen.appendChild(ball);
    physic(ball, position, speed, direction);
}

function physic(item, position, speed, direction) {
    screenWidth = document.getElementById('screen').offsetWidth;
    screenHeight = document.getElementById('screen').offsetHeight;

    // move the item to the right
    // if it reach the right end of the screen, delete it
    var x = position.x;
    var y = position.y;
    var speed = speed;
    var BallMass = 100;
    
    var gravity = 0;
    var GravityInfluenceX = 1;
    var GravityInfluenceY = 1;
    var influenceIntensity = 0;
    var influenceZone = 0;


    var interval = setInterval(function() {
        
        var cadran = 0;



        if ( MassList.length > 0) {
            MassList.forEach(element => {
                // 558 : 347
                // 600 : 200
                //console.log("mass : " + element.mass + " x : " + element.x + " y : " + element.y);
                //console.log("x : " + x + " y : " + y);
                //console.log("x : " + element.x + " y : " + element.y);
                if ( x < element.x ) {
                    if ( y < element.y ) {
                        cadran = 1;
                    } else {
                        cadran = 3;
                    }

                } else {
                    if ( y < element.y ) {
                        cadran = 2;
                    } else {
                        cadran = 4;
                    }
                }

                var angle = Math.atan2(element.y - y, element.x - x) * 180/Math.PI;
                GravityInfluenceX = Math.cos(angle);
                GravityInfluenceY = Math.sin(angle);



                var distance = Math.sqrt((element.x - x) * (element.x - x) + (element.y - y) * (element.y - y));
                //console.log("x : " + GravityInfluenceX + " y : " + GravityInfluenceY);
                //console.log("angle : " + angle);
                //console.log("cadran : " + cadran);
                
                influenceZone = (BallMass / 2) + element.mass;

                if (distance / influenceZone < 1) {
                    influenceIntensity = (influenceZone%distance)/100;
                    //console.log("influenceIntensity : " + influenceIntensity);
                }


            });

            // influence of the gravity
            // elle depend de la distance entre la balle et la mass selon la fiderence entre la masse des deux corps
            // deplacement en X = 
            
            
            // dans quel cadran se trouve la balle
            // 1 : en haut a gauche
            // 2 : en haut a droite
            // 3 : en bas a gauche
            // 4 : en bas a droite
        




            

            



            

            if (influenceIntensity == 0) {
                x += speed + direction.x ;
                y += speed + direction.x ;

            } else {

                x += speed * (direction.x + ((GravityInfluenceX * influenceIntensity)*10));
                console.log(((GravityInfluenceX * influenceIntensity)*10))
                y += speed * (direction.x + ((GravityInfluenceY * influenceIntensity)*10));
            }
            

        } else
        {
            x += speed * direction.x * GravityInfluenceX ;
            y += speed * direction.x * GravityInfluenceY ;
        }

        //console.log("GravityInfluenceX : " + GravityInfluenceX + " GravityInfluenceY : " + GravityInfluenceY);
        console.log("influenceIntensity : " + influenceIntensity);
        item.style.left = x + 'px';
        item.style.top = y  + 'px';
        //console.log(" x : "+ x +" y: " + y);

        if (x > screenWidth || x < 0 || y > screenHeight || y < 0) {
            clearInterval(interval);
            item.remove();
        }
    }, 1);
}



//function GravitationalInfluence(x, y, mass) {
//    var distance = Math.sqrt((x * x) + (y * y));
//    var influence = mass / distance;
//    return influence;
//}