const Ping = () => {
	return (
		<div className="relative">
			<div className="absolute top-1 -left-4">
				<span className="flex size-2.5">
					<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
					<span className="relative inline-flex rounded-full size-2.5 bg-primary"></span>
				</span>
			</div>
		</div>
	);
};

export default Ping;
