import React, { Component } from 'react';
import './CreateEntry.css';

import * as firebase from 'firebase';

class CreateEntry extends Component {
    state = {
        msg: '',
        title: '',
        people: '',
        peopleArr: [],
        contents: ''
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
            const rootRef = firebase.database().ref().child('Hi');
            rootRef.on('value', snap => {
                // console.log(snap.val())
                this.setState({
                    msg: snap.val()
                })
            })
            this.writeUserData()
        }
    }

    writeUserData() {
        let ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid)
        let newChildRef = ref.push()
        // console.log(newChildRef)
        newChildRef.set({
          title: this.state.title,
          peopleArr: this.state.peopleArr,
          contents : this.state.contents
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

        let msgHeader = <br />;
        if (this.state.msg) {
            msgHeader = <p className='message-prompt'>{this.state.msg}</p>
        }

        return (
            <div className="container lighten-2 create-entry-container">
                {msgHeader}
                <h2>Submit Entry</h2>
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
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default CreateEntry;