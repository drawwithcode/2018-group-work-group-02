function setup() {
  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  imgfundo = loadImage("assets/bg.png");
  aviao1 = loadImage("assets/aviao1.svg");
  aviaolado = loadImage("assets/aviaolado.svg");
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
  textFont("Monospace");
  text(segundosdia, width / 2, height / 2 - 30);
  text(segundosdiaaltura, width / 2, height / 2);
  text(windowHeight, width / 2, height / 2 + 30);

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
      var diametroellipse = height/7;
      } else {
      var diametroellipse = width/7;
      }

if (diametroellipse < 80) {
          var diametroellipse = 80;
          } else {

          }

  noFill();
  stroke(255,255);
  strokeWeight(diametroellipse/50);
  translate(diametroellipse,height-1.6*diametroellipse);
  ellipse(0,0,diametroellipse,diametroellipse);
  translate(0,0);



  if (rotationX > 30) {
      var rotacaoaviaolado = 30;
      } else {
      var rotacaoaviaolado = rotationX;
      }

      if (rotationX < -30) {
          var rotacaoaviaolado = -30;
          } else {
          var rotacaoaviaolado = rotationX;
          }

  rotate(rotacaoaviaolado);
  image(aviaolado, -diametroellipse/2+diametroellipse*0.2,-diametroellipse/8,diametroellipse*0.6,diametroellipse*0.258);
  // rect(0,0,diametroellipse,5)
  pop();


}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
