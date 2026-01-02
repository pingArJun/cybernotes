import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import { Search as SearchIcon, FileText, Terminal, FolderOpen, Link } from 'lucide-react';

function Search({ query }) {
  const [results, setResults] = useState({
    projects: [],
    notes: [],
    commands: [],
    resources: []
  });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (query && query.trim()) {
      performSearch(query);
    }
  }, [query]);

  const performSearch = async (searchQuery) => {
    setIsSearching(true);
    try {
      const searchResults = await dbHelpers.searchAll(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const totalResults =
    results.projects.length +
    results.notes.length +
    results.commands.length +
    results.resources.length;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-cyber-primary mb-2">Search Results</h1>
        {query && (
          <p className="text-gray-400">
            {isSearching ? 'Searching...' : `${totalResults} result${totalResults !== 1 ? 's' : ''} for "${query}"`}
          </p>
        )}
      </div>

      {!query || query.trim() === '' ? (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">Enter a search query to find projects, notes, commands, and resources</p>
        </div>
      ) : totalResults === 0 && !isSearching ? (
        <div className="text-center py-12">
          <SearchIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No results found for "{query}"</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Projects */}
          {results.projects.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-100 mb-3 flex items-center space-x-2">
                <FolderOpen className="w-5 h-5 text-cyber-primary" />
                <span>Projects ({results.projects.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-4 hover:border-cyber-primary/40 transition-colors"
                  >
                    <h3 className="font-bold text-gray-100">{project.name}</h3>
                    {project.description && (
                      <p className="text-sm text-gray-400 mt-1">{project.description}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs px-2 py-1 bg-cyber-primary/10 text-cyber-primary rounded">
                        {project.type}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDate(project.last_modified)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {results.notes.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-100 mb-3 flex items-center space-x-2">
                <FileText className="w-5 h-5 text-cyber-warning" />
                <span>Notes ({results.notes.length})</span>
              </h2>
              <div className="space-y-3">
                {results.notes.map((note) => (
                  <div
                    key={note.id}
                    className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-4 hover:border-cyber-primary/40 transition-colors"
                  >
                    <h3 className="font-bold text-gray-100 mb-2">{note.title}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{note.content}</p>
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-wrap gap-1">
                        {note.tags?.slice(0, 3).map((tag, idx) => (
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
            </div>
          )}

          {/* Commands */}
          {results.commands.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-100 mb-3 flex items-center space-x-2">
                <Terminal className="w-5 h-5 text-cyber-success" />
                <span>Commands ({results.commands.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.commands.map((command) => (
                  <div
                    key={command.id}
                    className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-cyber-success">{command.tool}</span>
                      <span className={`text-xs ${command.success ? 'text-green-400' : 'text-red-400'}`}>
                        {command.success ? '✓' : '✗'}
                      </span>
                    </div>
                    <code className="text-sm text-gray-300 font-mono block mb-2">
                      {command.command_text}
                    </code>
                    <span className="text-xs text-gray-500">
                      {formatDate(command.created_date)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {results.resources.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-gray-100 mb-3 flex items-center space-x-2">
                <Link className="w-5 h-5 text-purple-400" />
                <span>Resources ({results.resources.length})</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {results.resources.map((resource) => (
                  <div
                    key={resource.id}
                    className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-4 hover:border-cyber-primary/40 transition-colors"
                  >
                    <h3 className="font-bold text-gray-100">{resource.title}</h3>
                    {resource.notes && (
                      <p className="text-sm text-gray-400 mt-1 line-clamp-2">{resource.notes}</p>
                    )}
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs px-2 py-1 bg-purple-400/10 text-purple-400 rounded">
                        {resource.type}
                      </span>
                      {resource.url && (
                        <a
                          href={resource.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-cyber-primary hover:underline"
                        >
                          Open
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Search;
