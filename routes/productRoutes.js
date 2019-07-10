const mongoose = require('mongoose')
const _ = require('lodash')
require('../models/Team')

const a1PrimeKnitUniform = require('../uniforms/a1Primeknit')
// const tripleUp = require('../uniforms/tripleUp')
const reign = require('../uniforms/reign')
const volleyball17 = require('../uniforms/volleyball17')
const streakBaseBall = require('../uniforms/streak-baseball')

const Team = mongoose.model('teams')

const football = (team, applicationType = 'heat_transfer') => {
  const playerNumber = _.random(0, 99)
  const font = _.sample(Object.keys(a1PrimeKnitUniform.FONTS))
  const mascot = _.chain(team.mascot || team.name)
    .truncate(12)
    .replace('/', ' ')
    .toUpper()
    .value()

  let home = {},
    jersey = {},
    pant = {}

  jersey.articleDescription = 'A1 PrimeKnit Jersey'
  jersey.price = '$195'
  pant.articleDescription = 'A1 PrimeKnit Pant'
  pant.price = '$155'

  jersey.frontText = mascot
  jersey.baseImageURL = a1PrimeKnitUniform.JERSEY_URL

  jersey.baseColor = team.colors ? team.colors[0] : 'black'
  jersey.baseColorCode = a1PrimeKnitUniform.colorMapBase(jersey.baseColor)

  let jerseyParams = a1PrimeKnitUniform.BASEOPTIONS.jersey[jersey.baseColorCode]
  jersey.cuffColorCode = jerseyParams.cuff
  jersey.logoColorCode = jerseyParams.logo
  jersey.pipeColorCode = jerseyParams.pipe
  jersey.baseColorHex = jerseyParams.hex

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/, jersey.frontText)
    .replace(/APPLICATION_TYPE/g, applicationType)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/CUFFCOLOR/, jersey.cuffColorCode)
    .replace(/PIPECOLOR/, jersey.pipeColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, font)
    .value()

  pant.baseColor = team.colors ? team.colors[1] : 'black'
  pant.baseColorCode = a1PrimeKnitUniform.colorMapBase(pant.baseColor)
  pant.baseImageURL = a1PrimeKnitUniform.PANTS_URL

  let pantParams = a1PrimeKnitUniform.BASEOPTIONS.pant[pant.baseColorCode]
  pant.baseColorHex = pantParams.hex
  pant.logoColorCode = pantParams.logo

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .value()

  home = a1PrimeKnitUniform.homeDecorations({ jersey, pant }, team.colors)

  let away = {}
  jersey = {}
  pant = {}
  jerseyParams = {}
  pantParams = {}

  jersey.articleDescription = 'A1 PrimeKnit Jersey'
  jersey.price = '$195'
  pant.articleDescription = 'A1 PrimeKnit Pant'
  pant.price = '$155'

  jersey.frontText = _.toUpper(_.replace(team.name, '/', ' '))
  jersey.frontText = _.chain(team.name)
    .truncate(12)
    .replace('/', ' ')
    .toUpper()
    .value()
  jersey.baseImageURL = a1PrimeKnitUniform.JERSEY_URL

  jersey.baseColor = 'white'
  jersey.baseColorCode = a1PrimeKnitUniform.colorMapBase(jersey.baseColor)

  jerseyParams = a1PrimeKnitUniform.BASEOPTIONS.jersey[jersey.baseColorCode]
  jersey.cuffColorCode = jerseyParams.cuff
  jersey.logoColorCode = jerseyParams.logo
  jersey.pipeColorCode = jerseyParams.pipe
  jersey.baseColorHex = jerseyParams.hex

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/, jersey.frontText)
    .replace(/APPLICATION_TYPE/g, applicationType)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/CUFFCOLOR/, jersey.cuffColorCode)
    .replace(/PIPECOLOR/, jersey.pipeColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, font)
    .value()

  pant.baseColor = team.colors ? team.colors[0] : 'black'
  pant.baseColorCode = a1PrimeKnitUniform.colorMapBase(pant.baseColor)
  pant.baseImageURL = a1PrimeKnitUniform.PANTS_URL

  pantParams = a1PrimeKnitUniform.BASEOPTIONS.pant[pant.baseColorCode]
  pant.baseColorHex = pantParams.hex
  pant.logoColorCode = pantParams.logo

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .value()
  away = a1PrimeKnitUniform.awayDecorations({ jersey, pant }, team.colors)

  const colors = a1PrimeKnitUniform.getColors(applicationType)

  return {
    home,
    away,
    fonts: a1PrimeKnitUniform.FONTS,
    baseOptions: a1PrimeKnitUniform.BASEOPTIONS,
    selectedFont: font,
    colors: colors,
  }
}

const basketball = team => {
  const playerNumber = _.random(0, 99)
  const font = _.sample(Object.keys(reign.FONTS))
  const mascot = _.replace(team.mascot || team.name, '/', ' ')

  let home = {},
    jersey = {},
    pant = {}

  jersey.articleDescription = 'Reign Jersey'
  jersey.price = '$78'
  pant.articleDescription = 'Reign Shorts'
  pant.price = '$77'

  jersey.frontText = _.toUpper(mascot)
  jersey.baseImageURL = reign.JERSEY_URL

  jersey.baseColor = 'white'
  jersey.baseColorCode = reign.colorMap(jersey.baseColor)
  jersey.baseColorHex = reign.BASEOPTIONS.jersey[jersey.baseColorCode].hex

  jersey.logoColor = team.colors ? team.colors[0] : 'black'
  jersey.logoColorCode = reign.colorMap(jersey.logoColor)

  jersey.teamTextColor = team.colors ? team.colors[0] : 'black'
  jersey.teamTextColorCode = reign.colorMap(jersey.teamTextColor)

  jersey.teamStrokeColor = team.colors ? team.colors[1] : 'black'
  jersey.teamStrokeColorCode = reign.colorMap(jersey.teamStrokeColor)

  jersey.font = font

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/g, jersey.frontText)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, jersey.font)
    .replace(/TEAMTEXTCOLOR/g, jersey.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/g, jersey.teamStrokeColorCode)
    .value()
  pant.baseImageURL = reign.PANTS_URL
  pant.baseColor = 'white'
  pant.baseColorCode = reign.colorMap(pant.baseColor)
  pant.baseColorHex = reign.BASEOPTIONS.pant[pant.baseColorCode].hex

  pant.logoColor = team.colors ? team.colors[0] : 'black'
  pant.logoColorCode = reign.colorMap(pant.logoColor)

  pant.teamTextColor = team.colors ? team.colors[0] : 'black'
  pant.teamTextColorCode = reign.colorMap(pant.teamTextColor)

  pant.teamStrokeColor = team.colors ? team.colors[1] : 'black'
  pant.teamStrokeColorCode = reign.colorMap(pant.teamStrokeColor)

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, pant.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/, pant.teamStrokeColorCode)
    .value()

  home = reign.homeDecorations({ jersey, pant }, team.colors)

  let away = {}
  jersey = {}
  pant = {}

  jersey.articleDescription = 'Reign Jersey'
  jersey.price = '$78'
  pant.articleDescription = 'Reign Shorts'
  pant.price = '$77'

  jersey.frontText = _.toUpper(_.replace(team.name, '/', ' '))
  jersey.baseImageURL = reign.JERSEY_URL

  jersey.baseColor = team.colors ? team.colors[0] : 'black'
  jersey.baseColorCode = reign.colorMap(jersey.baseColor)
  jersey.baseColorHex = reign.BASEOPTIONS.jersey[jersey.baseColorCode].hex

  jersey.logoColor = team.colors ? team.colors[1] : 'white'
  jersey.logoColorCode = reign.colorMap(jersey.logoColor)

  jersey.teamTextColor = team.colors ? team.colors[1] : 'white'
  jersey.teamTextColorCode = reign.colorMap(jersey.teamTextColor)

  jersey.teamStrokeColor = team.colors ? team.colors[0] : 'white'
  jersey.teamStrokeColorCode = reign.colorMap(jersey.teamStrokeColor)

  jersey.font = font

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/g, jersey.frontText)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, jersey.font)
    .replace(/TEAMTEXTCOLOR/g, jersey.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/g, jersey.teamStrokeColorCode)
    .value()

  pant.baseImageURL = reign.PANTS_URL

  pant.baseColor = team.colors ? team.colors[0] : 'black'
  pant.baseColorCode = reign.colorMap(pant.baseColor)
  pant.baseColorHex = reign.BASEOPTIONS.pant[pant.baseColorCode].hex

  pant.logoColor = team.colors ? team.colors[1] : 'white'
  pant.logoColorCode = reign.colorMap(pant.logoColor)

  pant.teamTextColor = team.colors ? team.colors[1] : 'white'
  pant.teamTextColorCode = reign.colorMap(pant.teamTextColor)

  pant.teamStrokeColor = team.colors ? team.colors[0] : 'white'
  pant.teamStrokeColorCode = reign.colorMap(pant.teamStrokeColor)

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, pant.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/, pant.teamStrokeColorCode)
    .value()
  away = reign.awayDecorations({ jersey, pant }, team.colors)

  return {
    home,
    away,
    fonts: reign.FONTS,
    baseOptions: reign.BASEOPTIONS,
    selectedFont: font,
    colors: reign.COLORS,
  }
}

const volleyball = team => {
  const playerNumber = _.random(0, 99)
  const font = _.sample(Object.keys(volleyball17.FONTS))
  const mascot = _.replace(team.mascot || team.name, '/', ' ')

  let home = {},
    jersey = {},
    pant = {}

  jersey.articleDescription = 'Volleyball 17 Jersey'
  jersey.price = '$70'
  pant.articleDescription = 'Volleyball 17 Shorts'
  pant.price = '$40'

  jersey.frontText = _.toUpper(mascot)
  jersey.baseImageURL = volleyball17.JERSEY_URL

  jersey.baseColor = 'white'
  jersey.baseColorCode = volleyball17.colorMap(jersey.baseColor)
  jersey.baseColorHex =
    volleyball17.BASEOPTIONS.jersey[jersey.baseColorCode].hex

  jersey.logoColor = team.colors ? team.colors[0] : 'black'
  jersey.logoColorCode = volleyball17.colorMap(jersey.logoColor)

  jersey.teamTextColor = team.colors ? team.colors[0] : 'black'
  jersey.teamTextColorCode = volleyball17.colorMap(jersey.teamTextColor)

  jersey.teamStrokeColor = team.colors ? team.colors[1] : 'black'
  jersey.teamStrokeColorCode = volleyball17.colorMap(jersey.teamStrokeColor)

  jersey.font = font

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/g, jersey.frontText)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, jersey.font)
    .replace(/TEAMTEXTCOLOR/g, jersey.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/g, jersey.teamStrokeColorCode)
    .value()
  pant.baseImageURL = volleyball17.PANTS_URL
  pant.baseColor = 'white'
  pant.baseColorCode = volleyball17.colorMap(pant.baseColor)
  pant.baseColorHex = volleyball17.BASEOPTIONS.pant[pant.baseColorCode].hex

  pant.logoColor = team.colors ? team.colors[0] : 'black'
  pant.logoColorCode = volleyball17.colorMap(pant.logoColor)

  pant.teamTextColor = team.colors ? team.colors[0] : 'black'
  pant.teamTextColorCode = volleyball17.colorMap(pant.teamTextColor)

  pant.teamStrokeColor = team.colors ? team.colors[1] : 'black'
  pant.teamStrokeColorCode = volleyball17.colorMap(pant.teamStrokeColor)

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, pant.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/, pant.teamStrokeColorCode)
    .value()

  home = volleyball17.homeDecorations({ jersey, pant }, team.colors)

  let away = {}
  jersey = {}
  pant = {}

  jersey.articleDescription = 'Volleyball 17 Jersey'
  jersey.price = '$70'
  pant.articleDescription = 'Volleyball 17 Shorts'
  pant.price = '$40'

  jersey.frontText = _.toUpper(_.replace(team.name, '/', ' '))
  jersey.baseImageURL = volleyball17.JERSEY_URL

  jersey.baseColor = team.colors ? team.colors[0] : 'black'
  jersey.baseColorCode = volleyball17.colorMap(jersey.baseColor)
  jersey.baseColorHex =
    volleyball17.BASEOPTIONS.jersey[jersey.baseColorCode].hex

  jersey.logoColor = team.colors ? team.colors[1] : 'white'
  jersey.logoColorCode = volleyball17.colorMap(jersey.logoColor)

  jersey.teamTextColor = team.colors ? team.colors[1] : 'white'
  jersey.teamTextColorCode = volleyball17.colorMap(jersey.teamTextColor)

  jersey.teamStrokeColor = team.colors ? team.colors[0] : 'white'
  jersey.teamStrokeColorCode = volleyball17.colorMap(jersey.teamStrokeColor)

  jersey.font = font

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/g, jersey.frontText)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, jersey.font)
    .replace(/TEAMTEXTCOLOR/g, jersey.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/g, jersey.teamStrokeColorCode)
    .value()

  pant.baseImageURL = volleyball17.PANTS_URL

  pant.baseColor = team.colors ? team.colors[0] : 'black'
  pant.baseColorCode = volleyball17.colorMap(pant.baseColor)
  pant.baseColorHex = volleyball17.BASEOPTIONS.pant[pant.baseColorCode].hex

  pant.logoColor = team.colors ? team.colors[1] : 'white'
  pant.logoColorCode = volleyball17.colorMap(pant.logoColor)

  pant.teamTextColor = team.colors ? team.colors[1] : 'white'
  pant.teamTextColorCode = volleyball17.colorMap(pant.teamTextColor)

  pant.teamStrokeColor = team.colors ? team.colors[0] : 'white'
  pant.teamStrokeColorCode = volleyball17.colorMap(pant.teamStrokeColor)

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, pant.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/, pant.teamStrokeColorCode)
    .value()
  away = volleyball17.awayDecorations({ jersey, pant }, team.colors)

  return {
    home,
    away,
    fonts: volleyball17.FONTS,
    baseOptions: volleyball17.BASEOPTIONS,
    selectedFont: font,
    colors: volleyball17.COLORS,
  }
}

const baseball = team => {
  const playerNumber = _.random(0, 99)
  const font = _.sample(Object.keys(streakBaseBall.FONTS))
  const mascot = _.replace(team.mascot || team.name, '/', ' ')

  let home = {},
    jersey = {},
    pant = {}

  jersey.articleDescription = 'Streak Full Button Jersey'
  jersey.price = '$70'
  pant.articleDescription = 'Streak Pant'
  pant.price = '$40'

  jersey.frontText = _.toUpper(mascot)
  jersey.baseImageURL = streakBaseBall.JERSEY_URL

  jersey.baseColor = 'white'
  jersey.baseColorCode = streakBaseBall.colorMap(jersey.baseColor)
  jersey.baseColorHex =
    streakBaseBall.BASEOPTIONS.jersey[jersey.baseColorCode].hex

  jersey.logoColor = team.colors ? team.colors[0] : 'black'
  jersey.logoColorCode = streakBaseBall.colorMap(jersey.logoColor)

  jersey.teamTextColor = team.colors ? team.colors[0] : 'black'
  jersey.teamTextColorCode = streakBaseBall.colorMap(jersey.teamTextColor)

  jersey.teamStrokeColor = team.colors ? team.colors[1] : 'black'
  jersey.teamStrokeColorCode = streakBaseBall.colorMap(jersey.teamStrokeColor)

  jersey.font = font

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/g, jersey.frontText)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, jersey.font)
    .replace(/TEAMTEXTCOLOR/g, jersey.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/g, jersey.teamStrokeColorCode)
    .value()
  pant.baseImageURL = streakBaseBall.PANTS_URL
  pant.baseColor = 'white'
  pant.baseColorCode = streakBaseBall.colorMap(pant.baseColor)
  pant.baseColorHex = streakBaseBall.BASEOPTIONS.pant[pant.baseColorCode].hex

  pant.logoColor = team.colors ? team.colors[0] : 'black'
  pant.logoColorCode = streakBaseBall.colorMap(pant.logoColor)

  pant.teamTextColor = team.colors ? team.colors[0] : 'black'
  pant.teamTextColorCode = streakBaseBall.colorMap(pant.teamTextColor)

  pant.teamStrokeColor = team.colors ? team.colors[1] : 'black'
  pant.teamStrokeColorCode = streakBaseBall.colorMap(pant.teamStrokeColor)

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, pant.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/, pant.teamStrokeColorCode)
    .value()

  home = streakBaseBall.homeDecorations({ jersey, pant }, team.colors)

  let away = {}
  jersey = {}
  pant = {}

  jersey.articleDescription = 'Streak Full Button Jersey'
  jersey.price = '$70'
  pant.articleDescription = 'Streak Pant'
  pant.price = '$40'

  jersey.frontText = _.toUpper(_.replace(team.name, '/', ' '))
  jersey.baseImageURL = streakBaseBall.JERSEY_URL

  jersey.baseColor = team.colors ? team.colors[0] : 'black'
  jersey.baseColorCode = streakBaseBall.colorMap(jersey.baseColor)
  jersey.baseColorHex =
    streakBaseBall.BASEOPTIONS.jersey[jersey.baseColorCode].hex

  jersey.logoColor = team.colors ? team.colors[1] : 'white'
  jersey.logoColorCode = streakBaseBall.colorMap(jersey.logoColor)

  jersey.teamTextColor = team.colors ? team.colors[1] : 'white'
  jersey.teamTextColorCode = streakBaseBall.colorMap(jersey.teamTextColor)

  jersey.teamStrokeColor = team.colors ? team.colors[0] : 'white'
  jersey.teamStrokeColorCode = streakBaseBall.colorMap(jersey.teamStrokeColor)

  jersey.font = font

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/g, jersey.frontText)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, jersey.font)
    .replace(/TEAMTEXTCOLOR/g, jersey.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/g, jersey.teamStrokeColorCode)
    .value()

  pant.baseImageURL = streakBaseBall.PANTS_URL

  pant.baseColor = team.colors ? team.colors[0] : 'black'
  pant.baseColorCode = streakBaseBall.colorMap(pant.baseColor)
  pant.baseColorHex = streakBaseBall.BASEOPTIONS.pant[pant.baseColorCode].hex

  pant.logoColor = team.colors ? team.colors[1] : 'white'
  pant.logoColorCode = streakBaseBall.colorMap(pant.logoColor)

  pant.teamTextColor = team.colors ? team.colors[1] : 'white'
  pant.teamTextColorCode = streakBaseBall.colorMap(pant.teamTextColor)

  pant.teamStrokeColor = team.colors ? team.colors[0] : 'white'
  pant.teamStrokeColorCode = streakBaseBall.colorMap(pant.teamStrokeColor)

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, pant.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/, pant.teamStrokeColorCode)
    .value()
  away = streakBaseBall.awayDecorations({ jersey, pant }, team.colors)

  return {
    home,
    away,
    fonts: streakBaseBall.FONTS,
    baseOptions: streakBaseBall.BASEOPTIONS,
    selectedFont: font,
    colors: streakBaseBall.COLORS,
  }
}

module.exports = app => {
  app.get('/api/products', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const team = await Team.getTeam(req.query.id)
    if (req.query.sports === 'basketball') {
      res.status(200).json(basketball(team))
    } else if (req.query.sports === 'volleyball') {
      res.json(volleyball(team))
    } else if (req.query.sports === 'baseball') {
      res.json(baseball(team))
    } else {
      const { embellishmentMethod } = req.query
      res.status(200).json(football(team, embellishmentMethod))
    }
  })
}
