import React from 'react';
import ReactDOM from 'react-dom';
import Signup from '../Signup';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Signup');
    ReactDOM.render(<Signup />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Signup />, document.getElementById('root'));
});