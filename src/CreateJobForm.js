import React, {Component} from 'react';

class CreateJobForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            category: "",
            area: ""
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let category = "Sales";
        let area = "Central Jutland";

        if(this.state.category !== ""){
            category = this.state.category;
        }

        if(this.state.area !== ""){
            area = this.state.area;
        }

        let newJob = {
            title: this.state.title,
            description: this.state.description,
            category: category,
            area: area
        };

        this.props.handleCreateJob(newJob);

        this.setState({
            title: "",
            description: ""
        })
    }

    onChange(event) {
        let id = event.target.id;
        let value = event.target.value;

        if (id === "title") {
            this.setState({
                title: value
            })
        } else if (id === "description") {
            this.setState({
                description: value
            })
        } else if (id === "category") {
            this.setState({
                category: value
            })
        } else if (id === "area"){
            this.setState({
                area: value
            })
        }
    }

    render() {
        let categories = [];
        let areas= [];

        console.log(this.props);

        this.props.categories.forEach((cat) => {
            categories.push(
                <option key={cat.title} value={cat.title}>{cat.title}</option>
            )
        });

        this.props.areas.forEach((area) => {
            areas.push(
                <option key={area.title} value={area.title}>{area.title}</option>
            )
        });


        return <div className="createForm">
            <h2>Create job ad</h2>
            <form method="post">
                <input type="text" name="title" id="title" value={this.state.title} onChange={this.onChange} placeholder="title..."/>
                <label htmlFor={"description"}>
                    Description:
                </label>
                <textarea name="description" id="description" value={this.state.description} onChange={this.onChange}/>
                <label htmlFor={"category"}>
                    Category:
                </label>
                <select name={"category"} id={"category"} onChange={this.onChange}>
                    {categories}
                </select>
                <label htmlFor={"area"}>
                    Area:
                </label>
                <select name={"area"} id={"area"} onChange={this.onChange}>
                    {areas}
                </select>
                <button onClick={this.handleSubmit}
                        type="submit" id="submitItemBtn" className="btn btn-primary">Create
                </button>
            </form>
        </div>;
    }
}

export default CreateJobForm;
