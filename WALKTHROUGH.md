# CyberNotes - Complete Setup and Usage Guide

## Table of Contents
1. [Overview](#overview)
2. [Prerequisites](#prerequisites)
3. [Installation & Setup](#installation--setup)
4. [Running the Application](#running-the-application)
5. [Feature Walkthrough](#feature-walkthrough)
6. [Data Management](#data-management)
7. [Tips & Best Practices](#tips--best-practices)
8. [Troubleshooting](#troubleshooting)

---

## Overview

**CyberNotes** is a localhost-based knowledge management system specifically designed for cybersecurity professionals. It provides a comprehensive platform to:

- Organize security research projects
- Store and quickly copy commands with outputs
- Create detailed walkthroughs and writeups
- Manage learning resources and tools
- Track methodology checklists
- Search across all your knowledge

**Key Features:**
- 100% Offline - All data stored locally in IndexedDB
- No cloud services or external dependencies
- Dark cybersecurity-themed UI
- One-click command copying
- Full-text search across all content
- Export/Import backup functionality

---

## Prerequisites

Before setting up CyberNotes, ensure you have the following installed:

1. **Node.js** (version 16 or higher)
   - Download from: https://nodejs.org/
   - Verify installation: `node --version`

2. **npm** (comes with Node.js)
   - Verify installation: `npm --version`

3. **Modern Web Browser**
   - Chrome, Firefox, Edge, or Safari
   - Must support IndexedDB

---

## Installation & Setup

### Step 1: Navigate to Project Directory

```bash
cd cybernotes
```

### Step 2: Install Dependencies

The dependencies are already installed, but if you need to reinstall them:

```bash
npm install
```

This will install:
- React - UI framework
- Vite - Build tool and dev server
- Tailwind CSS - Styling
- Dexie.js - IndexedDB wrapper
- React Markdown - Markdown rendering
- Lucide React - Icon library

### Step 3: Verify Installation

Check that all dependencies are installed:

```bash
npm list --depth=0
```

You should see the main packages listed without errors.

---

## Running the Application

### Development Mode (Recommended for Daily Use)

1. **Start the development server:**

```bash
npm run dev
```

2. **Access the application:**
   - Open your browser and navigate to: **http://localhost:5173/**
   - The application will automatically reload when you make changes

3. **Keep the terminal open** while using CyberNotes. Press `Ctrl+C` to stop the server when done.

### Production Build (Optional)

To create an optimized production build:

```bash
npm run build
```

Then preview it:

```bash
npm run preview
```

---

## Feature Walkthrough

### 1. Dashboard

**Location:** Click "Dashboard" in the sidebar or it loads by default

**What it shows:**
- Statistics: Total projects, commands, notes, and resources
- Active projects (status: in-progress)
- Recent notes (last 10)
- Recent commands (last 6)

**Actions:**
- Click on any project card to view project details
- Click on notes to view them
- Quick access to create new items via buttons

---

### 2. Quick Capture

**Purpose:** Rapidly capture notes during active security work (CTF, bug bounty, pentesting)

**How to use:**
1. Click "Quick Capture" in sidebar or use the header button
2. Enter a title for your note
3. (Optional) Select a project to associate with
4. Add tags by typing and pressing Enter or comma
5. Write your content in the text area (supports Markdown)
6. Click "Save" or "Save & New"

**Markdown Support:**
- `**bold**` - Bold text
- `*italic*` - Italic text
- `` `code` `` - Inline code
- ` ```code block``` ` - Code blocks
- `# Heading` - Headers
- `- item` - Lists

**Tips:**
- Tags are lowercase and searchable
- Auto-save feature coming in future updates
- Content supports pasting terminal output

---

### 3. Projects

**Project Types:**
- Malware Analysis
- Bug Bounty
- CTF Challenge
- Research/Lab
- Course Work
- Tool Development
- Custom

**Creating a Project:**
1. Click "Projects" in sidebar
2. Click "New Project" button
3. Fill in:
   - Project Name (required)
   - Type (select from dropdown)
   - Status (not-started, in-progress, completed, archived)
   - Description (optional but recommended)
   - Tags (optional)
4. Click "Create Project"

**Viewing Project Details:**
1. Click on any project card
2. You'll see tabs for:
   - **Notes**: All notes associated with this project
   - **Commands**: All commands used in this project
   - **Files**: Uploaded files (coming soon)
   - **Timeline**: Activity timeline (coming soon)

**Project Statistics:**
- Automatically tracks number of notes, commands, and files
- Shows last modified date
- Displays project status with color coding

---

### 4. Commands Library

**THE MOST IMPORTANT FEATURE** - Every command has a prominent COPY button!

**Adding a Command:**
1. Click "Commands Library" in sidebar
2. Click "Add Command" button (green)
3. Fill in:
   - **Tool** (required): e.g., nmap, gobuster, sqlmap
   - **Command** (required): The actual command
   - **Purpose**: What this command does
   - **Output**: Paste the command output
   - **Success Status**: Success or Failed
   - **Notes**: Additional context
   - **Project**: Link to a project (optional)
   - **Tags**: Categorize the command
4. Click "Add Command"

**Using Commands:**
- **Copy Button**: Click the green "Copy" button on any command
- The command is copied to clipboard AND usage count increments
- Filter by tool, success status, or search query
- Switch between grid and list view

**Filters:**
- Search box: Search command text, purpose, notes
- Tool filter: Show only commands from specific tool
- Status filter: Show only successful or failed commands

**Best Practices:**
- Add purpose to make commands searchable
- Include output for successful commands
- Tag with technique (e.g., recon, enum, exploit)
- Link to project for context

---

### 5. Walkthroughs

**Purpose:** Create detailed, step-by-step writeups for CTFs, bug bounties, or malware analysis

**Current Features:**
- View all walkthrough-type notes
- Filter and search walkthroughs
- Display with formatted markdown

**Creating a Walkthrough:**
1. Use Quick Capture with type "walkthrough"
2. Or use Templates (see below)

**Walkthrough Structure (Recommended):**
```markdown
# Challenge: [Name]

## Overview
Brief description of the challenge/target

## Reconnaissance
- Commands used
- Findings

## Exploitation
- Vulnerability discovered
- Exploit steps
- Commands with outputs

## Post-Exploitation
- Privilege escalation
- Lateral movement

## Flag/Impact
Final result

## Lessons Learned
Key takeaways
```

---

### 6. Templates

**Pre-built Templates:**
1. **CTF Challenge Walkthrough**
   - Challenge name, category, difficulty
   - Reconnaissance, exploitation, flag sections

2. **Bug Bounty Report**
   - Vulnerability summary
   - Steps to reproduce
   - Proof of concept
   - Impact and remediation

3. **Malware Analysis Report**
   - Sample information (hashes, file type)
   - Static analysis
   - Dynamic analysis
   - IOCs (Indicators of Compromise)

**Using Templates:**
1. Click "Templates" in sidebar
2. Browse available templates
3. Click on a template to use it
4. It will create a new note with the template structure

**Custom Templates:**
- Create your own templates for repeated workflows
- Add placeholders like {{variable_name}}
- Save time on repetitive documentation

---

### 7. Resources

**Resource Types:**
- **Courses**: Track learning progress
- **Tools**: Catalog security tools
- **Documentation**: Quick reference links
- **Writeups**: External blog posts, reports

**Adding a Resource:**
1. Click "Resources" in sidebar
2. Click "Add Resource"
3. Fill in:
   - Title (required)
   - Type (course, tool, documentation, writeup)
   - Category (e.g., web-security, forensics)
   - URL (link to resource)
   - Description
   - Tags
   - **For courses only**: Progress slider (0-100%)
4. Click "Add Resource"

**Managing Courses:**
- Update progress as you complete modules
- Visual progress bar shows completion
- Filter by status or category

**Best Uses:**
- Bookmark tools you frequently use
- Track OSCP, OSWE, or other course progress
- Save useful documentation for quick access
- Catalog community writeups for reference

---

### 8. Checklists

**Pre-built Checklists:**
1. **Web Application Testing**
   - Information gathering
   - Authentication testing
   - Authorization testing
   - Input validation

2. **Linux Privilege Escalation**
   - System information
   - User enumeration
   - File permissions

**Using Checklists:**
1. Click "Checklists" in sidebar
2. Select a checklist
3. Click checkboxes to mark items as complete
4. Progress bar shows completion percentage
5. Nested items allow detailed tracking

**Checklist Features:**
- Hierarchical structure (parent-child items)
- Real-time progress calculation
- Persistent state (saved automatically)

**Creating Custom Checklists:**
- Define your own penetration testing methodologies
- Save reconnaissance procedures
- Standardize malware analysis steps

---

### 9. Tags

**Purpose:** Organize all content with keywords

**Tag Usage:**
- Added when creating notes, commands, projects, resources
- Type tag name and press Enter or comma
- Lowercase, hyphenated (e.g., "sql-injection", "web-app")

**Viewing Tags:**
1. Click "Tags" in sidebar
2. See all tags with usage count
3. Click tag to view all items with that tag (coming soon)

**Suggested Tag Categories:**
- **Tools**: nmap, burp, metasploit, sqlmap
- **Techniques**: sqli, xss, rce, privesc, lfi
- **Targets**: web, network, binary, mobile
- **Difficulty**: easy, medium, hard
- **Platform**: linux, windows, web, api
- **Status**: success, failed, in-progress

---

### 10. Advanced Search

**Accessing Search:**
- Use the search bar in the header
- Or click "Advanced Search" in sidebar
- Keyboard shortcut: `Ctrl+K` (coming soon)

**What it searches:**
- Project names and descriptions
- Note titles and content
- Command text, purpose, and notes
- Resource titles and descriptions

**Search Results:**
- Grouped by type (Projects, Notes, Commands, Resources)
- Shows count for each category
- Highlights context around matches
- Click any result to view details

**Search Tips:**
- Use specific keywords
- Search for tool names to find related commands
- Search for techniques across all projects
- Search for dates or usernames

---

### 11. Settings

**Data Management:**

**Export All Data:**
1. Click "Settings" in sidebar
2. Under "Data Management", click "Export"
3. Downloads a JSON file with all your data
4. Filename: `cybernotes-backup-YYYY-MM-DD.json`

**Import Backup:**
1. Click "Settings"
2. Click "Import" button
3. Select a previously exported JSON file
4. Confirm import
5. Page reloads with imported data

**Clear All Data:**
1. Click "Settings"
2. Click "Clear All" button
3. **WARNING**: This deletes everything permanently
4. Confirm twice to proceed

**Keyboard Shortcuts:**
- `Ctrl+N`: Quick Capture
- `Ctrl+K`: Search
- `Ctrl+S`: Save
- `Ctrl+Shift+N`: New Project

**Storage Information:**
- Uses IndexedDB (built into browser)
- No size limit in most modern browsers
- Data persists across browser restarts
- Specific to this browser/device

---

## Data Management

### Backup Strategy (IMPORTANT)

**Recommended Backup Frequency:**
- **Daily**: If actively working on critical projects
- **Weekly**: For regular use
- **Before Major Changes**: Always backup before importing or clearing data

**How to Backup:**
1. Settings → Export All Data
2. Save the JSON file to a secure location
3. Consider multiple backup locations:
   - External drive
   - Cloud storage (if security permits)
   - Version control (Git repo for backups)

**Backup File Contains:**
- All projects with metadata
- All notes and walkthroughs
- All commands with outputs
- All resources and progress
- All files (base64 encoded)
- All templates and checklists
- All tags

### Data Storage Location

- **Browser**: Data stored in IndexedDB within your browser
- **Device Specific**: Each browser/device has separate storage
- **No Sync**: Data doesn't sync between devices (offline only)

### Moving Between Devices

1. Export from Device A
2. Transfer JSON file to Device B
3. Import on Device B
4. Both devices now have the data

---

## Tips & Best Practices

### For CTF Challenges

1. **Create a project** for each CTF or machine
2. **Use Quick Capture** during enumeration
3. **Add commands** as you find useful ones
4. **Tag everything**: ctf, hackthebox, easy/medium/hard
5. **Convert to walkthrough** after completion

### For Bug Bounty

1. **Create project** per target/program
2. **Document all commands** (even failed attempts)
3. **Use Bug Bounty Report template** for findings
4. **Track with checklists** (OWASP Top 10, etc.)
5. **Export reports** for submission

### For Malware Analysis

1. **Project per sample** with hash in name
2. **Static Analysis checklist** for methodology
3. **Store IOCs** in notes
4. **Commands for tools** (strings, pestudio, etc.)
5. **Final report** using Malware Analysis template

### For Learning/Courses

1. **Create course project**
2. **Track progress** in Resources
3. **Note-taking** for each module
4. **Practice commands** in Commands Library
5. **Lab walkthroughs** for hands-on exercises

### General Productivity

- **Tag consistently**: Use same tag names across projects
- **Descriptive titles**: Make searching easier
- **Link related items**: Connect notes to projects
- **Regular backups**: Export weekly minimum
- **Clean up**: Archive completed projects
- **Use templates**: Save time on repeated tasks

---

## Troubleshooting

### Application Won't Start

**Problem**: `npm run dev` fails

**Solutions**:
```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Check Node.js version
node --version  # Should be 16+

# Try clearing npm cache
npm cache clean --force
```

### Browser Shows Blank Page

**Problem**: Page loads but shows nothing

**Solutions**:
1. Open browser DevTools (F12)
2. Check Console for errors
3. Clear browser cache and reload (Ctrl+Shift+R)
4. Try incognito/private mode
5. Try a different browser

### Data Not Saving

**Problem**: Changes don't persist

**Solutions**:
1. Check browser permissions for IndexedDB
2. Ensure browser isn't in private/incognito mode
3. Check available storage space
4. Try exporting data and reimporting
5. Clear browser data and start fresh

### Commands Not Copying

**Problem**: Copy button doesn't work

**Solutions**:
1. Check browser clipboard permissions
2. Try clicking the button again
3. Manually select and copy the command text
4. Use a different browser

### Import Fails

**Problem**: Can't import backup file

**Solutions**:
1. Verify JSON file is valid (open in text editor)
2. Ensure file is from CyberNotes export
3. Check file isn't corrupted
4. Try exporting again from source device
5. Import on fresh installation

### Performance Issues

**Problem**: Application is slow

**Solutions**:
1. Reduce number of items per page
2. Clear old/archived projects
3. Export and start fresh periodically
4. Close other browser tabs
5. Restart browser

### Can't Access on Different Device

**This is expected behavior!** CyberNotes is localhost-only and data is device-specific.

**To access on another device:**
1. Export data from Device A
2. Set up CyberNotes on Device B
3. Import the backup file

---

## Advanced Usage

### Database Queries

The application uses Dexie.js for IndexedDB. You can access the database in browser console:

```javascript
// Open DevTools Console
// Access all projects
await db.projects.toArray()

// Search notes
await db.notes.where('title').startsWithIgnoreCase('sql').toArray()

// Get commands by tool
await db.commands.where('tool').equals('nmap').toArray()
```

### Customization

**Colors**: Edit `tailwind.config.js` to change theme colors
```javascript
colors: {
  cyber: {
    dark: '#0a0e27',        // Background
    primary: '#00d9ff',     // Accent color
    success: '#06ffa5',     // Success green
  }
}
```

**Fonts**: Edit `src/index.css` to change fonts

---

## Architecture Overview

**Frontend**: React 18 with functional components and hooks
**Styling**: Tailwind CSS for utility-first styling
**Database**: IndexedDB via Dexie.js
**Build Tool**: Vite for fast development and optimized builds
**Icons**: Lucide React for modern icon set

**File Structure**:
```
cybernotes/
├── src/
│   ├── components/       # All React components
│   ├── db.js            # Database layer and helpers
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── package.json         # Dependencies
└── vite.config.js       # Vite configuration
```

---

## Contributing & Extending

Want to add features?

1. **Fork the codebase**
2. **Add new components** in `src/components/`
3. **Extend database** in `src/db.js`
4. **Update App.jsx** to include new routes
5. **Test thoroughly** before using for real work

**Suggested Enhancements**:
- Real-time collaboration (Socket.io)
- Encrypted storage (crypto-js)
- PDF export for walkthroughs
- Syntax highlighting in code blocks
- File upload for screenshots
- Git repository sync
- Terminal command executor
- API for external tools

---

## Security Considerations

1. **Local Only**: All data stays on your device
2. **No Network**: No external API calls or tracking
3. **Sensitive Data**: Consider encrypting backups if storing sensitive info
4. **Access Control**: Use OS-level access controls for device
5. **Backup Security**: Store backups in encrypted volumes
6. **Browser Security**: Keep browser updated for security patches

---

## Support & Resources

**Project Location**: Repository root directory

**Documentation**:
- This file: `WALKTHROUGH.md`
- Requirements: `plan.txt`
- Prompt: `prompt.txt`

**Source Code**: All code is in `cybernotes/src/`

**Getting Help**:
1. Check this walkthrough
2. Check browser DevTools console for errors
3. Review the database structure in `db.js`
4. Try exporting/importing as a reset

---

## Quick Reference

**Start Application**: `npm run dev`
**Access**: http://localhost:5173/
**Stop**: Ctrl+C in terminal

**Most Used Features**:
- Quick Capture: Fast note-taking
- Commands Library: Copy commands instantly
- Projects: Organize by engagement
- Search: Find anything quickly
- Export: Backup your data

**Keyboard Shortcuts** (Coming Soon):
- Ctrl+K: Search
- Ctrl+N: Quick Capture
- Ctrl+S: Save
- Ctrl+Shift+N: New Project

---

## Conclusion

CyberNotes is designed to be your all-in-one knowledge management system for cybersecurity work. Whether you're:
- Solving CTF challenges
- Hunting bugs
- Analyzing malware
- Learning new techniques
- Building tools

CyberNotes keeps everything organized, searchable, and accessible - all while keeping your data private and offline.

**Remember to backup regularly!**

Happy Hacking!

---

**Version**: 1.0.0
**Last Updated**: December 2024
**Built with**: React, Vite, Tailwind CSS, Dexie.js
