# Chingu > Bears > Team 2

## Lost and Found Pets app

**Who is this application for?**\
Our target audience is a small group of animal lovers, and animal advocates in Donelson,
TN who voluntarily rescue lost and stray animals in the city. There will be an open
door for similar groups in the surrounding area.

**What problem will this application attempt to solve?**\
This group has recovered thousands of animals. At this point, they are keeping track
of their efforts in a spreadsheet that gets passed around from one volunteer to another.
They update the information in the spreadsheet based on their own experience and
by communicating with other members in the group. Greater structure, connectivity,
and centralization would simplify updating the list as well as allowing it to be
used as a resource for finding animals.

**How will this application solve this problem?**\
The data on the spreadsheet will be moved to an accessible database. The application
will provide the volunteers an interface for performing basic CRUD operations on
the data. Where applicable, each entry will have a link to the relevant Facebook
post(primary communication tool). Data will be sortable in order to simplify the
task of finding a specific entry.

**What is the minimum viable product?**\
The database will be set up on Heroku along with a functioning instance of Apache
and PHP. Visitors will be able to perform basic CRUD operations on on the database.

**Tech Stack**

* Firebase
* React
* Redux
* Sass

---

### 2.4.2

* **Basic Authentication**\
	Only authenticated users have the ability to add or update animals.

* **Conditional dropdown menu**\
	The dropdown menu on the update page now changes based on the current status of
	the animal

* **Mobile Image Rotation Fix**\
	The method responsible for image compression (on the Add page) now reads the EXIF
	metadata on the image and rotates the image if necessary.
