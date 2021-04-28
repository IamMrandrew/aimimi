import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { render, fireEvent } from '@testing-library/react'

import axios from 'axios'

import CompletedProfile from '../CompletedProfile'

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

const fakeGoalId = "fake id"

it('element rendered without crashing', () => {
    render(<CompletedProfile goal={ fakeGoalId } />, container)
})


it('axios being called with correct data if completed goal exist', () => {
    const spyAxiosGet = jest.spyOn(axios, 'get')

    render(<CompletedProfile goal={ fakeGoalId } />, container)

    expect(spyAxiosGet).toHaveBeenCalled()
    expect(spyAxiosGet).toHaveBeenCalledWith(
        `/goal/${fakeGoalId}`, { withCredentials: true }
    )

    spyAxiosGet.mockRestore()
})