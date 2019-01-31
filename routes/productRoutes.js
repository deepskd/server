const mongoose = require("mongoose");
const yaml = require("js-yaml");
const fs = require("fs");
const _ = require("lodash");
require("../models/Team");

const a1PrimeKnitUniform = require("../uniforms/a1Primeknit");

const Team = mongoose.model("teams");

const teamProducts = team => {
  const playerNumber = _.padStart(_.random(0, 99), 2, "0");
  const font = _.sample(Object.keys(a1PrimeKnitUniform.FONTS));
  const mascot = _.replace(team.mascot || team.name, "/", " ");

  let home = {};
  home.jersey = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    _.toUpper(mascot)
  );
  home.jersey = _.replace(
    home.jersey,
    /BASECOLOR/,
    a1PrimeKnitUniform.colorMapBase("white")
  );
  home.jersey = _.replace(
    home.jersey,
    /LOGOCOLOR/,
    a1PrimeKnitUniform.colorMapBase("black")
  );
  home.jersey = _.replace(home.jersey, /PLAYERNUMBER/g, playerNumber);
  home.jersey = _.replace(home.jersey, /(TEAM|NUMBER)FONT/g, font);
  home.jersey = a1PrimeKnitUniform.homeDecorations(home.jersey, team.colors);

  let homePantBaseColor = team.colors ? team.colors[0] : "black";
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

  let away = {};
  away.jersey = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    _.toUpper(_.replace(team.name, "/", " "))
  );
  let awayJerseyBaseColor = team.colors ? team.colors[0] : "black";

  if (a1PrimeKnitUniform.colorMapBase(awayJerseyBaseColor) === "sld_pn_black") {
    away.jersey = _.replace(
      away.jersey,
      "cuf&src=sld_pn_white",
      "cuf&src=sld_pn_black"
    );
    away.jersey = _.replace(
      away.jersey,
      "pip&src=sld_pn_white",
      "pip&src=sld_pn_black"
    );
  }
  away.jersey = _.replace(
    away.jersey,
    /BASECOLOR/,
    a1PrimeKnitUniform.colorMapBase(awayJerseyBaseColor)
  );
  away.jersey = _.replace(
    away.jersey,
    /LOGOCOLOR/,
    a1PrimeKnitUniform.colorMapBase("white")
  );
  away.jersey = _.replace(away.jersey, /PLAYERNUMBER/g, playerNumber);
  away.jersey = _.replace(away.jersey, /(TEAM|NUMBER)FONT/g, font);
  away.jersey = a1PrimeKnitUniform.awayDecorations(away.jersey, team.colors);

  const awayPantBaseColor = team.colors ? team.colors[1] : "white";
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

  return { home, away, fonts: a1PrimeKnitUniform.FONTS, selectedFont: font };
};

module.exports = app => {
  app.get("/api/products", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const team = await Team.getTeam(req.query.id);
    res.status(200).json(teamProducts(team));
  });
};
