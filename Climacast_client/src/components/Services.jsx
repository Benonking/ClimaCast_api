function Services() {
  return (
    <div className="bg-white pt-2 text">
      <h1 className="text-xl text-[#0a0a0a] font-bold pt-10 pl-24">Integrate With the World’s Best Weather API in Just a Few Minutes</h1>
      <p className="text-2xl font-bold pt-2 pl-24">Services</p>
      <div className="md:max-w-screen-xl m-auto grid grid-cols-4 gap-4 pt-4">
				<div>
					<p className="text-black bg-gray-200 p-4 font-semibold text-center">Current Weather</p>
				</div>
        <p className="text-black bg-gray-200 p-4 font-semibold text-center">Hourly forecast</p>
        <p className="text-black bg-gray-200 p-4 font-semibold text-center">Daily forecast</p>
        <p className="text-black bg-gray-200 p-4 font-semibold text-center">Historical data</p>
      </div>
    </div>
  );
}

export default Services;
