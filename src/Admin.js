import React, {Component} from 'react';
import LoginForm from "./LoginForm";
import AuthService from "./AuthService";
import CreateJobForm from "./CreateJobForm";
import CreateCatForm from "./CreateCatForm";
import CreateAreaForm from "./CreateAreaForm";

class Admin extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            isLoggedIn: false,
            errorMsg: ""
        };

        this.handleLogin = this.handleLogin.bind(this);
        this.handleCreateJob = this.handleCreateJob.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleCreateCat = this.handleCreateCat.bind(this);
        this.handleCreateArea = this.handleCreateArea.bind(this);

        this.Auth = new AuthService(`${this.API_URL}/users/authenticate`);
    }

    componentDidMount() {
        if (this.Auth.loggedIn()) {
            this.setState({
                isLoggedIn: true
            })
        } else {
            this.setState({
                isLoggedIn: false
            })
        }
    }

    handleCreateCat(cat){
        fetch(`${this.API_URL}/categories/create`, {
            method: 'POST',
            body: JSON.stringify(cat),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + this.Auth.getToken()
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new category:");
                this.props.getCategories();
                console.log(json);
            });
    }

    handleCreateArea(area){
        fetch(`${this.API_URL}/areas/create`, {
            method: 'POST',
            body: JSON.stringify(area),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + this.Auth.getToken()
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new category:");
                this.props.getAreas();
                console.log(json);
            });
    }

    handleCreateJob(job) {
        fetch(`${this.API_URL}/jobs/create`, {
            method: 'POST',
            body: JSON.stringify(job),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": "Bearer " + this.Auth.getToken()
            }
        })
            .then(response => response.json())
            .then(json => {
                console.log("Result of posting a new job posting:");
                this.props.getJobs();
                console.log(json);
            });
    }

    handleLogin(username, password) {
        this.Auth.login(
            username,
            password
        )
            .then(response => {
                console.log("Authentication:", response.msg);
                if (this.Auth.loggedIn()) {
                    // console.log("success");
                    this.setState({
                        isLoggedIn: true
                    })
                } else {
                    // console.log("fail");
                    this.setState({
                        errorMsg: "Wrong username or password. please try again."
                    })
                }
            })
            .catch(error => {
                console.error("Error authenticating:", error);
            });
    }

    handleLogout() {
        this.Auth.logout();
        this.setState({
            isLoggedIn: false
        })
    }

    render() {

        if (this.state.isLoggedIn) {
            return <div>
                <button onClick={this.handleLogout} id="logoutBtn" className="logoutBtn">
                    Logout
                </button>
                <CreateJobForm handleCreateJob={this.handleCreateJob}
                               areas={this.props.areas} categories={this.props.categories}/><hr /><br />
                               <CreateCatForm handleCreateCat={this.handleCreateCat} /><hr /><br />
                               <CreateAreaForm handleCreateArea={this.handleCreateArea} />
            </div>;
        } else {
            return <div><p className={"error-msg"}>{this.state.errorMsg}</p><LoginForm handleLogin={this.handleLogin}/></div>;
        }
    }
}

export default Admin;
