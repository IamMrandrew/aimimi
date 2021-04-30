import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'

import axios from 'axios'

import { AuthContextProvider } from "../../contexts/AuthContext"
import AddGoal from '../AddGoal'

jest.spyOn(console, 'log').mockImplementation(jest.fn())

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

const fakeAuth = {
    "completedGoals": [
        "fakeGoal0"
      ],
      "_id": "fakeId",
      "username": "fakeUsername",
      "email": "fakeEmail",
      "password": "fakePassword",
      "joinDate": "2021-04-05T15:55:31.394Z",
      "onGoingGoals": [
          "{_id: \"fake-id-1\"}",
          "{_id: \"fake-id-2\"}"
      ],
      "__v": 3
}

const fakeGoal1 = {
    "_id": "fake-id-1",
    "createdBy": "fake-user-id",
    "title": "fake-title-1",
    "startTime": "2021-04-13T17:47:44.738Z",
    "category": "fake-category",
    "frequency": 13,
    "period": "Daily",
    "publicity": true,
    "timespan": 90,
    "__v": 0
}

const fakeGoal2 = {
    "_id": "fake-id-2",
    "createdBy": "fake-user-id",
    "title": "fake-title-2",
    "startTime": "2021-04-13T17:47:44.738Z",
    "category": "fake-category",
    "frequency": 13,
    "period": "Daily",
    "publicity": true,
    "timespan": 90,
    "__v": 0
}

const fakeGoals = [ { fakeGoal1 }, { fakeGoal2 } ]


it('element rendered without crashing', () => {
    render(
        <AuthContextProvider>
            <MemoryRouter>
                <AddGoal />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )
})


it('axios post resolved or rejected being handled', () => {

    const spyAxiosPost = jest.spyOn(axios, 'post')
        .mockResolvedValueOnce({ data: 'fakePostResp' })
        .mockRejectedValueOnce()

    testingElement = render(
        <AuthContextProvider>
            <MemoryRouter>
                <AddGoal />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )

    expect(spyAxiosPost).not.toHaveBeenCalled()
    
    const name = testingElement.queryByTestId('goalName')
    const category = testingElement.queryByTestId('goalCategory')
    const periodDaily = testingElement.queryByTestId('goalPeriod_daily')
    const periodWeekly = testingElement.queryByTestId('goalPeriod_weekly')
    const frequency = testingElement.queryByTestId('goalFrequency')
    const timespan = testingElement.queryByTestId('goalTimespan')
    const publicity = testingElement.queryByTestId('goalPublicity')
    
    const showModalButton = testingElement.queryByTestId('showModalButton')
    const submitButton = testingElement.queryByTestId('addGoalSubmitButton')

    const newName = 'mock name'
    const newCategory = 'Lifestyle'
    const newFrequency = '5'
    const newTimespan = '13'
    
    fireEvent.click(showModalButton)

    fireEvent.change(name, { target: {value: newName} })
    fireEvent.change(category, { target: {value: newCategory} })
    fireEvent.click(periodDaily)
    fireEvent.click(periodWeekly)
    fireEvent.change(frequency, { target: {value: newFrequency} })
    fireEvent.change(timespan, { target: {value: newTimespan} })
    fireEvent.click(publicity)
    
    Date.now = jest.fn(() => 1618305578906)

    fireEvent.click(submitButton)

    expect(spyAxiosPost).toHaveBeenCalled()
    expect(spyAxiosPost).toHaveBeenCalledWith(
        "/goal",
        {
          title: newName,
          startTime: 1618305578906,
          category: newCategory,
          frequency: newFrequency,
          period: 'Weekly',
          publicity: true,
          timespan: newTimespan,
        },
        { withCredentials: true }
    )

    fireEvent.click(submitButton)

    spyAxiosPost.mockRestore()
})