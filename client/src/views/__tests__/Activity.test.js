import React from 'react';
import ReactDOM from 'react-dom';
import Activity from '../Activity';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Activity');
    ReactDOM.render(<Activity />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Activity />, document.getElementById('root'));
});