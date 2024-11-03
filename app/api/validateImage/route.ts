// app/api/validateImage/route.ts
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	// new URL(request.url): This creates a new URL object from the incoming request’s URL. It parses the string and provides access to various parts of the URL.
	const { searchParams } = new URL(request.url); //Destructuring searchParams:
	//  we can destructure searchParams directly from the URL object. This allows you to access the query parameters without needing to reference the URL object again.

	const url = searchParams.get("url"); // This method retrieves the value of the url parameter from the query string. If the URL is /api/validateImage?url=https://example.com/image.jpg, searchParams.get("url") will return https://example.com/image.jpg. If the parameter doesn’t exist, it returns null.

	// Validating the URL
	if (!url) {
		return NextResponse.json(
			{ valid: false, error: "Invalid URL provided" },
			{ status: 400 }
		);
	}

	console.log("valid url : ", url);

	try {
		const response = await fetch(url, { method: "HEAD" });
		// console.log(response);
		const contentType = response.headers.get("content-type");

		console.log("contentType : ", contentType);

		if (response.ok && contentType?.startsWith("image/")) {
			return NextResponse.json({ valid: true });
		} else {
			return NextResponse.json(
				{ valid: false, error: "URL is not a valid image" },
				{ status: 400 }
			);
		}
	} catch {
		return NextResponse.json(
			{ valid: false, error: "Unable to fetch URL" },
			{ status: 500 }
		);
	}
}

// Request and Response:

// request: The incoming HTTP request, where you can access details like the URL, headers, and body.
// NextResponse: An object that allows you to build structured responses, including JSON responses, status codes, and headers.
// Extracting the URL Parameter:

// The code uses new URL(request.url) to parse the incoming request URL.
// searchParams.get("url") extracts the url parameter from the query string. For example, if the request URL is /api/validateImage?url=https://example.com/image.jpg, url will be set to https://example.com/image.jpg.
// Validating the URL:

// concepts:

// searchParams: Part of the JavaScript URL API, allows you to easily access query parameters from a URL.
// Using searchParams.get("url"): This method simplifies retrieving the value of specific query parameters without manual parsing.
// GET Function: An exported function in your API route that handles GET requests, allowing you to define the logic for responding to such requests.
