import { useState } from 'react';
import { Search, Zap, Plus, Download } from 'lucide-react';

function Header({ onSearch, onNavigate }) {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearch(searchInput);
    }
  };

  return (
    <header className="bg-cyber-darker border-b border-cyber-primary/20 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <div className="flex items-center space-x-2">
            <Zap className="w-6 h-6 text-cyber-primary" />
            <h1 className="text-xl font-bold text-cyber-primary">CyberNotes</h1>
          </div>

          <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                placeholder="Search projects, notes, commands... (Ctrl+K)"
                className="w-full bg-cyber-dark border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
              />
            </div>
          </form>
        </div>

        <div className="flex items-center space-x-3 ml-4">
          <button
            onClick={() => onNavigate('quick-capture')}
            className="flex items-center space-x-2 px-4 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Quick Capture</span>
          </button>

          <button
            onClick={() => onNavigate('settings')}
            className="p-2 text-gray-400 hover:text-cyber-primary transition-colors"
            title="Settings"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
