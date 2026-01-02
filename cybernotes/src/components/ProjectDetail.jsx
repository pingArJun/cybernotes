import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import {
  ArrowLeft,
  Terminal,
  FileText,
  Image as ImageIcon,
  Clock,
  Edit,
  Trash2,
  Copy,
  Check
} from 'lucide-react';

function ProjectDetail({ project, onBack }) {
  const [activeTab, setActiveTab] = useState('notes');
  const [notes, setNotes] = useState([]);
  const [commands, setCommands] = useState([]);
  const [files, setFiles] = useState([]);
  const [copiedId, setCopiedId] = useState(null);

  useEffect(() => {
    if (project) {
      loadProjectData();
    }
  }, [project]);

  const loadProjectData = async () => {
    try {
      const [projectNotes, projectCommands, projectFiles] = await Promise.all([
        dbHelpers.getNotesByProject(project.id),
        dbHelpers.getCommandsByProject(project.id),
        dbHelpers.getFilesByProject(project.id)
      ]);

      setNotes(projectNotes);
      setCommands(projectCommands);
      setFiles(projectFiles);
    } catch (error) {
      console.error('Error loading project data:', error);
    }
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

  const handleDeleteNote = async (noteId) => {
    if (confirm('Are you sure you want to delete this note?')) {
      try {
        await dbHelpers.deleteNote(noteId);
        loadProjectData();
      } catch (error) {
        console.error('Error deleting note:', error);
      }
    }
  };

  const handleDeleteCommand = async (commandId) => {
    if (confirm('Are you sure you want to delete this command?')) {
      try {
        await dbHelpers.deleteCommand(commandId);
        loadProjectData();
      } catch (error) {
        console.error('Error deleting command:', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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

  const getStatusColor = (status) => {
    const colors = {
      'not-started': 'text-gray-400 bg-gray-400/10',
      'in-progress': 'text-yellow-400 bg-yellow-400/10',
      completed: 'text-green-400 bg-green-400/10',
      archived: 'text-gray-500 bg-gray-500/10'
    };
    return colors[status] || 'text-gray-400 bg-gray-400/10';
  };

  if (!project) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-400 hover:text-cyber-primary mb-4 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Projects</span>
        </button>

        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <span className="text-5xl">{getProjectTypeIcon(project.type)}</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-100 mb-2">{project.name}</h1>
              <div className="flex items-center space-x-3 mb-2">
                <span className={`text-xs px-3 py-1 rounded ${getStatusColor(project.status)}`}>
                  {project.status.replace('-', ' ')}
                </span>
                <span className="text-sm text-gray-500">
                  Created {formatDate(project.created_date)}
                </span>
              </div>
              {project.description && (
                <p className="text-gray-400 mt-2">{project.description}</p>
              )}
              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="text-xs px-2 py-1 bg-cyber-primary/10 text-cyber-primary rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-cyber-primary">{notes.length}</div>
                <div className="text-xs text-gray-500">Notes</div>
              </div>
              <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-cyber-success">{commands.length}</div>
                <div className="text-xs text-gray-500">Commands</div>
              </div>
              <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-3">
                <div className="text-2xl font-bold text-cyber-warning">{files.length}</div>
                <div className="text-xs text-gray-500">Files</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-cyber-primary/20 mb-6">
        <div className="flex space-x-6">
          <button
            onClick={() => setActiveTab('notes')}
            className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
              activeTab === 'notes'
                ? 'border-cyber-primary text-cyber-primary'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Notes ({notes.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('commands')}
            className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
              activeTab === 'commands'
                ? 'border-cyber-primary text-cyber-primary'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Commands ({commands.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('files')}
            className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
              activeTab === 'files'
                ? 'border-cyber-primary text-cyber-primary'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            <span>Files ({files.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('timeline')}
            className={`flex items-center space-x-2 pb-3 border-b-2 transition-colors ${
              activeTab === 'timeline'
                ? 'border-cyber-primary text-cyber-primary'
                : 'border-transparent text-gray-400 hover:text-gray-200'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Timeline</span>
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'notes' && (
          <div className="space-y-4">
            {notes.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p>No notes yet for this project</p>
              </div>
            ) : (
              notes.map((note) => (
                <div
                  key={note.id}
                  className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6 hover:border-cyber-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-100">{note.title}</h3>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-gray-300 mb-3 whitespace-pre-wrap line-clamp-3">
                    {note.content}
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {note.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-cyber-primary/10 text-cyber-primary rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {formatDate(note.modified_date)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'commands' && (
          <div className="space-y-4">
            {commands.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <Terminal className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p>No commands yet for this project</p>
              </div>
            ) : (
              commands.map((command) => (
                <div
                  key={command.id}
                  className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <span className="text-sm font-medium text-cyber-success">
                          {command.tool}
                        </span>
                        <span className={`text-xs ${command.success ? 'text-green-400' : 'text-red-400'}`}>
                          {command.success ? '✓ Success' : '✗ Failed'}
                        </span>
                      </div>
                      {command.purpose && (
                        <p className="text-sm text-gray-400 mb-3">{command.purpose}</p>
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleCopyCommand(command)}
                        className="flex items-center space-x-2 px-3 py-1.5 bg-cyber-success/10 text-cyber-success rounded hover:bg-cyber-success/20 transition-colors"
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
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-cyber-dark rounded-lg p-4 mb-3">
                    <code className="text-sm text-gray-300 font-mono break-all">
                      {command.command_text}
                    </code>
                  </div>

                  {command.output_text && (
                    <div className="bg-cyber-dark rounded-lg p-4 mb-3">
                      <div className="text-xs text-gray-500 mb-2">Output:</div>
                      <pre className="text-xs text-gray-400 font-mono overflow-x-auto max-h-40">
                        {command.output_text}
                      </pre>
                    </div>
                  )}

                  {command.notes && (
                    <div className="text-sm text-gray-400 mb-3">
                      <span className="font-medium">Notes: </span>
                      {command.notes}
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {command.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-gray-700 text-gray-400 rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(command.created_date)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'files' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {files.length === 0 ? (
              <div className="col-span-full text-center py-12 text-gray-500">
                <ImageIcon className="w-16 h-16 mx-auto mb-4 text-gray-600" />
                <p>No files yet for this project</p>
              </div>
            ) : (
              files.map((file) => (
                <div
                  key={file.id}
                  className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-4"
                >
                  <div className="aspect-video bg-cyber-dark rounded mb-3 flex items-center justify-center">
                    {file.file_type?.startsWith('image/') ? (
                      <img
                        src={file.file_data}
                        alt={file.filename}
                        className="max-w-full max-h-full object-contain rounded"
                      />
                    ) : (
                      <ImageIcon className="w-12 h-12 text-gray-600" />
                    )}
                  </div>
                  <h4 className="font-medium text-gray-100 truncate">{file.filename}</h4>
                  <div className="text-xs text-gray-500 mt-1">
                    {(file.size / 1024).toFixed(1)} KB
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'timeline' && (
          <div className="space-y-4">
            <div className="text-center py-12 text-gray-500">
              <Clock className="w-16 h-16 mx-auto mb-4 text-gray-600" />
              <p>Timeline view coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectDetail;
