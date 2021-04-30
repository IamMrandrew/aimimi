import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { Router, MemoryRouter } from 'react-router-dom'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import axios from 'axios'
import { createMemoryHistory } from 'history'

import { AuthContextProvider } from "../../contexts/AuthContext"
import Feed from '../Feed'

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

const fakeCreator = {
    "completedGoals": ["fake completed goal"],
    "_id": "fake user id",
    "randomString": "fake random string",
    "isValid": true,
    "role": "User",
    "username": "fake user",
    "email": "fake email",
    "password": "fake password",
    "joinDate": "2021-04-13T17:42:56.831Z",
    "propic": "fakePropic.png",
    "onGoingGoals": ["fake on going goal"],
    "__v": 1
}

let fakeFeed1, fakeFeed2

fakeFeed1 = fakeFeed2 = {
    "participant": ["fake user id"],
    "like": [],
    "_id": "fakeFeedId",
    "goal_id": "fake goal id",
    "creator": { fakeCreator },
    "created_time": "2021-04-14T11:52:47.408Z",
    "content": "fake content",
    "comment": [],
    "__v": 0
}

const fakeFeeds = [ { fakeFeed1 }, { fakeFeed2 } ]

it('element rendered without crashing', () => {
    const spyAxiosGetResolved = jest.spyOn(axios, 'get').mockResolvedValue({ data: { fakeAuth }})

    render(
        <AuthContextProvider>
            <MemoryRouter>
                <Feed feed={ fakeFeed1 } feeds={ fakeFeeds } />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )

    spyAxiosGetResolved.mockRestore()

    const spyAxiosGetRejected = jest.spyOn(axios, 'get').mockRejectedValue()

    render(
        <AuthContextProvider>
            <MemoryRouter>
                <Feed feed={ fakeFeed1 } feeds={ fakeFeeds } />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )

    spyAxiosGetRejected.mockRestore()
})

describe('like/unlike comment', () => {
    let spyAxiosPost
    let spyAxiosDelete

    let likeButton

    it('axios being called with correct data if user LIKE a comment', () => {
        spyAxiosPost = jest.spyOn(axios, 'post')
            .mockResolvedValueOnce({ data: 'fakeResolved' })
            .mockRejectedValueOnce()
        spyAxiosDelete = jest.spyOn(axios, 'delete')

        testingElement = render(
            <AuthContextProvider>
                <MemoryRouter>
                    <Feed setFeeds={ jest.fn() } feed={ fakeFeed1 } feeds={ fakeFeeds } liked = {false}/>
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
    
        expect(spyAxiosPost).not.toHaveBeenCalled()
        expect(spyAxiosDelete).not.toHaveBeenCalled()
    
        likeButton = testingElement.queryByTestId('feedLikeButton')
            
        fireEvent.click(likeButton)
    
        expect(spyAxiosPost).toHaveBeenCalled()
        expect(spyAxiosDelete).not.toHaveBeenCalled()

        expect(spyAxiosPost).toHaveBeenCalledWith(
            `/feed/like/${fakeFeed1._id}`, { withCredentials: true }
        )

        fireEvent.click(likeButton)
    
        spyAxiosPost.mockRestore()
        spyAxiosDelete.mockRestore()
    })

    it('axios being called with correct data if user UNLIKE a comment', () => {
        spyAxiosPost = jest.spyOn(axios, 'post')
        spyAxiosDelete = jest.spyOn(axios, 'delete')
            .mockResolvedValueOnce({ data: 'fakeResolved' })
            .mockRejectedValueOnce()

        testingElement = render(
            <AuthContextProvider>
                <MemoryRouter>
                    <Feed setFeeds={ jest.fn() } feed={ fakeFeed2 } feeds={ fakeFeeds } liked = {true}/>
                </MemoryRouter>
            </AuthContextProvider>
            , container
        )
    
        expect(spyAxiosPost).not.toHaveBeenCalled()
        expect(spyAxiosDelete).not.toHaveBeenCalled()
    
        likeButton = testingElement.queryByTestId('feedLikeButton')
    
        fireEvent.click(likeButton)
    
        expect(spyAxiosPost).not.toHaveBeenCalled()
        expect(spyAxiosDelete).toHaveBeenCalled()

        expect(spyAxiosDelete).toHaveBeenCalledWith(
            `/feed/unlike/${fakeFeed2._id}`, { withCredentials: true }
        )

        fireEvent.click(likeButton)
    
        spyAxiosPost.mockRestore()
        spyAxiosDelete.mockRestore()
    })
})

it('redirected to correct path if user clicked comment button', () => {
    const history = createMemoryHistory()
    const spyHistoryPush = jest.spyOn(history, 'push')

    testingElement = render(
        <AuthContextProvider>
            <Router history={history}>
                <Feed setFeeds={ jest.fn() } feed={ fakeFeed1 } feeds={ fakeFeeds } liked = {true}/>
            </Router>
        </AuthContextProvider>
        , container
    )

    const commentButton = testingElement.queryByTestId('feedCommentButton')
    
    fireEvent.click(commentButton)

    expect(spyHistoryPush).toHaveBeenCalled()
    expect(spyHistoryPush).toHaveBeenCalledWith(
        `/feed/${fakeFeed1._id}`
    )
})

it('<Feed /> rendered <Loader /> if landing', () => {
    testingElement = render(
        <AuthContextProvider>
            <MemoryRouter initialEntries={['/']}>
                <Feed feed={ fakeFeed1 } feeds={ fakeFeeds } />
            </MemoryRouter>
        </AuthContextProvider>
        , container
    )

    expect(testingElement.queryByTestId('loaderComponent')).toBeInTheDocument()
})

const realProps = {
    "feed": {
      "participant": "[\"6075d82066bafc0b8819ccc1\"]",
      "like": "[]",
      "_id": "6076d78fb0ce14373c10a375",
      "goal_id": "6076d78fb0ce14373c10a374",
      "creator": "{__v: 1, _id: \"6075d82066bafc0b8819ccc1\", completed…}",
      "created_time": "2021-04-14T11:52:47.408Z",
      "content": "Andrew has created \"Test Completed Goal\" goal!",
      "comment": "[]",
      "__v": 0
    },
    "feeds": [
      {
        "participant": [
          "6075d82066bafc0b8819ccc1"
        ],
        "like": [],
        "_id": "6076d78fb0ce14373c10a375",
        "goal_id": "6076d78fb0ce14373c10a374",
        "creator": {
          "completedGoals": "[\"6076d7beb0ce14373c10a377\"]",
          "_id": "6075d82066bafc0b8819ccc1",
          "randomString": "aa6ad9711fd75ace3a498139b08ef9d4",
          "isValid": true,
          "role": "User",
          "username": "Andrew",
          "email": "andrewliyanlap000824@gmail.com",
          "password": "$2b$10$VZ.RTXqVT4Ewe2pXP2AF/Ob5C/7y7V.O6ItC/MXjNac7v/zrDBliO",
          "joinDate": "2021-04-13T17:42:56.831Z",
          "propic": "cookie.png",
          "onGoingGoals": "[{…}, {…}, {…}, {…}, {…}]",
          "__v": 1
        },
        "created_time": "2021-04-14T11:52:47.408Z",
        "content": "Andrew has created \"Test Completed Goal\" goal!",
        "comment": [],
        "__v": 0
      },
      "{__v: 0, _id: \"6076c44a29d87424d0b3bdd7\", comment: …}",
      "{__v: 0, _id: \"6076c44929d87424d0b3bdd5\", comment: …}",
      "{__v: 0, _id: \"607677fe1ffa1b87b9d7f0ed\", comment: …}",
      "{__v: 0, _id: \"6075f15994b30819752862ae\", comment: …}",
      "{__v: 0, _id: \"6075f13994b30819752862ad\", comment: …}",
      "{__v: 0, _id: \"6075ec7c6abadf16300f53e1\", comment: …}",
      "{__v: 0, _id: \"6075dc9d0127040d23c4e9bf\", comment: …}",
      "{__v: 0, _id: \"6075da5666bafc0b8819cccc\", comment: …}",
      "{__v: 0, _id: \"6075d9f166bafc0b8819ccc9\", comment: …}",
      "{__v: 0, _id: \"6075d94066bafc0b8819ccc6\", comment: …}",
      "{__v: 0, _id: \"6075d8ed66bafc0b8819ccc3\", comment: …}"
    ],
    "setFeeds": "ƒ bound dispatchAction() {}"
}