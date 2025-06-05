# StudyBuddy

## Project Overview
StudyBuddy is a web-based platform designed for university students and faculty to centralize all tools needed for collaborative learning and self-management. The application enables students to create and track tasks, share and access academic summaries, join online study groups, use a template-based document editor, and submit support tickets directly to an administrator.

## Key Features
1. **Authentication & Registration**  
   - Sign up with a username and email.  
   - Log in using either username or email.  
   - Role-based access: Student vs. Admin.

2. **Main Dashboard**  
   - Displays key statistics cards (open tasks, pending summaries, daily engagement).  
   - Quick-action buttons for creating a task, uploading a summary, or creating a study group.

3. **Task Management**  
   - Personal and group task lists with title, due date, and status.  
   - Interactive calendar view highlighting upcoming deadlines.  
   - Filters for “Active” vs. “Completed” tasks.  
   - Create Task form (title, description, due date).

4. **Summaries Library**  
   - Search and filter by course name, lecturer, or upload date.  
   - Table listing each summary (course name, uploader username, approval status).  
   - Upload new summaries as PDF; they enter a “pending approval” state until reviewed by Admin.

5. **Academic Writing Assistant**  
   - Select document type (e.g., research paper, essay, term paper).  
   - Canvas-style editor with predefined templates for headings, paragraphs, and formatting.  
   - Download the document as a PDF with a single click.

6. **Study Groups (Social Hub)**  
   - List of existing groups showing group name, topic, and brief description.  
   - Create Group form (group name, topic, description, optional max members).  
   - “Join” button to become a member; “Leave” button to exit. Owners are labeled “You’re the owner.”  
   - Group Details page with a simple real-time chat: shows current members and chat messages.

7. **Help & Settings**  
   - **Help Page**: Categorized FAQ section and links to written or video tutorials.  
   - **Settings Page**:  
     - Edit Profile (username, short bio, profile picture).  
     - Change Password form.  
     - Contact Support form to submit a support ticket.  
     - Below the form, a list of the user’s previous tickets and any Admin responses.

8. **Admin Dashboard**  
   - **User Management**: List of all registered users (username, email) with options to grant/revoke Admin rights or delete accounts.  
   - **Summaries Approval**: Table of all “pending” summaries, showing uploader and course name, with “Approve” / “Reject” buttons.  
   - **Support Ticket Management**: Table of all support tickets with user information and ticket content, plus a field to add an Admin response. Once submitted, the response will be visible in the user’s Settings page.

## Live Site Link
[Visit StudyBuddy (Hosted on Firebase)](https://studybuddy-556fa.web.app))
