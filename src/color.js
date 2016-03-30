var Color = {
  primaries: [
    "red", "yellow", "blue"
  ],
  mixingHash: {
    red: {
      red: "red", yellow: "orange", blue: "purple",
      orange: "orange", purple: "purple", green: "saddlebrown",
      saddlebrown: "saddlebrown"
    },
    yellow: {
      red: "orange", yellow: "yellow", blue: "green",
      orange: "orange", purple: "saddlebrown", green: "green",
      saddlebrown: "saddlebrown"
    },
    blue: {
      red: "purple", yellow: "green", blue: "blue",
      orange: "saddlebrown", purple: "purple", green: "green",
      saddlebrown: "saddlebrown"
    },
    orange: {
      red: "orange", yellow: "orange", blue: "saddlebrown",
      orange: "orange", purple: "saddlebrown", green: "saddlebrown",
      saddlebrown: "saddlebrown"
    },
    purple: {
      red: "purple", yellow: "saddlebrown", blue: "purple",
      orange: "saddlebrown", purple: "purple", green: "saddlebrown",
      saddlebrown: "saddlebrown"
    },
    green: {
      red: "saddlebrown", yellow: "green", blue: "green",
      orange: "saddlebrown", purple: "saddlebrown", green: "green",
      saddlebrown: "saddlebrown"
    },
    saddlebrown: {
      red: "saddlebrown", yellow: "saddlebrown", blue: "saddlebrown",
      orange: "saddlebrown", purple: "saddlebrown", green: "saddlebrown",
      saddlebrown: "saddlebrown"
    }
  },
  mix: function (one, two) {
    return this.mixingHash[one][two];
  },
  random: function () {
    return this.primaries[Math.floor(Math.random() * this.primaries.length)];
  }
}
