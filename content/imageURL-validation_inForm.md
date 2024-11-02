# Image URL Validation

## Client-Side Validation for Image URLs (Not Recommended)

Using client-side validation for image URLs can lead to CORS errors and may not work for all valid image URLs (even if its valid one). The following example demonstrates this approach:

```typescript
link: z
    .string()
    .url("Invalid Image URL")
    .refine(async (url) => {
        try {
            const res = await fetch(url, { method: "HEAD" });
            const contentType = res.headers.get("content-type");
            return contentType?.startsWith("image/");
        } catch {
            return false;
        }
    }, "URL must be a valid image"),
```

## Server-Side Validation (Recommended)

Instead, it's recommended to perform server-side validation using an API route. Here's how you can implement it:

-   **Use server-side validation for image URLs using server actions in the form component itself or if you want to do it formSchema with zod you can do something like:**

### 1. You can implement it using an API route. Here's how you can implement it:

```typescript
link: z.string()
	.url("Invalid Image URL")
	.refine(async (url) => {
		try {
			const res = await fetch(
				`/api/validateImage?url=${encodeURIComponent(url)}`
			);
			const data = await res.json();
			return data.valid;
		} catch {
			return false;
		}
	}, "URL must be a valid image");
```

create an API route at `/api/validateImage` and it will return either `true` or `false` depending on whether the image URL is valid or not.

<details>
<summary><code>app/api/validateImage/route.ts</code></summary>

```typescript
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
	try {
		const response = await fetch(url, { method: "HEAD" });
		const contentType = response.headers.get("content-type");

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
```

</details>

### 2. Recommmend doing a server side validation for img URL using server actions.

`actions.ts`

```typescript
"use server";
export async function validateImageURL(url: string): Promise<boolean> {
	try {
		const response = await fetch(url, { method: "HEAD" });
		const contentType = response.headers.get("content-type");
		console.log(contentType);
		return contentType?.startsWith("image/") ?? false;
	} catch (error) {
		console.error("Error validating image URL:", error);
		return false;
	}
}
```

-   **Use the `validateImageURL` server action in your form component itself (makes it easier to maintain but more complex and verbose).**

```tsx
const isImageValid = await validateImageURL(formValues.link);
if (!isImageValid) {
	setErrors((prevErrors) => ({
		link: "Invalid image URL",
	}));

	toast({
		title: "Error",
		description: "The provided image URL is not valid",
		variant: "destructive",
		className: "bg-red-500 text-white border border-red-700",
	});

	// Return early with an error status
	return {
		...prevState,
		error: "Invalid image URL",
		status: "ERROR",
		values: formValues,
	};
}
```

-   **You can also use the `validateImageURL` server action in your formSchema with zod (refine method), you can do something like.**

```typescript
link: z
		.string()
		.url("Invalid Image URL")
		.refine(async (url) => await validateImageURL(url), {
			message: "URL must be a valid image",
		}),
```

    - Although it works, I dont know if it is a recommended practice to do server side validation in zod schema or not.
    - If face any issues you can call server-actions in your form component itself.
