import { defineField, defineType } from "sanity";

export const startup = defineType({
	name: "startup",
	title: "Startups",
	type: "document",
	fields: [
		defineField({
			name: "title",
			type: "string",
		}),
		defineField({
			name: "slug",
			type: "slug",
			options: {
				source: "title",
			},
		}),

		defineField({
			name: "author",
			type: "reference",
			to: [{ type: "author" }],
		}),
		defineField({
			name: "category",
			type: "string",
			validation: (Rule) =>
				Rule.min(1).max(20).required().error("Category is Required"),
		}),
		defineField({
			name: "description",
			type: "text",
		}),
		defineField({
			name: "image",
			type: "url",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "views",
			type: "number",
		}),
		defineField({
			name: "pitch",
			type: "markdown",
		}),
	],
});

// {
//     _createdAt: new Date(),
//     _id: "1",
//     author: { _id: 1, name: "Elon Musk" },
//     title: "We Robots",
//     category: "Robotics",
//     description: "This is a description",
//     image: "https://images.unsplash.com/photo-1661956601349-f61c959a8fd4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
//     views: 60,
// },
