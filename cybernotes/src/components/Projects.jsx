import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import { Plus, FolderOpen, X, Tag as TagIcon } from 'lucide-react';

function Projects({ onSelectProject }) {
  const [projects, setProjects] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      const allProjects = await dbHelpers.getAllProjects();
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const filteredProjects = projects.filter(project => {
    if (filterType !== 'all' && project.type !== filterType) return false;
    if (filterStatus !== 'all' && project.status !== filterStatus) return false;
    return true;
  });

  const getProjectTypeIcon = (type) => {
    const icons = {
      malware: '🦠',
      bugbounty: '🐛',
      ctf: '🏴',
      research: '🔬',
      course: '📖',
      tool: '🛠️',
      custom: '📊'
    };
    return icons[type] || '📁';
  };

  const getProjectTypeColor = (type) => {
    const colors = {
      malware: 'text-red-400 bg-red-400/10 border-red-400/30',
      bugbounty: 'text-green-400 bg-green-400/10 border-green-400/30',
      ctf: 'text-purple-400 bg-purple-400/10 border-purple-400/30',
      research: 'text-blue-400 bg-blue-400/10 border-blue-400/30',
      course: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
      tool: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/30',
      custom: 'text-gray-400 bg-gray-400/10 border-gray-400/30'
    };
    return colors[type] || 'text-gray-400 bg-gray-400/10 border-gray-400/30';
  };

  const getStatusColor = (status) => {
    const colors = {
      'not-started': 'text-gray-400 bg-gray-400/10',
      'in-progress': 'text-yellow-400 bg-yellow-400/10',
      completed: 'text-green-400 bg-green-400/10',
      archived: 'text-gray-500 bg-gray-500/10'
    };
    return colors[status] || 'text-gray-400 bg-gray-400/10';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-cyber-primary mb-2">Projects</h1>
          <p className="text-gray-400">{filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 transition-colors font-medium"
        >
          <Plus className="w-4 h-4" />
          <span>New Project</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="bg-cyber-darker border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
        >
          <option value="all">All Types</option>
          <option value="malware">Malware Analysis</option>
          <option value="bugbounty">Bug Bounty</option>
          <option value="ctf">CTF Challenge</option>
          <option value="research">Research/Lab</option>
          <option value="course">Course Work</option>
          <option value="tool">Tool Development</option>
          <option value="custom">Custom</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-cyber-darker border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
        >
          <option value="all">All Status</option>
          <option value="not-started">Not Started</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="archived">Archived</option>
        </select>
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div className="text-center py-12">
          <FolderOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No projects found</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-cyber-primary/10 text-cyber-primary rounded-lg hover:bg-cyber-primary/20"
          >
            Create Your First Project
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <button
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="text-left bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6 hover:border-cyber-primary/50 transition-all hover:shadow-lg hover:shadow-cyber-primary/10"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="text-3xl">{getProjectTypeIcon(project.type)}</span>
                <span className={`text-xs px-2 py-1 rounded ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </span>
              </div>

              <h3 className="text-lg font-bold text-gray-100 mb-2">{project.name}</h3>

              {project.description && (
                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{project.description}</p>
              )}

              <div className={`inline-block text-xs px-2 py-1 rounded border mb-3 ${getProjectTypeColor(project.type)}`}>
                {project.type === 'bugbounty' ? 'Bug Bounty' : project.type.charAt(0).toUpperCase() + project.type.slice(1)}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mt-4">
                <div className="flex space-x-3">
                  <span>{project.stats?.notes_count || 0} notes</span>
                  <span>{project.stats?.commands_count || 0} cmds</span>
                </div>
                <span>{formatDate(project.last_modified)}</span>
              </div>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-3">
                  {project.tags.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-0.5 bg-cyber-dark text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      {showCreateModal && (
        <CreateProjectModal
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            loadProjects();
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function CreateProjectModal({ onClose, onCreated }) {
  const [formData, setFormData] = useState({
    name: '',
    type: 'custom',
    status: 'not-started',
    description: '',
    tags: []
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
    if (!formData.name.trim()) {
      alert('Please enter a project name');
      return;
    }

    try {
      await dbHelpers.createProject(formData);
      for (const tag of formData.tags) {
        await dbHelpers.createTag({ name: tag, category: 'custom' });
      }
      onCreated();
    } catch (error) {
      console.error('Error creating project:', error);
      alert('Failed to create project');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-cyber-primary/20">
          <h2 className="text-2xl font-bold text-cyber-primary">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., HackTheBox - Injection Machine"
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project Type
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
            >
              <option value="malware">🦠 Malware Analysis</option>
              <option value="bugbounty">🐛 Bug Bounty</option>
              <option value="ctf">🏴 CTF Challenge</option>
              <option value="research">🔬 Research/Lab</option>
              <option value="course">📖 Course Work</option>
              <option value="tool">🛠️ Tool Development</option>
              <option value="custom">📊 Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
            >
              <option value="not-started">Not Started</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="archived">Archived</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the project..."
              rows={3}
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
            />
          </div>

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
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Projects;
