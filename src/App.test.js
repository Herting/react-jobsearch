import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {render} from 'react-testing-library';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders App with header text', () => {
  const {getByText} = render(<App/>);
  expect(getByText(/THE JOB/i)).toBeInTheDocument();
});