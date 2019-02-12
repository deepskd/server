const mongoose = require("mongoose");
const yaml = require("js-yaml");
const fs = require("fs");
const _ = require("lodash");
require("../models/Team");

const a1PrimeKnitUniform = require("../uniforms/a1Primeknit");
const tripleUp = require("../uniforms/tripleUp");

const Team = mongoose.model("teams");

const football = team => {
  const playerNumber = _.padStart(_.random(0, 99), 2, "0");
  const font = _.sample(Object.keys(a1PrimeKnitUniform.FONTS));
  const mascot = _.replace(team.mascot || team.name, "/", " ");

  let home = {};
  home.jersey = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    _.toUpper(mascot)
  );

  let homeJerseyBaseColor = team.colors ? team.colors[0] : "black";

  if (a1PrimeKnitUniform.colorMapBase(homeJerseyBaseColor) === "sld_pn_black") {
    home.jersey = _.replace(
      home.jersey,
      "cuf&src=sld_pn_white",
      "cuf&src=sld_pn_black"
    );
    home.jersey = _.replace(
      home.jersey,
      "pip&src=sld_pn_white",
      "pip&src=sld_pn_black"
    );
  }
  home.jersey = _.replace(
    home.jersey,
    /BASECOLOR/,
    a1PrimeKnitUniform.colorMapBase(homeJerseyBaseColor)
  );
  home.jersey = _.replace(
    home.jersey,
    /LOGOCOLOR/,
    a1PrimeKnitUniform.colorMapBase("white")
  );
  home.jersey = _.replace(home.jersey, /PLAYERNUMBER/g, playerNumber);
  home.jersey = _.replace(home.jersey, /(TEAM|NUMBER)FONT/g, font);

  const homePantBaseColor = team.colors ? team.colors[1] : "white";
  home.pants = _.replace(
    a1PrimeKnitUniform.PANTS_URL,
    /BASECOLOR/,
    a1PrimeKnitUniform.colorMapBase(homePantBaseColor)
  );

  if (homePantBaseColor === "white") {
    home.pants = _.replace(
      home.pants,
      /LOGOCOLOR/,
      a1PrimeKnitUniform.colorMapBase("black")
    );
  } else {
    home.pants = _.replace(
      home.pants,
      /LOGOCOLOR/,
      a1PrimeKnitUniform.colorMapBase("white")
    );
  }

  home = a1PrimeKnitUniform.homeDecorations(home, team.colors);

  let away = {};
  away.jersey = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    _.toUpper(_.replace(team.name, "/", " "))
  );
  away.jersey = _.replace(
    away.jersey,
    /BASECOLOR/,
    a1PrimeKnitUniform.colorMapBase("white")
  );
  away.jersey = _.replace(
    away.jersey,
    /LOGOCOLOR/,
    a1PrimeKnitUniform.colorMapBase("black")
  );
  away.jersey = _.replace(away.jersey, /PLAYERNUMBER/g, playerNumber);
  away.jersey = _.replace(away.jersey, /(TEAM|NUMBER)FONT/g, font);

  let awayPantBaseColor = team.colors ? team.colors[0] : "black";
  away.pants = _.replace(
    a1PrimeKnitUniform.PANTS_URL,
    /BASECOLOR/,
    a1PrimeKnitUniform.colorMapBase(awayPantBaseColor)
  );

  if (awayPantBaseColor === "white") {
    away.pants = _.replace(
      away.pants,
      /LOGOCOLOR/,
      a1PrimeKnitUniform.colorMapBase("black")
    );
  } else {
    away.pants = _.replace(
      away.pants,
      /LOGOCOLOR/,
      a1PrimeKnitUniform.colorMapBase("white")
    );
  }
  away = a1PrimeKnitUniform.awayDecorations(away, team.colors);

  return { home, away, fonts: a1PrimeKnitUniform.FONTS, selectedFont: font };
};

const basketball = team => {
  const playerNumber = _.padStart(_.random(0, 99), 2, "0");
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
      res.status(200).json(football(team));
    }
  });
};
