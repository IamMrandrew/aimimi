import React from 'react';
import ReactDOM from 'react-dom';
import Nav from '../Nav';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Nav');
    ReactDOM.render(<Nav />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Nav />, document.getElementById('root'));
});