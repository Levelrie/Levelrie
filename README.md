# Levelrie 

# Table of Contents 

- [Description](#description)
- [Built With](#built-with)
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)

# Description

Do you ever look at someone and think “I would so swipe right”…On their outfit? We’ve all been there, the problem is getting that look is a painful process that too often ends in frustration, disappointment, and another day of wondering what to wear. Levelrie aims to change all that by providing a simple, centralized and frictionless way to purchase the perfect look for any occasion without the weight of quizzes, extensive profiles, visiting multiple sites or searching desperately for inspiration. Instead of painstakingly assembling an outfit by browsing page after page of nearly identical items, Levelrie presents a new paradigm: create an account and you will be presented with a stylist curated collection of outfits made up of hand selected items from top fashion retailers. Don’t love the look? Swipe left for something new. Need it? Swipe right and the whole outfit will be added to your cart, ready to be purchased and shipped to your door. Levelrie, because buying clothes online should be fun and easy.

# Built With

- [SQL](https://www.w3schools.com/sql/)
- [Heroku](https://www.heroku.com/)
- [Swipejs](https://swipe.js.org/)
- [Passport](https://www.npmjs.com/package/passport)
- [Cloudinary](https://cloudinary.com/)
<a href="https://www.w3schools.com/w3css/defaulT.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" height="40px" width="40px" /></a>
<a href="https://expressjs.com/"><img src="https://github.com/devicons/devicon/blob/master/icons/express/express-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/html/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" height="40px" width="40px" /></a>
<a href="https://www.w3schools.com/js/default.asp"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" height="40px" width="40px" /></a>
<a href="https://www.postgresql.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" height="40px" width="40px" /></a>
<a href="https://reactjs.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/react/react-original-wordmark.svg" height="40px" width="40px" /></a>
<a href="https://redux.js.org/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/redux/redux-original.svg" height="40px" width="40px" /></a>
<a href="https://www.figma.com/?fuid="><img src="https://github.com/devicons/devicon/blob/master/icons/figma/figma-original.svg" height="40px" width="40px" /></a>
<a href="https://material-ui.com/"><img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/materialui/materialui-original.svg" height="40px" width="40px" /></a>
<a href="https://nodejs.org/en/"><img src="https://github.com/devicons/devicon/blob/master/icons/nodejs/nodejs-plain.svg" height="40px" width="40px" /></a>

## Getting Started

# Getting Started 

VS code was used while building this app, please make sure your choice of IDE (Integrated Development Environment) is functionable.

# Prerequisites

Before you get started, make sure you have the following software installed on your computer:

- [Node.js](https://nodejs.org/en/)
- [PostrgeSQL](https://www.postgresql.org/)
- [Nodemon](https://nodemon.io/)

# Installation

1. Fork the repository
2. Copy the SSH key in your new repository
3. Open your terminal and type... git clone {paste SSH link}
4. Navigate into the repository's folder in your terminal
5. Open VS Code (or editor of your choice) and open the folder
6. In the terminal of VS Code type... run npm install to install all dependencies
7. Create a .env file at the root of the project and paste this line into the file:
8. Create a database named levelrie in PostgresSQL If you would like to name your database something else, you will need to change levelrie to the name of your new database name in server/modules/pool.js
9. The queries in the database.sql file are set up to create all the necessary tables that you need, as well as a dummy data table to test the app. Copy and paste those queries in the SQL query of the database. If this is going to production, leave out the dummy data.
10. Run npm run server in your VS Code terminal
11. Open a second terminal and run npm run client

# Usage
Once everything is installed and running it should open in your default browser - if not, navigate to http://localhost:3000/#/.

Video walkthrough of application usage: (ADD VIDEO LINK)

# Deployment
Login Credentials for Heroku have been provided in the hand off document.

If you need make changes you wish to push to the deployed app, you must login, go into the pet-star section, go to the deploy tab, and then manually deploy. You can reconfigure this to redeploy automatically if you wish, which is on the same page.

Environment variables are kept on Heroku in the Settings tab, just click the Reveal Config Vars button

To set up the DB, we used Postico, just plug the information from Heroku into a new favorite. The Information for this can be found in the Resources tab, by clicking the Postgres add on. From there it will bring you to a new page where you will go into the settings tab and click view credentials.

If you'd like to create new users (also a hacky way to change password) you must:

1. Go into the user router
2. Uncomment the route
3. Push changes and redeploy app
4. Register User
5. Comment out the route back in VSCode
6. Push changes
7. Redeploy

--------------------------------------------------------------------------