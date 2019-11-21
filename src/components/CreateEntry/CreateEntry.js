import React, { Component } from 'react';
import * as firebase from 'firebase';
import { connect } from 'react-redux'

import './CreateEntry.css';


class CreateEntry extends Component {
    state = {
        msg: '',
        title: '',
        people: '',
        peopleArr: [],
        contents: '',
        date: ''
    }

    componentDidMount() {
        window.M.updateTextFields()
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('submit ran')
        // console.log(firebase.auth().currentUser.getIdToken())
        if (this.state.people) {
            console.log('new person submitted')
            if (!this.state.peopleArr.includes(this.state.people)) {

                const newPeopleArr = [...this.state.peopleArr]
                newPeopleArr.push(this.state.people)
                this.setState({
                    peopleArr: newPeopleArr
                }, () => {
                    this.setState({
                        people: ''
                    })
                })
            } else {
                console.log('repeated name')
                this.setState({
                    msg: 'Tried to add duplicate person',
                    people: ''
                }, () => {
                    setTimeout(() => {
                        this.setState({
                            msg: ''
                        })
                    }, 4000)
                })
            }
        } else {
            console.log('Actual submit')
            // const rootRef = firebase.database().ref().child('Hi');
            // rootRef.on('value', snap => {
            //     // console.log(snap.val())
            //     this.setState({
            //         msg: snap.val()
            //     })
            // })
            this.writeUserData()
        }
    }

    clearForm = (e) => {
        e.preventDefault()
        console.log('clear ran')
        this.setState({
            title: '',
            people: '',
            peopleArr: [],
            contents: '',
            date: ''
        })
    }

    writeUserData() {
        let ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid)
        let newChildRef = ref.push()
        // console.log(newChildRef)
        newChildRef.set({
            title: this.state.title,
            peopleArr: this.state.peopleArr.sort(),
            contents: this.state.contents,
            date: this.state.date
        });
        // ref.set([{
        //   title: this.state.title,
        //   peopleArr: this.state.peopleArr,
        //   contents : this.state.contents
        // }]);
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
    changeContents = (e) => {
        this.setState({
            contents: e.target.value
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

    changeDate = (e) => {
        this.setState({
            date: e.target.value
        })
    }

    render() {
        let peopleTags = this.state.peopleArr.map((person, i) => {
            return (<div className="chip" data-name={person} onClick={this.onTagClose} key={i}>
                {/* Look for something to use as an 'X' button */}
                {person}
                {/* <i className="close material-icons" onClick={this.onTagClose} >close</i> */}
            </div>)
        })
        let msgHeader = <br />;
        if (this.state.msg) {
            msgHeader = <p className='message-prompt'>{this.state.msg}</p>
        }


        return (
            <div className="container lighten-2 create-entry-container">
                {msgHeader}
                <h2>Dream Entry</h2>
                <form id="entry-form" onSubmit={this.onSubmit}>
                    <div className="row">
                        <div className="input-field col s8 offset-s2">
                            <input id='dream-title' value={this.state.title} onChange={this.changeTitle} type="text" className="validate" placeholder="Crazy pirates" />
                            <label htmlFor="dream-title">Title</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s8 offset-s2">
                            <input id='dream-people' value={this.state.people} onChange={this.changePeople} type="text" className="validate" placeholder="Jonny Depp" />
                            <label htmlFor="dream-people">People</label>
                            {peopleTags}
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s8 offset-s2">
                            <input id='dream-contents' value={this.state.contents} onChange={this.changeContents} type="text" className="validate" placeholder="I had a dream about some crazy pirates led by Jonny Depp.  " />
                            <label htmlFor="dream-title">Dream Contents</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s8 offset-s2">
                            {/* <input onChange={this.changeDate1} value={this.state.date1} type="date" /> */}
                            <input id='dream-date' type="date" onChange={this.changeDate} value={this.state.date} />
                            <label htmlFor="dream-date" >Date</label>
                        </div>
                    </div>
                    <div className='buttons-container'>
                        <button type='submit' className='btn red lighten-1' >Submit</button>
                        <button type='button' onClick={this.clearForm} className='btn red lighten-1' >Clear</button>
                    </div>
                </form>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return ({
        auth: state.auth
    })
}

export default connect(mapStateToProps, null)(CreateEntry);