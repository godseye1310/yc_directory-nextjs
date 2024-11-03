import { validateImageURL } from "@/lib/actions";
import { z } from "zod";

export const formSchema = z.object({
	title: z
		.string()
		.min(3, "Title must be at least 3 characters long")
		.max(100, "Title is too long"),
	description: z
		.string()
		.min(10, "Description should be at least 10 characters")
		.max(500, "Description is too long. Max 500 characters at most"),
	category: z
		.string()
		.min(3, "Category should be at least 3 characters")
		.max(20, "Category is too long. Max 20 characters at most"),
	link: z
		.string()
		.url("Invalid Image URL")
		.refine(async (url) => await validateImageURL(url), {
			message: "URL must be a valid image",
		}),
	pitch: z.string().min(15, "Pitch should be at least 15 characters"),
});

// Doing Validation like this on client side will Cause CORS errors and won't work for all image URLs(even if its valid one) so I wouldn't recommend it.
// link: z.string().url("Invalid Image URL")
//         .refine(async (url) => {
//             try {
//                 const res = await fetch(url, {method: "HEAD"});
//                 const contentType = res.headers.get("content-type");
//                 return contentType?.startsWith("image/");
//             } catch {
//                 return false;
//             }
//         }, "URL must be a valid image"),

// Recommend doing a server side validation :

// 1. using an api route like :
// link: z.string().url("Invalid Image URL")
// 	.refine(async (url) => {
// 		try {
// 			const res = await fetch(
// 				`/api/validateImage?url=${encodeURIComponent(url)}`
// 			);
// 			const data = await res.json();
// 			return data.valid;
// 		} catch {
// 			return false;
// 		}
// 	}, "URL must be a valid image");

// 2. Recommmend doing a server side validation for img URL using server actions in the form-component itself or if you want to do it formSchema with zod you can do something like :
// link: z
// 		.string()
// 		.url("Invalid Image URL")
// 		.refine(async (url) => await validateImageURL(url), {
// 			message: "URL must be a valid image",
// 		}),
// Although it works, I dont know if it is a recommended practice to do server side validation in zod schema or not.
// If face any issues you can call server-actions in your form component itself.
