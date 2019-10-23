import React, { Component } from 'react';
import './CreateEntry.css';

class CreateEntry extends Component {
    state = {
        title: '',
        people: '',
        peopleArr: []
    }

    onSubmit = (e) => {
        e.preventDefault();
        // console.log('submitted')
        if(this.state.people) {
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

    onTagClose = (e) => {
        // e.preventDefault();
        // let personName = e.target.parentNode.dataset.name
        let personName = e.target.dataset.name
        console.log(personName)
        const newPeopleArr = [...this.state.peopleArr].filter(person => person !== personName)
        console.log(newPeopleArr)
        this.setState({
            peopleArr: newPeopleArr
        })

    }

    render() {
        console.log(this.state)

        let peopleTags = this.state.peopleArr.map((person, i) => {
            return (<div className="chip" data-name={person} onClick={this.onTagClose} key={i}>
                {/* Look for something to use as an 'X' button */}
                {person}
                {/* <i className="close material-icons" onClick={this.onTagClose} >close</i> */}
            </div>)
        })
        console.log(peopleTags);

        return (
            <div className="container lighten-2 create-entry-container">
                <h2>Submit Entry</h2>
                <form id="entry-form" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s8 offset-s2">
                            <input id='dream_title' value={this.state.title} onChange={this.changeTitle} type="text" className="validate" placeholder="Crazy pirates" />
                            <label htmlFor="dream_title">Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s8 offset-s2">
                            <input id='dream-people' value={this.state.people} onChange={this.changePeople} type="text" className="validate" placeholder="Jonny Depp" />
                            <label htmlFor="dream-people">People</label>
                            {peopleTags}
                        </div>
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default CreateEntry;