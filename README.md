# BOULDER WEATHER

## Timeline and Strategy:
Challenge was given with no language or framework restrictions and no deadline. 

### Step 1: Fully analyze the scope and requirements of the project
Reading through the challenge I saw that it was structured around Python. You were to take in data and do some conversion into a usable data format and also be able to combine the two given data files into one. Next was to work through two user stories and satisfy the needs of both as best as possible. Display of the data was also up to the developer. Admittedly in this step, I didn't analyze the extent of some of the command line graphing and the time it would take to use one of those libraries, I think doing so would have given me a better sense of the total scope of the challenge.

Not knowing Python I was open to the possibility of learning enough to complete the challenge, but ended up deciding to go with React for the chance to use the Victory.js library that is built on D3 (something that was mentioned in the challenge README.md.

### Step 2: Convert data txt files to JSON and clean/combined to a usable format
This step was the most crucial for converting the data to be laid out in a logical structure. A lot of time was spent plotting out overall design and researching Victory.js to make sure to make it easy as possible going forward. Another challenge was learning how to use Node and `fs` to import the text files. Converting to JSON was extremely fun and challenging.

### Step 3: Moving into React and using the Data
Moving into the front end after combining the JSON I had a massive file. Parsing this file everytime the user visted the site was taxing and slow. I looked into alternatives in the best way to handle the large data and couldn't find any so I decided to build a Postgres database to serve the data from. This would allow me to segment data requests and use fetch to utilize promises to handle the longer requests asynchronously. This was also important for the visualization of the data to have the best UX.

### Step 4: Setting up the backend
I went with Express with Knex to the database. I hit a long hurdle when trying to seed my database with Knex. This is the first time I have attempted seeding with a dataset with 40k entries. A solution was to build out an array of Knex seed commands and use `Promise.all` to handle each seed request.

### Step 5: React structure
Finally into handling each user story. I decided to call some friends and family that are weather buffs. I asked them questions to narrow down what they would be looking for the most as each type of user. Next, I planned out how to handle the incoming data and the endpoints I would need. I wanted the front end to be as smooth as possible and a large request combined with D3 data visualization is pretty intensive. I optimized this somewhat by using Redux for state management. Requesting initial smaller data sets for basic stats visualization while performing the larger requests in the background for the advanced graphic with Victory.

### Step 6: Learning Victory and Design
Once my data was in the Store I was able to do some conversion to the required x and y keys Victory needed. Plotting and display went well but making it look presentable was more of a challenge. Victory has great utility through passing settings for D3 as props values within the Victory components. Victory documentation is great as well. After Victory was set up I did some light styling mostly for positioning and color.

#### Areas I would improve if full featured
- Definitely implement testing both server side and front end. Prop validation as well.
- More design put into UI.
- Give the user more fine-tuned control of date segments for the Victory.js graphing.

### Design:

![screen shot 2018-09-10 at 4 36 45 pm](https://user-images.githubusercontent.com/34175382/45328166-f12e0380-b517-11e8-9ba8-1ec5b3274d09.png)
![screen shot 2018-09-10 at 4 37 19 pm](https://user-images.githubusercontent.com/34175382/45328164-effcd680-b517-11e8-8bd2-d65aa0f8d735.png)

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

Backend hosted on Heroku. View repo [here](https://github.com/tonyr729/boulder-backend)

## Set Up

* Clone this repo

* Ensure you have [NPM](https://www.npmjs.com/)

* Run `npm install` from the root directory

* Run `npm start` and visit localhost:3000 in your browser
