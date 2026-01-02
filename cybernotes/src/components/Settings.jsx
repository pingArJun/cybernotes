import { useState } from 'react';
import { dbHelpers } from '../db';
import { Download, Upload, Trash2, Database, Check } from 'lucide-react';

function Settings() {
  const [exportSuccess, setExportSuccess] = useState(false);
  const [importSuccess, setImportSuccess] = useState(false);

  const handleExport = async () => {
    try {
      const data = await dbHelpers.exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `cybernotes-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    } catch (error) {
      console.error('Error exporting data:', error);
      alert('Failed to export data');
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      if (confirm('This will import the backup data. Continue?')) {
        await dbHelpers.importData(data);
        setImportSuccess(true);
        setTimeout(() => {
          setImportSuccess(false);
          window.location.reload();
        }, 2000);
      }
    } catch (error) {
      console.error('Error importing data:', error);
      alert('Failed to import data. Make sure the file is a valid CyberNotes backup.');
    }
  };

  const handleClearAllData = async () => {
    if (confirm('WARNING: This will delete ALL data permanently. This cannot be undone. Are you sure?')) {
      if (confirm('Are you ABSOLUTELY sure? This will delete all projects, notes, commands, and resources.')) {
        try {
          await dbHelpers.clearAllData();
          alert('All data has been cleared.');
          window.location.reload();
        } catch (error) {
          console.error('Error clearing data:', error);
          alert('Failed to clear data');
        }
      }
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cyber-primary mb-2">Settings</h1>
        <p className="text-gray-400">Manage your CyberNotes configuration and data</p>
      </div>

      <div className="space-y-6">
        {/* Export/Import Section */}
        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-100 mb-4 flex items-center space-x-2">
            <Database className="w-5 h-5 text-cyber-primary" />
            <span>Data Management</span>
          </h2>

          <div className="space-y-4">
            {/* Export */}
            <div className="flex items-start justify-between p-4 bg-cyber-dark rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-100 mb-1">Export All Data</h3>
                <p className="text-sm text-gray-400">
                  Download a complete backup of all your projects, notes, commands, and resources as a JSON file.
                </p>
              </div>
              <button
                onClick={handleExport}
                className="ml-4 flex items-center space-x-2 px-4 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 transition-colors font-medium"
              >
                {exportSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Exported!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4" />
                    <span>Export</span>
                  </>
                )}
              </button>
            </div>

            {/* Import */}
            <div className="flex items-start justify-between p-4 bg-cyber-dark rounded-lg">
              <div className="flex-1">
                <h3 className="font-medium text-gray-100 mb-1">Import Backup</h3>
                <p className="text-sm text-gray-400">
                  Restore data from a previously exported backup file. This will add to your existing data.
                </p>
              </div>
              <label className="ml-4 flex items-center space-x-2 px-4 py-2 bg-cyber-success/20 text-cyber-success rounded-lg hover:bg-cyber-success/30 transition-colors font-medium cursor-pointer">
                {importSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Imported!</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    <span>Import</span>
                  </>
                )}
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  className="hidden"
                />
              </label>
            </div>

            {/* Clear All Data */}
            <div className="flex items-start justify-between p-4 bg-cyber-dark rounded-lg border border-red-500/20">
              <div className="flex-1">
                <h3 className="font-medium text-red-400 mb-1">Clear All Data</h3>
                <p className="text-sm text-gray-400">
                  Permanently delete all data from CyberNotes. This action cannot be undone.
                </p>
              </div>
              <button
                onClick={handleClearAllData}
                className="ml-4 flex items-center space-x-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-colors font-medium"
              >
                <Trash2 className="w-4 h-4" />
                <span>Clear All</span>
              </button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-100 mb-4">About CyberNotes</h2>
          <div className="space-y-2 text-sm text-gray-400">
            <p><span className="font-medium text-gray-300">Version:</span> 1.0.0</p>
            <p><span className="font-medium text-gray-300">Type:</span> Localhost Knowledge Base System</p>
            <p><span className="font-medium text-gray-300">Storage:</span> IndexedDB (Browser Local Storage)</p>
            <p><span className="font-medium text-gray-300">Data Privacy:</span> All data is stored locally on your device. Nothing is sent to external servers.</p>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Keyboard Shortcuts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
              <span className="text-gray-400">Quick Capture</span>
              <kbd className="px-2 py-1 bg-cyber-darker border border-gray-700 rounded text-gray-300">Ctrl+N</kbd>
            </div>
            <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
              <span className="text-gray-400">Search</span>
              <kbd className="px-2 py-1 bg-cyber-darker border border-gray-700 rounded text-gray-300">Ctrl+K</kbd>
            </div>
            <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
              <span className="text-gray-400">Save</span>
              <kbd className="px-2 py-1 bg-cyber-darker border border-gray-700 rounded text-gray-300">Ctrl+S</kbd>
            </div>
            <div className="flex items-center justify-between p-3 bg-cyber-dark rounded">
              <span className="text-gray-400">New Project</span>
              <kbd className="px-2 py-1 bg-cyber-darker border border-gray-700 rounded text-gray-300">Ctrl+Shift+N</kbd>
            </div>
          </div>
        </div>

        {/* Storage Info */}
        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-100 mb-4">Storage Information</h2>
          <div className="text-sm text-gray-400">
            <p className="mb-2">CyberNotes uses IndexedDB for local storage. Your browser typically allows several gigabytes of storage.</p>
            <p className="text-gray-500">Regular backups are recommended to prevent data loss.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
