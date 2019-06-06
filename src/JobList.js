import React, {Component} from 'react';
import {Link} from "react-router-dom";

class JobList extends Component {

    render() {
        let list = [];
        let jobs = this.props.jobs;
        let category = this.props.match.params.category;
        let area = this.props.match.params.area;

        jobs.forEach((elm) => {
            if (elm.category === category && elm.area === area) {
                list.push(
                    <div className="listItem" key={elm.title}>
                        <Link to={`/show-job/${elm._id}`}>
                            <h2>{elm.title}</h2>
                            {/*<p>{elm.description}</p>*/}
                            {/*<a href="mailto:get-the-job@bestcompanyever.com">Send en email til os!</a>*/}
                        </Link>
                    </div>
                )
            }
        });

        if (list.length === 0) {
            list = <h3>Der er desværre ingen job inden for det felt og område du har valgt.</h3>
        }

        return (
            <div className="list">
                {list}
            </div>
        );
    }
}

export default JobList;
