const ServiceError = () => {
	return (
		<div className='flex h-screen w-full justify-center flex-col items-center'>
			<div className='font-bold text-8xl mb-4  font-mono'>500</div>
			<div className="text-center leading-7">
				发生了一点
				<br />
				意外...
			</div>
		</div>
	);
};
export default ServiceError;
