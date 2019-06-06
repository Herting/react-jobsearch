import React, {Component} from 'react';

class CreateCatForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();

        let newCat = {
            title: this.state.title
        };

        this.props.handleCreateCat(newCat);

        this.setState({
            title: ""
        })
    }

    onChange(event) {
        let id = event.target.id;
        let value = event.target.value;

        if (id === "title") {
            this.setState({
                title: value
            })
        }
    }

    render() {
        return <div className="createForm">
            <h2>Create new category</h2>
            <form method="post">
                <input type="text" name="title" id="title" value={this.state.title} onChange={this.onChange} placeholder="title..."/>
                <button onClick={this.handleSubmit}
                        type="submit" id="submitItemBtn" className="btn btn-primary">Create
                </button>
            </form>
        </div>;
    }
}

export default CreateCatForm;
