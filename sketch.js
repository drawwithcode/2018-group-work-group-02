function setup() {
  createCanvas(windowWidth, windowHeight)
  angleMode(DEGREES)
  img = loadImage("assets/bg.png");

}

function draw() {
  background(0, 0, 0)
  relogiofundo();
  aviao1();

}

function relogiofundo() {
  var ho = [hour()] * 3600;
  var mi = [minute()] * 60;
  var se = second();
  var segundosdia = ho + mi + se;
  // var segundosdia = 63000;
  var segundosdiaaltura = 9 * windowHeight * segundosdia / 86400;
  var posicaoybg = -1 * segundosdiaaltura;

//ESSA PARTE ABAIXO NAO SEI PRA QUE SERVE
  // if (mi < 10) {
  //   mi = "0" + mi;
  // }
  // if (ho < 10) {
  //   ho = "0" + ho;
  // }
  // if (se < 10) {
  //   se = "0" + se;
  // }
//IMAGEM DE FUNDO CAMBIANTE
  image(img, 0, posicaoybg, width, height * 10);

//TEXTO PARA TESTE
  textSize(20);
  textAlign(CENTER);
  textFont("Monospace");
  text(segundosdia, width / 2, height / 2 - 30);
  text(segundosdiaaltura, width / 2, height / 2);
  text(windowHeight, width / 2, height / 2 + 30);

}

function aviao1() {

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
