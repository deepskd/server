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

  jersey.frontImage = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    _.toUpper(mascot)
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
  pants = {};

  jersey.articleDescription = "A1 PrimeKnit Jersey";
  jersey.price = "$185";
  pant.articleDescription = "A1 PrimeKnit Pant";
  pant.price = "$145";
  jersey.frontImage = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    _.toUpper(_.replace(team.name, "/", " "))
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

  return { home, away, fonts: a1PrimeKnitUniform.FONTS, selectedFont: font };
};

const basketball = team => {
  const playerNumber = _.random(0, 99);
  const font = _.sample(Object.keys(tripleUp.FONTS));
  const mascot = _.replace(team.mascot || team.name, "/", " ");

  let home = {};
  home.jersey = _.replace(tripleUp.JERSEY_URL, /TEAMNAME/, _.toUpper(mascot));
  home.jersey = _.replace(home.jersey, /BASECOLOR/, tripleUp.colorMap("white"));
  home.jersey = _.replace(
    home.jersey,
    /LOGOCOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[0] : "black")
  );
  home.jersey = _.replace(home.jersey, /PLAYERNUMBER/g, playerNumber);
  home.jersey = _.replace(home.jersey, /(TEAM|NUMBER)FONT/g, font);
  home.jersey = tripleUp.homeDecorations(home.jersey, team.colors);

  home.pants = _.replace(
    tripleUp.PANTS_URL,
    /BASECOLOR/,
    tripleUp.colorMap("white")
  );

  home.pants = _.replace(
    home.pants,
    /(LOGO|TEAMTEXT)COLOR/g,
    tripleUp.colorMap(team.colors ? team.colors[0] : "black")
  );
  home.pants = _.replace(
    home.pants,
    /TEAMSTROKECOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[1] : "black")
  );

  let away = {};
  away.jersey = _.replace(
    tripleUp.JERSEY_URL,
    /TEAMNAME/,
    _.toUpper(_.replace(team.name, "/", " "))
  );
  let awayJerseyBaseColor = team.colors ? team.colors[0] : "black";

  away.jersey = _.replace(
    away.jersey,
    /BASECOLOR/,
    tripleUp.colorMap(awayJerseyBaseColor)
  );
  let awayLogoColor = team.colors ? team.colors[1] : "white";
  away.jersey = _.replace(
    away.jersey,
    /LOGOCOLOR/,
    tripleUp.colorMap(awayLogoColor)
  );
  away.jersey = _.replace(away.jersey, /PLAYERNUMBER/g, playerNumber);
  away.jersey = _.replace(away.jersey, /(TEAM|NUMBER)FONT/g, font);
  away.jersey = tripleUp.awayDecorations(away.jersey, team.colors);

  away.pants = _.replace(
    tripleUp.PANTS_URL,
    /BASECOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[0] : "white")
  );

  away.pants = _.replace(
    away.pants,
    /(LOGO|TEAMTEXT)COLOR/g,
    tripleUp.colorMap(team.colors ? team.colors[1] : "white")
  );
  away.pants = _.replace(
    away.pants,
    /TEAMSTROKECOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[0] : "black")
  );

  return { home, away, fonts: tripleUp.FONTS, selectedFont: font };
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
