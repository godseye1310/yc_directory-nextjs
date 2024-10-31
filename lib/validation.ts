// export const formSchema = z.object({
// 	title: z
// 		.string()
// 		.min(3, { message: "Title must be at least 3 characters long" })
// 		.max(50),
// 	description: z
// 		.string()
// 		.min(15, { message: "Description must be at least 10 characters long" })
// 		.max(300),
// 	category: z.string().min(3).max(20),
// 	link: z
// 		.string()
// 		.url()
// 		.refine(async (url) => {
// 			try {
// 				const res = await fetch(url, { method: "HEAD" });
// 				const contentType = res.headers.get("content-type");
// 				return contentType?.startsWith("image/");
// 			} catch {
// 				return false;
// 			}
// 		}),
// 	pitch: z.string().min(15),
// });

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
		}, "URL must be a valid image"),
	pitch: z.string().min(15, "Pitch should be at least 15 characters"),
});
