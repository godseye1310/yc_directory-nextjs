"use client";

import React, { useEffect, useState } from "react";

const ArticleScrollProgress = () => {
	// console.log(pathname);
	const [scrollPercent, setScrollPercent] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const totalHeight = document.documentElement.scrollHeight;
			const viewportHeight = window.innerHeight;
			const currentScrollPosition = window.pageYOffset;

			const scrolled =
				(currentScrollPosition / (totalHeight - viewportHeight)) * 100;
			setScrollPercent(scrolled);
		};

		window.addEventListener("scroll", handleScroll);

		// Initial call in case user loads not from top
		handleScroll();

		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);
	return (
		<>
			<div className="w-full fixed top-[60px] left-0 z-[90]">
				<div
					className="h-1 bg-teal-500"
					style={{ width: `${scrollPercent}%` }}
				/>
			</div>
		</>
	);
};

export default ArticleScrollProgress;
