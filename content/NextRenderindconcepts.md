# Data Fetching and Rendering Methods in Next.js

## Static Site Generation (SSG)

-   **Definition**: SSG is a method of pre-rendering pages at build time. This means that when we build our Next.js application, it generates HTML for each page in advance.
-   **When to Use**: Ideal for pages that don’t change often, such as blog posts, marketing pages, or product listings.
-   **How It Works**: The generated HTML is served to the user, making it fast and efficient since it doesn’t require server processing on each request.

## Incremental Static Regeneration (ISR)

-   **Definition**: ISR allows we to update static content after you’ve built our application. With ISR, we can specify a revalidation time, meaning that the static pages will be re-generated in the background after a specified duration (e.g., every 60 seconds).
-   **When to Use**: Useful for pages that need to reflect changes more frequently without doing a full redeployment, but still benefit from the speed of static serving.
-   **How It Works**: When a user requests a page after the specified revalidation time, Next.js serves the existing static page, but it will trigger a regeneration in the background. The next request will receive the updated version.

    -   For example, if we set a revalidation time of 60 seconds, the page will reflect the latest data on the next request after 60 seconds has passed, but the user will not see the update until the next page load.

## Server-Side Rendering (SSR)

-   **Definition**: SSR generates the HTML on the server for each request. This means that every time a user requests a page, the server processes the request and returns the latest HTML.
-   **When to Use**: Ideal for pages that need to show real-time data or user-specific content, such as dashboards or profiles.
-   **How It Works**: Every time a page is requested, it is generated fresh from the server, ensuring that the user always sees the latest content.

## Comparison of SSR and ISR

| Feature         | Server-Side Rendering (SSR)                 | Incremental Static Regeneration (ISR)                                |
| --------------- | ------------------------------------------- | -------------------------------------------------------------------- |
| Data Freshness  | Always fresh (latest data on every request) | Fresh data after specified revalidation interval                     |
| Page Load Speed | Slower (server processing on every request) | Faster (serves static until revalidation)                            |
| Use Case        | Real-time or dynamic data                   | Data that updates regularly but doesn't require immediate visibility |
| Page Reload     | Always shows the latest data upon request   | Shows existing static page until revalidation occurs                 |

## Using `useCdn` with SSG and ISR

When we set `useCdn: true`:

-   **Revalidation every 60 seconds**: This means that while our page is statically generated, the CDN will check for updates in our Sanity content every 60 seconds. The process works as follows:
    -   For the first request, the CDN serves the static HTML.
    -   After 60 seconds, the CDN checks for updates. If the content has changed in Sanity, it fetches the new data and updates its cache.
    -   If a user makes a request right after the revalidation, they will receive the updated content; otherwise, they will see the previously cached version until the next check.

## Page Refresh Behavior

-   **Automatic Reflection of Changes**:
    -   With **ISR**, the changes will reflect automatically on the next page request after the revalidation period expires. Users do not need to refresh the page; however, they will not see changes until their next interaction (e.g., navigating to the page again).
    -   With **SSR**, users see the latest data every time they load or refresh the page or navigate back, as the server generates fresh content for each request.

## Conclusion

-   **SSG/ISR**: Great for static content with periodic updates; ISR enables automatic content updates without full redeployment.
-   **SSR**: Best for dynamic data that must be fresh on every request.
-   **useCdn**: SANATY's CDN which Enables caching for performance, and with a revalidation period, it allows our app to serve content efficiently while still being able to reflect changes after a set time without manual page refreshes.

This understanding allows us to choose the right data-fetching strategy for our Next.js application based on the nature of our content and how often it changes.

---

## Static Site Generation (SSG)

### What is SSG?

Static Site Generation (SSG) is a method of pre-rendering web pages at build time. This means that when we build our Next.js application, the HTML for each page is generated once and served as static files.

### Key Characteristics of SSG

-   **Pre-Rendered Pages**: Pages are generated as HTML files during the build process and served directly to users.
-   **Fast Load Times**: Since pages are served as static files, they load quickly.
-   **No Server Processing**: The server does not need to fetch data or process requests for SSG pages; it simply serves the pre-generated files.

### How SSG Gets Updated Data

1. **Rebuild Process**: To update an SSG page with new data, we typically need to trigger a rebuild of the site. This can be done in a few ways:

    - **Manual Rebuild**: Developers manually trigger a build process when content changes (e.g., through a CMS).
    - **Automated Builds**: Some setups use webhooks or APIs to automatically trigger a rebuild whenever new content is published or existing content is modified.

2. **Data Fetching**: When a rebuild occurs, the SSG tool fetches the latest data from the source (such as a database or API) and generates the new static HTML files.

3. **Deployment**: After the new HTML files are generated, they are deployed to the web server or CDN. Users will then see the updated content when they visit the site.

### Comparison with SSR and ISR

-   **SSR**:
    -   Fetches data on each request, serving the latest content.
    -   May display stale data if the user does not reload or navigate.
-   **ISR**:
    -   Combines the benefits of SSG and SSR.
    -   Allows static pages to be updated automatically on a defined schedule (e.g., every 60 seconds) while also serving a static version initially.
-   **SSG**:
    -   Generates static pages at build time, serving them as is until the next build.
    -   Requires a rebuild to update data, leading to less flexibility for frequently changing content.

### Conclusion

SSG is best suited for content that does not change at all or changes rarely and can benefit from fast load times. For content that changes often, SSR or ISR may be more appropriate, allowing users to access the latest data without needing to rebuild the entire site.

---

## Server-Side Rendering (SSR) and Stale Data

### 1. Initial Load

When a user first navigates to a page that uses SSR, the server fetches the latest data from the database and generates the HTML for that page. The user sees the most up-to-date content.

### 2. Subsequent Navigation or Interactions

-   If the user remains on that page without refreshing, and changes occur in the database (e.g., new data is added, existing data is modified or deleted), the user will **not** see those changes until they:
    -   **Reload the Page**: By reloading, the server will fetch the latest data again and generate a new HTML response with the updated information.
    -   **Navigate Away and Return**: If they navigate to another page and then come back, the server will again generate the page with the most recent data.

### Summary of SSR Behavior

-   **Stale Data**: While the user is on a page rendered with SSR, the data displayed will be "stale" if changes occur in the backend (database) after the initial render but before the user performs a reload or navigation action.
-   **User Experience**: This behavior is typical in SSR because it generates fresh content only on each request. If no new request is made (i.e., the user does not refresh or navigate away), they will continue to see the original data that was served on the initial load.

## Key Differences with ISR

-   **ISR (Incremental Static Regeneration)** allows for static pages to be regenerated on a set interval (like every 60 seconds). Users will need to refresh or navigate away to see updates after the revalidation time has passed, similar to SSR.
-   **SSR** ensures that users always receive fresh content with each page request but can display stale data if the user does not reload or navigate away.

## Conclusion

In both SSR and ISR, users can experience stale data when they don't refresh or navigate away from the page. The main difference lies in how frequently that data can be updated (with ISR using a revalidation strategy and SSR serving fresh data on every request).

So with ISR the page updates but the user has to reload or navigate to see the updated changes.
while on the SSR user gets the latest data on every page reload or navigation but otherwise if user doesnt reload and stays on the page, it will have stale data even if there is change in db.
