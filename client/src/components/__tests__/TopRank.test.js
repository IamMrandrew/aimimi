import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, Router } from 'react-router-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import axios from 'axios'

import { AuthContext, AuthContextProvider } from "../../contexts/AuthContext"
import TopRank from '../TopRank'

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

const fakeRank = {
    "_id": "fake-user-id",
    "username": "fake-user-name",
    "accuracy": 3000
}

it('element rendered without crashing', () => {
    render(<TopRank rank={fakeRank} index='1' />, container)
})

it('axios being called with correct data if rendering', () => {
    const spyAxiosGet = jest.spyOn(axios, 'get')
        .mockResolvedValueOnce({ data: 'fakeSrc' })
        .mockRejectedValueOnce()

    render( <TopRank rank={fakeRank} index='1' />, container )

    expect(spyAxiosGet).toHaveBeenCalled()
    expect(spyAxiosGet).toHaveBeenCalledWith(
        '/user/propic/fake-user-id', { withCredentials: true, }
    )

    render( <TopRank rank={fakeRank} index='1' />, container )

    spyAxiosGet.mockRestore()
})

it('redirected to correct profile if user clicked on rank', () => {
    const history = createMemoryHistory()

    testingElement = render(
        <Router history={history}>
            <TopRank rank={fakeRank} index='1' />
        </Router>
    )

    fireEvent.click(testingElement.getByTestId('topRankButton'))

    expect(history.location.pathname).toBe('/profile/fake-user-id')
})