(function () {
  var dish    = new Dish();

  function tick () {
    dish.tick();
    window.requestAnimationFrame(tick);
  }

  var blobCount = 0;

  setInterval(function () {
    dish.populateBlobs(2)
  }, 2000);

  tick();
})()
