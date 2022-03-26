# NAPARC Search
Visit the live site at: https://naparcsearch.com.

## The Problem
NAPARC stands for the North American Presbyterian and Reformed Council, and it consists of 13 different Protestant denominations. Each of these denominations has their own online church directory, but they are not able to be searched in any one location. This makes it pretty tedious checking each individual website for a congregation in any given area.

## The Solution
The goal of this project is to make each denomination within NAPARC searchable in one location online, and that is the goal of this app. Let me give you a tour. 

## The Scrapers
I wrote 8 (the rest are coming soon!) web scrapers with Cheerio.js to grab the congregations from each denominations directory. These are in the [naparc-backend app](https://github.com/zfixler/naparc-backend), and they each feed their results mongoDB.

Before my recent move to Next.js for this project, these scrapers were running via node-chron on a Linode server. Now that the project is in Next.js, the scrapers are triggered via [Github Actions and the Next.js API endpoints](https://github.com/paulphys/nextjs-cron). Since the serverless functions deployed to Vercel timeout before my scrapers can finish (sad), I deployed the scrapers as a seperate app on Heroku. It only spins up and runs when a request comes in with the appropriate auth from this repo, runs the scrapers, and updates the DB. This app handles the DB calls from the Next.js API routes. Nice!

## The Front End
The main feature on the front end of this project is the search bar itself. When the user enters a search location, I am using the GeoApify Autocomplete API in order to populate suggested location results. The longitude and latitude of the search query is sent back to the server, matched against the locations in the database, and the results are sent back to the client to populate the results. 

There are also some other filter options too. The user can select which denominations to include in their search, and they can set a particular radius for their results.

All the styling is done in styled components.
