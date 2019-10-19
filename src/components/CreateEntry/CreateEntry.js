import React, { Component } from 'react';

class CreateEntry extends Component {
    state = {
        title: ''
    }

    onSubmit = (e) => {
        e.preventDefault();
        console.log('submitted')
    }
    changeTitle = (e) => {
        this.setState({
            title: e.target.value
        })
    }

    render() { 
        console.log(this.state.title)
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
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}
 
export default CreateEntry;