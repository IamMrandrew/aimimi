import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, Router } from 'react-router-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import axios from 'axios'

import { AuthContext, AuthContextProvider } from "../../contexts/AuthContext"
import User from '../User'

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

const fakeUser1 = {
    "_id": "fake-user-id-1",
    "username": "fake-username-1",
    "email": "fake-email-1"
}

const fakeUser2 = {
    "_id": "fake-user-id-1",
    "username": "fake-username-1",
    "email": "fake-email-1"
}

const fakeUsers = [ fakeUser1, fakeUser2 ]

it('element rendered without crashing', () => {
    render(<User user={fakeUser1} users={fakeUsers} setUsers={jest.fn()} />, container)
})

it('axios being called with correct data if admin delete a user', () => {
    const spyAxiosDelete = jest.spyOn(axios, 'delete')
        .mockResolvedValueOnce()
        .mockRejectedValueOnce()

    testingElement = render( <User user={fakeUser1} users={fakeUsers} setUsers={jest.fn()} />, container )

    fireEvent.click(testingElement.getByTestId('deleteUserButton'))

    expect(spyAxiosDelete).toHaveBeenCalled()
    expect(spyAxiosDelete).toHaveBeenCalledWith( '/user/fake-user-id-1' )

    fireEvent.click(testingElement.getByTestId('deleteUserButton'))

    spyAxiosDelete.mockRestore()
})