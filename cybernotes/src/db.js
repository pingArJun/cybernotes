import Dexie from 'dexie';

// Initialize the database
export const db = new Dexie('CyberNotesDB');

// Define database schema
db.version(1).stores({
  projects: '++id, name, type, status, created_date, last_modified, *tags',
  notes: '++id, project_id, title, type, created_date, modified_date, *tags',
  commands: '++id, project_id, tool, created_date, success, *tags',
  resources: '++id, type, category, created_date, *tags',
  files: '++id, project_id, file_type, uploaded_date',
  templates: '++id, name, template_type, created_date',
  checklists: '++id, name, category, created_date',
  tags: '++id, name, category',
  versionHistory: '++id, entity_id, entity_type, change_date',
  settings: '++id, key'
});

// Helper functions for database operations
export const dbHelpers = {
  // Projects
  async createProject(project) {
    const id = await db.projects.add({
      ...project,
      created_date: new Date().toISOString(),
      last_modified: new Date().toISOString(),
      stats: { notes_count: 0, commands_count: 0, files_count: 0 }
    });
    return id;
  },

  async getProject(id) {
    return await db.projects.get(id);
  },

  async getAllProjects() {
    return await db.projects.orderBy('last_modified').reverse().toArray();
  },

  async updateProject(id, updates) {
    await db.projects.update(id, {
      ...updates,
      last_modified: new Date().toISOString()
    });
  },

  async deleteProject(id) {
    // Delete associated data
    await db.notes.where('project_id').equals(id).delete();
    await db.commands.where('project_id').equals(id).delete();
    await db.files.where('project_id').equals(id).delete();
    await db.projects.delete(id);
  },

  async updateProjectStats(projectId) {
    const notes_count = await db.notes.where('project_id').equals(projectId).count();
    const commands_count = await db.commands.where('project_id').equals(projectId).count();
    const files_count = await db.files.where('project_id').equals(projectId).count();

    await db.projects.update(projectId, {
      stats: { notes_count, commands_count, files_count },
      last_modified: new Date().toISOString()
    });
  },

  // Notes
  async createNote(note) {
    const id = await db.notes.add({
      ...note,
      created_date: new Date().toISOString(),
      modified_date: new Date().toISOString(),
      linked_commands: note.linked_commands || [],
      linked_files: note.linked_files || []
    });

    if (note.project_id) {
      await this.updateProjectStats(note.project_id);
    }

    return id;
  },

  async getNote(id) {
    return await db.notes.get(id);
  },

  async getAllNotes() {
    return await db.notes.orderBy('modified_date').reverse().toArray();
  },

  async getNotesByProject(projectId) {
    return await db.notes.where('project_id').equals(projectId).toArray();
  },

  async updateNote(id, updates) {
    const note = await db.notes.get(id);
    await db.notes.update(id, {
      ...updates,
      modified_date: new Date().toISOString()
    });

    if (note.project_id) {
      await this.updateProjectStats(note.project_id);
    }
  },

  async deleteNote(id) {
    const note = await db.notes.get(id);
    await db.notes.delete(id);

    if (note.project_id) {
      await this.updateProjectStats(note.project_id);
    }
  },

  // Commands
  async createCommand(command) {
    const id = await db.commands.add({
      ...command,
      created_date: new Date().toISOString(),
      times_used: 0
    });

    if (command.project_id) {
      await this.updateProjectStats(command.project_id);
    }

    return id;
  },

  async getCommand(id) {
    return await db.commands.get(id);
  },

  async getAllCommands() {
    return await db.commands.orderBy('created_date').reverse().toArray();
  },

  async getCommandsByProject(projectId) {
    return await db.commands.where('project_id').equals(projectId).toArray();
  },

  async updateCommand(id, updates) {
    const command = await db.commands.get(id);
    await db.commands.update(id, updates);

    if (command.project_id) {
      await this.updateProjectStats(command.project_id);
    }
  },

  async deleteCommand(id) {
    const command = await db.commands.get(id);
    await db.commands.delete(id);

    if (command.project_id) {
      await this.updateProjectStats(command.project_id);
    }
  },

  async incrementCommandUsage(id) {
    const command = await db.commands.get(id);
    await db.commands.update(id, { times_used: (command.times_used || 0) + 1 });
  },

  // Resources
  async createResource(resource) {
    const id = await db.resources.add({
      ...resource,
      created_date: new Date().toISOString(),
      last_accessed: new Date().toISOString()
    });
    return id;
  },

  async getResource(id) {
    return await db.resources.get(id);
  },

  async getAllResources() {
    return await db.resources.toArray();
  },

  async updateResource(id, updates) {
    await db.resources.update(id, {
      ...updates,
      last_accessed: new Date().toISOString()
    });
  },

  async deleteResource(id) {
    await db.resources.delete(id);
  },

  // Files
  async createFile(file) {
    const id = await db.files.add({
      ...file,
      uploaded_date: new Date().toISOString()
    });

    if (file.project_id) {
      await this.updateProjectStats(file.project_id);
    }

    return id;
  },

  async getFile(id) {
    return await db.files.get(id);
  },

  async getFilesByProject(projectId) {
    return await db.files.where('project_id').equals(projectId).toArray();
  },

  async deleteFile(id) {
    const file = await db.files.get(id);
    await db.files.delete(id);

    if (file.project_id) {
      await this.updateProjectStats(file.project_id);
    }
  },

  // Templates
  async createTemplate(template) {
    const id = await db.templates.add({
      ...template,
      created_date: new Date().toISOString(),
      usage_count: 0
    });
    return id;
  },

  async getTemplate(id) {
    return await db.templates.get(id);
  },

  async getAllTemplates() {
    return await db.templates.toArray();
  },

  async updateTemplate(id, updates) {
    await db.templates.update(id, updates);
  },

  async deleteTemplate(id) {
    await db.templates.delete(id);
  },

  async incrementTemplateUsage(id) {
    const template = await db.templates.get(id);
    await db.templates.update(id, { usage_count: (template.usage_count || 0) + 1 });
  },

  // Checklists
  async createChecklist(checklist) {
    const id = await db.checklists.add({
      ...checklist,
      created_date: new Date().toISOString()
    });
    return id;
  },

  async getChecklist(id) {
    return await db.checklists.get(id);
  },

  async getAllChecklists() {
    return await db.checklists.toArray();
  },

  async updateChecklist(id, updates) {
    await db.checklists.update(id, updates);
  },

  async deleteChecklist(id) {
    await db.checklists.delete(id);
  },

  // Tags
  async createTag(tag) {
    const existing = await db.tags.where('name').equals(tag.name).first();
    if (existing) return existing.id;

    const id = await db.tags.add({
      ...tag,
      usage_count: 1
    });
    return id;
  },

  async getTag(id) {
    return await db.tags.get(id);
  },

  async getAllTags() {
    return await db.tags.orderBy('usage_count').reverse().toArray();
  },

  async incrementTagUsage(tagName) {
    const tag = await db.tags.where('name').equals(tagName).first();
    if (tag) {
      await db.tags.update(tag.id, { usage_count: tag.usage_count + 1 });
    }
  },

  async deleteTag(id) {
    await db.tags.delete(id);
  },

  // Search
  async searchAll(query) {
    const lowerQuery = query.toLowerCase();

    const [projects, notes, commands, resources] = await Promise.all([
      db.projects.filter(p =>
        p.name.toLowerCase().includes(lowerQuery) ||
        p.description?.toLowerCase().includes(lowerQuery)
      ).toArray(),

      db.notes.filter(n =>
        n.title.toLowerCase().includes(lowerQuery) ||
        n.content.toLowerCase().includes(lowerQuery)
      ).toArray(),

      db.commands.filter(c =>
        c.command_text.toLowerCase().includes(lowerQuery) ||
        c.purpose?.toLowerCase().includes(lowerQuery) ||
        c.notes?.toLowerCase().includes(lowerQuery)
      ).toArray(),

      db.resources.filter(r =>
        r.title.toLowerCase().includes(lowerQuery) ||
        r.notes?.toLowerCase().includes(lowerQuery)
      ).toArray()
    ]);

    return {
      projects,
      notes,
      commands,
      resources
    };
  },

  // Export/Import
  async exportAllData() {
    const [projects, notes, commands, resources, files, templates, checklists, tags] = await Promise.all([
      db.projects.toArray(),
      db.notes.toArray(),
      db.commands.toArray(),
      db.resources.toArray(),
      db.files.toArray(),
      db.templates.toArray(),
      db.checklists.toArray(),
      db.tags.toArray()
    ]);

    return {
      version: 1,
      exported_date: new Date().toISOString(),
      data: {
        projects,
        notes,
        commands,
        resources,
        files,
        templates,
        checklists,
        tags
      }
    };
  },

  async importData(data) {
    if (data.version !== 1) {
      throw new Error('Incompatible backup version');
    }

    await db.transaction('rw', [
      db.projects, db.notes, db.commands, db.resources,
      db.files, db.templates, db.checklists, db.tags
    ], async () => {
      await db.projects.bulkAdd(data.data.projects);
      await db.notes.bulkAdd(data.data.notes);
      await db.commands.bulkAdd(data.data.commands);
      await db.resources.bulkAdd(data.data.resources);
      await db.files.bulkAdd(data.data.files);
      await db.templates.bulkAdd(data.data.templates);
      await db.checklists.bulkAdd(data.data.checklists);
      await db.tags.bulkAdd(data.data.tags);
    });
  },

  async clearAllData() {
    await db.projects.clear();
    await db.notes.clear();
    await db.commands.clear();
    await db.resources.clear();
    await db.files.clear();
    await db.templates.clear();
    await db.checklists.clear();
    await db.tags.clear();
    await db.versionHistory.clear();
  },

  // Settings
  async getSetting(key, defaultValue = null) {
    const setting = await db.settings.where('key').equals(key).first();
    return setting ? setting.value : defaultValue;
  },

  async setSetting(key, value) {
    const existing = await db.settings.where('key').equals(key).first();
    if (existing) {
      await db.settings.update(existing.id, { value });
    } else {
      await db.settings.add({ key, value });
    }
  }
};

// Initialize default templates
export async function initializeDefaults() {
  const templatesCount = await db.templates.count();

  if (templatesCount === 0) {
    const defaultTemplates = [
      {
        name: 'CTF Challenge Walkthrough',
        template_type: 'walkthrough',
        category: 'ctf',
        content: `# Challenge: {{challenge_name}}
## Category: {{category}}
## Difficulty: {{difficulty}}

## Initial Analysis
- What's given?
- What's the objective?

## Reconnaissance
[Add your recon steps and commands here]

## Exploitation
[Add your exploitation steps here]

## Flag
\`\`\`
{{flag}}
\`\`\`

## Lessons Learned
[What did you learn from this challenge?]`,
        variables: ['challenge_name', 'category', 'difficulty', 'flag']
      },
      {
        name: 'Bug Bounty Report',
        template_type: 'walkthrough',
        category: 'bugbounty',
        content: `# Vulnerability Report

## Summary
- Severity: {{severity}}
- Asset: {{asset}}
- Vulnerability Type: {{vuln_type}}

## Description
[Detailed description of the vulnerability]

## Steps to Reproduce
1.
2.
3.

## Proof of Concept
[Add commands, screenshots, or code here]

## Impact
[Describe the potential impact]

## Remediation
[Suggest how to fix the vulnerability]`,
        variables: ['severity', 'asset', 'vuln_type']
      },
      {
        name: 'Malware Analysis Report',
        template_type: 'walkthrough',
        category: 'malware',
        content: `# Malware Analysis: {{sample_name}}

## Sample Information
- File Name: {{filename}}
- MD5: {{md5}}
- SHA256: {{sha256}}
- File Type: {{filetype}}

## Static Analysis
[Add static analysis findings]

## Dynamic Analysis
[Add dynamic analysis findings]

## Indicators of Compromise (IOCs)
- IP Addresses:
- Domains:
- File Hashes:
- Registry Keys:

## Conclusion
[Summary of findings and threat assessment]`,
        variables: ['sample_name', 'filename', 'md5', 'sha256', 'filetype']
      }
    ];

    for (const template of defaultTemplates) {
      await dbHelpers.createTemplate(template);
    }
  }

  // Initialize default checklists
  const checklistsCount = await db.checklists.count();

  if (checklistsCount === 0) {
    const defaultChecklists = [
      {
        name: 'Web Application Testing',
        category: 'web',
        description: 'Complete web application security testing checklist',
        items: [
          {
            id: 'info-gathering',
            text: 'Information Gathering',
            completed: false,
            children: [
              { id: 'info-1', text: 'Run Nmap scan', completed: false },
              { id: 'info-2', text: 'Check robots.txt', completed: false },
              { id: 'info-3', text: 'Directory enumeration', completed: false },
              { id: 'info-4', text: 'Technology fingerprinting', completed: false }
            ]
          },
          {
            id: 'auth-testing',
            text: 'Authentication Testing',
            completed: false,
            children: [
              { id: 'auth-1', text: 'Test SQL injection in login', completed: false },
              { id: 'auth-2', text: 'Check default credentials', completed: false },
              { id: 'auth-3', text: 'Test password reset function', completed: false },
              { id: 'auth-4', text: 'Test account lockout', completed: false }
            ]
          },
          {
            id: 'authz-testing',
            text: 'Authorization Testing',
            completed: false,
            children: [
              { id: 'authz-1', text: 'Test privilege escalation', completed: false },
              { id: 'authz-2', text: 'Test IDOR vulnerabilities', completed: false },
              { id: 'authz-3', text: 'Test path traversal', completed: false }
            ]
          },
          {
            id: 'input-validation',
            text: 'Input Validation',
            completed: false,
            children: [
              { id: 'input-1', text: 'Test XSS (reflected)', completed: false },
              { id: 'input-2', text: 'Test XSS (stored)', completed: false },
              { id: 'input-3', text: 'Test SQL injection', completed: false },
              { id: 'input-4', text: 'Test command injection', completed: false },
              { id: 'input-5', text: 'Test file upload', completed: false }
            ]
          }
        ]
      },
      {
        name: 'Linux Privilege Escalation',
        category: 'privesc',
        description: 'Linux privilege escalation checklist',
        items: [
          {
            id: 'sys-info',
            text: 'System Information',
            completed: false,
            children: [
              { id: 'sys-1', text: 'Check kernel version', completed: false },
              { id: 'sys-2', text: 'Check OS version', completed: false },
              { id: 'sys-3', text: 'Check running processes', completed: false }
            ]
          },
          {
            id: 'user-enum',
            text: 'User Enumeration',
            completed: false,
            children: [
              { id: 'user-1', text: 'Check current user privileges', completed: false },
              { id: 'user-2', text: 'Check sudo permissions', completed: false },
              { id: 'user-3', text: 'Check other users', completed: false },
              { id: 'user-4', text: 'Check user history files', completed: false }
            ]
          },
          {
            id: 'file-perms',
            text: 'File Permissions',
            completed: false,
            children: [
              { id: 'file-1', text: 'Find SUID binaries', completed: false },
              { id: 'file-2', text: 'Find writable config files', completed: false },
              { id: 'file-3', text: 'Check cron jobs', completed: false }
            ]
          }
        ]
      }
    ];

    for (const checklist of defaultChecklists) {
      await dbHelpers.createChecklist(checklist);
    }
  }
}

export default db;
