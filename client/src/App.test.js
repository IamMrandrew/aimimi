import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { MemoryRouter, Router } from 'react-router-dom'
import { render, screen, act, waitFor } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import axios from 'axios'

import { AuthContextProvider } from "./contexts/AuthContext"
import App from './App'

jest.spyOn(console, "log").mockImplementation(() => {});
jest.spyOn(console, "error").mockImplementation(() => {});

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
        render(
            <AuthContextProvider>
                <MemoryRouter>
                    <App />
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
})

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

it('<App /> rendered <Loader /> if landing', () => {

    testingElement = render(
        <AuthContextProvider>
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )

    // await sleep(500)

    expect(testingElement.queryByTestId('loaderComponent')).toBeInTheDocument()
})

// const fakeAuth = {
//     "completedGoals": [
//         "fakeGoal0"
//       ],
//       "_id": "fakeId",
//       "username": "fakeUsername",
//       "email": "fakeEmail",
//       "password": "fakePassword",
//       "joinDate": "2021-04-05T15:55:31.394Z",
//       "onGoingGoals": [
//           "{_id: \"fake-id-1\"}",
//           "{_id: \"fake-id-2\"}"
//       ],
//       "__v": 3
// }

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

const realAuth = {
    "completedGoals": [
        "6072a205eaf45a5674bb1f1e",
        "60746ddca647113a7100e82e",
        "60747408a647113a7100e832"
    ],
    "_id": "606b32f3d71340278d3b0d9d",
    "username": "Cookie Monster",
    "email": "cookie@gmail.com",
    "password": "$2b$10$npr74YILJ/Pj.Bp4FoHsieOvpMEjo2zFd6DfQ8COopXc8wVHlWdKS",
    "joinDate": "2021-04-05T15:55:31.394Z",
    "onGoingGoals": [
        "{_id: \"606b3380d71340278d3b0d9f\", accuracy: 0.06249…}",
        "{_id: \"606efb87967bcf715b3ea314\", accuracy: 0, chec…}",
        "{_id: \"606f246b0c2de500158d832a\", accuracy: 0.20000…}",
        "{_id: \"606ff88398410e0015fe99ac\", accuracy: 0.25, c…}",
        "{_id: \"6072c639b8b2185f0da452a6\", accuracy: 0, chec…}",
        "{_id: \"6073f59d833b2419b90d6e87\", accuracy: 0, chec…}",
        "{_id: \"6073f5ab833b2419b90d6e88\", accuracy: 0, chec…}",
        "{_id: \"6073f5e7833b2419b90d6e89\", accuracy: 0, chec…}",
        "{_id: \"6074752aa647113a7100e838\", accuracy: 0, chec…}",
        "{_id: \"607493a47dd1f70ea4d6e1b5\", accuracy: 0, chec…}",
        "{_id: \"6074b8f87dd1f70ea4d6e1b8\", accuracy: 0, chec…}",
        "{_id: \"6074b8fc7dd1f70ea4d6e1bb\", accuracy: 0, chec…}",
        "{_id: \"6074b8fd7dd1f70ea4d6e1be\", accuracy: 0, chec…}",
        "{_id: \"6074b8fe7dd1f70ea4d6e1c1\", accuracy: 0, chec…}",
        "{_id: \"6074b9337dd1f70ea4d6e1c4\", accuracy: 0, chec…}",
        "{_id: \"6074b9367dd1f70ea4d6e1c7\", accuracy: 0, chec…}",
        "{_id: \"6074b9377dd1f70ea4d6e1ca\", accuracy: 0, chec…}",
        "{_id: \"6074b9397dd1f70ea4d6e1cd\", accuracy: 0, chec…}",
        "{_id: \"6074b93a7dd1f70ea4d6e1d0\", accuracy: 0, chec…}",
        "{_id: \"6074b93b7dd1f70ea4d6e1d3\", accuracy: 0, chec…}",
        "{_id: \"6074b93c7dd1f70ea4d6e1d6\", accuracy: 0, chec…}",
        "{_id: \"6074b93d7dd1f70ea4d6e1d9\", accuracy: 0, chec…}",
        "{_id: \"6074b93f7dd1f70ea4d6e1dc\", accuracy: 0, chec…}",
        "{_id: \"6074b94f7dd1f70ea4d6e1df\", accuracy: 0, chec…}",
        "{_id: \"6074b9507dd1f70ea4d6e1e2\", accuracy: 0, chec…}",
        "{_id: \"6074b9517dd1f70ea4d6e1e5\", accuracy: 0, chec…}",
        "{_id: \"6074b9537dd1f70ea4d6e1e8\", accuracy: 0, chec…}",
        "{_id: \"6074b9547dd1f70ea4d6e1eb\", accuracy: 0, chec…}",
        "{_id: \"6074b9557dd1f70ea4d6e1ee\", accuracy: 0, chec…}",
        "{_id: \"6074b9567dd1f70ea4d6e1f1\", accuracy: 0, chec…}",
        "{_id: \"6074b9577dd1f70ea4d6e1f4\", accuracy: 0, chec…}",
        "{_id: \"6074b9597dd1f70ea4d6e1f7\", accuracy: 0, chec…}",
        "{_id: \"6074b95a7dd1f70ea4d6e1fa\", accuracy: 0, chec…}",
        "{_id: \"6074b95b7dd1f70ea4d6e1fd\", accuracy: 0, chec…}",
        "{_id: \"6074b95c7dd1f70ea4d6e200\", accuracy: 0, chec…}",
        "{_id: \"6074b95d7dd1f70ea4d6e203\", accuracy: 0, chec…}",
        "{_id: \"6074b9667dd1f70ea4d6e206\", accuracy: 0, chec…}",
        "{_id: \"6074b9677dd1f70ea4d6e209\", accuracy: 0, chec…}",
        "{_id: \"6074b9687dd1f70ea4d6e20c\", accuracy: 0, chec…}",
        "{_id: \"6074b9697dd1f70ea4d6e20f\", accuracy: 0, chec…}",
        "{_id: \"6074b96b7dd1f70ea4d6e212\", accuracy: 0, chec…}",
        "{_id: \"6074b96c7dd1f70ea4d6e215\", accuracy: 0, chec…}",
        "{_id: \"6074b96d7dd1f70ea4d6e218\", accuracy: 0, chec…}",
        "{_id: \"6074b96e7dd1f70ea4d6e21b\", accuracy: 0, chec…}",
        "{_id: \"6074b96f7dd1f70ea4d6e21e\", accuracy: 0, chec…}",
        "{_id: \"6074b9717dd1f70ea4d6e221\", accuracy: 0, chec…}",
        "{_id: \"6074b9727dd1f70ea4d6e224\", accuracy: 0, chec…}",
        "{_id: \"6074b9737dd1f70ea4d6e227\", accuracy: 0, chec…}",
        "{_id: \"6074b9747dd1f70ea4d6e22a\", accuracy: 0, chec…}",
        "{_id: \"6074b9767dd1f70ea4d6e22d\", accuracy: 0, chec…}",
        "{_id: \"6074b9777dd1f70ea4d6e230\", accuracy: 0, chec…}",
        "{_id: \"6074b9787dd1f70ea4d6e233\", accuracy: 0, chec…}",
        "{_id: \"6074b9797dd1f70ea4d6e236\", accuracy: 0, chec…}",
        "{_id: \"6074b97b7dd1f70ea4d6e239\", accuracy: 0, chec…}"
    ],
    "__v": 3
}