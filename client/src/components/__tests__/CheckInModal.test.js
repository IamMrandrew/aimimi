import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'

import axios from 'axios'

import { AuthContextProvider } from "../../contexts/AuthContext"
import CheckInModal from '../CheckInModal'

jest.spyOn(console, 'error').mockImplementation(jest.fn())

let container, testingElement

beforeEach(() => {
    container = document.createElement('div')
    document.body.appendChild(container)
})

afterEach(() => {
    unmountComponentAtNode(container)
    document.body.removeChild(container)
    container = null
})

const fakeSelectedGoal = {
    "_id": "fake id",
    "createdBy": "fake user id",
    "title": "fake title",
    "startTime": "2021-04-13T17:47:44.738Z",
    "category": "fake category",
    "frequency": 13,
    "period": "Daily",
    "publicity": true,
    "timespan": 90,
    "__v": 0
}

it('element rendered without crashing', () => {
    render(
        <AuthContextProvider>
            <MemoryRouter>
                <CheckInModal selectedGoal={ fakeSelectedGoal } />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )
})


it('axios being called with correct data if user checked in', () => {
    const spyAxiosPut = jest.spyOn(axios, 'put')
        .mockResolvedValueOnce()
        .mockRejectedValueOnce()

    testingElement = render(
        <AuthContextProvider>
            <MemoryRouter>
                <CheckInModal selectedGoal={ fakeSelectedGoal } />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )

    expect(spyAxiosPut).not.toHaveBeenCalled()

    const progress = testingElement.queryByTestId('checkInProgress')
    const checkInButton = testingElement.queryByTestId('checkInButton')

    const newProgress = '5'

    fireEvent.change(progress, { target: {value: newProgress} })
    fireEvent.click(checkInButton)

    expect(spyAxiosPut).toHaveBeenCalled()
    expect(spyAxiosPut).toHaveBeenCalledWith(
        "/goal/check_in",
        { goal_id: fakeSelectedGoal._id, check_in_time: newProgress },
        { withCredentials: true }
    )

    fireEvent.click(checkInButton)

    spyAxiosPut.mockRestore()
})

const realSelectedGoal = {
    "_id": "6075d94066bafc0b8819ccc5",
    "createdBy": "6075d82066bafc0b8819ccc1",
    "title": "Wake up earlier",
    "startTime": "2021-04-13T17:47:44.738Z",
    "category": "Lifestyle",
    "frequency": 1,
    "period": "Daily",
    "publicity": true,
    "timespan": 90,
    "__v": 0
}