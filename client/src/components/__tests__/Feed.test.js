import React from 'react';
import ReactDOM from 'react-dom';
import Feed from '../Feed';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Feed');
    ReactDOM.render(<Feed />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Feed />, document.getElementById('root'));
});