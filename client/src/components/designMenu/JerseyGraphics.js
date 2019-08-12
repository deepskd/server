import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Grid, Dropdown } from 'semantic-ui-react'
import { jerseyGraphicUpdated } from '../../actions'

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
    console.log(props)
    dispatch(jerseyGraphicUpdated(props))
  }

  return (
    <Grid>
      <Grid.Row centered>
        <Dropdown
          options={graphicOptions}
          value={graphic}
          onChange={handleChange}
        />
      </Grid.Row>
    </Grid>
  )
}

export default JerseyGraphics
