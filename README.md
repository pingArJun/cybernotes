# CyberNotes - Localhost Knowledge Base System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Platform](https://img.shields.io/badge/platform-localhost-red.svg)

A comprehensive, offline knowledge management system built specifically for cybersecurity professionals.

## Features

- **Projects Management**: Organize work by CTF, Bug Bounty, Malware Analysis, Research, etc.
- **Quick Capture**: Rapid note-taking during active security work
- **Commands Library**: Store and copy commands with ONE CLICK
- **Walkthroughs**: Create detailed writeups with markdown support
- **Templates**: Pre-built templates for CTF, Bug Bounty, Malware Analysis reports
- **Resources**: Track courses, tools, documentation with progress tracking
- **Checklists**: Methodology checklists for web testing, privilege escalation, etc.
- **Advanced Search**: Full-text search across all content
- **Export/Import**: Complete data backup and restore functionality
- **100% Offline**: All data stored locally in IndexedDB

## Quick Start

### Prerequisites

- Node.js 16+ and npm
- Modern web browser (Chrome, Firefox, Edge, Safari)

### Installation

```bash
cd cybernotes
npm install
```

### Run

```bash
npm run dev
```

Then open your browser to: **http://localhost:5173/**

## Tech Stack

- **Frontend**: React 18
- **Styling**: Tailwind CSS
- **Database**: IndexedDB (via Dexie.js)
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Markdown**: React Markdown

## Key Features Highlight

### Commands Library with One-Click Copy
Every command has a prominent COPY button for instant clipboard access. Perfect for:
- Recon commands (nmap, gobuster, nikto)
- Exploitation commands (sqlmap, metasploit, burp)
- Post-exploitation commands (linpeas, winpeas, privilege escalation)

### Project Organization
Organize your security work by:
- Malware Analysis
- Bug Bounty Programs
- CTF Challenges
- Research/Labs
- Course Work
- Tool Development

### Pre-Built Templates
- CTF Challenge Walkthrough
- Bug Bounty Vulnerability Report
- Malware Analysis Report

### Interactive Checklists
- Web Application Testing (OWASP-based)
- Linux Privilege Escalation
- Windows Privilege Escalation (coming soon)

## Documentation

See **[WALKTHROUGH.md](./WALKTHROUGH.md)** for complete setup instructions, feature guides, and best practices.

## Project Structure

```
cybernotes/
├── src/
│   ├── components/       # React components
│   │   ├── Dashboard.jsx
│   │   ├── QuickCapture.jsx
│   │   ├── Projects.jsx
│   │   ├── Commands.jsx
│   │   ├── Walkthroughs.jsx
│   │   ├── Templates.jsx
│   │   ├── Resources.jsx
│   │   ├── Checklists.jsx
│   │   ├── Tags.jsx
│   │   ├── Search.jsx
│   │   └── Settings.jsx
│   ├── db.js            # IndexedDB layer
│   ├── App.jsx          # Main app
│   └── index.css        # Styles
├── public/              # Static assets
└── package.json         # Dependencies
```

## Data Storage

- All data stored in **IndexedDB** (browser local storage)
- No external servers or cloud services
- Export to JSON for backups
- Import to restore or transfer between devices

## Backup & Restore

### Export (Backup)
1. Go to Settings
2. Click "Export All Data"
3. Save the JSON file

### Import (Restore)
1. Go to Settings
2. Click "Import"
3. Select your backup JSON file

**IMPORTANT**: Backup your data regularly!

## Use Cases

### For CTF Players
- Create a project per machine/challenge
- Quick capture during enumeration
- Store successful commands for reuse
- Write detailed walkthroughs after solving
- Track methodologies with checklists

### For Bug Bounty Hunters
- Project per program or target
- Document all findings
- Use report templates
- Track tools and resources
- Export reports for submission

### For Malware Analysts
- Project per sample
- Store static/dynamic analysis results
- Track IOCs (Indicators of Compromise)
- Use analysis report template
- Organize by malware family

### For Students/Learners
- Track course progress
- Practice command-line skills
- Build personal knowledge base
- Create notes from lab exercises
- Reference later during exams

## Security & Privacy

- **100% Offline**: No data leaves your machine
- **No Tracking**: No analytics or telemetry
- **Local Storage**: All data in browser IndexedDB
- **No Dependencies on External Services**: Fully self-contained

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Edge 90+
- Safari 14+

(Any modern browser with IndexedDB support)

## Performance

- Fast search across thousands of items
- Efficient IndexedDB queries
- Optimized React rendering
- Lazy loading for large datasets

## Keyboard Shortcuts (Planned)

- `Ctrl+K`: Quick Search
- `Ctrl+N`: New Quick Capture
- `Ctrl+S`: Save Current Item
- `Ctrl+Shift+N`: New Project

## Future Enhancements

- File upload and preview
- Syntax highlighting for code blocks
- PDF export for walkthroughs
- Timeline view for projects
- Git repository sync
- Encrypted backups
- Multi-device sync (optional cloud)
- API for external tools
- Plugin system

## Troubleshooting

### Application won't start
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Data not persisting
- Check browser isn't in private/incognito mode
- Verify IndexedDB is enabled
- Check browser storage quota

### Copy button not working
- Check browser clipboard permissions
- Try a different browser
- Manually copy text if needed

See **WALKTHROUGH.md** for detailed troubleshooting.

## Development

### Build for Production
```bash
npm run build
npm run preview
```

### Customize Theme
Edit `tailwind.config.js` to change colors:
```javascript
theme: {
  extend: {
    colors: {
      cyber: {
        dark: '#0a0e27',
        primary: '#00d9ff',
        success: '#06ffa5',
      }
    }
  }
}
```

## Contributing

This is a personal knowledge management tool, but you're free to:
- Fork and customize for your needs
- Add new features
- Create your own templates
- Extend the database schema

## License

MIT License - Use freely for personal or commercial projects.

## Credits

Built with:
- React - UI Framework
- Vite - Build Tool
- Tailwind CSS - Styling
- Dexie.js - IndexedDB Wrapper
- Lucide React - Icons
- React Markdown - Markdown Rendering

## Support

For questions or issues:
1. Check WALKTHROUGH.md
2. Review browser console for errors
3. Try export/import to reset data
4. Check GitHub issues (if applicable)

---

**Built for cybersecurity professionals, by someone who understands the workflow.**

**Remember: Regular backups are your responsibility. Export your data frequently!**

---

## Screenshots

### Dashboard
View recent activity, active projects, and quick stats.

### Commands Library
Store and copy commands with one click. Filter by tool, success status, or search.

### Projects
Organize by type: CTF, Bug Bounty, Malware Analysis, Research, etc.

### Quick Capture
Rapid note-taking during active security work.

### Resources
Track courses with progress bars, manage tools and documentation links.

### Checklists
Interactive methodology checklists for web testing, privilege escalation, etc.

---

**Start using CyberNotes today and level up your security workflow!**

```bash
cd cybernotes
npm install
npm run dev
# Open http://localhost:5173/
```

Happy Hacking!
