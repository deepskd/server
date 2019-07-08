const mongoose = require('mongoose')
const _ = require('lodash')
require('../models/Team')

const a1PrimeKnitUniform = require('../uniforms/a1Primeknit')
const tripleUp = require('../uniforms/tripleUp')

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
  const font = _.sample(Object.keys(tripleUp.FONTS))
  const mascot = _.replace(team.mascot || team.name, '/', ' ')

  let home = {},
    jersey = {},
    pant = {}

  jersey.articleDescription = 'TripleUp Jersey'
  jersey.price = '$80'
  pant.articleDescription = 'TripeUp Pant'
  pant.price = '$85'

  jersey.frontText = _.toUpper(mascot)
  jersey.baseImageURL = tripleUp.JERSEY_URL

  jersey.baseColor = 'white'
  jersey.baseColorCode = tripleUp.colorMap(jersey.baseColor)
  jersey.baseColorHex = tripleUp.BASEOPTIONS.jersey[jersey.baseColorCode]

  jersey.logoColor = team.colors ? team.colors[0] : 'black'
  jersey.logoColorCode = tripleUp.colorMap(jersey.logoColor)

  jersey.teamTextColor = team.colors ? team.colors[0] : 'black'
  jersey.teamTextColorCode = tripleUp.colorMap(jersey.teamTextColor)

  jersey.teamStrokeColor = team.colors ? team.colors[1] : 'black'
  jersey.teamStrokeColorCode = tripleUp.colorMap(jersey.teamStrokeColor)

  jersey.font = font

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/, jersey.frontText)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, jersey.font)
    .replace(/TEAMTEXTCOLOR/g, jersey.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/g, jersey.teamStrokeColorCode)
    .value()
  pant.baseImageURL = tripleUp.PANTS_URL
  pant.baseColor = 'white'
  pant.baseColorCode = tripleUp.colorMap(pant.baseColor)
  pant.baseColorHex = tripleUp.BASEOPTIONS.pant[pant.baseColorCode]

  pant.logoColor = team.colors ? team.colors[0] : 'black'
  pant.logoColorCode = tripleUp.colorMap(pant.logoColor)

  pant.teamTextColor = team.colors ? team.colors[0] : 'black'
  pant.teamTextColorCode = tripleUp.colorMap(pant.teamTextColor)

  pant.teamStrokeColor = team.colors ? team.colors[1] : 'black'
  pant.teamStrokeColorCode = tripleUp.colorMap(pant.teamStrokeColor)

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, pant.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/, pant.teamStrokeColorCode)
    .value()

  home = tripleUp.homeDecorations({ jersey, pant }, team.colors)

  let away = {}
  jersey = {}
  pant = {}

  jersey.articleDescription = 'TripleUp Jersey'
  jersey.price = '$80'
  pant.articleDescription = 'TripeUp Pant'
  pant.price = '$85'

  jersey.frontText = _.toUpper(_.replace(team.name, '/', ' '))
  jersey.baseImageURL = tripleUp.JERSEY_URL

  jersey.baseColor = team.colors ? team.colors[0] : 'black'
  jersey.baseColorCode = tripleUp.colorMap(jersey.baseColor)
  jersey.baseColorHex = tripleUp.BASEOPTIONS.jersey[jersey.baseColorCode]

  jersey.logoColor = team.colors ? team.colors[1] : 'white'
  jersey.logoColorCode = tripleUp.colorMap(jersey.logoColor)

  jersey.teamTextColor = team.colors ? team.colors[1] : 'white'
  jersey.teamTextColorCode = tripleUp.colorMap(jersey.teamTextColor)

  jersey.teamStrokeColor = team.colors ? team.colors[0] : 'white'
  jersey.teamStrokeColorCode = tripleUp.colorMap(jersey.teamStrokeColor)

  jersey.font = font

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/TEAMNAME/, jersey.frontText)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/PLAYERNUMBER/g, playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, jersey.font)
    .replace(/TEAMTEXTCOLOR/g, jersey.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/g, jersey.teamStrokeColorCode)
    .value()

  pant.baseImageURL = tripleUp.PANTS_URL

  pant.baseColor = team.colors ? team.colors[0] : 'black'
  pant.baseColorCode = tripleUp.colorMap(pant.baseColor)
  pant.baseColorHex = tripleUp.BASEOPTIONS.pant[pant.baseColorCode]

  pant.logoColor = team.colors ? team.colors[1] : 'white'
  pant.logoColorCode = tripleUp.colorMap(pant.logoColor)

  pant.teamTextColor = team.colors ? team.colors[1] : 'white'
  pant.teamTextColorCode = tripleUp.colorMap(pant.teamTextColor)

  pant.teamStrokeColor = team.colors ? team.colors[0] : 'white'
  pant.teamStrokeColorCode = tripleUp.colorMap(pant.teamStrokeColor)

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, pant.teamTextColorCode)
    .replace(/TEAMSTROKECOLOR/, pant.teamStrokeColorCode)
    .value()
  away = tripleUp.awayDecorations({ jersey, pant }, team.colors)

  return {
    home,
    away,
    fonts: tripleUp.FONTS,
    baseOptions: tripleUp.BASEOPTIONS,
    selectedFont: font,
    colors: tripleUp.COLORS,
  }
}

module.exports = app => {
  app.get('/api/products', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    const team = await Team.getTeam(req.query.id)
    if (req.query.sports === 'basketball') {
      res.status(200).json(basketball(team))
    } else {
      const { embellishmentMethod } = req.query
      res.status(200).json(football(team, embellishmentMethod))
    }
  })
}
