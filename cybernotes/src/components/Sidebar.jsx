import {
  Home,
  Zap,
  FolderOpen,
  Terminal,
  BookOpen,
  FileText,
  BookmarkCheck,
  Link,
  CheckSquare,
  Tag,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight,
  FileImage
} from 'lucide-react';

function Sidebar({ currentView, onNavigate, collapsed, onToggleCollapse }) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'quick-capture', label: 'Quick Capture', icon: Zap },
    { id: 'projects', label: 'Projects', icon: FolderOpen },
    { id: 'commands', label: 'Commands Library', icon: Terminal },
    { id: 'walkthroughs', label: 'Walkthroughs', icon: BookOpen },
    { id: 'templates', label: 'Templates', icon: FileText },
    { id: 'resources', label: 'Resources', icon: BookmarkCheck },
    { id: 'files', label: 'Files', icon: FileImage },
    { id: 'checklists', label: 'Checklists', icon: CheckSquare },
    { id: 'tags', label: 'Tags', icon: Tag },
    { id: 'search', label: 'Advanced Search', icon: Search },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <aside
      className={`bg-cyber-darker border-r border-cyber-primary/20 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-end p-4">
          <button
            onClick={onToggleCollapse}
            className="p-1 text-gray-400 hover:text-cyber-primary transition-colors"
          >
            {collapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
          </button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-cyber-primary/10 text-cyber-primary border-l-4 border-cyber-primary'
                    : 'text-gray-400 hover:bg-cyber-dark hover:text-gray-200'
                }`}
                title={collapsed ? item.label : ''}
              >
                <Icon className={`${collapsed ? 'w-6 h-6' : 'w-5 h-5'} flex-shrink-0`} />
                {!collapsed && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {!collapsed && (
          <div className="p-4 border-t border-cyber-primary/20">
            <div className="text-xs text-gray-500 text-center">
              CyberNotes v1.0
              <br />
              Localhost Knowledge Base
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}

export default Sidebar;
