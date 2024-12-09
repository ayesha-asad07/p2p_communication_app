function FilePreview({ file }) {
    return (
      <div className="p-4">
        <h3 className="font-bold">File Preview</h3>
        <div className="border p-4 mt-2">
          {/* File preview logic here */}
          <img src={file} alt="Preview" className="max-w-full" />
        </div>
      </div>
    );
  }
  
  export default FilePreview;
  