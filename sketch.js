// all the data, like the distances and the radius, has been taken from the NASA website, all the textures by solarsystemscope.com

let dir = 'assets/'

let sun;


let posX, posY, color, blackhole, torf;
let radius, distance, parent, tex, emission;

let stars = [];
let sky = 0;
let sunRadius = 24;
let ratio = 50;


let testo;

function setup() {
  createCanvas(windowWidth, windowHeight - 4, WEBGL);

  // let's create some masses in the universe
  sun = new Planet(sunRadius, 0, null, loadImage(dir + "sun.jpg"), 'white');
  mercury = new Planet(sunRadius / 285 * ratio, 65.42, sun, loadImage(dir + "mercury.jpg")); // all the ratio between sun and the planets are correct.
  venus = new Planet(sunRadius / 114.9 * ratio, 108.42, sun, loadImage(dir + "venus.jpg"));
  earth = new Planet(sunRadius / 109.16 * ratio, 149.60, sun, loadImage(dir + "earth.jpg"));
  mars = new Planet(sunRadius / 205.19 * ratio, 237.01, sun, loadImage(dir + "mars.jpg"));

  // let's make some neighbors all around
  for (let i = 0; i < 500; i++) { // just fivehundred, i know, but create 1,000,000,000,000,000,000,000 it could be a bit messy
    stars[i] = new Star(random(width), random(height), random(255) * 10, random(0.1, 3), random(1));
  }

  // put some text, the legend say that during the eclipses it's possible to see them also from the Earth
  testo = createGraphics(window.innerWidth - 4, window.innerHeight - 4);
  testo.textFont('Russo One');
  testo.textSize(36);
  testo.fill(255);
  testo.textAlign(CENTER, CENTER)
  testo.text('the magic of the solar system\non a screen', windowWidth / 2, windowHeight / 10)

  post = createGraphics(window.innerWidth - 4, window.innerHeight - 4);
  post.textFont('Russo One');
  post.textSize(18);
  post.fill(255);
  post.textAlign(CENTER, CENTER)
  post.text('p.s. the sizes, distances, the proportions and the satellites have\nbeen "approximated" in order to make everything visible.\nFurthermore, I have to insert only as far as Mars, because of the enormous difference of sizes\n\nnot my fault if everything is huge as f*ck ', windowWidth / 2, windowHeight / 10 * 9)
}

function draw() {
  background(sky); // the dark atmosphere is cool, pointless to deny it

  for (let i = 0; i < stars.length; i++) { // but a bit of white is REQUIRED
    stars[i].display();
    stars[i].move();
  }

  noStroke()

  //make the text visible on a plane
  push()
  texture(testo);
  plane(window.innerWidth - 4, window.innerHeight - 4);
  pop()
  push()
  texture(post);
  plane(window.innerWidth, window.innerHeight);
  pop()

  // parameters for visualize correctly the scene
  translate(0, -70, 350)
  rotateX(PI / 3);
  rotateZ(frameCount / 600);

  // show and update the sun and all the planets
  sun.display();
  sun.move();

  mercury.display();
  mercury.move();

  venus.display();
  venus.move();

  earth.display();
  earth.move();

  mars.display();
  mars.move();
}

// class for all the bodies
class Planet {
  constructor(rad, dst, parent, tex, emission) { // setting the chaarcteristics
    this.radius = rad;
    this.distance = dst;
    this.parent = parent;
    this.texture = tex;
    this.emission = emission;
    this.orbit = distance * 2 * PI;
    this.angle = random(2 * PI);
  }

  display() { // making them visible
    push()
    strokeWeight(0.25);
    stroke(70);
    noFill();
    ellipse(0, 0, this.distance * 2);
    pop()
    push()
    if (this.emission) {
      fill(this.emission);
      scale(100);
      scale(0.01);
    }

    rotate(-this.angle);
    translate(this.distance, 0);
    if (this.emission) {
      ambientLight(this.emission);
    }

    ambientMaterial(255);
    texture(this.texture);
    sphere(this.radius);
    pop()
  }

  move() { // and then making them orbit
    if (this.orbit > 0) {
      let speed = 100;
      this.angle += (speed / this.orbit) * (2 * PI);
    }
  }
}

// class for all the other galaxies
class Star {
  constructor(posX, posY, color, blackhole, torf) {
    this.x = posX;
    this.y = posY;
    this.color = color;
    this.blackhole = blackhole;
    this.const = torf;
  }

  display() {
    push()
    translate(-windowWidth / 2, -windowHeight / 2)
    stroke(this.color)
    point(this.x, this.y);
    pop()
  }

  move() {
    if (this.color >= 1000) {
      this.const = true;
    }
    if (this.color <= 0) {
      this.const = false;
    }

    if (this.down = true) {
      this.color -= this.blackhole
    } else {
      this.color += this.blackhole
    }
  }
}
