import { useState, useEffect } from 'react';
import { initializeDefaults } from './db';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import QuickCapture from './components/QuickCapture';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import Commands from './components/Commands';
import Walkthroughs from './components/Walkthroughs';
import Templates from './components/Templates';
import Resources from './components/Resources';
import Checklists from './components/Checklists';
import Tags from './components/Tags';
import Search from './components/Search';
import Settings from './components/Settings';
import Files from './components/Files';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Initialize default templates and checklists
    initializeDefaults();
  }, []);

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentView} onSelectProject={setSelectedProject} />;
      case 'quick-capture':
        return <QuickCapture />;
      case 'projects':
        return <Projects onSelectProject={(project) => {
          setSelectedProject(project);
          setCurrentView('project-detail');
        }} />;
      case 'project-detail':
        return <ProjectDetail
          project={selectedProject}
          onBack={() => setCurrentView('projects')}
          onNavigate={setCurrentView}
        />;
      case 'commands':
        return <Commands />;
      case 'walkthroughs':
        return <Walkthroughs />;
      case 'templates':
        return <Templates />;
      case 'resources':
        return <Resources />;
      case 'files':
        return <Files />;
      case 'checklists':
        return <Checklists />;
      case 'tags':
        return <Tags />;
      case 'search':
        return <Search query={searchQuery} />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard onNavigate={setCurrentView} onSelectProject={setSelectedProject} />;
    }
  };

  return (
    <div className="flex h-screen bg-cyber-dark text-gray-100">
      <Sidebar
        currentView={currentView}
        onNavigate={setCurrentView}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header
          onSearch={(query) => {
            setSearchQuery(query);
            setCurrentView('search');
          }}
          onNavigate={setCurrentView}
        />

        <main className="flex-1 overflow-auto p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
