import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import { Link, Plus, X, ExternalLink, Tag as TagIcon } from 'lucide-react';

function Resources() {
  const [resources, setResources] = useState([]);
  const [filterType, setFilterType] = useState('all');
  const [showCreateModal, setShowCreateModal] = useState(false);

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      const allResources = await dbHelpers.getAllResources();
      setResources(allResources);
    } catch (error) {
      console.error('Error loading resources:', error);
    }
  };

  const filteredResources = resources.filter(r =>
    filterType === 'all' || r.type === filterType
  );

  const getTypeIcon = (type) => {
    const icons = {
      course: '📖',
      tool: '🛠️',
      documentation: '📚',
      writeup: '📝'
    };
    return icons[type] || '🔗';
  };

  const getTypeColor = (type) => {
    const colors = {
      course: 'text-yellow-400 bg-yellow-400/10',
      tool: 'text-cyan-400 bg-cyan-400/10',
      documentation: 'text-blue-400 bg-blue-400/10',
      writeup: 'text-purple-400 bg-purple-400/10'
    };
    return colors[type] || 'text-gray-400 bg-gray-400/10';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-cyber-primary mb-2">Resources</h1>
          <p className="text-gray-400">{filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>Add Resource</span>
        </button>
      </div>

      {/* Filter */}
      <div className="mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-cyber-darker border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
        >
          <option value="all">All Types</option>
          <option value="course">Courses</option>
          <option value="tool">Tools</option>
          <option value="documentation">Documentation</option>
          <option value="writeup">Writeups</option>
        </select>
      </div>

      {/* Resources Grid */}
      {filteredResources.length === 0 ? (
        <div className="text-center py-12">
          <Link className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No resources found</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-cyber-primary/10 text-cyber-primary rounded-lg hover:bg-cyber-primary/20"
          >
            Add Your First Resource
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
              className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6 hover:border-cyber-primary/40 transition-colors"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{getTypeIcon(resource.type)}</span>
                <span className={`text-xs px-2 py-1 rounded ${getTypeColor(resource.type)}`}>
                  {resource.type}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-100 mb-2">{resource.title}</h3>

              {resource.description && (
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{resource.description}</p>
              )}

              {resource.type === 'course' && typeof resource.progress === 'number' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{resource.progress}%</span>
                  </div>
                  <div className="w-full bg-cyber-dark rounded-full h-2">
                    <div
                      className="bg-cyber-primary h-2 rounded-full transition-all"
                      style={{ width: `${resource.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {resource.url && (
                <a
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-1 text-sm text-cyber-primary hover:text-cyber-primary/80 mb-3"
                >
                  <span>Open Resource</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}

              {resource.tags && resource.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {resource.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-cyber-dark text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Create Resource Modal */}
      {showCreateModal && (
        <CreateResourceModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            loadResources();
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function CreateResourceModal({ onClose, onCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    type: 'tool',
    category: '',
    description: '',
    tags: [],
    progress: 0,
    status: 'not-started'
  });
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !formData.tags.includes(tag)) {
        setFormData({ ...formData, tags: [...formData.tags, tag] });
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a title');
      return;
    }

    try {
      await dbHelpers.createResource(formData);
      for (const tag of formData.tags) {
        await dbHelpers.createTag({ name: tag, category: 'custom' });
      }
      onCreated();
    } catch (error) {
      console.error('Error creating resource:', error);
      alert('Failed to create resource');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-cyber-primary/20">
          <h2 className="text-2xl font-bold text-cyber-primary">Add New Resource</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Burp Suite, OSCP Course"
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
              >
                <option value="course">Course</option>
                <option value="tool">Tool</option>
                <option value="documentation">Documentation</option>
                <option value="writeup">Writeup</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., web-security, tools"
                className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              URL
            </label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://..."
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description..."
              rows={3}
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
            />
          </div>

          {formData.type === 'course' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Progress: {formData.progress}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={formData.progress}
                onChange={(e) => setFormData({ ...formData, progress: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <TagIcon className="w-4 h-4 inline mr-1" />
              Tags
            </label>
            <div className="mb-2 flex flex-wrap gap-2">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 bg-cyber-primary/10 text-cyber-primary rounded-full text-sm"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(tag)}
                    className="ml-2 hover:text-cyber-primary/70"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type and press Enter to add tags..."
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
            />
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-400 hover:text-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 font-medium"
            >
              Add Resource
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Resources;
