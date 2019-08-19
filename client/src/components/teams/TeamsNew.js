import React, { useState } from 'react'
import { Form, Input, Select, Divider } from 'semantic-ui-react'
import { useDispatch } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { createTeam } from '../../actions/actionsTeam'

const TeamsNew = ({ history }) => {
  const colors = [
    { key: 'red', text: 'Red', value: 'red' },
    { key: 'navy', text: 'Navy Blue', value: 'navy' },
    { key: 'royal', text: 'Royal Blue', value: 'royal' },
    { key: 'green', text: 'Green', value: 'green' },
    { key: 'maroon', text: 'Maroon', value: 'maroon' },
    { key: 'purple', text: 'Purple', value: 'purple' },
    { key: 'orange', text: 'Orange', value: 'orange' },
    { key: 'gold', text: 'Gold', value: 'gold' },
    { key: 'black', text: 'Black', value: 'black' },
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

    dispatch(createTeam(team, history))
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group widths="equal">
        <Form.Field
          required
          fluid
          control={Input}
          label="Team Name"
          placeholder="Team Name"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <Form.Field
          fluid
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
          fluid
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
          fluid
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
      <Form.Group widths="equal">
        <Form.Field
          fluid
          control={Input}
          label="City"
          placeholder="City"
          name="city"
          value={city}
          onChange={handleChange}
        />
        <Form.Field
          fluid
          control={Input}
          label="State"
          placeholder="State"
          name="state"
          value={state}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group widths={16}>
        <Form.Button color="blue" content="Submit" />
        <Form.Button content="Cancel" onClick={() => history.push('/teams')} />
      </Form.Group>
    </Form>
  )
}

export default withRouter(TeamsNew)
