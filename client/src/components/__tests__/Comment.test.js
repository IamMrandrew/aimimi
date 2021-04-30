import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'

import axios from 'axios'

import Comment from '../Comment'

jest.spyOn(console, 'error').mockImplementation(() => {})

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

const fakeComment = {
    "like": "[  ]",
    "_id": "fake-id",
    "creator": {
            "_id": "fake-user-id"
    },
    "created_time": "fake-created-time",
    "content": "fake-content"
}

it('element rendered without crashing', () => {
    render( <Comment comment={ fakeComment } />, container )
})

it('axios being called with correct data if comment exist', () => {
    const spyAxiosGet = jest.spyOn(axios, 'get').mockResolvedValue( { data: 'fakeSrc' } )

    render( <Comment comment={ fakeComment } />, container )

    expect(spyAxiosGet).toHaveBeenCalled()
    expect(spyAxiosGet).toHaveBeenCalledWith(
        `/user/propic/${fakeComment.creator._id}`, { withCredentials: true }
    )

    spyAxiosGet.mockRestore()
})

it('handle error if axios error', () => {
    const spyAxiosGet = jest.spyOn(axios, 'get').mockRejectedValue()

    render( <Comment comment={ fakeComment } />, container )

    expect(spyAxiosGet).toHaveBeenCalled()
    expect(spyAxiosGet).toHaveBeenCalledWith(
        `/user/propic/${fakeComment.creator._id}`, { withCredentials: true }
    )

    spyAxiosGet.mockRestore()
})

const realComment = {
    "like": "[ ]",
    "_id": "6076703cd9b1558042c0429d",
    "creator": {
        "completedGoals": [],
        "_id": "6075d82066bafc0b8819ccc1",
        "randomString": "aa6ad9711fd75ace3a498139b08ef9d4",
        "isValid": true,
        "role": "User",
        "username": "Andrew",
        "email": "andrewliyanlap000824@gmail.com",
        "password": "$2b$10$VZ.RTXqVT4Ewe2pXP2AF/Ob5C/7y7V.O6ItC/MXjNac7v/zrDBliO",
        "joinDate": "2021-04-13T17:42:56.831Z",
        "propic": "cookie.png",
        "onGoingGoals": [
            "{_id: \"6075d8ed66bafc0b8819ccc4\", accuracy: 0, chec…}",
            "{_id: \"6075d94066bafc0b8819ccc7\", accuracy: 0, chec…}",
            "{_id: \"6075d9f166bafc0b8819ccca\", accuracy: 0, chec…}",
            "{_id: \"6075da5666bafc0b8819cccd\", accuracy: 0, chec…}"
        ],
        "__v": 0
    },
    "created_time": "2021-04-14T04:31:56.330Z",
    "content": "So strong!"
}