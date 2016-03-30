var Color = {
  primaries: [
    "red", "yellow", "blue"
  ],
  mixingHash: {
    red: {
      red: "red", yellow: "orange", blue: "purple",
      orange: "orange", purple: "purple", green: "burlywood",
      burlywood: "burlywood"
    },
    yellow: {
      red: "orange", yellow: "yellow", blue: "green",
      orange: "orange", purple: "burlywood", green: "green",
      burlywood: "burlywood"
    },
    blue: {
      red: "purple", yellow: "green", blue: "blue",
      orange: "burlywood", purple: "purple", green: "green",
      burlywood: "burlywood"
    },
    orange: {
      red: "orange", yellow: "orange", blue: "burlywood",
      orange: "orange", purple: "burlywood", green: "burlywood",
      burlywood: "burlywood"
    },
    purple: {
      red: "purple", yellow: "burlywood", blue: "purple",
      orange: "burlywood", purple: "purple", green: "burlywood",
      burlywood: "burlywood"
    },
    green: {
      red: "burlywood", yellow: "green", blue: "green",
      orange: "burlywood", purple: "burlywood", green: "green",
      burlywood: "burlywood"
    },
    burlywood: {
      red: "burlywood", yellow: "burlywood", blue: "burlywood",
      orange: "burlywood", purple: "burlywood", green: "burlywood",
      burlywood: "burlywood"
    }
  },
  mix: function (one, two) {
    return this.mixingHash[one][two];
  },
  random: function () {
    return this.primaries[Math.floor(Math.random() * this.primaries.length)];
  }
}
