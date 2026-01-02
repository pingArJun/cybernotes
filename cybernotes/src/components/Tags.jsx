import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import { Tag as TagIcon } from 'lucide-react';

function Tags() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    loadTags();
  }, []);

  const loadTags = async () => {
    try {
      const allTags = await dbHelpers.getAllTags();
      setTags(allTags);
    } catch (error) {
      console.error('Error loading tags:', error);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cyber-primary mb-2">Tags</h1>
        <p className="text-gray-400">{tags.length} tag{tags.length !== 1 ? 's' : ''}</p>
      </div>

      {tags.length === 0 ? (
        <div className="text-center py-12">
          <TagIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No tags yet</p>
          <p className="text-sm text-gray-500 mt-2">Tags will appear as you create notes, commands, and projects</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <button
              key={tag.id}
              className="px-4 py-2 bg-cyber-darker border border-cyber-primary/20 rounded-lg hover:border-cyber-primary/50 transition-colors"
            >
              <div className="flex items-center space-x-2">
                <TagIcon className="w-4 h-4 text-cyber-primary" />
                <span className="text-gray-100">{tag.name}</span>
                <span className="text-xs text-gray-500">({tag.usage_count || 0})</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Tags;
