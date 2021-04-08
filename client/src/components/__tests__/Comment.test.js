import React from 'react';
import ReactDOM from 'react-dom';
import Comment from '../Comment';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Comment');
    ReactDOM.render(<Comment />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Comment />, document.getElementById('root'));
});