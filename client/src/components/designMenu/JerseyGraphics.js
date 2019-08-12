import React, { useState, useEffect } from 'react'
import { Grid, Dropdown } from 'semantic-ui-react'

function JerseyGraphics({ products, activeTab }) {
  const [graphic, updateGraphic] = useState(
    products[activeTab].jersey.graphicStyle
  )

  useEffect(() => {
    updateGraphic(products[activeTab].jersey.graphicStyle)
  }, [activeTab])

  const { graphics } = products.decorations.jersey
  const graphicOptions = graphics.options.style.map(style => {
    return { key: style, text: graphics.options[style].label, value: style }
  })

  const handleChange = (e, { value }) => {
    console.log(value)
    updateGraphic(value)
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
