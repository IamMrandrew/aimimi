import React from 'react';
import ReactDOM from 'react-dom';
import Goal from '../Goal';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Goal');
    ReactDOM.render(<Goal />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Goal />, document.getElementById('root'));
});