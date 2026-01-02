import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import { Save, X, Plus, Tag as TagIcon, FolderOpen } from 'lucide-react';

function QuickCapture() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    project_id: '',
    tags: [],
    type: 'quick'
  });
  const [tagInput, setTagInput] = useState('');
  const [projects, setProjects] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

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

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const tag = tagInput.trim().toLowerCase();
      if (tag && !formData.tags.includes(tag)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, tag]
        });
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

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('Please enter both title and content');
      return;
    }

    setIsSaving(true);
    try {
      await dbHelpers.createNote(formData);

      // Update tag usage
      for (const tag of formData.tags) {
        await dbHelpers.incrementTagUsage(tag);
        await dbHelpers.createTag({ name: tag, category: 'custom' });
      }

      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);

      // Reset form
      setFormData({
        title: '',
        content: '',
        project_id: formData.project_id, // Keep project selected
        tags: [],
        type: 'quick'
      });
    } catch (error) {
      console.error('Error saving note:', error);
      alert('Failed to save note');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveAndNew = async () => {
    await handleSave();
  };

  const handleClear = () => {
    setFormData({
      title: '',
      content: '',
      project_id: '',
      tags: [],
      type: 'quick'
    });
    setTagInput('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cyber-primary mb-2">Quick Capture</h1>
        <p className="text-gray-400">Rapidly capture notes during active work</p>
      </div>

      <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
        {showSuccess && (
          <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400">
            Note saved successfully!
          </div>
        )}

        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Title *
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="Enter note title..."
            className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
          />
        </div>

        {/* Project Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            <FolderOpen className="w-4 h-4 inline mr-1" />
            Project (Optional)
          </label>
          <select
            value={formData.project_id}
            onChange={(e) => setFormData({ ...formData, project_id: parseInt(e.target.value) || '' })}
            className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
          >
            <option value="">No Project</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>
        </div>

        {/* Tags */}
        <div className="mb-4">
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
            placeholder="Type and press Enter or comma to add tags..."
            className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-2 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary"
          />
          <p className="text-xs text-gray-500 mt-1">Press Enter or comma to add a tag</p>
        </div>

        {/* Content */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Content *
          </label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            placeholder="Enter your notes here... Supports Markdown"
            rows={15}
            className="w-full bg-cyber-dark border border-gray-700 rounded-lg px-4 py-3 text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cyber-primary focus:ring-1 focus:ring-cyber-primary font-mono text-sm"
          />
          <p className="text-xs text-gray-500 mt-1">Markdown supported: **bold**, *italic*, `code`, etc.</p>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-gray-400 hover:text-gray-200 transition-colors"
          >
            Clear
          </button>

          <div className="flex items-center space-x-3">
            <button
              onClick={handleSaveAndNew}
              disabled={isSaving}
              className="px-6 py-2 bg-cyber-dark border border-cyber-primary text-cyber-primary rounded-lg hover:bg-cyber-primary/10 transition-colors disabled:opacity-50"
            >
              Save & New
            </button>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex items-center space-x-2 px-6 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 transition-colors font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>{isSaving ? 'Saving...' : 'Save'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Quick Reference */}
      <div className="mt-6 bg-cyber-darker/50 border border-cyber-primary/10 rounded-lg p-4">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Quick Markdown Reference</h3>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
          <div><code className="text-cyber-success">**bold**</code> - Bold text</div>
          <div><code className="text-cyber-success">*italic*</code> - Italic text</div>
          <div><code className="text-cyber-success">`code`</code> - Inline code</div>
          <div><code className="text-cyber-success">```code block```</code> - Code block</div>
          <div><code className="text-cyber-success"># Heading</code> - Heading</div>
          <div><code className="text-cyber-success">- List item</code> - List</div>
        </div>
      </div>
    </div>
  );
}

export default QuickCapture;
