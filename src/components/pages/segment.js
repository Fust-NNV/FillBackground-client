import React, {useState} from 'react';

function SegmentPage() {
    const [file, setFile] = useState();
    function handleChange(e) {
        console.log(e);
        console.log(e.target.files);
        setFile(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className="SegmentPage">
            <h2>Add Image:</h2>
            <input type="file" onChange={handleChange} />
            <img src={file} width="300" height="533" />
        </div>

    );
}

export default SegmentPage;