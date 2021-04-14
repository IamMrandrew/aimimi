import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, getByTestId } from '@testing-library/react'

import axios from 'axios'

import { AuthContextProvider } from "../../contexts/AuthContext"
import AddGoal from '../AddGoal'

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

it('element rendered without crashing', () => {
    // act(() => {
        render(
            <AuthContextProvider>
                <MemoryRouter>
                    <AddGoal />
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
    // })
})


it('axios being called with correct data if user submit add goal form', () => {

    const spyAxiosPost = jest.spyOn(axios, 'post')

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

    spyAxiosPost.mockRestore()
})