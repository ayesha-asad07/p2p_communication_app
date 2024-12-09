import { useState } from 'react';

function FileUpload() {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const uploadFile = () => {
    if (file) {
      // Call API to upload file here
      console.log('File uploaded:', file);
    }
  };

  return (
    <div className="p-4">
      <input type="file" onChange={handleFileChange} className="border p-2" />
      <button onClick={uploadFile} className="bg-blue-600 text-white px-4 py-2">Upload</button>
    </div>
  );
}

export default FileUpload;
