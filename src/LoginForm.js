import React, {Component} from 'react';

class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: "",
            password: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        this.props.handleLogin(this.state.username, this.state.password);
    }

    onChange(event) {
        let id = event.target.id;
        let value = event.target.value;

        if (id === "username") {
            this.setState({
                username: value
            })
        } else if (id === "password") {
            this.setState({
                password: value
            })
        }
    }

    render() {

        return <div className="login">
            <h2>Login</h2>
            <form method="post">
                <input type="text" name="username" id="username" onChange={this.onChange} placeholder="Username..."/>
                <input type="password" name="password" id="password" onChange={this.onChange}
                       placeholder="Password..."/>
                <button onClick={this.handleSubmit}
                        type="submit" id="submitItemBtn" className="btn btn-primary">Login
                </button>
            </form>
        </div>;
    }
}

export default LoginForm;
