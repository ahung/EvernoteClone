# EvernoteClone (aka Clevernote)
This is the repo for my final project for App Academy.  
[Click Here to Try Out Clevernote](http://clevernote.alberthung.net)

## Concept
The goal of this project (within the allotted time of about a week and a half) was to clone the core functionality of Evernote's Web App. I picked Evernote because I had recently started using it more myself and thought it would be interesting to figure out how to implement similar features. The project was built using Ruby on Rails and Backbone.js. Thanks for taking the time to stop by and check out my work!

## Current Features
* Creating/Renaming Notebooks with Drop Down Forms
* Creation of Notes within Notebooks
* Editing of Notes by Clicking on Respective Fields
* Body with Rich Text (Bold, Italics, Underline, Bullets)
* Save Changes by clicking on Save Button in Editing Toolbar
* Drag/Drop Notes onto Notebooks to Move Them
* Deleting of Notebooks/Notes with Confirmation Modal
* Creation, Renaming, Deletion of Tags
* Add/Remove Tags from Notes (Optionally, add tags via drag and drop)
* View List of Notes with a Specific Tag

## Features Not Yet Implemented
* Search Bar to Find Content in Notes
* Option to Sort Lists Based on Other Criteria
* Add Email and Password Recovery
* Creation of Stacks to Group Notebooks
* Creation of Tag Groups/Sub Tags
* Enable Sharing with Other Users
* Enable Sharing to Social Media
* Shortcut Area for Notebooks/Notes to be Added for Quick Access


## Process Overview
1. Created Authorization (using bcrypt) with a User model and a Users and Sessions Controller
2. Created Rails API for Notebooks and Notes
3. Set Up Twitter Bootstrap and basic webpage layout (including Navbar)
4. Set up the root controller to kick off Backbone
5. Created Models and Collections for Notebooks and Notes
6. Created Views for Notebooks Index, Notes Index (for each notebook), and Note Show
7. Set up various events to trigger to render the next view or edit/delete
8. Set up various listenTo within the views to properly rerender views
9. Went back to Rails to create Tags and TaggedNotes
10. Created Backbone files for Tags and TaggedNotes
11. Created a Tags Index View and a Tag Show page (listing notes for the tag)
12. Linked the Tag Show and Notes Index views to both render the same Show Note View
13. In Notes Controller, nested tags for a note to be able to keep track of current tags
14. Implemented Adding/Removing Tags from a Note
15. Fixed smaller bugs that did not hinder major functionality
16. Added some styling with Bootstrap.
17. Added Drag and Drop of Tags from Tag Index onto Note Show page
18. Utilized etch.js to get rich text in note body
19. Added Password Confirmation to User Sign Up
