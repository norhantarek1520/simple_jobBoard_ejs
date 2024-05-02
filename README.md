# Job Board website
<div align="center">
<img width="30%" src="https://github.com/mahmoudhaney/Jobs/assets/83553963/b6d3c7b7-1f2f-4981-8c1b-5552eb0546cc">
</div>

# Introduction
Whether you're just starting out in your career, looking for a change, or trying to advance to the next level, we have thousands of jobs to choose from in various industries and locations.
Our easy-to-use search tools make finding jobs matching your skills and interests simple. And with our advanced filtering options, you can narrow down your search results to find the perfect job for you.
Once you've found a few jobs you're interested in, you can easily apply online or contact the employer directly. We also offer a variety of resources to help you prepare for your job search, including resume and cover letter writing tips, interview advice, and more.

# Features
## For users :
- Search Jobs: Users should be able to search for jobs by title, company, location, or keyword.
- Filter Jobs: Allow users to filter jobs by job type, salary range, experience level, and other criteria to narrow down their search results.
- Apply for Jobs: The app should enable users to apply for jobs directly through the app with a single click, streamlining the application process.
- job detatils: Provide job page with all information about it.
- Resume Management: The app should allow users to upload and manage their resumes within the app. This makes it easy to apply for jobs quickly and easily.
- Manage Profile :Create and update their profile information (such as name, skills, and experience)

## For Admins :
- Job Posting: Employers should be able to post jobs directly through the app, including a detailed job description, qualifications, and benefits.
- Applicant Tracking: The app should provide an applicant tracking system (ATS) that allows employers to manage applications, track the status of candidates, and schedule interviews      
- Candidate Search: Allow employers to search for qualified candidates in the app's database based on skills and experience.
- Manage Users :Suspend or activate user accounts
- Manage Jobs : Post new jobs ,Edit existing jobs ,Delete jobs
- Manage Categories :Create new job categories ,Edit existing categories ,Delete categories
- View Reports : View the number of users and jobs on the platform and See applications for each job

# Packages
       "bcrypt": "^5.1.1",
        "body-parser": "^1.20.2",
        "cookie-parser": "^1.4.6",
        "cookies-parser": "^1.2.0",
        "cors": "^2.8.5",
        "ejs": "^3.1.9",
        "express": "^4.18.2",
        "express-validator": "^7.0.1",
        "multer": "^1.4.5-lts.1",
        "mysql": "^2.18.1",
        "nodemailer": "^6.9.9",
        "nodemon": "^3.0.2"

# To install the application's dependencies   
       npm install 
# To run and excute the application 
       npm start  
       node server.js
# Features in the future
- Save Jobs: Users can save jobs to their account for later viewing, allowing them to come back to interesting opportunities.
- Job Alerts: Users can set up job alerts to be notified when new jobs matching their criteria are posted. This keeps them updated on relevant opportunities.
# Database  
## users
| Column Name | SQL Type |
|---|---|
| id | int PRIMARY KEY AUTO_INCREMENT |
| name | varchar(255) NOT NULL |
| email | varchar(255) NOT NULL UNIQUE |
| password | varchar(255) NOT NULL |
| token | varchar(255) NOT NULL |
| is_admin | boolean DEFAULT(0) |
| gender | varchar(255) |
| age | int |
| address | varchar(255) |
| image | BINARY |
| phone_number | int |
| education | varchar(255) |
| job_title | varchar(255) |

## jobs
| Column Name | SQL Type |
|---|---|
| id | int PRIMARY KEY AUTO_INCREMENT |
| title | varchar(255) NOT NULL |
| job_type | varchar(255) NOT NULL |
| owner | varchar(255) |
| experience | varchar(255) NOT NULL |
| location | varchar(255) |
| image | BINARY |
| published_on | datetime NOT NULL |
| deadline | datetime NOT NULL |
| Qualifications | varchar(255) |
| Responsibility | varchar(255) |
| vacancy | int DEFAULT(1) |
| salary | double |
**Foreign Key:**
* `category` (assuming this column exists) references the `title` column in the `categories` table (foreign key constraint named `fk_category`).
**Note:**
* Ensure you have a `categories` table with a `title` column before using this foreign key constraint.


## applications
This table stores information about job applications submitted by users.
| Column Name | SQL Type |
|---|---|
| userID | int |
| jobID | int |
| cv | blob |
| portfolio | varchar(255) |
| appliedOn | date |
| contactEmail | varchar(255) NOT NULL |
| status | ENUM('pending', 'rejected', 'accepted') |
**Foreign Keys:**
* `userID` references the `id` column in the `users` table.
* `jobID` references the `id` column in the `jobs` table.

## categories
| Column Name | SQL Type |
|---|---|
| id | int UNIQUE |
| title | varchar(255) PRIMARY KEY |
| description | text |


