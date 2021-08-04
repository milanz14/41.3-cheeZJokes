import React, { Component } from "react";

class JokeClasses extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Joke">
                <div className="Joke-button">
                    <i
                        className="fas fa-chevron-up"
                        onClick={this.props.up}
                    ></i>
                    <span className="Joke-total">{this.props.votes}</span>
                    <i
                        className="fas fa-chevron-down"
                        onClick={this.props.down}
                    ></i>
                </div>
                <div className="Jokes">{this.props.joke}</div>
            </div>
        );
    }
}

export default JokeClasses;
