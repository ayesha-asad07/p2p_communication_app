function FileSync() {
    const [syncEnabled, setSyncEnabled] = useState(false);
  
    const toggleSync = () => {
      setSyncEnabled(!syncEnabled);
    };
  
    return (
      <div className="p-4">
        <button onClick={toggleSync} className={`p-2 ${syncEnabled ? 'bg-green-500' : 'bg-gray-400'}`}>
          {syncEnabled ? 'Syncing Enabled' : 'Enable File Sync'}
        </button>
      </div>
    );
  }
  
  export default FileSync;
  