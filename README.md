# Interview Scheduler Project

Interview Scheduler is a web application built with React that allows users to share a scheduler that can book and/or cancel interviews between a student and an interviewer.

## Online Deployment

https://friendly-clarke-bb0a55.netlify.com/

The database server is being hosted by Heroku on free account, which will go to sleep whenever it hasn't been accessed recently. This means that an attempt to book or cancel interview(s) for the first time will not update the application immediately as intended. Refreshing the page after first book or cancel interview will allow the application to work as intended, at least until the server go back to sleep due to inactivity.

## Setup

Install dependencies with `npm install`.

In order to test this application locally without using Heroku database server, scheduler-api server need to run simultaneously with scheduler.

https://github.com/JehyunRa/scheduler-api

For scheduler-api installation, follow its own README guide.

### Running Webpack Development Server

```sh
npm start
```

### Running Jest Test Framework

```sh
npm test
```

### Running Storybook Visual Testbed

```sh
npm run storybook
```
