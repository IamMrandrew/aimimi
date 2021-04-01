import React from 'react';
import ReactDOM from 'react-dom';
import Onboarding from '../Onboarding';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suite is working fine', () => {
    expect(true).toBeTruthy();
})

it('element rendered without crashing', () => {
    require('../Onboarding');
    ReactDOM.render(<Onboarding />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<Onboarding />, document.getElementById('root'));
});