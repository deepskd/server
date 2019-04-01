const mongoose = require("mongoose");
const yaml = require("js-yaml");
const fs = require("fs");
const _ = require("lodash");
require("../models/Team");

const a1PrimeKnitUniform = require("../uniforms/a1Primeknit");
const tripleUp = require("../uniforms/tripleUp");

const Team = mongoose.model("teams");

const football = (team, applicationType = "heat_transfer") => {
  const playerNumber = _.random(0, 99);
  const font = _.sample(Object.keys(a1PrimeKnitUniform.FONTS));
  const mascot = _.replace(team.mascot || team.name, "/", " ");

  let home = {},
    jersey = {},
    pant = {};

  jersey.articleDescription = "A1 PrimeKnit Jersey";
  jersey.price = "$185";
  pant.articleDescription = "A1 PrimeKnit Pant";
  pant.price = "$145";

  jersey.frontText = _.toUpper(mascot);
  jersey.frontImage = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    jersey.frontText
  );
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /APPLICATION_TYPE/g,
    applicationType
  );

  const homeJerseyBaseColor = team.colors ? team.colors[0] : "black";

  if (a1PrimeKnitUniform.colorMapBase(homeJerseyBaseColor) === "sld_pn_black") {
    jersey.frontImage = _.replace(
      jersey.frontImage,
      "cuf&src=sld_pn_white",
      "cuf&src=sld_pn_black"
    );
    jersey.frontImage = _.replace(
      jersey.frontImage,
      "pip&src=sld_pn_white",
      "pip&src=sld_pn_black"
    );
  }
  jersey.baseColor = homeJerseyBaseColor;
  jersey.baseColorCode = a1PrimeKnitUniform.colorMapBase(homeJerseyBaseColor);
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /BASECOLOR/,
    jersey.baseColorCode
  );

  jersey.logoColor = "white";
  jersey.logoColorCode = a1PrimeKnitUniform.colorMapBase("white");
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /LOGOCOLOR/,
    jersey.logoColorCode
  );
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /PLAYERNUMBER/g,
    playerNumber
  );
  jersey.frontImage = _.replace(jersey.frontImage, /(TEAM|NUMBER)FONT/g, font);

  const homePantBaseColor = team.colors ? team.colors[1] : "black";
  pant.baseColor = homePantBaseColor;
  pant.baseColorCode = a1PrimeKnitUniform.colorMapBase(homePantBaseColor);
  pant.frontImage = _.replace(
    a1PrimeKnitUniform.PANTS_URL,
    /BASECOLOR/,
    pant.baseColorCode
  );

  if (homePantBaseColor === "white") {
    pant.logoColor = "black";
    pant.logoColorCode = a1PrimeKnitUniform.colorMapBase("black");
    pant.frontImage = _.replace(
      pant.frontImage,
      /LOGOCOLOR/,
      a1PrimeKnitUniform.colorMapBase("black")
    );
  } else {
    pant.logoColor = "white";
    pant.logoColorCode = a1PrimeKnitUniform.colorMapBase("white");
    pant.frontImage = _.replace(
      pant.frontImage,
      /LOGOCOLOR/,
      a1PrimeKnitUniform.colorMapBase("white")
    );
  }
  home = a1PrimeKnitUniform.homeDecorations({ jersey, pant }, team.colors);

  let away = {};
  jersey = {};
  pant = {};

  jersey.articleDescription = "A1 PrimeKnit Jersey";
  jersey.price = "$185";
  pant.articleDescription = "A1 PrimeKnit Pant";
  pant.price = "$145";

  jersey.frontText = _.toUpper(_.replace(team.name, "/", " "));
  jersey.frontImage = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    jersey.frontText
  );
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /APPLICATION_TYPE/g,
    applicationType
  );
  jersey.baseColor = "white";
  jersey.baseColorCode = a1PrimeKnitUniform.colorMapBase("white");
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /BASECOLOR/,
    jersey.baseColorCode
  );

  jersey.logoColor = "black";
  jersey.logoColorCode = a1PrimeKnitUniform.colorMapBase("black");
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /LOGOCOLOR/,
    jersey.logoColorCode
  );
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /PLAYERNUMBER/g,
    playerNumber
  );
  jersey.frontImage = _.replace(jersey.frontImage, /(TEAM|NUMBER)FONT/g, font);

  let awayPantBaseColor = team.colors ? team.colors[0] : "black";
  pant.baseColor = awayPantBaseColor;
  pant.baseColorCode = a1PrimeKnitUniform.colorMapBase(awayPantBaseColor);
  pant.frontImage = _.replace(
    a1PrimeKnitUniform.PANTS_URL,
    /BASECOLOR/,
    pant.baseColorCode
  );

  if (awayPantBaseColor === "white") {
    pant.logoColor = "black";
    pant.logoColorCode = a1PrimeKnitUniform.colorMapBase("black");
    pant.frontImage = _.replace(
      pant.frontImage,
      /LOGOCOLOR/,
      pant.logoColorCode
    );
  } else {
    pant.logoColor = "white";
    pant.logoColorCode = a1PrimeKnitUniform.colorMapBase("white");
    pant.frontImage = _.replace(
      pant.frontImage,
      /LOGOCOLOR/,
      a1PrimeKnitUniform.colorMapBase("white")
    );
  }
  away = a1PrimeKnitUniform.awayDecorations({ jersey, pant }, team.colors);

  return {
    home,
    away,
    fonts: a1PrimeKnitUniform.FONTS,
    selectedFont: font,
    colors: a1PrimeKnitUniform.COLORS
  };
};

const basketball = team => {
  const playerNumber = _.random(0, 99);
  const font = _.sample(Object.keys(tripleUp.FONTS));
  const mascot = _.replace(team.mascot || team.name, "/", " ");

  let home = {},
    jersey = {},
    pant = {};

  jersey.articleDescription = "TripleUp Jersey";
  jersey.price = "$80";
  pant.articleDescription = "TripeUp Pant";
  pant.price = "$85";

  jersey.frontText = _.toUpper(mascot);
  jersey.textFont = font;
  jersey.frontImage = _.replace(
    tripleUp.JERSEY_URL,
    /TEAMNAME/,
    jersey.frontText
  );
  jersey.baseColor = "white";
  jersey.baseColorCode = tripleUp.colorMap(jersey.baseColor);
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /BASECOLOR/,
    jersey.baseColorCode
  );
  jersey.logoColor = team.colors ? team.colors[0] : "black";
  jersey.logoColorCode = tripleUp.colorMap(jersey.logoColor);
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /LOGOCOLOR/,
    jersey.logoColorCode
  );
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /PLAYERNUMBER/g,
    playerNumber
  );
  jersey.font = font;
  jersey.frontImage = _.replace(jersey.frontImage, /(TEAM|NUMBER)FONT/g, font);

  pant.frontImage = _.replace(
    tripleUp.PANTS_URL,
    /BASECOLOR/,
    tripleUp.colorMap("white")
  );

  pant.frontImage = _.replace(
    pant.frontImage,
    /(LOGO|TEAMTEXT)COLOR/g,
    tripleUp.colorMap(team.colors ? team.colors[0] : "black")
  );
  pant.frontImage = _.replace(
    pant.frontImage,
    /TEAMSTROKECOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[1] : "black")
  );
  home = tripleUp.homeDecorations({ jersey, pant }, team.colors);

  let away = {};
  jersey = {};
  pant = {};

  jersey.articleDescription = "TripleUp Jersey";
  jersey.price = "$80";
  pant.articleDescription = "TripeUp Pant";
  pant.price = "$85";

  jersey.frontText = _.toUpper(_.replace(team.name, "/", " "));
  jersey.textFont = font;
  jersey.frontImage = _.replace(
    tripleUp.JERSEY_URL,
    /TEAMNAME/,
    jersey.frontText
  );

  jersey.baseColor = team.colors ? team.colors[0] : "black";
  jersey.baseColorCode = tripleUp.colorMap(jersey.baseColor);
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /BASECOLOR/,
    jersey.baseColorCode
  );

  jersey.logoColor = team.colors ? team.colors[1] : "white";
  jersey.logoColorCode = tripleUp.colorMap(jersey.logoColor);
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /LOGOCOLOR/,
    jersey.logoColorCode
  );
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /PLAYERNUMBER/g,
    playerNumber
  );
  jersey.font = font;
  jersey.frontImage = _.replace(jersey.frontImage, /(TEAM|NUMBER)FONT/g, font);

  pant.frontImage = _.replace(
    tripleUp.PANTS_URL,
    /BASECOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[0] : "white")
  );

  pant.frontImage = _.replace(
    pant.frontImage,
    /(LOGO|TEAMTEXT)COLOR/g,
    tripleUp.colorMap(team.colors ? team.colors[1] : "white")
  );
  pant.frontImage = _.replace(
    pant.frontImage,
    /TEAMSTROKECOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[0] : "black")
  );
  away = tripleUp.awayDecorations({ jersey, pant }, team.colors);

  return {
    home,
    away,
    fonts: tripleUp.FONTS,
    selectedFont: font,
    colors: tripleUp.COLORS
  };
};

module.exports = app => {
  app.get("/api/products", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const team = await Team.getTeam(req.query.id);
    if (req.query.sports === "basketball") {
      res.status(200).json(basketball(team));
    } else {
      const { embellishmentMethod } = req.query;
      res.status(200).json(football(team, embellishmentMethod));
    }
  });
};
