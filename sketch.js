var alturaemfeet = 30;
let timertemp = 100;
let timertext = 0;

var humiclicks = 0;
var humimouseover = 0;

var triangleRightOver = 0;
var triangleLeftOver = 0;
var textCounter = 0;
var textClicks = 0;
var textsec = 1;

var diametroellipse = 0;

let opacidadeWingtip = 1;
let opacidadeContrail = 1;

var opacidademulthumi = 0;
var opacidademulttemp = 0;
var opacidadeWingtipmultalt = 0;
var opacidadeWingtipFinal = 0;
var opacidadeContrailMultalt = 0;
var opacidadeContrailFinal = 0;

let wingtipon = 1;
let contrailon = 1;
var mousepressionado = 0;

function setup() {

  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  imgfundo = loadImage("assets/bg.png");
  aviao1 = loadImage("assets/aviao1.svg");
  aviaolado = loadImage("assets/aviaolado.svg");
  aviaoladover = loadImage("assets/aviaoladover.svg");
  tempicon = loadImage("assets/tempicon.svg");
  humidity1 = loadImage("assets/humidity1.svg");
  humidity2 = loadImage("assets/humidity2.svg");
  humidity3 = loadImage("assets/humidity3.svg");
  humidity4 = loadImage("assets/humidity4.svg");
  iconplus = loadImage("assets/plus.svg");
  iconminus = loadImage("assets/minus.svg");

  tap = loadImage("assets/tap.svg");
  tilt1 = loadImage("assets/tilt1.svg");
  tilt2 = loadImage("assets/tilt2.svg");
  rotatenoventa = loadImage("assets/rotatenoventa.svg");
  rotatenoventa2 = loadImage("assets/rotatenoventa2.svg");


  system = new ParticleSystem(createVector(+width / 20 - width / 50, -height / 20 + height / 10));
  system2 = new ParticleSystem2(createVector(+width / 20 - width / 50, -height / 20 + height / 10));
  system3 = new ParticleSystem3(createVector(+width / 20 - width / 50, -height / 20 + height / 10));
  system4 = new ParticleSystem4(createVector(+width / 20 - width / 50, -height / 20 + height / 10));

}

function draw() {



  background(0, 0, 0)
  relogiofundo();
  aviaouno();
  controladores();
  // particulas();



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
  push();


if (frameCount<500) {
var opacidadefundo = 25;
}
if (frameCount>=500) {
  opacidadefundo = 25+(frameCount-500)
}
if (frameCount>1000) {
  opacidadefundo = 255
}

  tint(255,opacidadefundo)
  image(imgfundo, 0, posicaoybg, width, height * 10);
pop();
  //TEXTO PARA TESTE
  textSize(20);
  textAlign(CENTER);
  textFont("Josefin Sans");
  // text(tempvaryrub, width / 2, height / 2 - 30);
  // text(opacidademulthumi, width / 2, height / 2);
  // text(opacidademulttemp, width / 2, height / 2 + 30);
  // text(opacidadeWingtipmultalt, width / 2, height / 2 + 60);

}

function aviaouno() {

  //OPACIDADE controladores

  // ACCORDING TO HUMIDITY
  if (humiclicks == 4) {
    opacidademulthumi = 0;
  }
  if (humiclicks == 3) {
    opacidademulthumi = 0.25;
  }
  if (humiclicks == 2) {
    opacidademulthumi = 0.5;
  }
  if (humiclicks == 1) {
    opacidademulthumi = 1;
  }
  // ACCORDING TO TEMP IS opacidademulttemp

  if (timertemp >= 100) {
    opacidademulttemp = 2 + (-timertemp / 100);
  }

  // ACCORDING TO ALTITUDE


  if (alturaemfeet < 300) {
    opacidadeWingtipmultalt = (-1.08 * 0.1 * alturaemfeet + 32) / 25;
  }
  if (alturaemfeet > 300) {
    opacidadeWingtipmultalt = 0;
  }
  if (alturaemfeet < 2000) {
    opacidadeContrailMultalt = 0;
  }
  if (alturaemfeet > 2000) {
    opacidadeContrailMultalt = (0.25 * 0.1 * alturaemfeet - 50) / 25;
  }
  if (alturaemfeet > 3000) {
    opacidadeContrailMultalt = 1;
  }

  // OPACIDADE FINAL


  if (1 == 1) {
    opacidadeWingtipFinal = 25 * opacidademulthumi * opacidademulttemp * opacidadeWingtipmultalt;
  }


  if (1 == 1) {
    opacidadeContrailFinal = 25 * opacidademulthumi * opacidademulttemp * opacidadeContrailMultalt;
  }

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

  system.addParticle();
  system.run();
}

//OPACIDADE AND EXISTENCE OF CONTRAIL


// PARTICLE 1
var Particle = function(position) {
  this.acceleration = createVector(0, 0.02);
  this.velocity = createVector(random(-0.05, -0.05), random(-0.7, 0.05));
  this.position = position.copy();
  this.lifespan = 450 * opacidademulttemp;
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
  fill(255, opacidadeContrailFinal);
  // fill(255, this.lifespan);
  ellipse(width / 38, ((this.position.y * 2) - diametroellipse / 2.4), width / 180, width / 60);
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
    if (contrailon == 1) {
      p.run();
    } else {}
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }

  }

  // PARTICLE 2

  system2.addParticle();
  system2.run();
}

var Particle2 = function(position) {
  this.acceleration = createVector(0, 0.02);
  this.velocity = createVector(random(-0.05, -0.05), random(-0.7, 0.05));
  this.position = position.copy();
  this.lifespan = 450 * opacidademulttemp;
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
  // fill(255, 25);
  fill(255, opacidadeContrailFinal);

  ellipse(-width / 38, ((this.position.y * 2) - diametroellipse / 2.4), width / 180, width / 60);
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
    if (contrailon == 1) {
      p.run();
    } else {}
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }


  // PARTICLE 3
  system3.addParticle();
  system3.run();
}
var Particle3 = function(position) {
  this.acceleration = createVector(0, 0.02);
  this.velocity = createVector(random(-0.05, -0.05), random(-0.7, 0.05));
  this.position = position.copy();
  this.lifespan = 300 * opacidademulttemp;
};

Particle3.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle3.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};

// Method to display
Particle3.prototype.display = function() {
  stroke(600, this.lifespan);
  strokeWeight(0);
  fill(255, opacidadeWingtipFinal);
  ellipse(-width / 11.2, this.position.y - height / 90, width / 270, width / 60);
};

// Is the particle still useful?
Particle3.prototype.isDead = function() {
  return this.lifespan < 2;
};

var ParticleSystem3 = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem3.prototype.addParticle = function() {
  this.particles.push(new Particle3(this.origin));
};

ParticleSystem3.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    if (wingtipon == 1) {
      p.run();
    } else {

    }
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }

  // PARTICLE 4
  system4.addParticle();
  system4.run();
}
var Particle4 = function(position) {
  this.acceleration = createVector(0, 0.02);
  this.velocity = createVector(random(-0.05, -0.05), random(-0.7, 0.05));
  this.position = position.copy();
  this.lifespan = 300 * opacidademulttemp;
};

Particle4.prototype.run = function() {
  this.update();
  this.display();
};

// Method to update position
Particle4.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
};
// Method to display
Particle4.prototype.display = function() {
  stroke(600, this.lifespan);
  strokeWeight(0);
  fill(255, opacidadeWingtipFinal);
  ellipse(+width / 11.2, this.position.y - height / 90, width / 270, width / 60);
};

// Is the particle still useful?
Particle4.prototype.isDead = function() {
  return this.lifespan < 2;
};

var ParticleSystem4 = function(position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem4.prototype.addParticle = function() {
  this.particles.push(new Particle4(this.origin));
};

ParticleSystem4.prototype.run = function() {
  for (var i = this.particles.length - 1; i >= 0; i--) {
    var p = this.particles[i];
    if (wingtipon == 1) {
      p.run();
    } else {

    }
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
    diametroellipse = height / 7;
  } else {
    diametroellipse = width / 7;
  }

  if (diametroellipse < 80) {
    diametroellipse = 80;
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
  if (alturaemfeet > 4000) {
    alturaemfeet = 4001
  }

  if (alturaemfeet < 30) {
    alturaemfeet = 29
  }

  var alturafeet = alturaemfeet * 10;
  // var alturafeet = 3000;
  stroke(255, 255, 255, 255);
  if (alturafeet > 40000) {
    stroke(255, 94, 77, 255);
  }
  if (alturafeet < 300) {
    stroke(255, 94, 77, 255);
  }
  ellipse(0, 0, diametroellipse, diametroellipse);
  translate(0, 0);


  //BUTTONS FOR UP OR DOWN

  image(iconplus, diametroellipse / 2 - diametroellipse / 4, diametroellipse / 4, diametroellipse / 4, diametroellipse / 4)

  image(iconminus, -diametroellipse / 2, diametroellipse / 4, diametroellipse / 4, diametroellipse / 4)

  if (mouseX > diametroellipse + diametroellipse / 2.75 - diametroellipse / 8 && mouseX < diametroellipse + diametroellipse / 2.75 + diametroellipse / 8 &&
    mouseY > height - 1.6 * diametroellipse + diametroellipse / 2.75 - diametroellipse / 8 && mouseY < height - 1.6 * diametroellipse + diametroellipse / 2.75 + diametroellipse / 8 && mouseIsPressed) {
    rotationX++;
  }

  if (mouseX > diametroellipse - diametroellipse / 2.75 - diametroellipse / 8 && mouseX < diametroellipse - diametroellipse / 2.75 + diametroellipse / 8 &&
    mouseY > height - 1.6 * diametroellipse + diametroellipse / 2.75 - diametroellipse / 8 && mouseY < height - 1.6 * diametroellipse + diametroellipse / 2.75 + diametroellipse / 8 && mouseIsPressed) {
    rotationX--;
  }

  // INFO 2 ALTITUDE
  var info2opacity = 255;
  if (frameCount < 100) {
    info2opacity = (frameCount) * 4;

  } else {
    info2opacity = 255;
  }
  if (frameCount > 600) {
    info2opacity = 255 - 4 * (frameCount - 600);
  }
  push();
  noStroke();
  translate(0, -diametroellipse/2 - diametroellipse / 8)
  textSize(diametroellipse / 6);
  textStyle(BOLD);
  fill(255, 221, 13, info2opacity);
  tint(255, info2opacity);
  textAlign(CENTER);
  rotate(0);
  text('Tilt device to', 0, -diametroellipse - diametroellipse / 12 - diametroellipse / 2.5);
  text('control altitude or', 0, -diametroellipse - diametroellipse / 12 - diametroellipse / 5);
  text('use +/– buttons', 0, -diametroellipse - diametroellipse / 12);
  fill(255, 221, 13, info2opacity);
  image(tilt2, -diametroellipse / 2, -diametroellipse, diametroellipse, diametroellipse)
  translate(0,-diametroellipse/2)
  rotate(-10 * (sin(frameCount / 0.2)));
  image(tilt1, -diametroellipse / 2, -diametroellipse/2, diametroellipse, diametroellipse)
  pop();

  // AVIAO LADO
  rotate(-1 * rotacaoaviaolado);
  if (alturafeet > 40000 || alturafeet < 300) {
    image(aviaoladover, -diametroellipse / 2 + diametroellipse * 0.2, -diametroellipse / 8, diametroellipse * 0.6, diametroellipse * 0.258);
  } else {
    image(aviaolado, -diametroellipse / 2 + diametroellipse * 0.2, -diametroellipse / 8, diametroellipse * 0.6, diametroellipse * 0.258);
  }

  pop();
  var grausubida = 0;

  if (rotacaoaviaolado > 3) {
    grausubida = 1;
  }

  if (rotacaoaviaolado < -3) {
    grausubida = -1;
  }

  if (rotacaoaviaolado > 10) {
    grausubida = 2;
  }

  if (rotacaoaviaolado < -10) {
    grausubida = -2;
  }

  if (rotacaoaviaolado > 20) {
    grausubida = 3;
  }

  if (rotacaoaviaolado < -20) {
    grausubida = -3;
  }

  //CONTROL OF ASCENT

  if (grausubida > 0) {
    (alturaemfeet++);
  }

  if (grausubida > 1.5) {
    (alturaemfeet++) + (alturaemfeet++);
  }

  if (grausubida > 2.5) {
    (alturaemfeet++) + (alturaemfeet++) + (alturaemfeet++) + (alturaemfeet++);
  }

  if (grausubida < 0) {
    (alturaemfeet--);
  }

  if (grausubida < -1.5) {
    (alturaemfeet--) + (alturaemfeet--);
  }

  if (grausubida < -2.5) {
    (alturaemfeet--) + (alturaemfeet--) + (alturaemfeet--) + (alturaemfeet--);
  }

  if (alturaemfeet > 4000) {
    alturafeet = 40000
  }
  if (alturaemfeet < 30) {
    alturafeet = 300
  }

  noStroke();
  fill(255, 255);
  textSize(diametroellipse / 5);
  textStyle(BOLD);
  if (alturaemfeet > 4000) {
    alturafeet = 40000;
    fill(255, 94, 77, 255);
  }
  if (alturaemfeet < 30) {
    alturafeet = 300;
    fill(255, 94, 77, 255)
  }

  text(round(alturafeet) + ' ft', 0, diametroellipse * 0.75);

  var alturameter = alturafeet / 3.28084

  textStyle(NORMAL);
  fill(255, 127);
  if (alturaemfeet > 4000) {
    alturafeet = 40000;
    fill(255, 94, 77, 127);
  }
  if (alturaemfeet < 30) {

    fill(255, 94, 77, 127)
  }
  text(round(alturameter) + ' m', 0, diametroellipse * 0.95);

  pop();

  pop();

  //END OF ALTITUDE

  //TEMPERATURA STARTS

  push();
  strokeWeight(diametroellipse / 50);

  push();
  translate(width - diametroellipse, height - 1.6 * diametroellipse);

  push();
  noStroke();

  //TEMP VARIABLES

  // var overBox = false;
  var locked = false;
  var xOffset = 0.0;
  var yOffset = 0.0;

  var tempsec = 0;
  var tempinitial = 10 + (-1 * alturafeet / 610.76);
  var tempcelsius = tempinitial + (timertemp / 10 - 10);
  var templimit = 0;
  var tempvaryrub = tempcelsius - tempinitial;

  // text(tempvaryrub,10,10)

  if (tempcelsius > (tempinitial + 9)) {
    templimit = 1
  }

  // Test if the cursor is over the box

  fill(0, 0, 0, 127);
  ellipse(0, 0, diametroellipse, diametroellipse);

  if (mouseX > windowWidth - diametroellipse * 1.5 && mouseX < windowWidth - diametroellipse / 2 &&
    mouseY > height - 1.6 * diametroellipse - diametroellipse / 2 && mouseY < height - 1.6 * diametroellipse + diametroellipse / 2 && mouseIsPressed) {
    if (!locked) {
      fill(255 / 5, 94 / 5, 77 / 5, 100);
      tempsec = 1;
    }
  } else {

    fill(0, 0, 0, 127);
    // overBox = false;
  }
  // COLOR VARIATION ON TEMP ellipse

  var opacidadecircletemp = tempvaryrub / 9.99 * 255;
  fill(255, 94, 77, opacidadecircletemp);
  ellipse(0, 0, diametroellipse, diametroellipse);

  //END OF COLOR VARIATION

  //TIMER

  if (tempsec == 1 && frameCount % 3 == 0 && timertemp > 0) {
    timertemp++;
  }
  if (tempsec == 0 && frameCount % 3 == 0 && timertemp > 0) {
    timertemp--;
  }
  if (timertemp > 200) {
    timertemp = 200
  }
  if (timertemp < 100) {
    timertemp = 100
  }


  //TEXTO TEMPERATURA

  noStroke();
  fill(255, 255);
  textSize(diametroellipse / 5);
  textStyle(BOLD);
  text(round(tempcelsius) + ' ˚C', 0, diametroellipse * 0.75);

  var tempfarenheit = tempcelsius * 1.8 + 32;

  textStyle(NORMAL);
  fill(255, 127);

  text(round(tempfarenheit) + ' ˚F', 0, diametroellipse * 0.95);
  pop();
  // text(timertemp, 0, 0);

  pop();

  var tempicontransp = 255
  // if (mouseX > windowWidth - diametroellipse * 1.5 && mouseX < windowWidth - diametroellipse / 2 &&
  //   mouseY > height - 1.6 * diametroellipse - diametroellipse / 2 && mouseY < height - 1.6 * diametroellipse + diametroellipse / 2 && mouseIsPressed) {
  //   tempicontransp = 200;
  // }

  var tempiconx = mouseX - diametroellipse / 3;
  var tempicony = mouseY - diametroellipse / 3;

  if (tempiconx > width - diametroellipse * 1.17) {
    tempiconx = width - diametroellipse * 1.17;
  }
  if (tempiconx < width - diametroellipse * 1.5) {
    tempiconx = width - diametroellipse * 1.5;
  }
  if (tempicony > height - diametroellipse * 1.76) {
    tempicony = height - diametroellipse * 1.76;
  }
  if (tempicony < height - diametroellipse * 2.1) {
    tempicony = height - diametroellipse * 2.1;
  }

  if (tempsec == 0) {
    tempiconx = width - diametroellipse - diametroellipse / 3;
    tempicony = height - 1.6 * diametroellipse * 1.2;


  }

  tint(255, tempicontransp)
  image(tempicon, tempiconx, tempicony, diametroellipse / 1.5, diametroellipse / 1.5)

  //HUMIDITY STARTS
  pop();

  push();
  translate(width - diametroellipse, height - 1.6 * diametroellipse);

  strokeWeight(diametroellipse / 50);
  // translate(width - diametroellipse/2, height - 3 * diametroellipse);

  //TEMP VARIABLES

  var humiincrease = 0;

  // Test if the cursor is over the box

  if (mouseX > windowWidth - diametroellipse * 1.5 && mouseX < windowWidth - diametroellipse / 2 &&
    mouseY > height - 3 * diametroellipse - diametroellipse / 3 && mouseY < height - 3 * diametroellipse + diametroellipse / 1.5) {
    humimouseover = 1;
  } else {
    humimouseover = 0;
  }


  if (humiclicks > 4) {
    humiclicks = 1;
  }
  if (humiclicks < 1) {
    humiclicks = 1;
  }

  var humitransp = 255;

  if (mouseX > windowWidth - diametroellipse * 1.5 && mouseX < windowWidth - diametroellipse / 2 &&
    mouseY > height - 3 * diametroellipse - diametroellipse / 3 && mouseY < height - 3 * diametroellipse + diametroellipse / 1.5 && mouseIsPressed) {
    humitransp = 200;
  }


  if (humiclicks == 1) {
    tint(255, humitransp)
    image(humidity1, -diametroellipse / 2, -diametroellipse * 1.75, diametroellipse, diametroellipse)
  }
  if (humiclicks == 2) {
    tint(255, humitransp)
    image(humidity2, -diametroellipse / 2, -diametroellipse * 1.75, diametroellipse, diametroellipse)
  }
  if (humiclicks == 3) {
    tint(255, humitransp)
    image(humidity3, -diametroellipse / 2, -diametroellipse * 1.75, diametroellipse, diametroellipse)
  }
  if (humiclicks == 4) {
    tint(255, humitransp)
    image(humidity4, -diametroellipse / 2, -diametroellipse * 1.75, diametroellipse, diametroellipse)
  }

  // HOW TO USE - HUMIDITY AND TEMP

  var info1opacity = 255;
  var info1halfway = 0;

  if (frameCount < 200) {
    info1opacity = (frameCount - 100) * 4;

  } else {
    info1opacity = 255;
  }

  if (frameCount > 600) {
    info1opacity = 255 - 4 * (frameCount - 600);

  }

  push();
  translate(0, -2 * diametroellipse + diametroellipse / 8)
  // rect(0,0,100,10)
  textStyle(BOLD);
  fill(255, 221, 13, info1opacity);
  tint(255, info1opacity);

  textAlign(CENTER);
  textSize(diametroellipse / 6);

  // text(frameCount, 0, -diametroellipse-diametroellipse/12-diametroellipse/2.5);
  text('Tap to change', 0, -diametroellipse - diametroellipse / 12 - diametroellipse / 2.5);
  text('humidity or', 0, -diametroellipse - diametroellipse / 12 - diametroellipse / 5);
  text('temperature', 0, -diametroellipse - diametroellipse / 12);
  image(tilt2, -diametroellipse / 2, -diametroellipse, diametroellipse, diametroellipse)
  // rotate(5 * (sin(frameCount / 0.2)));
  image(tap, -diametroellipse / 2, -diametroellipse-(-0.06*diametroellipse*(sin(frameCount / 0.2))), diametroellipse, diametroellipse)
  pop();
  pop();
  pop();

  // HUMIDITY END

  //TEXT WARNINGS

  push();
  translate(width / 2, height / 1.6)
  textSize(diametroellipse / 5);

  noStroke();
  fill(255, 255);
  rectMode(CENTER);
  let warningupordown = 'Increase altitude for contrail or lower for wingtip contrail.';


  var opacidadetextoAlt = 0;
  var widthtextbox = width / 3;

  if (diametroellipse < 81) {
    widthtextbox = width / 2;
  }


  if (alturaemfeet > 1950 && alturaemfeet < 3000) {
    opacidadetextoAlt = 255 - (opacidadeContrailFinal * 20)

  }
  if (alturaemfeet < 350) {
    opacidadetextoAlt = 255 * (-2 * opacidadeWingtipmultalt + 1);

  }
  if (alturaemfeet >= 350 && alturaemfeet <= 1950 && alturaemfeet <= 2500) {
    opacidadetextoAlt = 255;
  }
  if (alturaemfeet >= 2500) {
    opacidadetextoAlt = 0;
  }


  fill(255, opacidadetextoAlt)
  textStyle(BOLD);
  text('Whooops! No contrails', 0, -diametroellipse / 2);
  // text(opacidadeContrail, 0,-diametroellipse/2);
  textStyle(NORMAL);
  fill(255, 0.5 * opacidadetextoAlt)
  text(warningupordown, 0, diametroellipse / 2, widthtextbox, diametroellipse * 1.5);
  // Text wraps within text box
  //
  // if (opacidademulthumi == 0) {
  //   if (alturaemfeet <= 200) {
  //     textStyle(BOLD);
  //     fill(255, 255)
  //     text('Low humidity, no contrails.', 0, -diametroellipse / 2);
  //     textStyle(NORMAL);
  //     fill(255, 127)
  //     let becausenowater = 'This happens because there is no water to condense.';
  //     text(becausenowater, 0, diametroellipse / 2, widthtextbox, diametroellipse * 1.5);
  //   }
  // }

  if (opacidademulthumi == 0) {
    if (alturaemfeet <= 200) {
      textStyle(BOLD);
      fill(255, 255)
      text('Low humidity, no contrails.', 0, -diametroellipse / 2);
      textStyle(NORMAL);
      fill(255, 127)
      let becausenowater = 'This happens because there is no water to condense.';
      text(becausenowater, 0, diametroellipse / 2, widthtextbox, diametroellipse * 1.5);
    }
    if (alturaemfeet >= 2000) {
      textStyle(BOLD);
      fill(255, 255)
      text('Low humidity, no contrails.', 0, -diametroellipse / 2);
      textStyle(NORMAL);
      fill(255, 127)
      let becausenowater = 'This happens because there is no water to condense.';
      text(becausenowater, 0, diametroellipse / 2, widthtextbox, diametroellipse * 1.5);
    }
  }

  if (opacidademulttemp < 0.5) {
    if (alturaemfeet <= 200) {
      textStyle(BOLD);
      fill(255, 94, 77, 255 * (1 - 2 * opacidademulttemp))
      text('Too hot!', 0, +diametroellipse + 2);
      textStyle(NORMAL);
      fill(255, 255 * 0.5 * (1 - 2 * opacidademulttemp))
      let toohot = 'Wingtip contrails get shorter or disappear on higher temperatures.';
      text(toohot, 0, diametroellipse * 2, widthtextbox, diametroellipse * 1.5);
    }
    if (alturaemfeet >= 2500) {
      textStyle(BOLD);
      fill(255, 94, 77, 255 * (1 - 2 * opacidademulttemp))
      text('Too hot!', 0, +diametroellipse + 2);
      textStyle(NORMAL);
      fill(255, 255 * 0.5 * (1 - 2 * opacidademulttemp))
      let toohot = 'Contrails get shorter or disappear on higher temperatures.';
      text(toohot, 0, diametroellipse * 2, widthtextbox, diametroellipse * 1.5);
    }
  }

  // TEXTS INFO UP
  pop();
  if (rotationY < 0) {
    var positionxTextoUp = width / 2 - rotationY * rotationY / 8;

  } else {
    positionxTextoUp = width / 2 + rotationY * rotationY / 8;
  }
  var positionyTextoUp = height / 3.5 - width / 10;

  //TRIANGULOS
  var tgsize = diametroellipse / 5;

// INFO 3 - triangle

var info3opacity = 255;

if (frameCount < 300) {
  info3opacity = (frameCount - 150) * 4;

} else {
  info3opacity = 255;
}

if (frameCount > 600) {
  info3opacity = 255 - 4 * (frameCount - 600);

}

push();
noStroke();
translate(width/2, diametroellipse*2-diametroellipse/2)
textSize(diametroellipse / 6);
textStyle(BOLD);
fill(255, 221, 13, info3opacity);
tint(255, info3opacity);
textAlign(LEFT);
rotate(0);
text('Rotate or use arrows', diametroellipse/2, - diametroellipse / 12 - diametroellipse / 2.5);
text('to see more info', diametroellipse/2, - diametroellipse / 12 - diametroellipse / 5);
// text('use +/– buttons', 0, -diametroellipse - diametroellipse / 12);
fill(255, 221, 13, info3opacity);
image(tilt2, -diametroellipse / 2, -diametroellipse, diametroellipse, diametroellipse)
translate(0,-diametroellipse/2)
rotate(-10 * (sin(frameCount / 0.2)));
image(rotatenoventa, -diametroellipse / 2, -diametroellipse/2, diametroellipse, diametroellipse)
pop();


  //TRIANGULO RIGHT
  push();
  //test mouse lightPosition
  if (mouseX > width - diametroellipse - tgsize / 1.5 && mouseX < width - diametroellipse + tgsize / 3 &&
    mouseY > positionyTextoUp - tgsize && mouseY < positionyTextoUp + tgsize) {
    triangleRightOver = 1;
  } else {
    triangleRightOver = 0;
  }
  // last stage stop
  if (textClicks == 4) {
    fill(255, 0);

  } else {
    fill(255, 127)
  } // rect(width-diametroellipse-tgsize/1.5, positionyTextoUp-tgsize, 100, 10)
  if (triangleRightOver == 1 || rotationY < -15) {
    translate(width - diametroellipse - (diametroellipse * 0.1 * (sin(frameCount / 0.2))), positionyTextoUp)
  } else {
    translate(width - diametroellipse, positionyTextoUp)
  }
  noStroke();
  triangle(tgsize / 1.5, 0, -tgsize / 1.5, -tgsize, -tgsize / 1.5, tgsize)
  pop();

  //TRIANGULO 2
  push();

  //test mouse lightPosition
  if (mouseX > diametroellipse - tgsize / 1.5 && mouseX < diametroellipse + tgsize / 3 &&
    mouseY > positionyTextoUp - tgsize && mouseY < positionyTextoUp + tgsize) {
    triangleLeftOver = 1;
  } else {
    triangleLeftOver = 0;
  }
  // last stage stop
  if (textClicks == 1) {
    fill(255, 0)
  } else {
    fill(255, 127)
  }

  if (triangleLeftOver == 1 || rotationY < -15) {
    if (textClicks > 1) {
      translate(diametroellipse - (diametroellipse * -0.1 * (sin(frameCount / 0.2))), positionyTextoUp)
    }
  } else {
    translate(diametroellipse, positionyTextoUp)
  }

  noStroke();

  triangle(-tgsize / 1.5, 0, tgsize / 1.5, -tgsize, tgsize / 1.5, tgsize)
  pop();

  //TIMER

  //TEXT SEC LIGA NO 1

  if (triangleRightOver) {
    if (mouseIsPressed) {
      timertext = 0;
    }
  }
  if (triangleLeftOver) {
    if (mouseIsPressed) {
      timertext = 0;
    }
  }

  if (textsec == 1 && frameCount % 2 == 0 && timertext >= 0) {
    timertext++;
  }
  if (textsec == 0 && frameCount % 2 == 0 && timertext > 0) {
    timertext--;
  }
  if (timertext > 50) {
    timertext = 50
  }
  if (timertext < 0) {
    timertext = 0
  }


  //TESTING TEXTS

  // fill(255,255)
  // text(rotationY, width/2,height/2 );
  // text(textClicks, width/2,height/2 +30);
  // text(textsec, width/2,height/2+60 );
  // text(timertext, width/2,height/2+90 );

  //ROTATION Y AND TEXTCLICKS

  if (rotationY > 30) {
    if (frameCount % 15 == 0) {
      textClicks--
    };
  }

  if (rotationY < -30) {
    if (frameCount % 15 == 0) {
      textClicks++
    };
  }

  if (textClicks > 4) {
    textClicks = 1;
  }
  if (textClicks < 1) {
    textClicks = 1;
  }

  if (rotationY > 0) {
    var opacidadeTextoUp1 = 255 * timertext / 50 * (1 - rotationY / 40);
  } else {
    opacidadeTextoUp1 = 255 * timertext / 50 * (1 + rotationY / 40);
  }

  var opacidadeTextoUp2 = opacidadeTextoUp1;
  var opacidadeTextoUp3 = opacidadeTextoUp1;
  var opacidadeTextoUp4 = opacidadeTextoUp1;

  //TEXT 1 - TITLE

  if (textClicks == 1) {
    textStyle(BOLD);
    fill(255, opacidadeTextoUp1)
    textSize(diametroellipse / 1.5)
    text('contrails', positionxTextoUp, positionyTextoUp)
    textStyle(NORMAL);
    fill(255, opacidadeTextoUp1 * 0.5)
    textSize(diametroellipse / 5)
    text('what, why and when they appear', positionxTextoUp, positionyTextoUp + diametroellipse / 2.5);
  }

  //TEXT 2 -

  if (textClicks == 2) {

    textStyle(BOLD);
    textSize(diametroellipse / 5)
    fill(255, opacidadeTextoUp2)

    text('what:', positionxTextoUp, positionyTextoUp - diametroellipse / 2);
    textStyle(NORMAL);
    fill(255, opacidadeTextoUp2 * 0.5)

    let text2 = 'Contrail is a short name for the "Condensation Trails" left by planes.';
    push();
    translate(-positionxTextoUp / 2, 0)
    text(text2, positionxTextoUp, positionyTextoUp - diametroellipse / 4, width / 2, diametroellipse);
    pop();

  }

  //TEXT 3 -

  if (textClicks == 3) {
    textStyle(BOLD);
    textSize(diametroellipse / 5)
    fill(255, opacidadeTextoUp3)

    text('why:', positionxTextoUp, positionyTextoUp - diametroellipse / 2);
    textStyle(NORMAL);
    fill(255, opacidadeTextoUp3 * 0.5)

    let text3 = 'Water vapor from the engine or from pressure changes, combined with low temperatures, form linear clouds.';
    push();
    translate(-positionxTextoUp / 2, 0)
    text(text3, positionxTextoUp, positionyTextoUp - diametroellipse / 3, width / 2, diametroellipse);
    pop();
  }
  //TEXT 4 -

  if (textClicks == 4) {
    textStyle(BOLD);
    textSize(diametroellipse / 5)
    fill(255, opacidadeTextoUp4)

    text('when:', positionxTextoUp, positionyTextoUp - diametroellipse / 2);
    textStyle(NORMAL);
    fill(255, opacidadeTextoUp4 * 0.5)

    let text4 = 'Regular contrails come from cruising planes. Close to the ground, they happen due to wing pressure changes.';
    push();
    translate(-positionxTextoUp / 2, 0)
    text(text4, positionxTextoUp, positionyTextoUp - diametroellipse / 3, width / 2, diametroellipse);
    pop();
  }

  push();

}

function mousePressed() {
  if (humimouseover == 1) {
    humiclicks++;
    mousepressionado = 1;
  }
  if (triangleRightOver == 1) {
    textClicks++;
    textsec = 1;
  }
  if (triangleLeftOver == 1) {
    textClicks--;
    textsec = 1;

  }

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
