import React, { Component } from 'react';

class CreateEntry extends Component {
    state = {
        title: '',
        people: '',
        peopleArr: []
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
        const newPeopleArr = [...this.state.peopleArr]
        newPeopleArr.push(this.state.people)
        this.setState({
            peopleArr: newPeopleArr
        }, () => {
            this.setState({
                people: ''
            })
        })
    }
    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }
    changePeople = (e) => {
        this.setState({
            people: e.target.value
        })
    }

    render() { 
        console.log(this.state)
        return (
            <div className="container grey lighten-2 ">
                <h2>Submit Entry</h2>
                <form id="entry-form" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s8 offset-s2">
                            <input value={this.state.title} onChange={this.changeTitle} type="text" className="validate white" placeholder="Dream Title" />
                            <label htmlFor="input_text"></label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s8 offset-s2">
                            <input value={this.state.people} onChange={this.changePeople} type="text" className="validate white" placeholder="People" />
                            <label htmlFor="input_text"></label>
                        </div>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
 
export default CreateEntry;