# ClimaCast - Weather Api
This project is desined to help individuals get timely Weather Forecasts in real Time
Through use of the most Acurrate Data

## TechStack
#### Front-End
	- React + Vite
	- TailWind CSS

#### Backend
	- NodeJs with Express
	- Redis (Caching)

### Major Functionalities
- Get current weather data of any Location
- Get weather of Any location up to five days
- Get Hsitorical Data of any Location

## File Descriptions

	**Client**
	ClimaCast_client/
					src/
						components/
							App.jsx - Main entry for the client
							Navbar.jsx 		-- cotains contents of navigation bar
							About.jsx 		-- cotaoins cotents of the Developer Team
							Companies.jsx 	-- partner Copanies(Dummies for elastration purposes)
											Cotains form to send request to the server
							Landing.jsx 	-- Cotents of the Landing Page
							Servercies 		-- Contents of different servcies offered
How to run - ```npm run dev ```

		**Server**
	ClimaCast_client/
					index.js - Cotains Helper function and API end points
					**End points**
						-weather/:location - Retrieves current Weather data for specified location
						-forecast/:location - Retrieves weather forecast for the next 5 days
						-history/:location/date - Retireves historical of location 
How to run - ```npm run dev ```

## Bugs
If the Data source (openmap.org) api is not accesible The application will not run or retrieve data as expected

## Authors
Masereka Benon 



