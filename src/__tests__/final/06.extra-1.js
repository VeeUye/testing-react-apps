// mocking Browser APIs and modules
// 💯 mock the module
// http://localhost:3000/location

import * as React from 'react'
import {render, screen, act, waitFor} from '@testing-library/react'
import {useCurrentPosition} from 'react-use-geolocation'
import Location from '../../examples/location'

jest.mock('react-use-geolocation')


test('displays the users current location', async () => {
  const fakePosition = {
    coords: {
      latitude: 53.484642028808594,
      longitude: -2.2252206802368164,
    },
  }

  let setReturnValue

  function useMockCurrentPosition() {
    const state = React.useState([])
    setReturnValue = state[1]
    return state[0]
  }

  useCurrentPosition.mockImplementation(useMockCurrentPosition)


  render(<Location />)

  expect(screen.getByLabelText(/loading/i)).toBeVisible()

  await act(async () => {
    setReturnValue([fakePosition])
  })

  expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument()

  expect(screen.getByText(/latitude/i)).toHaveTextContent(
      `Latitude: ${fakePosition.coords.latitude}`,
  )
  expect(screen.getByText(/longitude/i)).toHaveTextContent(
      `Longitude: ${fakePosition.coords.longitude}`,
  )
})

test('displays an error message when fetching the current location fails', async () => {
  const errorMessage = 'Geolocation is not available';

  useCurrentPosition.mockImplementation(() => {
    return [undefined, { message: errorMessage }];
  });

  render(<Location />);


  await waitFor(() => {
    expect(screen.queryByLabelText(/loading/i)).not.toBeInTheDocument();
  });

  expect(screen.getByText(errorMessage)).toBeVisible();
});
