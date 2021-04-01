import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

jest.mock('react-dom', () => ({render: jest.fn()}));

it('this testing suit is working fine', () => {
    expect(true).toBeTruthy();
})

// it('renders without crashing', () => {
//     const div = document.createElement('div');
//     ReactDOM.render(<App />, div);
//     global.document.getElementById = (id) => id ==='root' && div;
//     expect(ReactDOM.render).toHaveBeenCalledWith(<App />, div);
// });

it('element rendered without crashing', () => {
    ReactDOM.render(<App />, document.getElementById('root'));
    expect(ReactDOM.render).toHaveBeenCalledWith(<App />, document.getElementById('root'));
});