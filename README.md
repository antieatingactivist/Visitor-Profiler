# Visitor-Profiler

## https://visitor-tracker.home.jgarrettcorbin.com/hit

A simple node app that collects header data from visitors, and gets the location of the visitors with API call to https://ipdata.co via Axios.

<img width="1130" alt="Screenshot 2022-11-06 at 5 54 57 PM" src="https://user-images.githubusercontent.com/1414728/200210976-f57cca0b-8190-45ff-ab4d-44fe56e851a1.png">

## Installation

- Visit https://visitor-tracker.home.jgarrettcorbin.com/hit for a demo.

- Clone this repository `git clone <repo address>`
- Move into cloned directory `cd Visitor-Tracker`
- Install dependencies `npm install`
- Set up environment variables by renaming .env.EXAMPLE to .env and adding your mySQL username and password.
- Register an API key at https://ipdata.co and paste that key in the .env file beside API_KEY.
- Add new database to mySQL `CREATE DATABASE visitor_db;`
- Start server `npm start`
- Navigate to http://localhost:3004/stats (port can be changed in the .env file)
- Create a link or fetch/axios/ajax request to http://localhost:3004/hit to record the IP of the visitor.

## Deployed link

https://visitor-tracker.home.jgarrettcorbin.com/hit

## Built With

* [react.js](https://reactjs.org)
* [node.js](https://nodejs.dev) 
* [express.js](http://expressjs.com)
* [sequelize](https://sequelize.org)
* [mySQL](https://www.mysql.com)
* [ipdata.co](https://ipdata.co)

## Authors

Garrett Corbin

- [https://github.com/platevoltage/](https://github.com/)
- [https://www.linkedin.com/in/garrett-corbin-7a7777227/](https://www.linkedin.com/)

## License

This project is licensed under The MIT license


