import { useState, useEffect } from 'react';
import { dbHelpers } from '../db';
import { FileText, Plus } from 'lucide-react';

function Templates() {
  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    loadTemplates();
  }, []);

  const loadTemplates = async () => {
    try {
      const allTemplates = await dbHelpers.getAllTemplates();
      setTemplates(allTemplates);
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      ctf: 'text-purple-400 bg-purple-400/10',
      bugbounty: 'text-green-400 bg-green-400/10',
      malware: 'text-red-400 bg-red-400/10',
      custom: 'text-gray-400 bg-gray-400/10'
    };
    return colors[category] || 'text-gray-400 bg-gray-400/10';
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-cyber-primary mb-2">Templates</h1>
          <p className="text-gray-400">{templates.length} template{templates.length !== 1 ? 's' : ''}</p>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-cyber-primary text-cyber-darker rounded-lg hover:bg-cyber-primary/80 transition-colors font-medium">
          <Plus className="w-4 h-4" />
          <span>New Template</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {templates.map((template) => (
          <div
            key={template.id}
            className="bg-cyber-darker border border-cyber-primary/20 rounded-lg p-6 hover:border-cyber-primary/40 transition-colors cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <FileText className="w-8 h-8 text-cyber-primary" />
              <span className={`text-xs px-2 py-1 rounded ${getCategoryColor(template.category)}`}>
                {template.category}
              </span>
            </div>

            <h3 className="text-lg font-bold text-gray-100 mb-2">{template.name}</h3>

            <div className="text-sm text-gray-400 mb-3">
              {template.template_type === 'walkthrough' ? 'Walkthrough Template' : 'Note Template'}
            </div>

            <div className="text-xs text-gray-500">
              Used {template.usage_count || 0} time{template.usage_count !== 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Templates;
