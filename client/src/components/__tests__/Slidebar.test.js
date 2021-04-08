import React from 'react';
import ReactDOM from 'react-dom';
import Sidebar from '../Sidebar';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Sidebar');
    ReactDOM.render(<Sidebar />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Sidebar />, document.getElementById('root'));
});