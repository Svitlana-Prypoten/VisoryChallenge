This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`] (https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## About The Project

This project is designed to find events using Ticketmaster discovery API that are located within Australia.
The system then returns a set of basic information surrounding the event, consisting of:

- event id
- event name
- venue name
- start date
- image associated with event

There are options to filter events based on start date, end date, and postcode.

This project can be accessed via https://visory-challenge-ijgb.vercel.app/

## To Run Locally

1. Clone GitHub the project git repository
2. To install dependencies run under `visory-challenge` folder using

```bash
npm install
```

3. You need Ticketmaster API Key to be added into the `next.config.js` file via

```bash
env: {
api_key_ticketmaster: [API_KEY],
},
```

4. To start project in development mode run the following command from the `visory-challenge` folder

```bash
npm run dev
```

or to create and run the production version run

```bash
npm run build
npm start
```

5. Open http://localhost:3000 with your browser to access application.

## Project design rationale

Next.js suited this project best for a number of reasons:

1. Next.js provides a quick and simple setup process.
2. Next.js supports zero-config by default, which reduces the configuration-associated delays.
3. While this project is not back-end heavy, it still used API Key that should not be accessible for users. Next.js supports both Server-Side Rendering (SSR) and Static Site Generation (SSG) out of the box, as well as ease of API creation.
4. I didn't have a chance to work with Next.js before, so I took the learning opportunity in the form of this project. As I am already familiar with React.js, Next.js was a natural extension.

## Testing, Validation and Optimisation

Within the delivery scope of this project, most effort was dedicated to delivering core functionality to the exclusion of rigorous testing and optimisation. Within a more lengthy and robust project, the following methodologies would have been implemented to test, validate, and optimise the performance of the product:

1. Currently, the website and it's responses have been manually tested and verified. Creation of robust unit tests for the API, functions, and components; as well as a Cyprus test for the front-end portion would be ideal for an enterprise-grade solution.

2. Within the current implementation, there is simple date validation, stopping the user from inputting dates that are prior to today, or where the end date is before the start date. In later implementations, validation of the user postcode consisting of a viable number sequence that matches to an existing postcode within the event country.

3. Due to development timelines, optimisation was not thoroughly conducted. Ensuring the use of Next.js best coding practices (such as avoiding boilerplate), as well as optimising the request-response methods within API use (such as caching to avoid unneeded data being pulled) would be the next step in optimising product performance.
