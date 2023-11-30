// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {act, fireEvent, render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()

const MockCounter = () => {
  const {count, increment, decrement} = useCounter()

  return (
    <>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <div>Current count: {count}</div>
    </>
  )
}

test('exposes the count and increment/decrement functions', () => {
  render(<MockCounter />)

  const increment = screen.getByRole('button', {name: 'Increment'})
  const decrement = screen.getByRole('button', {name: 'Decrement'})
  const counter = screen.getByText(/Current count:/)

  fireEvent.click(increment)

  expect(counter).toHaveTextContent('Current count: 1')

  fireEvent.click(decrement)

  expect(counter).toHaveTextContent('Current count: 0')
})

test('also exposes the count and increment/decrement functions', () => {
  let result
  const MockCounterWithNoUi = () => {
    result = useCounter()
    return null
  }

  render(<MockCounterWithNoUi />)

  expect(result.count).toBe(0)
  act(() => result.increment())
  expect(result.count).toBe(1)
  act(() => result.decrement())
  expect(result.count).toBe(0)
})

/* eslint no-unused-vars:0 */
