import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import {BrowserRouter as Router} from 'react-router-dom';
import LoginForm from "./LoginForm";

it('calls "Login" on LoginForm', () => {
    const onLogin = jest.fn();
    const comp =
        <Router>
            <LoginForm handleLogin={onLogin}/>
        </Router>;
    const {getAllByText} = render(comp);
    fireEvent.click(getAllByText(/Login/i)[1]);
    expect(onLogin).toHaveBeenCalled();
});