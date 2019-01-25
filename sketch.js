let alturaemfeet = 3;
let timertemp =10;

function setup() {
  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  imgfundo = loadImage("assets/bg.png");
  aviao1 = loadImage("assets/aviao1.svg");
  aviaolado = loadImage("assets/aviaolado.svg");
  aviaoladover = loadImage("assets/aviaoladover.svg");
  tempicon = loadImage("assets/tempicon.svg");
  system = new ParticleSystem(createVector(+width / 20 - width / 50, -height / 20 + height / 10));
  system2 = new ParticleSystem2(createVector(+width / 20 - width / 50, -height / 20 + height / 10));

}

function draw() {
  background(0, 0, 0)
  relogiofundo();
  aviaouno();
  controladores();

}

function relogiofundo() {
  var ho = [hour()] * 3600;
  var mi = [minute()] * 60;
  var se = second();
  var segundosdia = ho + mi + se;
  // var segundosdia = 63000;
  var segundosdiaaltura = 9 * windowHeight * segundosdia / 86400;
  var posicaoybg = -1 * segundosdiaaltura;

  //IMAGEM DE FUNDO CAMBIANTE
  image(imgfundo, 0, posicaoybg, width, height * 10);

  //TEXTO PARA TESTE
  textSize(20);
  textAlign(CENTER);
  textFont("Josefin Sans");
  // text(segundosdia, width / 2, height / 2 - 30);
  // text(round(segundosdiaaltura), width / 2, height / 2);
  // text(windowHeight, width / 2, height / 2 + 30);

}

function aviaouno() {

  fill(192);
  push();

  // move the origin to the pivot point
  translate(width / 2, height / 2.65);

  // then pivot the grid
  rotate(rotationZ);

  push();
  fill(0);
  tint(255, 127);
  image(aviao1, -width / 11.2, -width / 11.2, width / 5.6, width / 5.6);
  pop();
  //revert to original drawing state
  // pop();

  system.addParticle();
  system.run();
}

//OPACIDADE DO CONTRAIL

var opacidadeContrail = 25;
// if (alturaemfeet>300) {
//   var opacidadeContrail = 25;
// }
//
// if (alturaemfeet>250) {
//   var opacidadeContrail = 20;
// }
//
// if (alturaemfeet>200) {
//   var opacidadeContrail = 15;
// }
//
// if (alturaemfeet>100) {
//   var opacidadeContrail = 10;
// }
//
// if (alturaemfeet>50) {
//   var opacidadeContrail = 5;
// }
// else {
//   var opacidadeContrail = 0;
// }

// A simple Particle class
var Particle = function(position) {
  this.acceleration = createVector(0, 0.02);
  this.velocity = createVector(random(-0.05, -0.05), random(-0.7, 0.05));
  this.position = position.copy();
  this.lifespan = 650;
};

Particle.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
  stroke(600, this.lifespan);
  strokeWeight(0);
  fill(255, opacidadeContrail);
  // fill(255, this.lifespan);
  ellipse(width / 38, this.position.y, width / 180, width / 60);
};

// Is the particle still useful?
Particle.prototype.isDead = function() {
  return this.lifespan < 2;
};

var ParticleSystem = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
  this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }

  }


  system2.addParticle();
  system2.run();
}

// PARTICLE 2
var Particle2 = function(position) {
  this.acceleration = createVector(0, 0.02);
  this.velocity = createVector(random(-0.05, -0.05), random(-0.7, 0.05));
  this.position = position.copy();
  this.lifespan = 650;
};

Particle2.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle2.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle2.prototype.display = function() {
  stroke(600, this.lifespan);
  strokeWeight(0);
  fill(255, opacidadeContrail);
  ellipse(-width / 38, this.position.y, width / 180, width / 60);
};

// Is the particle still useful?
Particle2.prototype.isDead = function() {
  return this.lifespan < 2;
};

var ParticleSystem2 = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem2.prototype.addParticle = function() {
  this.particles.push(new Particle2(this.origin));
};

ParticleSystem2.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }

  }
  //POP THAT CUTS TRANSLATE
  pop();


}
// ALTITUDE
function controladores() {
  push();

  if (windowWidth > windowHeight) {
    var diametroellipse = height / 7;
  } else {
    var diametroellipse = width / 7;
  }

  if (diametroellipse < 80) {
    var diametroellipse = 80;
  } else {

  }

  if (rotationX > 30) {
    var rotacaoaviaolado = 30;
  } else {
    var rotacaoaviaolado = rotationX;
  }

  if (rotationX < -30) {
    var rotacaoaviaolado = -30;
  }



  noFill();

  //AREA DO CIRCULO COM aviaolado
  strokeWeight(diametroellipse / 50);
  translate(diametroellipse, height - 1.6 * diametroellipse);

  push();
  stroke(255, 255, 255, 255);
  if (alturaemfeet > 400) {
    stroke(255, 94, 77, 255);
  }
  if (alturaemfeet < 3) {
    stroke(255, 94, 77, 255);
  }
  ellipse(0, 0, diametroellipse, diametroellipse);
  translate(0, 0);

  rotate(-1 * rotacaoaviaolado);
  image(aviaolado, -diametroellipse / 2 + diametroellipse * 0.2, -diametroellipse / 8, diametroellipse * 0.6, diametroellipse * 0.258);
  if (alturaemfeet > 400) {
    image(aviaoladover, -diametroellipse / 2 + diametroellipse * 0.2, -diametroellipse / 8, diametroellipse * 0.6, diametroellipse * 0.258);
  }
  if (alturaemfeet < 3) {
    image(aviaoladover, -diametroellipse / 2 + diametroellipse * 0.2, -diametroellipse / 8, diametroellipse * 0.6, diametroellipse * 0.258);
  }
  // rect(0,0,diametroellipse,5)
  pop();

  if (rotacaoaviaolado > 3) {
    var grausubida = 1;
  }

  if (rotacaoaviaolado < -3) {
    var grausubida = -1;
  }

  if (grausubida > 0) {
    alturaemfeet++;
  }

  if (grausubida < 0) {
    alturaemfeet--;
  }

  if (alturaemfeet > 400) {
    alturafeet = 40000
  }
  if (alturaemfeet < 3) {
    alturafeet = 300
  }

  var alturafeet = alturaemfeet * 100;



  noStroke();
  fill(255, 255);
  textSize(diametroellipse / 5);
  textStyle(BOLD);
  if (alturaemfeet > 400) {
    fill(255, 94, 77, 255)
  }
  if (alturaemfeet < 3) {
    fill(255, 94, 77, 255)
  }

  text(alturafeet + ' ft', 0, diametroellipse * 0.75);

  var alturameter = alturafeet / 3.28084

  textStyle(NORMAL);
  fill(255, 127);
  if (alturaemfeet > 399.9) {
    alturaemfeet = 400;
    fill(255, 94, 77, 127);
  }
  if (alturaemfeet < 2.99) {
    alturaemfeet = 3;
    fill(255, 94, 77, 127)
  }
  if (alturafeet > 40000) {
    alturafeet = 400;

  }
  if (alturafeet < 300) {
    alturafeet = 300;
  }
  // text(round(alturameter) + ' m', 0, diametroellipse * 0.95);
  text(round(alturaemfeet) + ' ft', 0, diametroellipse * 0.95);

  pop();

  pop();

  //TEMPERATURA

  push();
  strokeWeight(diametroellipse / 50);
  translate(width - diametroellipse, height - 1.6 * diametroellipse);

  push();
  noStroke();

  //TEMP VARIABLES

  // var overBox = false;
  var locked = false;
  var xOffset = 0.0;
  var yOffset = 0.0;

  var tempsec = 0;
  var tempinitial = 10+(-1*alturafeet/610.76);
  var tempcelsius = tempinitial+(timertemp-10);
  var templimit=0;
  var tempvaryrub = tempcelsius-tempinitial;

  if (tempcelsius>(tempinitial+9)) {
    templimit =1
  }

  // Test if the cursor is over the box
  if (mouseX > windowWidth - diametroellipse * 1.5 && mouseX < windowWidth - diametroellipse / 2 &&
    mouseY > height - 1.6 * diametroellipse - diametroellipse / 2 && mouseY < height - 1.6 * diametroellipse + diametroellipse / 2 && mouseIsPressed) {
    // overBox = true;
    if (!locked) {
      fill(255/5, 94/5, 77/5, 100);
      tempsec = 1;
    }
  } else {

    fill(0, 0, 0, 127);
    // overBox = false;
  }
// COLOR VARIATION ON TEMP ellipse
  if (tempvaryrub >0) {
      fill(255/4, 94/4, 77/4, 140);
  }
  if (tempvaryrub >1) {
      fill(255/3, 94/3, 77/3, 152);
  }
  if (tempvaryrub >2) {
      fill(255/2, 94/2, 77/2, 165);
  }
  if (tempvaryrub >3) {
      fill(255/1.5, 94/1.5, 77/1.5, 178);
  }
  if (tempvaryrub >4) {
      fill(255/1.2, 94/1.2, 77/1.2, 191);
  }
  if (tempvaryrub >5) {
      fill(255, 94, 77, 204);
  }
  if (tempvaryrub >6) {
      fill(255, 94, 77, 216);
  }
  if (tempvaryrub >7) {
      fill(255, 94, 77, 229);
  }
  if (tempvaryrub >8) {
      fill(255, 94, 77, 242);
  }
  if (tempvaryrub >9) {
      fill(255, 94, 77, 255);
  }
//END OF COLOR VARIATION
  ellipse(0, 0, diametroellipse, diametroellipse);

  if (tempsec == 1 && frameCount % 60 == 0 && timertemp > 0) {
    timertemp ++;
  }
  if (tempsec == 0 && frameCount % 60 == 0 && timertemp > 0) {
    timertemp --;
  }
  if (timertemp>20) {
    timertemp=20
  }
  if (timertemp<10) {
    timertemp=10
  }

  image(tempicon, -diametroellipse / 3, -diametroellipse / 3, diametroellipse / 1.5, diametroellipse / 1.5)

//TEXTO TEMPERATURA

noStroke();
fill(255, 255);
textSize(diametroellipse / 5);
textStyle(BOLD);
  text(round(tempcelsius) + ' ˚C', 0, diametroellipse * 0.75);

var tempfarenheit = tempcelsius*1.8+32;

  textStyle(NORMAL);
  fill(255, 127);
    text(round(tempvaryrub) + ' ˚F', 0, diametroellipse * 0.95);

  // text(timertemp, 0, 0);

  pop();

}



function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
