const mongoose = require('mongoose')
const _ = require('lodash')
require('../models/Team')

const Team = mongoose.model('teams')

const football = (team, applicationType = 'heat_transfer') => {
  const a1PrimeKnitUniform = require('../uniforms/a1Primeknit')
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
  jersey.playerNumber = playerNumber
  jersey.baseImageURL = a1PrimeKnitUniform.JERSEY_URL

  jersey.baseColor = team.colors ? team.colors[0] : 'black'
  jersey.baseColorCode = a1PrimeKnitUniform.colorMapBase(jersey.baseColor)

  let jerseyParams = a1PrimeKnitUniform.BASEOPTIONS.jersey[jersey.baseColorCode]
  jersey.cuffColorCode = jerseyParams.cuff
  jersey.logoColorCode = jerseyParams.logo
  jersey.pipeColorCode = jerseyParams.pipe
  jersey.baseColorHex = jerseyParams.hex

  if (a1PrimeKnitUniform.DECORATIONS.jersey.text) {
    const { upper_front } = a1PrimeKnitUniform.DECORATIONS.jersey.text
    if (upper_front) {
      jersey.textSize = upper_front.options.size[0] //take the first size - usually small
      jersey.textStyle = upper_front.options.style[0] //take the first style - usually straight
    }
  }

  jersey.sleeveOption = 'none'
  jersey.sleeveNumber = ''
  jersey.sleeveStripe =
    a1PrimeKnitUniform.DECORATIONS.jersey.sleeve_no_stripe.options.url

  let numberOptions = {}
  const { front, back } = a1PrimeKnitUniform.DECORATIONS.jersey.number
  numberOptions.frontSize = front.options.size[0]
  numberOptions.frontUrl = front.options[`${numberOptions.frontSize}`].url

  numberOptions.backSize = back.options.size[0]
  numberOptions.backUrl = back.options[`${numberOptions.backSize}`].url

  jersey.numberOptions = numberOptions

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(
      /JERSEYTEXT_UPPERFRONT/,
      a1PrimeKnitUniform.DECORATIONS.jersey.text.upper_front.options
        .small_straight.url
    )
    .replace(/SLEEVE_STRIPES/, jersey.sleeveStripe)
    .replace(/NUMBER_FRONT/, jersey.numberOptions.frontUrl)
    .replace(/NUMBER_BACK/, jersey.numberOptions.backUrl)
    .replace(/SLEEVE_NUMBER/, jersey.sleeveNumber)
    .replace(/TEAMNAME/, jersey.frontText)
    .replace(/APPLICATION_TYPE/g, applicationType)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/CUFFCOLOR/, jersey.cuffColorCode)
    .replace(/PIPECOLOR/, jersey.pipeColorCode)
    .replace(/PLAYERNUMBER/g, jersey.playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, font)
    .replace(/TEAMCREST_(LEFT|RIGHT)SLEEVE/g, '')
    .value()

  pant.baseColor = team.colors ? team.colors[1] : 'black'
  pant.baseColorCode = a1PrimeKnitUniform.colorMapBase(pant.baseColor)
  pant.baseImageURL = a1PrimeKnitUniform.PANTS_URL

  let pantParams = a1PrimeKnitUniform.BASEOPTIONS.pant[pant.baseColorCode]
  pant.baseColorHex = pantParams.hex
  pant.logoColorCode = pantParams.logo

  pant.sideOption = 'pant_stripe'
  pant.sideStripe =
    a1PrimeKnitUniform.DECORATIONS.pant.side_default_stripe.options.url
  pant.sideTeamName = ''

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/PANTS_STRIPES/, pant.sideStripe)
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
  jersey.playerNumber = playerNumber
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

  jersey.sleeveOption = 'none'
  // jersey.sleeveTypeKey = 'none'
  jersey.sleeveNumber = ''
  jersey.sleeveStripe =
    a1PrimeKnitUniform.DECORATIONS.jersey.sleeve_no_stripe.options.url

  if (a1PrimeKnitUniform.DECORATIONS.jersey.text) {
    const { upper_front } = a1PrimeKnitUniform.DECORATIONS.jersey.text
    if (upper_front) {
      jersey.textSize = upper_front.options.size[0] //take the first size - usually small
      jersey.textStyle = upper_front.options.style[0] //take the first style - usually straight
    }
  }

  jersey.numberOptions = numberOptions //inherits same number options

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(
      /JERSEYTEXT_UPPERFRONT/,
      a1PrimeKnitUniform.DECORATIONS.jersey.text.upper_front.options
        .small_straight.url
    )
    .replace(/SLEEVE_STRIPES/, jersey.sleeveStripe)
    .replace(/NUMBER_FRONT/, jersey.numberOptions.frontUrl)
    .replace(/NUMBER_BACK/, jersey.numberOptions.backUrl)
    .replace(/SLEEVE_NUMBER/, jersey.sleeveNumber)
    .replace(/TEAMNAME/, jersey.frontText)
    .replace(/APPLICATION_TYPE/g, applicationType)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/CUFFCOLOR/, jersey.cuffColorCode)
    .replace(/PIPECOLOR/, jersey.pipeColorCode)
    .replace(/PLAYERNUMBER/g, jersey.playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, font)
    .replace(/TEAMCREST_(LEFT|RIGHT)SLEEVE/g, '')
    .value()

  pant.baseColor = team.colors ? team.colors[0] : 'black'
  pant.baseColorCode = a1PrimeKnitUniform.colorMapBase(pant.baseColor)
  pant.baseImageURL = a1PrimeKnitUniform.PANTS_URL

  pantParams = a1PrimeKnitUniform.BASEOPTIONS.pant[pant.baseColorCode]
  pant.baseColorHex = pantParams.hex
  pant.logoColorCode = pantParams.logo

  pant.sideOption = 'pant_stripe'
  pant.sideStripe =
    a1PrimeKnitUniform.DECORATIONS.pant.side_default_stripe.options.url
  pant.sideTeamName = ''

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/PANTS_STRIPES/, pant.sideStripe)
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
    decorations: a1PrimeKnitUniform.DECORATIONS,
    panels: a1PrimeKnitUniform.DESIGN_PANELS,
  }
}

const basketball = team => {
  const reign = require('../uniforms/reign')
  const playerNumber = _.random(0, 99)
  const font = _.sample(Object.keys(reign.FONTS))
  const mascot = _.toUpper(_.replace(team.mascot || team.name, '/', ' '))

  let home = {}

  let props = {
    description: 'Reign Jersey',
    price: '$78',
    baseColor: 'white',
    logoColor: team.colors ? team.colors[0] : 'black',
    primaryColor: team.colors ? team.colors[0] : 'black',
    secondaryColor: team.colors ? team.colors[1] : 'black',
    frontText: mascot,
    font,
    playerNumber,
  }

  props.description = 'Reign Shorts'
  props.price = '$77'

  home.jersey = jerseyFactory(reign, props)

  props.description = 'Reign Shorts'
  props.price = '$77'

  home.pant = pantFactory(reign, props)

  let away = {}

  props = {
    description: 'Volleyball 17 Jersey',
    price: '$70',
    baseColor: team.colors ? team.colors[0] : 'black',
    logoColor: team.colors ? team.colors[1] : 'white',
    primaryColor: team.colors ? team.colors[1] : 'white',
    secondaryColor: team.colors ? team.colors[0] : 'white',
    frontText: _.toUpper(_.replace(team.name, '/', ' ')),
    font,
    playerNumber,
  }

  away.jersey = jerseyFactory(reign, props)

  props.description = 'Reign Shorts'
  props.price = '$77'

  away.pant = pantFactory(reign, props)

  return {
    home,
    away,
    fonts: reign.FONTS,
    baseOptions: reign.BASEOPTIONS,
    selectedFont: font,
    colors: reign.COLORS,
    decorations: reign.DECORATIONS,
    panels: reign.DESIGN_PANELS,
  }
}

const volleyball = team => {
  const volleyball17 = require('../uniforms/volleyball17')
  const playerNumber = _.random(0, 99)
  const font = _.sample(Object.keys(volleyball17.FONTS))
  const mascot = _.toUpper(_.replace(team.mascot || team.name, '/', ' '))

  let home = {}

  let props = {
    articleDescription: 'Volleyball 17 Jersey',
    price: '$70',
    baseColor: 'white',
    logoColor: team.colors ? team.colors[0] : 'black',
    primaryColor: team.colors ? team.colors[0] : 'black',
    secondaryColor: team.colors ? team.colors[1] : 'black',
    frontText: mascot,
    font,
    playerNumber,
    sublimationGraphics: true,
  }

  home.jersey = jerseyFactory(volleyball17, props)

  props.articleDescription = 'Volleyball 17 Shorts'
  props.price = '$40'
  home.pant = pantFactory(volleyball17, props)

  let away = {}

  props = {
    articleDescription: 'Volleyball 17 Jersey',
    price: '$70',
    baseColor: team.colors ? team.colors[0] : 'black',
    logoColor: team.colors ? team.colors[1] : 'white',
    primaryColor: team.colors ? team.colors[1] : 'white',
    secondaryColor: team.colors ? team.colors[0] : 'white',
    frontText: _.toUpper(_.replace(team.name, '/', ' ')),
    font,
    playerNumber,
    sublimationGraphics: true,
  }

  away.jersey = jerseyFactory(volleyball17, props)

  props.articleDescription = 'Volleyball 17 Shorts'
  props.price = '$40'

  away.pant = pantFactory(volleyball17, props)

  return {
    home,
    away,
    fonts: volleyball17.FONTS,
    baseOptions: volleyball17.BASEOPTIONS,
    selectedFont: font,
    colors: volleyball17.COLORS,
    decorations: volleyball17.DECORATIONS,
    panels: volleyball17.DESIGN_PANELS,
  }
}

const baseball = team => {
  const streakBaseBall = require('../uniforms/streak-baseball')
  const playerNumber = _.random(0, 99)
  const font = _.sample(Object.keys(streakBaseBall.FONTS))
  const mascot = _.toUpper(_.replace(team.mascot || team.name, '/', ' '))

  let home = {}

  let props = {
    articleDescription: 'Streak Full Button Jersey',
    price: '$85',
    baseColor: 'white',
    logoColor: team.colors ? team.colors[0] : 'black',
    primaryColor: team.colors ? team.colors[0] : 'black',
    secondaryColor: team.colors ? team.colors[1] : 'black',
    frontText: mascot,
    font,
    playerNumber,
  }

  home.jersey = jerseyFactory(streakBaseBall, props)

  props.articleDescription = 'Streak Pant'
  props.price = '$85'
  home.pant = pantFactory(streakBaseBall, props)

  let away = {}

  props = {
    articleDescription: 'Streak Full Button Jersey',
    price: '$85',
    baseColor: team.colors ? team.colors[0] : 'black',
    logoColor: team.colors ? team.colors[1] : 'white',
    primaryColor: team.colors ? team.colors[1] : 'white',
    secondaryColor: team.colors ? team.colors[0] : 'white',
    frontText: _.toUpper(_.replace(team.name, '/', ' ')),
    font,
    playerNumber,
  }

  away.jersey = jerseyFactory(streakBaseBall, props)

  props.articleDescription = 'Streak Pant'
  props.price = '$85'
  away.pant = pantFactory(streakBaseBall, props)

  return {
    home,
    away,
    fonts: streakBaseBall.FONTS,
    baseOptions: streakBaseBall.BASEOPTIONS,
    selectedFont: font,
    colors: streakBaseBall.COLORS,
    decorations: streakBaseBall.DECORATIONS,
    panels: streakBaseBall.DESIGN_PANELS,
  }
}
const jerseyFactory = (
  uniform,
  {
    articleDescription,
    price,
    baseColor,
    logoColor,
    primaryColor,
    secondaryColor,
    frontText,
    font,
    playerNumber,
    sublimationGraphics = false,
  }
) => {
  let jersey = {},
    upperFront = '',
    lowerFront = ''
  jersey.articleDescription = articleDescription
  jersey.price = price

  jersey.frontText = _.toUpper(frontText)
  jersey.playerNumber = playerNumber
  jersey.baseImageURL = uniform.JERSEY_URL

  jersey.baseColor = baseColor
  jersey.baseColorCode = uniform.colorMap(jersey.baseColor)
  jersey.baseColorHex = uniform.BASEOPTIONS.jersey[jersey.baseColorCode].hex

  jersey.logoColor = logoColor
  jersey.logoColorCode = uniform.colorMap(jersey.logoColor)

  jersey.textColor = primaryColor
  jersey.textColorCode = uniform.colorMap(jersey.textColor)

  if (uniform.DECORATIONS.jersey.text) {
    const { upper_front } = uniform.DECORATIONS.jersey.text
    if (upper_front) {
      jersey.textSize = upper_front.options.size[0] //take the first size - usually small
      jersey.textStyle = upper_front.options.style[0] //take the first style - usually straight
      upperFront =
        upper_front.options[`${jersey.textSize}_${jersey.textStyle}`].url
    }
    const { lower_front } = uniform.DECORATIONS.jersey.text
    if (lower_front) {
      jersey.textSize = lower_front.options.size[0]
      jersey.textStyle = lower_front.options.style[0]
      lowerFront =
        lower_front.options[`${jersey.textSize}_${jersey.textStyle}`].url
    }
  }

  let numberOptions = {}
  if (uniform.DECORATIONS.jersey.number) {
    const { front } = uniform.DECORATIONS.jersey.number
    if (front) {
      numberOptions.frontSize = front.options.size[0]
      numberOptions.frontUrl = front.options[`${numberOptions.frontSize}`].url
    }

    const { back } = uniform.DECORATIONS.jersey.number
    if (back) {
      numberOptions.backSize = back.options.size[0]
      numberOptions.backUrl = back.options[`${numberOptions.backSize}`].url
    }
  }

  if (sublimationGraphics) {
    const { graphics } = uniform.DECORATIONS.jersey
    jersey.graphicStyle = graphics.options.style[0]
    jersey.graphic = graphics.options[jersey.graphicStyle].url
    if (jersey.graphic.match(/GRAPHIC_COLOR/)) {
      jersey.graphicColorCode = jersey.textColorCode
    }
  }

  jersey.numberOptions = numberOptions

  jersey.strokeColor = secondaryColor
  jersey.strokeColorCode = uniform.colorMap(jersey.strokeColor)

  jersey.font = font

  jersey.frontImage = _.chain(jersey.baseImageURL)
    .replace(/JERSEYTEXT_UPPERFRONT/, upperFront)
    .replace(/JERSEYTEXT_LOWERFRONT/, lowerFront)
    .replace(/SUBLIMATION_GRAPHIC/, jersey.graphic)
    .replace(/GRAPHIC_COLOR/g, jersey.graphicColorCode)
    .replace(/NUMBER_FRONT/, jersey.numberOptions.frontUrl)
    .replace(/NUMBER_BACK/, jersey.numberOptions.backUrl)
    .replace(/TEAMNAME/g, jersey.frontText)
    .replace(/BASECOLOR/, jersey.baseColorCode)
    .replace(/LOGOCOLOR/, jersey.logoColorCode)
    .replace(/PLAYERNUMBER/g, jersey.playerNumber)
    .replace(/(TEAM|NUMBER)FONT/g, jersey.font)
    .replace(/(TEAM|NUMBER)TEXTCOLOR/g, jersey.textColorCode)
    .replace(/(TEAM|NUMBER)STROKECOLOR/g, jersey.strokeColorCode)
    .replace(/TEAMCREST_(LEFT|RIGHT)SLEEVE/g, '')
    .value()

  return jersey
}

const pantFactory = (
  uniform,
  {
    articleDescription,
    price,
    baseColor,
    logoColor,
    primaryColor,
    secondaryColor,
  }
) => {
  let pant = {}
  pant.articleDescription = articleDescription
  pant.price = price
  pant.baseImageURL = uniform.PANTS_URL
  pant.baseColor = baseColor
  pant.baseColorCode = uniform.colorMap(pant.baseColor)
  pant.baseColorHex = uniform.BASEOPTIONS.pant[pant.baseColorCode]
    ? uniform.BASEOPTIONS.pant[pant.baseColorCode].hex
    : '#ffffff' // some articles may not have a option in the base color, defaults to white

  pant.logoColor = logoColor
  pant.logoColorCode = uniform.colorMap(pant.logoColor)

  pant.textColor = primaryColor
  pant.textColorCode = uniform.colorMap(pant.textColor)

  pant.strokeColor = secondaryColor
  pant.strokeColorCode = uniform.colorMap(pant.strokeColor)

  pant.frontImage = _.chain(pant.baseImageURL)
    .replace(/BASECOLOR/, pant.baseColorCode)
    .replace(/LOGOCOLOR/, pant.logoColorCode)
    .replace(/TEAMTEXTCOLOR/g, pant.textColorCode)
    .replace(/TEAMSTROKECOLOR/, pant.strokeColorCode)
    .value()

  return pant
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
