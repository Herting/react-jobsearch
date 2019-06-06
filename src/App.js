import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import React, {Component} from 'react';
import './App.css';
import NotFound from './NotFound';
import CategoryList from './CategoryList';
import AreaList from './AreaList';
import JobList from './JobList';
import ShowJob from "./ShowJob";
import Admin from "./Admin";

class App extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            categories: [],
            areas: [],
            job_postings: []
        };

        this.getCategories = this.getCategories.bind(this);
        this.getAreas = this.getAreas.bind(this);
        this.getJobs = this.getJobs.bind(this);
    }

    componentDidMount() {
        this.getCategories();
        this.getAreas();
        this.getJobs();
    }

    getJobs() {
        fetch(`${this.API_URL}/jobs`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    job_postings: json
                })
            });
    }

    getAreas() {
        fetch(`${this.API_URL}/areas`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    areas: json
                })
            });
    }

    getCategories() {
        fetch(`${this.API_URL}/categories`)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    categories: json
                })
            });
    }

    render() {
        return (
            <Router>
                <div className="container">
                    <Link to={`/`}><h1>THE JOB</h1></Link>
                    <Link to={`/admin`}>
                        <div className="adminLink">Admin</div>
                    </Link>
                    <Switch>
                        <Route exact path={'/'}
                               render={(props) =>
                                   <CategoryList {...props}
                                                 categories={this.state.categories}
                                   />}
                        />

                        <Route exact path={'/jobs/:category'}
                               render={(props) =>
                                   <AreaList {...props}
                                             areas={this.state.areas}
                                   />}
                        />

                        <Route exact path={'/jobs/:category/:area'}
                               render={(props) =>
                                   <JobList {...props}
                                            jobs={this.state.job_postings}
                                   />}
                        />

                        <Route exact path={'/show-job/:id'}
                               render={(props) =>
                                   <ShowJob {...props}
                                   />}
                        />

                        <Route exact path={'/admin'}
                               render={(props) =>
                                   <Admin {...props} getJobs={this.getJobs} getAreas={this.getAreas} getCategories={this.getCategories} categories={this.state.categories} areas={this.state.areas}
                                   />}
                        />

                        <Route component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
