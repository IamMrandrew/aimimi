import React from 'react';
import ReactDOM from 'react-dom';
import Today from '../Today';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Today');
    ReactDOM.render(<Today />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Today />, document.getElementById('root'));
});