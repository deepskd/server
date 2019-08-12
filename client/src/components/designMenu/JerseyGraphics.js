import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Dropdown } from 'semantic-ui-react'
import { jerseyGraphicUpdated } from '../../actions'

import ColorOptions from './ColorOptions'

function JerseyGraphics({ products, activeTab }) {
  const [graphic, updateGraphic] = useState(
    products[activeTab].jersey.graphicStyle
  )

  const dispatch = useDispatch()

  useEffect(() => {
    updateGraphic(products[activeTab].jersey.graphicStyle)
  }, [activeTab, products])

  const { graphics } = products.decorations.jersey
  const graphicOptions = graphics.options.style.map(style => {
    return { key: style, text: graphics.options[style].label, value: style }
  })

  const handleChange = (e, { value }) => {
    updateGraphic(value)

    const props = {}
    props.uniformType = 'jersey'
    props.colorType = activeTab
    props.graphicStyle = value
    props.graphic = graphics.options[value].url
    props.graphicColorCode = products[activeTab].jersey.textColorCode
    dispatch(jerseyGraphicUpdated(props))
  }

  const renderGraphicOptions = () => {
    if (graphics.options[graphic].graphicColor) {
      return (
        <Grid.Row columns={2}>
          <Grid.Column>
            <Dropdown
              options={graphicOptions}
              value={graphic}
              onChange={handleChange}
            />
          </Grid.Column>
          <Grid.Column>
            <ColorOptions
              products={products}
              activeTab={activeTab}
              uniformType="jersey"
              attributeType="graphicColorCode"
            />
          </Grid.Column>
        </Grid.Row>
      )
    }

    return (
      <Grid.Row centered>
        <Dropdown
          options={graphicOptions}
          value={graphic}
          onChange={handleChange}
        />
      </Grid.Row>
    )
  }

  return <Grid>{renderGraphicOptions()}</Grid>
}

export default JerseyGraphics
