import React, { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
import { Grid, Label, Dropdown } from 'semantic-ui-react'

function ColorOptions({ products, activeTab, uniformType, attributeType }) {
  const { colors } = products
  let colorCode =
    products[activeTab][uniformType][attributeType] || Object.keys(colors)[0]

  const [colorHex, updateColorHex] = useState(colors[colorCode].hex)

  useEffect(() => {
    updateColorHex(colors[colorCode].hex)
  }, [products, activeTab, uniformType, attributeType, colors, colorCode])

  const colorStyle = {
    backgroundColor: colorHex,
    borderColor: 'black',
    borderWidth: 'thin',
  }
  const colorLabel = (
    <span>
      <Label size="big" style={colorStyle} />
    </span>
  )

  const renderColors = () => {
    return Object.values(colors).map(c => {
      const style = {
        backgroundColor: c.hex,
        borderColor: 'black',
        borderWidth: 'thin',
      }
      return (
        <Dropdown.Item key={`${activeTab}${c.hex}`}>
          <Label style={style} />
          {c.label}
        </Dropdown.Item>
      )
    })
  }

  return (
    <Grid>
      <Grid.Row centered>
        <Dropdown trigger={colorLabel} item scrolling>
          <Dropdown.Menu>{renderColors()}</Dropdown.Menu>
        </Dropdown>
      </Grid.Row>
    </Grid>
  )
}

export default ColorOptions
