ballcount = 0;

MassList = [];


document.addEventListener('click', function() {
    createBall({x: 500, y: 0}, {x: 0.5, y : 0.5}, {x: 1, y: 1});
});


document.addEventListener('keydown', function(e) {
    if (e.key === 'q') {
        createMass(50);
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

    switch (e.key) {
        case '1':
            createBall({x: 50, y: 400}, {x: 0.4, y : -0.4});
            break;
        case '2':
            createBall({x: 600, y: 0}, {x: 0.5, y : 0.5}, {x: 1, y: 1});
            break;
        case '3':
            createMass(30);
            break;
        case '4':
            createMass(40);
            break;
        case '5':
            createMass(50);
            break;
        case '6':
            createMass(60);
            break;
        case '7':
            createMass(70);
            break;
        case '8':
            createMass(80);
            break;
        case '9':
            createMass(90);
            break;
        case '0':
            createMass(100);
            break;
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


function createBall(position, speed) {
    var screen = document.getElementById('screen');
    var ball = document.createElement('div');
    var top = ball.style.top = '25%';

    ball.className = 'ball';
    screen.appendChild(ball);
    physic(ball, position, speed);
}

function physic(item, position, speed) {
    screenWidth = document.getElementById('screen').offsetWidth;
    screenHeight = document.getElementById('screen').offsetHeight;

    // move the item to the right
    // if it reach the right end of the screen, delete it
    var x = position.x;
    var y = position.y;
    var speedX = speed.x;
    var speedY = speed.y;
    var BallMass = 20;
    var influenceIntensity = 0;
    
    var GravityInfluenceX = 0.0;
    var GravityInfluenceY = 0.0;
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

                var angleX = -1
                var angleY = -1
                if ( x < element.x ) {
                    if ( y < element.y ) {
                        cadran = 1;
                        angleY = 1;
                        angleX = 1;

                    } else {
                        cadran = 3;
                        angleY = -1;
                        angleX = 1;
                    }

                } else {
                    if ( y < element.y ) {
                        cadran = 2;
                        angleY = 1;
                        angleX = -1;
                    } else {
                        cadran = 4;
                        angleY = -1;
                        angleX = -1;
                    }
                }

                // pythagore

                var deltaX = x - element.x;
                var deltaY = y - element.y;
                var distance = Math.sqrt((deltaX) * (deltaX) + (deltaY) * (deltaY));


                console.log("deltaX : " + deltaX);
                // debugger si deltaX = 0
                if (deltaX <= 1 && deltaX >= -1) {
                    
                    deltaX = 1;
                }
                if (deltaY <= 1 && deltaY >= -1) {
                    deltaY = 1;
                }



                var modifier = 20;


                // l'influence doit varier en fonction de la distance X et Y elle ne doit pas etre la meme pour les deux
                
                GravityInfluenceX = BallMass*element.mass / (((distance * distance) *angleX) * modifier);
                GravityInfluenceY = BallMass*element.mass / (((distance * distance) *angleY) * modifier);

                console.log("deltaX : " + deltaX + " deltaY : " + deltaY);
                console.log(GravityInfluenceX);
                console.log(GravityInfluenceY);
                speedX += GravityInfluenceX;
                speedY += GravityInfluenceY;



                x += speedX
                y += speedY

            });
            //Note
                // influence of the gravity
                // elle depend de la distance entre la balle et la mass selon la fiderence entre la masse des deux corps
                // deplacement en X = 


                // dans quel cadran se trouve la balle
                // 1 : en haut a gauche
                // 2 : en haut a droite
                // 3 : en bas a gauche
                // 4 : en bas a droite
        

        } else
        {
            x += speedX;
            y += speedY;
        }

        item.style.left = x + 'px';
        item.style.top = y  + 'px';

        if (x > screenWidth || x < 0 || y > screenHeight || y < 0) {
            clearInterval(interval);
            item.remove();
        }
    }, 10);
}



//function GravitationalInfluence(x, y, mass) {
//    var distance = Math.sqrt((x * x) + (y * y));
//    var influence = mass / distance;
//    return influence;
//}