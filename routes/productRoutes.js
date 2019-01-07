const mongoose = require("mongoose");
const yaml = require("js-yaml");
const fs = require("fs");
const _ = require("lodash");
require("../models/Team");

const a1PrimeKnitUniform = require("../uniforms/a1PrimeKnit");

const Team = mongoose.model("teams");

const homeDecorations = (home, colors) => {
  const color = {};
  if (colors && colors.length === 2) {
    color.text = a1PrimeKnitUniform.colorMapHT(colors[0]);
    color.stroke = a1PrimeKnitUniform.colorMapHT(colors[1]);
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 3) {
    color.text = a1PrimeKnitUniform.colorMapHT(colors[0]);
    color.stroke = a1PrimeKnitUniform.colorMapHT(
      colors[1] === "white" ? colors[2] : colors[1]
    );
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 1) {
    color.text = a1PrimeKnitUniform.colorMapHT(colors[0]);
    color.stroke = a1PrimeKnitUniform.colorMapHT("black");
    home = _.replace(home, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    home = _.replace(home, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else {
    home = _.replace(
      home,
      /(TEAM|NUMBER)TEXTCOLOR/g,
      "sld_pn_obsidian_shine_ht"
    );
    home = _.replace(
      home,
      /(TEAM|NUMBER)STROKECOLOR/g,
      "sld_pn_matte_power_red_ht"
    );
  }
  return home;
};

const awayDecorations = (away, colors) => {
  const color = {};
  if (colors && colors.length === 2) {
    color.text = a1PrimeKnitUniform.colorMapHT(colors[1]);
    if (colors[1].match(/gold/)) {
      color.stroke = a1PrimeKnitUniform.colorMapHT("white");
    } else {
      color.stroke = a1PrimeKnitUniform.colorMapHT(_.sample[("gold", "black")]);
    }
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 3) {
    color.text = a1PrimeKnitUniform.colorMapHT(colors[1]);
    color.stroke = a1PrimeKnitUniform.colorMapHT(colors[2]);
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else if (colors && colors.length === 1) {
    color.text = a1PrimeKnitUniform.colorMapHT("white");
    color.stroke = a1PrimeKnitUniform.colorMapHT("black");
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, color.text);
    away = _.replace(away, /(TEAM|NUMBER)STROKECOLOR/g, color.stroke);
  } else {
    away = _.replace(away, /(TEAM|NUMBER)TEXTCOLOR/g, "sld_pn_white_ht");
    away = _.replace(
      away,
      /(TEAM|NUMBER)STROKECOLOR/g,
      "sld_pn_matte_power_red_ht"
    );
  }
  return away;
};

const teamProducts = team => {
  const playerNumber = _.padStart(_.random(0, 99), 2, "0");
  const font = _.sample(a1PrimeKnitUniform.FONTS);
  const mascot = _.replace(team.mascot || team.name, "/", " ");

  let home = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    _.toUpper(mascot)
  );
  home = _.replace(home, /BASECOLOR/, a1PrimeKnitUniform.colorMapBase("white"));
  home = _.replace(home, /LOGOCOLOR/, a1PrimeKnitUniform.colorMapBase("black"));
  home = _.replace(home, /PLAYERNUMBER/g, playerNumber);
  home = _.replace(home, /(TEAM|NUMBER)FONT/g, font);
  home = homeDecorations(home, team.colors);

  let away = _.replace(
    a1PrimeKnitUniform.JERSEY_URL,
    /TEAMNAME/,
    _.toUpper(_.replace(team.name, "/", " "))
  );
  let awayBaseColor = team.colors ? team.colors[0] : "black";
  if (awayBaseColor === "black") {
    away = _.replace(away, "cuf&src=sld_pn_white", "cuf&src=sld_pn_black");
    away = _.replace(away, "pip&src=sld_pn_white", "pip&src=sld_pn_black");
  }
  away = _.replace(
    away,
    /BASECOLOR/,
    a1PrimeKnitUniform.colorMapBase(awayBaseColor)
  );
  away = _.replace(away, /LOGOCOLOR/, a1PrimeKnitUniform.colorMapBase("white"));
  away = _.replace(away, /PLAYERNUMBER/g, playerNumber);
  away = _.replace(away, /(TEAM|NUMBER)FONT/g, font);
  away = awayDecorations(away, team.colors);
  return { home, away };
};

module.exports = app => {
  app.get("/api/products", async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    const team = await Team.getTeam(req.query.id);
    res.status(200).json(teamProducts(team));
  });
};
