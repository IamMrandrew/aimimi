import React from 'react'
import { unmountComponentAtNode } from 'react-dom'
import { act } from 'react-dom/test-utils'
import { MemoryRouter, Router } from 'react-router-dom'
import { render, fireEvent, screen } from '@testing-library/react'
import { createMemoryHistory } from 'history'

import axios from 'axios'

import { AuthContext, AuthContextProvider } from "../../contexts/AuthContext"
import Overlay from '../Overlay'

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

it('element rendered without crashing', () => {
    render(<Overlay showModal={false} setShowModal={jest.fn()} />, container)
})