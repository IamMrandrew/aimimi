import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, Router } from 'react-router-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'
import '@testing-library/jest-dom'

import axios from 'axios'

import { AuthContext, AuthContextProvider } from "../../contexts/AuthContext"
import Nav from '../Nav'

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

it('element rendered without crashing', () => {
    testingElement = render(
        <AuthContextProvider>
            <MemoryRouter>
                <Nav setShowSidebar={jest.fn()}/>
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )
    fireEvent.click(testingElement.getByTestId('sidebarButton'))
    fireEvent.click(testingElement.getByTestId('dropDownButton'))
})

it('axios being called with correct data if rendering', () => {
    const spyAxiosGet = jest.spyOn(axios, 'get').mockResolvedValue({ data: {fakeAuth} })

    render(
        <AuthContextProvider>
            <MemoryRouter>
                <Nav />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )

    expect(spyAxiosGet).toHaveBeenCalled()
    expect(spyAxiosGet).toHaveBeenCalledWith(
        "/user", { withCredentials: true }
    )

    spyAxiosGet.mockRestore()
})

describe('rendered correct title for differenct location', () => {

    it('Today', () => {
        testingElement = render(
            <AuthContextProvider>
                <MemoryRouter initialEntries={['/']}>
                    <Nav />
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
        expect(screen.getByText('Today')).toBeInTheDocument()
    })

    it('Goals', () => {
        render(
            <AuthContextProvider>
                <MemoryRouter initialEntries={['/goals']}>
                    <Nav />
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
        expect(screen.getByText('Goals')).toBeInTheDocument()
    })

    it('Shares', () => {
        render(
            <AuthContextProvider>
                <MemoryRouter initialEntries={['/shares']}>
                    <Nav />
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
        expect(screen.getByText('Shares')).toBeInTheDocument()
    })

    it('Leaderboard', () => {
        render(
            <AuthContextProvider>
                <MemoryRouter initialEntries={['/leaderboard']}>
                    <Nav />
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
        expect(screen.getByText('Leaderboard')).toBeInTheDocument()
    })

    it('Profile', () => {
        render(
            <AuthContextProvider>
                <MemoryRouter initialEntries={['/profile']}>
                    <Nav />
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
        expect(screen.queryAllByText('Profile')).not.toBe(null)
    })

    it('Activity', () => {
        render(
            <AuthContextProvider>
                <MemoryRouter initialEntries={['/activity']}>
                    <Nav />
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
        expect(screen.queryByText('Activity')).toBeInTheDocument()
    })
})

describe('redirected to correct page if user click on', () => {
    it('profile', () => {
        const history = createMemoryHistory()

        testingElement = render(
            <AuthContextProvider>
                <Router history={history}>
                    <Nav />
                </Router>
            </AuthContextProvider>
            , container
        )

        fireEvent.click(testingElement.getByTestId('profileButton'))
        expect(history.location.pathname).toBe('/profile')
    })

    it('bell', () => {
        const history = createMemoryHistory()

        testingElement = render(
            <AuthContextProvider>
                <Router history={history}>
                    <Nav />
                </Router>
            </AuthContextProvider>
            , container
        )

        fireEvent.click(testingElement.getByTestId('bellButton'))
        expect(history.location.pathname).toBe('/activity')
    })

    it('logout', () => {
        const spyAxiosDelete = jest.spyOn(axios, 'delete').mockResolvedValue()

        const history = createMemoryHistory()

        testingElement = render(
            <AuthContextProvider>
                <Router history={history}>
                    <Nav />
                </Router>
            </AuthContextProvider>
            , container
        )

        fireEvent.click(testingElement.getByTestId('logoutButton'))
        
        expect(spyAxiosDelete).toHaveBeenCalled()
        expect(spyAxiosDelete).toHaveBeenCalledWith(
            "/user/logout", {withCredentials: true,}
        )

        spyAxiosDelete.mockRestore()
    })
})

