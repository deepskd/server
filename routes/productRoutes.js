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
  jersey.textFont = font
  jersey.baseImageURL = tripleUp.JERSEY_URL
  jersey.frontImage = _.replace(
    tripleUp.JERSEY_URL,
    /TEAMNAME/,
    jersey.frontText
  )
  jersey.baseColor = 'white'
  jersey.baseColorCode = tripleUp.colorMap(jersey.baseColor)
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /BASECOLOR/,
    jersey.baseColorCode
  )
  jersey.logoColor = team.colors ? team.colors[0] : 'black'
  jersey.logoColorCode = tripleUp.colorMap(jersey.logoColor)
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /LOGOCOLOR/,
    jersey.logoColorCode
  )
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /PLAYERNUMBER/g,
    playerNumber
  )
  jersey.font = font
  jersey.frontImage = _.replace(jersey.frontImage, /(TEAM|NUMBER)FONT/g, font)

  pant.baseImageURL = tripleUp.PANTS_URL
  pant.frontImage = _.replace(
    tripleUp.PANTS_URL,
    /BASECOLOR/,
    tripleUp.colorMap('white')
  )

  pant.frontImage = _.replace(
    pant.frontImage,
    /(LOGO|TEAMTEXT)COLOR/g,
    tripleUp.colorMap(team.colors ? team.colors[0] : 'black')
  )
  pant.frontImage = _.replace(
    pant.frontImage,
    /TEAMSTROKECOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[1] : 'black')
  )
  home = tripleUp.homeDecorations({ jersey, pant }, team.colors)

  let away = {}
  jersey = {}
  pant = {}

  jersey.articleDescription = 'TripleUp Jersey'
  jersey.price = '$80'
  pant.articleDescription = 'TripeUp Pant'
  pant.price = '$85'

  jersey.frontText = _.toUpper(_.replace(team.name, '/', ' '))
  jersey.textFont = font
  jersey.baseImageURL = tripleUp.JERSEY_URL
  jersey.frontImage = _.replace(
    tripleUp.JERSEY_URL,
    /TEAMNAME/,
    jersey.frontText
  )

  jersey.baseColor = team.colors ? team.colors[0] : 'black'
  jersey.baseColorCode = tripleUp.colorMap(jersey.baseColor)
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /BASECOLOR/,
    jersey.baseColorCode
  )

  jersey.logoColor = team.colors ? team.colors[1] : 'white'
  jersey.logoColorCode = tripleUp.colorMap(jersey.logoColor)
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /LOGOCOLOR/,
    jersey.logoColorCode
  )
  jersey.frontImage = _.replace(
    jersey.frontImage,
    /PLAYERNUMBER/g,
    playerNumber
  )
  jersey.font = font
  jersey.frontImage = _.replace(jersey.frontImage, /(TEAM|NUMBER)FONT/g, font)
  pant.baseImageURL = tripleUp.PANTS_URL
  pant.frontImage = _.replace(
    tripleUp.PANTS_URL,
    /BASECOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[0] : 'white')
  )

  pant.frontImage = _.replace(
    pant.frontImage,
    /(LOGO|TEAMTEXT)COLOR/g,
    tripleUp.colorMap(team.colors ? team.colors[1] : 'white')
  )
  pant.frontImage = _.replace(
    pant.frontImage,
    /TEAMSTROKECOLOR/,
    tripleUp.colorMap(team.colors ? team.colors[0] : 'black')
  )
  away = tripleUp.awayDecorations({ jersey, pant }, team.colors)

  return {
    home,
    away,
    fonts: tripleUp.FONTS,
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
