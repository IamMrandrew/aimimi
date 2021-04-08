import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../Login';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Login');
    ReactDOM.render(<Login />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Login />, document.getElementById('root'));
});