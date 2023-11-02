// form testing
// http://localhost:3000/login

import * as React from 'react'
import {fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Login from '../../components/login'

test('submitting the form calls onSubmit with username and password', async () => {
  let submittedData

  const handleSubmit = data => (submittedData = data)

  render(<Login onSubmit={handleSubmit} />)

  const userNameField = screen.getByLabelText('Username')
  const passwordField = screen.getByLabelText('Password')

  const username = 'vee'
  const password = 'crabbos'

  const submit = screen.getByRole('button', {name: 'Submit'})

  await userEvent.type(userNameField, username)
  await userEvent.type(passwordField, password)

  await userEvent.click(submit)

  expect(submittedData).toEqual({password: password, username: username})
})

/*
eslint
  no-unused-vars: "off",
*/
