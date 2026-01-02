import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import {
  Terminal,
  Copy,
  Check,
  Plus,
  X,
  Filter,
  Grid3x3,
  List,
  Trash2,
  Tag as TagIcon
} from 'lucide-react';

function Commands() {
  const [commands, setCommands] = useState([]);
  const [filteredCommands, setFilteredCommands] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [filterTool, setFilterTool] = useState('all');
  const [filterSuccess, setFilterSuccess] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    loadCommands();
    loadProjects();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [commands, filterTool, filterSuccess, searchQuery]);

  const loadCommands = async () => {
    try {
      const allCommands = await dbHelpers.getAllCommands();
      setCommands(allCommands);
    } catch (error) {
      console.error('Error loading commands:', error);
    }
  };

  const loadProjects = async () => {
    try {
      const allProjects = await dbHelpers.getAllProjects();
      setProjects(allProjects);
    } catch (error) {
      console.error('Error loading projects:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...commands];

    if (filterTool !== 'all') {
      filtered = filtered.filter(cmd => cmd.tool?.toLowerCase() === filterTool.toLowerCase());
    }

    if (filterSuccess !== 'all') {
      filtered = filtered.filter(cmd =>
        filterSuccess === 'success' ? cmd.success === true : cmd.success === false
      );
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(cmd =>
        cmd.command_text?.toLowerCase().includes(query) ||
        cmd.tool?.toLowerCase().includes(query) ||
        cmd.purpose?.toLowerCase().includes(query) ||
        cmd.notes?.toLowerCase().includes(query)
      );
    }

    setFilteredCommands(filtered);
  };

  const handleCopyCommand = async (command) => {
    try {
      await navigator.clipboard.writeText(command.command_text);
      await dbHelpers.incrementCommandUsage(command.id);
      setCopiedId(command.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (error) {
      console.error('Error copying command:', error);
    }
  };

  const handleCopyOutput = async (output) => {
    try {
      await navigator.clipboard.writeText(output);
    } catch (error) {
      console.error('Error copying output:', error);
    }
  };

  const handleDeleteCommand = async (commandId) => {
    if (confirm('Are you sure you want to delete this command?')) {
      try {
        await dbHelpers.deleteCommand(commandId);
        loadCommands();
      } catch (error) {
        console.error('Error deleting command:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const uniqueTools = [...new Set(commands.map(cmd => cmd.tool).filter(Boolean))];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-cyber-primary mb-2">Commands Library</h1>
          <p className="text-gray-400">{filteredCommands.length} command{filteredCommands.length !== 1 ? 's' : ''}</p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1 bg-cyber-darker border border-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded ${viewMode === 'grid' ? 'bg-cyber-primary/20 text-cyber-primary' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <Grid3x3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded ${viewMode === 'list' ? 'bg-cyber-primary/20 text-cyber-primary' : 'text-gray-400 hover:text-gray-200'}`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-cyber-success text-cyber-darker rounded-lg hover:bg-cyber-success/80 transition-colors font-medium"
          >
            <Plus className="w-4 h-4" />
            <span>Add Command</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search commands..."
            className="w-full bg-cyber-darker border border-gray-700 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyber-primary"
          />
        </div>

        <select
          value={filterTool}
          onChange={(e) => setFilterTool(e.target.value)}
          className="bg-cyber-darker border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
        >
          <option value="all">All Tools</option>
          {uniqueTools.map((tool) => (
            <option key={tool} value={tool}>{tool}</option>
          ))}
        </select>

        <select
          value={filterSuccess}
          onChange={(e) => setFilterSuccess(e.target.value)}
          className="bg-cyber-darker border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
        >
          <option value="all">All Status</option>
          <option value="success">Success Only</option>
          <option value="failed">Failed Only</option>
        </select>
      </div>

      {/* Commands Display */}
      {filteredCommands.length === 0 ? (
        <div className="text-center py-12">
          <Terminal className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No commands found</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-cyber-success/10 text-cyber-success rounded-lg hover:bg-cyber-success/20"
          >
            Add Your First Command
          </button>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
          {filteredCommands.map((command) => (
            <div
              key={command.id}
              className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-5 hover:border-cyber-primary/40 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-cyber-success bg-cyber-success/10 px-3 py-1 rounded">
                    {command.tool}
                  </span>
                  <span className={`text-xs ${command.success ? 'text-green-400' : 'text-red-400'}`}>
                    {command.success ? '✓ Success' : '✗ Failed'}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleCopyCommand(command)}
                    className="flex items-center space-x-1 px-3 py-1.5 bg-cyber-success/20 text-cyber-success rounded hover:bg-cyber-success/30 transition-colors font-medium"
                    title="Copy command"
                  >
                    {copiedId === command.id ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span className="text-sm">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span className="text-sm">Copy</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => handleDeleteCommand(command.id)}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Delete command"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {command.purpose && (
                <p className="text-sm text-gray-400 mb-3">{command.purpose}</p>
              )}

              <div className="bg-cyber-dark rounded-lg p-4 mb-3 relative group">
                <code className="text-sm text-gray-300 font-mono break-all block">
                  {command.command_text}
                </code>
              </div>

              {command.output_text && viewMode === 'list' && (
                <div className="bg-cyber-dark rounded-lg p-4 mb-3 relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Output:</span>
                    <button
                      onClick={() => handleCopyOutput(command.output_text)}
                      className="text-xs text-gray-400 hover:text-cyber-success"
                    >
                      Copy Output
                    </button>
                  </div>
                  <pre className="text-xs text-gray-400 font-mono overflow-x-auto max-h-40">
                    {command.output_text}
                  </pre>
                </div>
              )}

              {command.notes && (
                <div className="text-sm text-gray-400 mb-3">
                  <span className="font-medium text-gray-300">Notes: </span>
                  {command.notes}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-1">
                  {command.tags?.slice(0, 3).map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="text-xs text-gray-500">
                  {formatDate(command.created_date)}
                  {command.times_used > 0 && (
                    <span className="ml-2">• Used {command.times_used}x</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Command Modal */}
      {showCreateModal && (
        <CreateCommandModal
          projects={projects}
          onClose={() => setShowCreateModal(false)}
          onCreated={() => {
            loadCommands();
            setShowCreateModal(false);
          }}
        />
      )}
    </div>
  );
}

function CreateCommandModal({ projects, onClose, onCreated }) {
  const [formData, setFormData] = useState({
    command_text: '',
    output_text: '',
    tool: '',
    purpose: '',
    success: true,
    notes: '',
    project_id: '',
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
    if (!formData.command_text.trim() || !formData.tool.trim()) {
      alert('Please enter command and tool');
      return;
    }

    try {
      await dbHelpers.createCommand(formData);
      for (const tag of formData.tags) {
        await dbHelpers.createTag({ name: tag, category: 'custom' });
      }
      onCreated();
    } catch (error) {
      console.error('Error creating command:', error);
      alert('Failed to create command');
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-cyber-primary/20">
          <h2 className="text-2xl font-bold text-cyber-primary">Add New Command</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tool *
              </label>
              <input
                type="text"
                value={formData.tool}
                onChange={(e) => setFormData({ ...formData, tool: e.target.value })}
                placeholder="e.g., nmap, gobuster, sqlmap"
                className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Success Status
              </label>
              <select
                value={formData.success.toString()}
                onChange={(e) => setFormData({ ...formData, success: e.target.value === 'true' })}
                className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
              >
                <option value="true">Success</option>
                <option value="false">Failed</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Command *
            </label>
            <textarea
              value={formData.command_text}
              onChange={(e) => setFormData({ ...formData, command_text: e.target.value })}
              placeholder="Enter the command..."
              rows={3}
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 font-mono text-sm focus:outline-none focus:border-cyber-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Purpose
            </label>
            <input
              type="text"
              value={formData.purpose}
              onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              placeholder="What does this command do?"
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Output (Optional)
            </label>
            <textarea
              value={formData.output_text}
              onChange={(e) => setFormData({ ...formData, output_text: e.target.value })}
              placeholder="Paste command output here..."
              rows={5}
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 font-mono text-xs focus:outline-none focus:border-cyber-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Additional notes about this command..."
              rows={2}
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Project (Optional)
            </label>
            <select
              value={formData.project_id}
              onChange={(e) => setFormData({ ...formData, project_id: parseInt(e.target.value) || '' })}
              className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary"
            >
              <option value="">No Project</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name}
                </option>
              ))}
            </select>
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
              className="px-6 py-2 bg-cyber-success text-cyber-darker rounded-lg hover:bg-cyber-success/80 font-medium"
            >
              Add Command
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Commands;
