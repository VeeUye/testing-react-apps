// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import Login from '../../components/login'

const userBuilder = build({
  fields: {
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const mockHandleSubmit = jest.fn()

  render(<Login onSubmit={mockHandleSubmit} />)

  const {username, password} = userBuilder()

  const userNameField = screen.getByLabelText('Username')
  const passwordField = screen.getByLabelText('Password')

  const submit = screen.getByRole('button', {name: 'Submit'})

  await userEvent.type(userNameField, username)
  await userEvent.type(passwordField, password)

  await userEvent.click(submit)

  expect(mockHandleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })

  expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
