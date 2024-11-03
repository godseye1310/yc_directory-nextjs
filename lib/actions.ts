"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "@/lib/utils";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";

// SERVER ACTIONS
// createPitch is a function that takes in state, form, and pitch as arguments
export const createPitch = async (
	state: unknown,
	form: FormData,
	pitch: string
) => {
	const session = await auth();

	// check if the user is logged in
	if (!session)
		return parseServerActionResponse({
			error: "You must be logged in to create a pitch",
			status: "ERROR",
		});

	// destructuring the form to get the title, description, category, and link
	// from the form object
	const { title, description, category, link } = Object.fromEntries(
		Array.from(form).filter(([key]) => key !== "pitch") // extract only the keys that are not "pitch" (i.e., title, description, category, and link) and remove the "pitch" key from the form object as pitch is passed as an argument
	);

	// we also need to generate a slug for the pitch [using the slugify package to generate a slug]
	// (slug is a unique identifier that is generated from the title of the pitch)
	const slug = slugify(title as string, {
		lower: true,
		strict: true,
	});

	try {
		const startup = {
			title,
			description,
			category,
			image: link,
			slug: {
				_type: "slug",
				current: slug,
			},
			author: {
				_type: "reference",
				_ref: session?.id,
			},
			pitch,
		};

		const result = await writeClient.create({
			_type: "startup",
			...startup,
		});

		return parseServerActionResponse({
			...result,
			error: "",
			status: "SUCCESS",
		});
		//
	} catch (error) {
		console.log(error);
		return parseServerActionResponse({
			error: JSON.stringify(error),
			status: "ERROR",
		});
	}
};

// server action to do server side Image URL validation.
export async function validateImageURL(url: string): Promise<boolean> {
	try {
		const response = await fetch(url, { method: "HEAD" });
		// console.log(response);
		const contentType = response.headers.get("content-type");
		console.log("contentType", contentType);
		return contentType?.startsWith("image/") ?? false;
	} catch (error) {
		console.error("Error validating image URL:", error);
		return false;
	}
}
