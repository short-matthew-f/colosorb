console.log('stuff');

(function () {
  var dish    = new Dish();

  function tick () {
    window.requestAnimationFrame(tick);
    dish.tick();
  }

  var blobCount = 0;

  setInterval(function () {
    blobCount = 1 + (blobCount % 2);
    dish.populateBlobs(blobCount)
    console.log(blobCount);
  }, 2000);

  tick();
})()
