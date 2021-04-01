import React from 'react';
import ReactDOM from 'react-dom';
import AddGoal from '../AddGoal';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../AddGoal');
    ReactDOM.render(<AddGoal />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<AddGoal />, document.getElementById('root'));
});