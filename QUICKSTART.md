# CyberNotes - Quick Start Guide

## Installation (One-Time Setup)

```bash
cd cybernotes
npm install
```

## Running CyberNotes

```bash
cd cybernotes
npm run dev
```

Then open: **http://localhost:5173/**

## Stop the Application

Press `Ctrl+C` in the terminal

---

## Essential Workflows

### 1. During Active Security Work (CTF/Bug Bounty/Pentest)

```
1. Start CyberNotes
2. Create a new Project for the engagement
3. Use Quick Capture to take notes as you work
4. Add commands to Commands Library as you find useful ones
5. Click COPY button on any command to reuse it
6. Export backup when done
```

### 2. Writing a CTF Walkthrough

```
1. Go to Templates
2. Select "CTF Challenge Walkthrough"
3. Fill in each section:
   - Challenge name and category
   - Reconnaissance steps
   - Exploitation method
   - Flag
   - Lessons learned
4. Insert commands from Commands Library
5. Export as markdown
```

### 3. Finding a Command You Used Before

```
1. Click "Commands Library" in sidebar
2. Use the search box
3. Filter by tool (e.g., "nmap")
4. Click COPY button on the command you need
5. Paste in your terminal
```

### 4. Tracking Course Progress

```
1. Go to Resources
2. Click "Add Resource"
3. Type: Course
4. Add title, URL, description
5. Use the progress slider (0-100%)
6. Update as you complete modules
```

### 5. Using a Checklist for Testing

```
1. Go to Checklists
2. Select "Web Application Testing"
3. Check off items as you complete them
4. Progress bar shows completion percentage
5. Notes from checklist items go in Quick Capture
```

---

## Most Important Features

### Commands Library - THE KILLER FEATURE
- Every command has a COPY button
- One click to copy to clipboard
- Store: tool name, command, output, purpose, tags
- Filter and search instantly
- Never type the same command twice!

### Quick Capture - Fast Note Taking
- Takes 10 seconds to create a note
- Markdown support
- Link to projects
- Add tags for organization
- Perfect for active work

### Projects - Organization
- Group all related notes, commands, files
- View everything for one engagement
- Track status (in-progress, completed)
- Export full project reports

---

## Common Commands to Save

### Reconnaissance
```bash
nmap -sC -sV -p- TARGET
gobuster dir -u http://TARGET -w /usr/share/wordlists/dirb/common.txt
nikto -h http://TARGET
```

### Web Exploitation
```bash
sqlmap -u "http://TARGET/page?id=1" --dbs
burpsuite
wfuzz -c -z file,/path/to/wordlist -d "param=FUZZ" http://TARGET
```

### Privilege Escalation (Linux)
```bash
sudo -l
find / -perm -4000 2>/dev/null
linpeas.sh
```

### Privilege Escalation (Windows)
```bash
whoami /priv
icacls C:\*
winpeas.exe
```

---

## Keyboard Shortcuts (Planned)

- `Ctrl+K` - Search
- `Ctrl+N` - Quick Capture
- `Ctrl+S` - Save
- `Ctrl+Shift+N` - New Project

---

## Backup Your Data!

### Export (Every Week Minimum)
```
Settings → Export All Data → Save JSON file
```

### Import (To Restore)
```
Settings → Import → Select backup.json
```

---

## Troubleshooting

### Can't start the app?
```bash
cd cybernotes
rm -rf node_modules
npm install
npm run dev
```

### Copy button not working?
- Check browser clipboard permissions
- Try clicking again
- Use Chrome or Firefox

### Data not saving?
- Don't use incognito/private mode
- Check browser storage isn't full
- Try exporting and reimporting

---

## File Locations

- **App Code**: `cybernotes/src/`
- **Database**: Browser IndexedDB (inspect with DevTools)
- **Backups**: Wherever you save the exported JSON
- **Documentation**: This file and WALKTHROUGH.md

---

## Tips for Maximum Productivity

1. **Create projects immediately** when starting new work
2. **Use Quick Capture** during active enumeration
3. **Add ALL successful commands** to Commands Library
4. **Tag consistently** (use same tags across projects)
5. **Export weekly** (set a reminder!)
6. **Use templates** for writeups
7. **Track course progress** in Resources
8. **Follow checklists** for thorough testing

---

## Next Steps

1. ✅ Start the application
2. ✅ Create your first project
3. ✅ Try Quick Capture
4. ✅ Add a command to the library
5. ✅ Practice copying commands
6. ✅ Export a backup
7. ✅ Explore all features
8. ✅ Read full WALKTHROUGH.md

---

## Getting Help

1. Read **WALKTHROUGH.md** for detailed guides
2. Read **README.md** for overview
3. Check browser console (F12) for errors
4. Try export/import to reset
5. Restart the dev server

---

**Remember: This is YOUR knowledge base. Use it YOUR way!**

Happy Hacking! 🔐
