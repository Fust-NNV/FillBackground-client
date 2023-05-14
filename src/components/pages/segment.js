import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';


import ImageHolder from "../molecules/segment-img-holder";

class SegmentPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
            fileBlob: null,
            clickedPositions: [],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmitImage = this.handleSubmitImage.bind(this);
        this.updateClickedPositions = this.updateClickedPositions.bind(this);
    }

    updateClickedPositions(positions) {
        this.setState({ clickedPositions: positions });
        console.log("My positions: ", positions)
    }

    handleChange(e) {
        console.log(e);
        console.log(e.target.files);
        this.setState({ fileBlob: e.target.files[0] });
        this.setState({ file: URL.createObjectURL(e.target.files[0]) });
    }

    handleSubmitImage() {
        const submitAPI = 'https://webhook.site/9337c176-4c01-4353-826b-7823579e1fc8';

        // Load the file and JSON data
        const jsonData = { test: 'hello' };

        // Create a new form data instance
        const formData = new FormData();
        formData.append('file', this.state.fileBlob, uuidv4());
        formData.append('json', JSON.stringify(this.state.clickedPositions));

        // Send the request with the file and JSON data
        axios.post(submitAPI, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((response) => {
            console.log(response.data);
            alert(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    render() {
        const { file } = this.state;

        return (
            <div className="SegmentPage">
                <h2>Add Image:</h2>
                <button onClick={this.handleSubmitImage}>Submit</button>
                <input type="file" onChange={this.handleChange} />
                <ImageHolder src={file} onUpdateClickedPositions={this.updateClickedPositions} />
            </div>
        );
    }
}

export default SegmentPage;
