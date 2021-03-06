function Blob () {
  this.setWeight();
  this.setColor();
  this.setBounds();
  this.setPosition();
  this.setVelocity();
  this.setElement();
  this.updateElement();
}

// INITIALIZATION

Blob.prototype.setWeight = function () {
  this.weight = 50;
};

Blob.prototype.setColor = function () {
  this.color = Color.random();
}

Blob.prototype.setBounds = function (bounds) {
  this.bounds = {
    xMin: 0,
    xMax: window.innerWidth,
    yMin: 0,
    yMax: window.innerHeight
  };
};

Blob.prototype.setPosition = function () {
  var xRange = this.bounds.xMax - this.bounds.xMin - this.weight,
      yRange = this.bounds.yMax - this.bounds.yMin - this.weight;

  this.position = {
    x: (this.weight / 2) + Math.floor(Math.random() * xRange),
    y: (this.weight / 2) + Math.floor(Math.random() * yRange)
  }
};

Blob.prototype.setVelocity = function () {
  this.velocity = {
    x: 0,
    y: 0
  };
};

Blob.prototype.setElement = function () {
  this.el = document.createElement('div');
  this.el.classList.add('blob');

  this.el.style.left = this.position.x + "px";
  this.el.style.top  = this.position.y + "px";
};

// PHYSICS

Blob.prototype.distanceTo = function (otherBlob) {
  return Math.sqrt(
    (this.position.x - otherBlob.position.x) * (this.position.x - otherBlob.position.x) +
    (this.position.y - otherBlob.position.y) * (this.position.y - otherBlob.position.y)
  );
}

Blob.prototype.applyVelocity = function () {
  this.position.x += this.velocity.x;
  this.position.y += this.velocity.y;
};

Blob.prototype.applyFriction = function () {
  this.velocity.x *= 0.97;
  this.velocity.y *= 0.97;

  this.velocity.x = Math.abs(this.velocity.x) < 0.05 ? 0 : this.velocity.x;
  this.velocity.y = Math.abs(this.velocity.y) < 0.05 ? 0 : this.velocity.y;
};

Blob.prototype.calculatePulse = function (pos) {
  var vec = { x: this.position.x - pos.x,
              y: this.position.y - pos.y },
      distance        = 1 + Math.sqrt(vec.x * vec.x + vec.y * vec.y),
      cappedDistance  = Math.min(distance, 900);
      strength        = 5 - Math.floor(Math.sqrt(cappedDistance) / 6);

  return {
    x: strength * vec.x / distance,
    y: strength * vec.y / distance
  };
};

Blob.prototype.pulseFrom = function (pos) {
  var pulse = this.calculatePulse(pos);

  this.velocity.x += pulse.x;
  this.velocity.y += pulse.y;
};

Blob.prototype.pulseToward = function (pos) {
  var pulse = this.calculatePulse(pos);

  this.velocity.x -= pulse.x;
  this.velocity.y -= pulse.y;
};

Blob.prototype.limitVelocity = function () {
  var magnitude = Math.sqrt(
    this.velocity.x * this.velocity.x +
    this.velocity.y * this.velocity.y
  );

  if (magnitude > 5) {
    this.velocity.x *= 5 / magnitude;
    this.velocity.y *= 5 / magnitude;
  }
}

// GAME LOOP

Blob.prototype.tick = function () {
  this.limitVelocity();
  this.applyVelocity();
  this.applyFriction();
  this.updateElement();
};

Blob.prototype.updateElement = function () {
  var offset = this.weight / 2;

  this.el.style.background = this.color;

  this.el.style.width  = this.weight + "px";
  this.el.style.height = this.weight + "px";

  this.el.style.zIndex = Math.floor(this.weight);

  this.el.style.left = (this.position.x - offset) + "px";
  this.el.style.top  = (this.position.y - offset) + "px";
};
