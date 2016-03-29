function Dish () {
  this.setElement();
  this.setBounds();
  this.populateBlobs();
  this.setListeners();
}

// INITIALIZATION

Dish.prototype.setElement = function () {
  this.el = document.querySelector('.dish');
};

Dish.prototype.setListeners = function () {
  var dish = this;


  this.el.addEventListener('mousedown', function (e) {
    var target = { x: e.pageX, y: e.pageY };
    dish.blobs.forEach(function (blob) {
      blob.pulseFrom(target);
    });
  });

  this.el.addEventListener('mousemove', function (e) {
    var target = { x: e.pageX, y: e.pageY };

    dish.blobs.forEach(function (blob) {
      blob.pulseToward(target);
    });
  })
};

Dish.prototype.setBounds = function () {
  this.bounds = {
    xMin: 0,
    xMax: window.innerWidth,
    yMin: 0,
    yMax: window.innerHeight
  };
};

Dish.prototype.populateBlobs = function (count) {
  this.blobs = this.blobs || [];

  for (var i = 0; i < (count || 20); i++) {
    var currentBlob = new Blob();
    this.blobs.push(currentBlob);
    this.el.appendChild(currentBlob.el);
  }
};

Dish.prototype.bubbleMerge = function () {
  var blobs    = this.blobs,
      i        = 0,
      absorbed, j;

  while (i < blobs.length) {
    absorbed = false;
    j = i + 1;

    while (j < blobs.length && !absorbed) {
      var sink      = this.blobs[i],
          source    = this.blobs[j],
          distance  = sink.distanceTo(source),
          maxWeight = Math.max(sink.weight, source.weight);

      if (distance < 15) {
        this.mergeBlobs(i, j);
        absorbed = true;
        i = 0;
      } else if (distance < maxWeight) {
        var midPoint = {
          x: (sink.position.x + source.position.x) / 2,
          y: (sink.position.y + source.position.y) / 2
        }

        sink.pulseToward(midPoint);
        source.pulseToward(midPoint);
      }

      j += 1
    }

    i += 1;
  }
};

Dish.prototype.mergeBlobs = function (i, j) {
  var sink   = this.blobs[i],
      source = this.blobs[j];


  sink.weight = Math.min(Math.ceil(
    Math.max(source.weight, sink.weight) +
    Math.sqrt( Math.min(source.weight, sink.weight))), 100);

  // sink.color = {
  //   r: (sink.color.r + source.color.r) % 256,
  //   g: (sink.color.g + source.color.g) % 256,
  //   b: (sink.color.b + source.color.b) % 256
  // };

  sink.velocity.x = 0;
  sink.velocity.y = 0;

  // remove from the DOM and the array
  source.el.remove();
  this.blobs.splice(j, 1);
};

// GAME LOOP

Dish.prototype.tick = function () {
  var dish = this;

  this.blobs.forEach(function (blob) {
    blob.tick();
  });

  this.bubbleMerge();
};
