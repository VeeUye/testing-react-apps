// form testing
// http://localhost:3000/login

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import Login from '../../components/login'

const buildLoginForm = overrides => {
  return {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    ...overrides,
  }
}

test('submitting the form calls onSubmit with username and password', async () => {
  const mockHandleSubmit = jest.fn()

  render(<Login onSubmit={mockHandleSubmit} />)

  const userNameField = screen.getByLabelText('Username')
  const passwordField = screen.getByLabelText('Password')

  const {username, password} = buildLoginForm({password: 'some new password'})

  const submit = screen.getByRole('button', {name: 'Submit'})

  await userEvent.type(userNameField, username)
  await userEvent.type(passwordField, password)

  await userEvent.click(submit)

  expect(mockHandleSubmit).toHaveBeenCalledWith({
    password: password,
    username: username,
  })

  expect(mockHandleSubmit).toHaveBeenCalledTimes(1)
})

/*
eslint
  no-unused-vars: "off",
*/
