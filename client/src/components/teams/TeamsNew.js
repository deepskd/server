import React, { useState } from 'react'
import { Form, Grid, Input, Select, Divider } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { createTeam } from '../../actions/actionsTeam'

const TeamsNew = () => {
  const colors = [
    { key: 'red', text: 'Red', value: 'red' },
    { key: 'blue', text: 'Blue', value: 'blue' },
    { key: 'green', text: 'Green', value: 'green' },
    { key: 'orange', text: 'Orange', value: 'orange' },
    { key: 'gold', text: 'Gold', value: 'gold' },
    { key: 'black', text: 'black', value: 'black' },
  ]

  const [name, setName] = useState('')
  const [mascot, setMascot] = useState('')
  const [primaryColor, setPrimaryColor] = useState('')
  const [secondaryColor, setSecondaryColor] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')

  const dispatch = useDispatch()

  const handleChange = (e, { name, value }) => {
    switch (name) {
      case 'name':
        setName(value)
        break
      case 'mascot':
        setMascot(value)
        break
      case 'primaryColor':
        setPrimaryColor(value)
        break
      case 'secondaryColor':
        setSecondaryColor(value)
        break
      case 'city':
        setCity(value)
        break
      case 'state':
        setState(value)
        break
      default:
    }
  }

  const handleSubmit = () => {
    const team = {
      name,
      mascot,
      city,
      state,
      colors: [primaryColor, secondaryColor],
    }

    dispatch(createTeam(team))
  }
  return (
    <Grid>
      <Form onSubmit={handleSubmit}>
        <Form.Group widths="equal">
          <Form.Field
            required
            control={Input}
            label="Team Name"
            placeholder="Team Name"
            name="name"
            value={name}
            onChange={handleChange}
          />
          <Form.Field
            required
            control={Input}
            label="Mascot"
            placeholder="Mascot"
            name="mascot"
            value={mascot}
            onChange={handleChange}
          />
        </Form.Group>
        <Divider horizontal>Colors</Divider>
        <Form.Group widths="equal">
          <Form.Field
            required
            control={Select}
            options={colors}
            label="Primary Color"
            placeholder="Primary Color"
            name="primaryColor"
            value={primaryColor}
            onChange={handleChange}
          />
          <Form.Field
            required
            control={Select}
            options={colors}
            label="Secondary Color"
            placeholder="Secondary Color"
            name="secondaryColor"
            value={secondaryColor}
            onChange={handleChange}
          />
        </Form.Group>
        <Divider horizontal>Team Data</Divider>
        <Form.Group>
          <Form.Field
            required
            control={Input}
            label="City"
            placeholder="City"
            name="city"
            value={city}
            onChange={handleChange}
          />
          <Form.Field
            required
            control={Input}
            label="State"
            placeholder="State"
            name="state"
            value={state}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Button content="Submit" />
      </Form>
    </Grid>
  )
}

export default TeamsNew
