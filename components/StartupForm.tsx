/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState, useActionState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { createPitch, validateImageURL } from "@/lib/actions";

const StartupForm = () => {
	const [errors, setErrors] = useState<Record<string, string>>({});
	const [pitch, setPitch] = useState("");
	const { toast } = useToast();
	const router = useRouter();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const handleFormSubmit = async (prevState: any, formData: FormData) => {
		const formValues = {
			title: formData.get("title") as string,
			description: formData.get("description") as string,
			category: formData.get("category") as string,
			link: formData.get("link") as string,
			pitch,
		};
		try {
			await formSchema.parseAsync(formValues);
			// console.log(formValues);

			// const isImageValid = await validateImageURL(formValues.link);
			// if (!isImageValid) {
			// 	setErrors((prevErrors) => ({
			// 		link: "Invalid image URL",
			// 	}));

			// can display error toast

			// 	// Return early with an error status
			// 	return {
			// 		...prevState,
			// 		error: "Invalid image URL",
			// 		status: "ERROR",
			// 		values: formValues,
			// 	};
			// }

			const result = await createPitch(prevState, formData, pitch);

			if (result.status == "SUCCESS") {
				// Success toast
				toast({
					title: "Success",
					description:
						"Your startup pitch has been created successfully",
					variant: "success",
					duration: 3000,
				});

				setPitch("");
				// Redirecting to that startup's detail page.
				router.push(`/startup/${result._id}`);
			}

			return result;
		} catch (error) {
			// console.log("formValues :", formValues);
			// console.log(error);

			if (error instanceof z.ZodError) {
				//getting access to the field errors
				const fieldErorrs = error.flatten().fieldErrors;

				//setting errors (typesafe)
				setErrors(fieldErorrs as unknown as Record<string, string>);

				toast({
					title: "Error",
					description: "Please check your inputs and try again",
					variant: "error",
					duration: 3000,
				});

				//returning error
				return {
					...prevState,
					error: "Validation failed",
					status: "ERROR",
					values: formValues,
				};
			}

			// Handling an unexpected error
			toast({
				title: "Error",
				description: "An unexpected error has occurred",
				variant: "error",
				duration: 3000,
			});

			return {
				...prevState,
				error: "An unexpected error has occurred",
				status: "ERROR",
			};
		}
	};

	const [state, formAction, isPending] = useActionState(handleFormSubmit, {
		error: "",
		status: "INITIAL",
		values: {
			title: "",
			description: "",
			category: "",
			link: "",
		},
	});

	return (
		<form action={formAction} className="startup-form">
			<div>
				<label htmlFor="title" className="startup-form_label">
					Title
				</label>
				<Input
					id="title"
					name="title"
					defaultValue={state.values.title}
					className="startup-form_input"
					required
					placeholder="Startup Title"
				/>

				{errors.title && (
					<p className="startup-form_error">{errors.title}</p>
				)}
			</div>

			<div>
				<label htmlFor="description" className="startup-form_label">
					Description
				</label>
				<Textarea
					id="description"
					name="description"
					defaultValue={state.values.description}
					className="startup-form_textarea"
					required
					placeholder="Startup Description"
				/>

				{errors.description && (
					<p className="startup-form_error">{errors.description}</p>
				)}
			</div>

			<div>
				<label htmlFor="category" className="startup-form_label">
					Category
				</label>
				<Input
					id="category"
					name="category"
					defaultValue={state.values.category}
					className="startup-form_input"
					required
					placeholder="Startup Category (Tech, Health, Education...)"
				/>

				{errors.category && (
					<p className="startup-form_error">{errors.category}</p>
				)}
			</div>

			<div>
				<label htmlFor="link" className="startup-form_label">
					Image URL
				</label>
				<Input
					id="link"
					name="link"
					defaultValue={state.values.link}
					className="startup-form_input"
					required
					placeholder="Startup Image URL"
				/>

				{errors.link && (
					<p className="startup-form_error">{errors.link}</p>
				)}
			</div>

			<div data-color-mode="light">
				<label htmlFor="pitch" className="startup-form_label">
					Pitch
				</label>

				<MDEditor
					value={pitch}
					onChange={(value) => setPitch(value as string)}
					id="pitch"
					preview="edit"
					height={300}
					style={{ borderRadius: 20, overflow: "hidden" }}
					textareaProps={{
						placeholder:
							"Briefly describe your idea and what problem it solves",
					}}
					previewOptions={{
						disallowedElements: ["style"],
					}}
				/>

				{errors.pitch && (
					<p className="startup-form_error">{errors.pitch}</p>
				)}
			</div>

			<Button
				type="submit"
				className="startup-form_btn text-white active:scale-95 inline-block"
				disabled={isPending}
			>
				<span className="flex gap-2 items-center justify-center transition duration-200 ease-in-out">
					{isPending ? "Submitting..." : "Submit Your Pitch"}

					<Send className="size-6 ml-2" />
				</span>
			</Button>
		</form>
	);
};

export default StartupForm;
