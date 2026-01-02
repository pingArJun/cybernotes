import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import { BookOpen, Plus } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

function Walkthroughs() {
  const [walkthroughs, setWalkthroughs] = useState([]);

  useEffect(() => {
    loadWalkthroughs();
  }, []);

  const loadWalkthroughs = async () => {
    try {
      const notes = await dbHelpers.getAllNotes();
      const walkthroughNotes = notes.filter(n => n.type === 'walkthrough');
      setWalkthroughs(walkthroughNotes);
    } catch (error) {
      console.error('Error loading walkthroughs:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-cyber-primary mb-2">Walkthroughs</h1>
          <p className="text-gray-400">{walkthroughs.length} walkthrough{walkthroughs.length !== 1 ? 's' : ''}</p>
        </div>

        <button
          className="flex items-center space-x-2 px-4 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>New Walkthrough</span>
        </button>
      </div>

      {walkthroughs.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No walkthroughs yet</p>
          <button className="px-4 py-2 bg-cyber-primary/10 text-cyber-primary rounded-lg hover:bg-cyber-primary/20">
            Create Your First Walkthrough
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {walkthroughs.map((walkthrough) => (
            <div
              key={walkthrough.id}
              className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6 hover:border-cyber-primary/40 transition-colors"
            >
              <h3 className="text-xl font-bold text-gray-100 mb-3">{walkthrough.title}</h3>
              <div className="text-gray-400 text-sm line-clamp-3 mb-4">
                {walkthrough.content.substring(0, 200)}...
              </div>
              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {walkthrough.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-cyber-primary/10 text-cyber-primary rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {formatDate(walkthrough.modified_date)}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Walkthroughs;
