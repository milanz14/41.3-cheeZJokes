import React, { Component } from "react";
import JokeClasses from "./JokeClasses";
import axios from "axios";
import { uuid } from "uuidv4";

class JokeListClasses extends Component {
    static defaultProps = {
        numJokes: 10,
    };

    constructor(props) {
        super(props);
        this.state = {
            jokesArray: [],
        };
        this.handleClick = this.handleClick.bind(this);
        this.getNewJokes = this.getNewJokes.bind(this);
    }

    async getNewJokes() {
        let jokes = [];
        while (jokes.length < this.props.numJokes) {
            const config = {
                headers: {
                    Accept: "application/json",
                },
            };

            let res = await axios.get("https://icanhazdadjoke.com/", config);
            // console.log(res);
            jokes.push({ joke: res.data.joke, votes: 0, id: uuid() });
        }
        this.setState({ jokesArray: jokes });
    }

    componentDidMount() {
        if (this.state.jokesArray.length === 0) {
            this.getNewJokes();
        }
    }

    handleClick(id, change) {
        this.setState((currSt) => ({
            jokesArray: currSt.jokesArray.map((j) =>
                j.id === id ? { ...j, votes: j.votes + change } : j
            ),
        }));
    }

    render() {
        return (
            <div className="JokePage">
                <h1>Dad Jokes</h1>
                <div className="JokePage-jokes">
                    {this.state.jokesArray.map((j) => (
                        <JokeClasses
                            joke={j.joke}
                            votes={j.votes}
                            key={j.id}
                            up={() => this.handleClick(j.id, 1)}
                            down={() => this.handleClick(j.id, -1)}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default JokeListClasses;
