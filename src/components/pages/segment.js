import React, {useState, useEffect} from 'react';
import axios from "axios";


function SegmentPage() {
    const [file, setFile] = useState();

    const handleFileUpload = ( event) =>{
        // get the selected file from the input
        const file = event.target.files[0];
        // create a new FormData object and append the file to it
        const formData = new FormData();
        formData.append("file", file);
        console.log(formData);
    
        // make a POST request to the File Upload API with the FormData object and Rapid API headers
        axios
          .post("https://webhook.site/13877597-4b20-4b4a-bf52-6aa54159d64e", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((response) => {
            // handle the response
            console.log(response);

            console.log(event);
            console.log(event.target.files);
            setFile(URL.createObjectURL(event.target.files[0]));
          })
          .catch((error) => {
            // handle errors
            console.log(error);
          });
      };

    return (
        <div className="SegmentPage">
            <h2>Add Image:</h2>
            <img src={file} width="180" height="120" />
            <input type="file" onChange={handleFileUpload} />
        </div>
        
    );
}

export default SegmentPage;