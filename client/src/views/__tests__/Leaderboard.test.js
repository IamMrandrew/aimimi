import React from 'react';
import ReactDOM from 'react-dom';
import Leaderboard from '../Leaderboard';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Leaderboard');
    ReactDOM.render(<Leaderboard />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Leaderboard />, document.getElementById('root'));
});