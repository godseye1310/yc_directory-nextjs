import { z } from "zod";

export const formSchema = z.object({
	title: z
		.string()
		.min(3, { message: "Title must be at least 3 characters long" })
		.max(50),
	description: z
		.string()
		.min(15, { message: "Description must be at least 10 characters long" })
		.max(300),
	category: z.string().min(3).max(20),
	link: z
		.string()
		.url()
		.refine(async (url) => {
			try {
				const res = await fetch(url, { method: "HEAD" });
				const contentType = res.headers.get("content-type");
				return contentType?.startsWith("image/");
			} catch {
				return false;
			}
		}),
	pitch: z.string().min(15),
});
