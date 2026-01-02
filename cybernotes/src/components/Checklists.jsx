import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import { CheckSquare, Square, Plus } from 'lucide-react';

function Checklists() {
  const [checklists, setChecklists] = useState([]);

  useEffect(() => {
    loadChecklists();
  }, []);

  const loadChecklists = async () => {
    try {
      const allChecklists = await dbHelpers.getAllChecklists();
      setChecklists(allChecklists);
    } catch (error) {
      console.error('Error loading checklists:', error);
    }
  };

  const toggleItem = async (checklistId, itemId) => {
    const checklist = checklists.find(c => c.id === checklistId);
    if (!checklist) return;

    const updatedItems = toggleItemRecursive(checklist.items, itemId);
    await dbHelpers.updateChecklist(checklistId, { items: updatedItems });
    loadChecklists();
  };

  const toggleItemRecursive = (items, itemId) => {
    return items.map(item => {
      if (item.id === itemId) {
        return { ...item, completed: !item.completed };
      }
      if (item.children) {
        return {
          ...item,
          children: toggleItemRecursive(item.children, itemId)
        };
      }
      return item;
    });
  };

  const ChecklistItem = ({ item, checklistId, level = 0 }) => (
    <div className={`${level > 0 ? 'ml-6' : ''}`}>
      <button
        onClick={() => toggleItem(checklistId, item.id)}
        className="flex items-start space-x-3 py-2 hover:bg-cyber-dark/30 rounded px-2 w-full text-left transition-colors"
      >
        {item.completed ? (
          <CheckSquare className="w-5 h-5 text-cyber-success flex-shrink-0 mt-0.5" />
        ) : (
          <Square className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
        )}
        <span className={`${item.completed ? 'line-through text-gray-500' : 'text-gray-300'}`}>
          {item.text}
        </span>
      </button>
      {item.children && item.children.map(child => (
        <ChecklistItem key={child.id} item={child} checklistId={checklistId} level={level + 1} />
      ))}
    </div>
  );

  const calculateProgress = (items) => {
    let total = 0;
    let completed = 0;

    const count = (items) => {
      items.forEach(item => {
        total++;
        if (item.completed) completed++;
        if (item.children) count(item.children);
      });
    };

    count(items);
    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-cyber-primary mb-2">Checklists</h1>
          <p className="text-gray-400">{checklists.length} checklist{checklists.length !== 1 ? 's' : ''}</p>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          <span>New Checklist</span>
        </button>
      </div>

      {checklists.length === 0 ? (
        <div className="text-center py-12">
          <CheckSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No checklists yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {checklists.map((checklist) => {
            const progress = calculateProgress(checklist.items);

            return (
              <div
                key={checklist.id}
                className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6"
              >
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-gray-100 mb-2">{checklist.name}</h3>
                  {checklist.description && (
                    <p className="text-sm text-gray-400 mb-3">{checklist.description}</p>
                  )}

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span>{progress}%</span>
                  </div>
                  <div className="w-full bg-cyber-dark rounded-full h-2">
                    <div
                      className="bg-cyber-success h-2 rounded-full transition-all"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  {checklist.items.map(item => (
                    <ChecklistItem key={item.id} item={item} checklistId={checklist.id} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Checklists;
