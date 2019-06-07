import React from 'react';
import JobList from './JobList';
import {render} from 'react-testing-library';
import {BrowserRouter as Router} from 'react-router-dom';

it('Renders correct job title from category and area', () => {
    const comp =
        <Router>
            <JobList match={{params: {category: "Information Technology", area: "Funen"}}} jobs={jobsTestData}/>
        </Router>;
    const {getByText} = render(comp);
    expect(getByText('Web developer')).toBeInTheDocument();
});