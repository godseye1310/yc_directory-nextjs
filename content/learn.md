Add Tailwind Plugins

> npm install tailwindcss-animate @tailwindcss/typography

// Setup Auth using Next Auth. OAuth - Provider[github]

Using Shadcn ui :

> npx shadcn@latest init

To add a shadcn components (button) :

> npx shadcn@latest add button
> // (skeleton)
> npx shadcn@latest add skeleton

Setup SANITY in Next.js
(copy command from when created a sanity Project)

> npm create sanity@latest -- --project 9wu2xd6e --dataset production --template clean
> Login in sanity
> npm install next-sanity@canary

Added a sanity markdown plugin

> npm install sanity-plugin-markdown

To Generate sanity types :-
-> Extract using:

> npx sanity@latest schema extract --path=./sanity/extract.json
> -> Generate using:
> npx sanity@latest typegen generate

In Sanity we setup the following
// creating sanity dataSchemas
// configuring sanity.config.ts .envs & structure.ts according to necessity.
// writing queries to fetch data from db.

//lib folder Sanity API's
live API
client.ts
queries.ts
write-client.ts // to create & update data

package.json add scripts:
scripts : {
"predev": "npm run typegen",
"prebuild": "npm run typegen",
"typegen": "sanity schema extract --path=./sanity/extract.json && sanity typegen generate"
}
can simply run

> npm run typegen
> to extract and generate sanity types

-> A package to ensure module can only be used on server components

> npm i server-only

setting up sanity - Live content API
->setup and config live.ts
-> fetch posts using live API

using experimental feature PPR in startup details Page

next.config.ts

experimental: {
ppr: "incremental",
},
devIndicators: {
appIsrStatus: true,
buildActivity: true,
buildActivityPosition: "bottom-right",
},

in the page.tsx or whereever wanna use.
-export const experimental_ppr = true;

//
Home Page StartUps is Fetched LIVE using a LIVE API.( this is Client-Side Real-Time Updates /(or Data Streaming))

//
In Startup Details Page utlising Partial Pre-Rendering (PPR) :
-> All Startup Details is cached and [useCdn:true] in sanity client.ts
(revalidates the page every 60 seconds).
-> Hence, the Details Page all data updates are updated in Incremental Static Regeneration (ISR) Fashion.
-> while the views insde is an SSR component which fetches the data on each request (reload), serving the latest content (views count)

// useActionState Hook
const [state, formAction, isPending] = useActionState(handleFormSubmit, {
error: "",
status: "INITIAL",
});

set formSchema to do validation with Zod
made a server action to handle creating new startup's

// installled and setup sentry

> Understanding searchParams
> Definition:

a. The searchParams Object
Definition: searchParams is an instance of the URLSearchParams interface, which provides methods to work with the query string of a URL.
Usage: You can use it to retrieve values of parameters passed in the URL.

b. Creating a New URL Object
How: The new URL(request.url) constructor takes the full URL of the incoming request and parses it into a URL object, allowing you to easily access its components (protocol, hostname, pathname, search parameters, etc.).

searchParams is not a specific Next.js feature; rather, it is part of the native JavaScript URL API. It provides a convenient way to work with the query string of a URL. The URL API is built into modern browsers and Node.js, and it helps manage and manipulate URL components effectively.
Purpose:

-> Important Explanation
When a URL contains query parameters (like ?url=https://example.com/image.jpg), the searchParams property of a URL object allows you to easily retrieve the values of these parameters without having to manually parse the query string yourself.
Example URL Breakdown
For example, in the URL http://localhost:3000/api/validateImage?url=https://example.com/image.jpg:

Base URL: http://localhost:3000/api/validateImage is the endpoint.
Query String: ?url=https://example.com/image.jpg is the part of the URL that contains parameters, where url is the key, and https://example.com/image.jpg is its value.
Why Use searchParams.get("url")?
When you create a new URL object using new URL(request.url), you can easily access the query parameters using the searchParams property. Here’s why:

Ease of Use: searchParams.get("url") simplifies retrieving the value associated with the url key. It handles any decoding and parsing for you.
No Manual Parsing: Without searchParams, you would need to manually extract the query string from the URL and parse it to get individual parameters, which can be error-prone.

> What is GET in the Function?
> In the context of your API route, the GET function represents an HTTP method handler for the GET requests sent to that route.

Definition:

export async function GET(request: Request) { ... } defines an asynchronous function that handles GET requests to the API route. This is part of the new routing system in Next.js, where you can define how your API handles different types of requests (e.g., GET, POST, etc.) by exporting functions named after the HTTP methods.
Purpose:

The GET function is called automatically when a GET request is made to the endpoint where this file is located. It allows you to define the logic that should execute in response to that request.

Summary
searchParams: Part of the JavaScript URL API, allows you to easily access query parameters from a URL.
Using searchParams.get("url"): This method simplifies retrieving the value of specific query parameters without manual parsing.
GET Function: An exported function in your API route that handles GET requests, allowing you to define the logic for responding to such requests.

> What is a Route Handler?
> In Next.js 13, Route Handlers are a new way to define backend API functionality directly within the app directory. This replaces the previous pages/api structure for API routes and allows you to create APIs with more streamlined, co-located code.

Route Handlers are useful when you need an API endpoint directly tied to a specific part of your app, such as form submissions, data validation, or interactions with external APIs. They allow Next.js to optimize server rendering and API route handling by colocating the route within the application’s directory structure.

> Understanding request in Next.js
> Definition: The request object represents the incoming HTTP request made to your API endpoint. It contains information about the request such as headers, query parameters, method (GET, POST, etc.), and body content.

Usage:

Request Method: You can check if the request is a GET, POST, etc., which allows you to respond accordingly.
Headers: Access the request headers using request.headers to get metadata about the request.
Body: For POST requests, the body can be accessed to get the data sent by the client.
