import React, {Component} from 'react';

class ShowJob extends Component {
    API_URL = process.env.REACT_APP_API_URL;

    constructor(props) {
        super(props);

        this.state = {
            job: ""
        };

        fetch(`${this.API_URL}/jobs/job/` + props.match.params.id)
            .then(response => response.json())
            .then(json => {
                this.setState({
                    job: json
                });
            }).catch(error => {
            console.log(error);
        });
    }

    render() {
        let content = <p>Loading Question...</p>;
        if (this.state.job) {
            let job = this.state.job;

            content = <div className="jobItem">
                <h2>{job.title}</h2>
                <p>{job.description}</p>
                <a href="mailto:get-the-job@bestcompanyever.com">Apply now!</a>
            </div>
        }

        return content;
    }
}

export default ShowJob;
