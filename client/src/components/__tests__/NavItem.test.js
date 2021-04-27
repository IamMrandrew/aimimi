import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent, screen } from '@testing-library/react'

import axios from 'axios'

import { AuthContext, AuthContextProvider } from "../../contexts/AuthContext"
import NavItem from '../NavItem'

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
                <NavItem />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )
})