import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import { FileImage, Upload } from 'lucide-react';

function Files() {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    try {
      const allFiles = await db.files.toArray();
      setFiles(allFiles);
    } catch (error) {
      console.error('Error loading files:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-cyber-primary mb-2">Files</h1>
          <p className="text-gray-400">{files.length} file{files.length !== 1 ? 's' : ''}</p>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 transition-colors font-medium">
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
        </button>
      </div>

      <div className="text-center py-12">
        <FileImage className="w-16 h-16 text-gray-600 mx-auto mb-4" />
        <p className="text-gray-400">File management coming soon</p>
      </div>
    </div>
  );
}

export default Files;
