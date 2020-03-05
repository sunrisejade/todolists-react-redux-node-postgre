import React ,{useState} from "react";
// import { s3Upload } from "../libs/awsLib";
import S3FileUpload from 'react-s3';
 

export default function Upload() {
/*  Notice that if you don't provide a dirName, the file will be automatically uploaded to the root of your bucket */
const [accessKey, setAccessKey] = useState("");
const [secretKey, setSecretKey] = useState("");
const [bucketName, setBucketName] = useState("");
const [file, setFile] = useState('');
const [filename, setFilename] = useState('Choose File');
const [uploadedFile, setUploadedFile] = useState({});
const [message, setMessage] = useState('');
const [uploadPercentage, setUploadPercentage] = useState(0);
const [isLoading, setIsLoading] = useState(false);

const config = {
    bucketName: bucketName,
    dirName: filename, /* optional */
    region: 'us-east-2',
    accessKeyId: accessKey,
    secretAccessKey: secretKey,
}

const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

const handleSubmit = async e => {
    e.preventDefault();
    S3FileUpload
    .uploadFile(file, config)
    .then(data => console.log(data))
    .catch(err => console.error(err))

}

 
//** OR *//
 
// uploadFile(file, config)
//     .then(data => console.log(data))
//     .catch(err => console.error(err))
 
  /**
   * {
   *   Response: {
   *     bucket: "your-bucket-name",
   *     key: "photos/image.jpg",
   *     location: "https://your-bucket.s3.amazonaws.com/photos/image.jpg"
   *   }
   * }
   */
  
  return (
    <div>
   
    <form onSubmit={handleSubmit}>
        {/* <h3>Upload</h3> */}

        <div className="form-group">
            <label>Access Key</label>
            <input type="text" value={accessKey} className="form-control" placeholder="Enter Access Key"  onChange={e => setAccessKey(e.target.value)}/>
        </div>

        <div className="form-group">
            <label>Secret Key</label>
            <input type="text" value={secretKey} className="form-control" placeholder="Enter Secret Key" onChange={e => setSecretKey(e.target.value)}/>
        </div>
        <div className="form-group">
            <label>Bucket Name</label>
            <input type="text" value={bucketName} className="form-control" placeholder="Enter Bucket Name" onChange={e => setBucketName(e.target.value)}/>
        </div>
        <div className="input-group mb-3">
            <input
                type='file'
                className='custom-file-input'
                id='customFile'
                onChange={onChange}
            />
        <label className='custom-file-label' htmlFor='customFile'>
            {filename}
        </label>               
        </div>

        <button type="submit"  className="btn btn-primary btn-block" >Upload</button>
        {/* disabled={!validateForm()} */}
    </form>
    </div>
  
);





}

