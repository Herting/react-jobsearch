import React, {Component} from 'react';
import {Link} from "react-router-dom";

class AreaList extends Component {

    render() {
        let list = [];
        let areas = this.props.areas;
        let category = this.props.match.params.category;

        areas.forEach((elm) => {
            list.push(
                <div className="listItem" key={elm.title}>
                    <Link to={`/jobs/${category}/${elm.title}`}>
                        <h2>{elm.title}</h2>
                    </Link>
                </div>
            )

        });

        return (
            <div className="list">
                {list}
            </div>
        );
    }
}

export default AreaList;
