import React from 'react';

import { Link } from 'react-router-dom';

export default class Load extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            file: null, // uploaded file reference
            contents: null, // will hold an array of coordinates
            contentsText: null // will hold an exact copy of text in the text file
        }

        this.handleFile = this.handleFile.bind(this);
        this.readFile = this.readFile.bind(this);

    }

    // componentDidMount(e):
    // built-in function, write code to run when the page is ready to be displayed
    componentDidMount(e) {

        // hide the "go to map" link until coordinates are submitted
        document.getElementById("createmap").style.display = "none";

    }

    // handleFile(e):
    // handles the chosen file by adding its reference into state, allowing
    // the readFile() function to use it later on
    handleFile(e) {
        this.setState({file: e.target.files[0]});
    }

    // readFile(e):
    // parses the uploaded text file and saves it in a 'contents' variable
    // in the state. the link to create the map is then shown
    readFile(e) {

        e.preventDefault()
        const reader = new FileReader();

        // on reader success/completion
        reader.onload = e => {
            const text = reader.result;

            // parsing the data
            let coords = []

            const lines = text.split("\n")
            for (let line in lines) {
                if (lines[line] !== "") {
                    const lineSplit = lines[line].split(",");
                    const coord = [Number(lineSplit[0]), Number(lineSplit[1]), Number(lineSplit[2])];
                    coords.push(coord);
                }
            }

            console.log(coords)

            this.setState({contents: coords, contentsText: text});
            document.getElementById("createmap").style.display = "block";
        }

        // on reader error
        reader.onerror = (e) => {
            console.log(e);
        }

        reader.readAsText(this.state.file);
    }

    render() {
        return (
            <div>
                <form>
                    <h1>Upload a File</h1>
                    <input type="file" onChange={this.handleFile} />
                    <button type="submit" onClick={(e) => this.readFile(e)} >Submit</button>
                </form>
                <p>File submitted: {this.state.contentsText}</p>
                <Link to={{
                    pathname: "/map",
                    state: {
                        coords: this.state.contents
                    }
                }} id="createmap">Go to map!</Link>
            </div>
        )
    }

}