import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import {
  FolderOpen,
  Terminal,
  FileText,
  Link,
  Clock,
  TrendingUp,
  Star
} from 'lucide-react';

function Dashboard({ onNavigate, onSelectProject }) {
  const [recentNotes, setRecentNotes] = useState([]);
  const [recentCommands, setRecentCommands] = useState([]);
  const [activeProjects, setActiveProjects] = useState([]);
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalCommands: 0,
    totalResources: 0,
    totalNotes: 0
  });

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [notes, commands, projects, allProjects, allCommands, allResources] = await Promise.all([
        dbHelpers.getAllNotes(),
        dbHelpers.getAllCommands(),
        dbHelpers.getAllProjects(),
        dbHelpers.getAllProjects(),
        dbHelpers.getAllCommands(),
        dbHelpers.getAllResources()
      ]);

      setRecentNotes(notes.slice(0, 10));
      setRecentCommands(commands.slice(0, 10));
      setActiveProjects(projects.filter(p => p.status === 'in-progress').slice(0, 5));

      setStats({
        totalProjects: allProjects.length,
        totalCommands: allCommands.length,
        totalResources: allResources.length,
        totalNotes: notes.length
      });
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  const getProjectTypeColor = (type) => {
    const colors = {
      malware: 'text-red-400',
      bugbounty: 'text-green-400',
      ctf: 'text-purple-400',
      research: 'text-blue-400',
      course: 'text-yellow-400',
      custom: 'text-gray-400'
    };
    return colors[type] || 'text-gray-400';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-cyber-primary mb-2">Dashboard</h1>
        <p className="text-gray-400">Your cybersecurity knowledge hub</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Projects</p>
              <p className="text-3xl font-bold text-cyber-primary mt-1">{stats.totalProjects}</p>
            </div>
            <FolderOpen className="w-10 h-10 text-cyber-primary/30" />
          </div>
        </div>

        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Commands Saved</p>
              <p className="text-3xl font-bold text-cyber-success mt-1">{stats.totalCommands}</p>
            </div>
            <Terminal className="w-10 h-10 text-cyber-success/30" />
          </div>
        </div>

        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Notes Created</p>
              <p className="text-3xl font-bold text-cyber-warning mt-1">{stats.totalNotes}</p>
            </div>
            <FileText className="w-10 h-10 text-cyber-warning/30" />
          </div>
        </div>

        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Resources</p>
              <p className="text-3xl font-bold text-purple-400 mt-1">{stats.totalResources}</p>
            </div>
            <Link className="w-10 h-10 text-purple-400/30" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Projects */}
        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-100">Active Projects</h2>
            <TrendingUp className="w-5 h-5 text-cyber-primary" />
          </div>

          {activeProjects.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No active projects</p>
              <button
                onClick={() => onNavigate('projects')}
                className="mt-4 px-4 py-2 bg-cyber-primary/10 text-cyber-primary rounded-lg hover:bg-cyber-primary/20"
              >
                Create Project
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {activeProjects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => {
                    onSelectProject(project);
                    onNavigate('project-detail');
                  }}
                  className="w-full text-left p-4 bg-cyber-dark rounded-lg hover:bg-cyber-dark/70 transition-colors border border-transparent hover:border-cyber-primary/30"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className={`font-medium ${getProjectTypeColor(project.type)}`}>
                        {project.name}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">
                        {project.stats?.notes_count || 0} notes, {project.stats?.commands_count || 0} commands
                      </p>
                    </div>
                    <div className="text-xs text-gray-500">
                      {formatDate(project.last_modified)}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Recent Notes */}
        <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-100">Recent Notes</h2>
            <Clock className="w-5 h-5 text-cyber-primary" />
          </div>

          {recentNotes.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No notes yet</p>
              <button
                onClick={() => onNavigate('quick-capture')}
                className="mt-4 px-4 py-2 bg-cyber-primary/10 text-cyber-primary rounded-lg hover:bg-cyber-primary/20"
              >
                Create Note
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentNotes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 bg-cyber-dark rounded-lg hover:bg-cyber-dark/70 transition-colors"
                >
                  <h3 className="font-medium text-gray-100">{note.title}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      {note.tags?.slice(0, 2).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-xs px-2 py-1 bg-cyber-primary/10 text-cyber-primary rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xs text-gray-500">
                      {formatDate(note.modified_date)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent Commands */}
      <div className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-100">Recent Commands</h2>
          <Terminal className="w-5 h-5 text-cyber-success" />
        </div>

        {recentCommands.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No commands saved yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recentCommands.slice(0, 6).map((command) => (
              <div
                key={command.id}
                className="p-4 bg-cyber-dark rounded-lg border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-cyber-success">{command.tool}</span>
                  <span className={`text-xs ${command.success ? 'text-green-400' : 'text-red-400'}`}>
                    {command.success ? '✓ Success' : '✗ Failed'}
                  </span>
                </div>
                <code className="text-sm text-gray-300 font-mono block truncate">
                  {command.command_text}
                </code>
                <div className="flex items-center justify-between mt-2">
                  <div className="flex space-x-1">
                    {command.tags?.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs px-2 py-0.5 bg-gray-700 text-gray-400 rounded"
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
