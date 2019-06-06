import React, {Component} from 'react';
import {Link} from "react-router-dom";

class CategoryList extends Component {

    render() {
        let list = [];
        let categories = this.props.categories;

        categories.forEach((elm) => {
            list.push(
                <div className="listItem" key={elm.title}>
                    <Link to={`/jobs/${elm.title}`}>
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

export default CategoryList;
