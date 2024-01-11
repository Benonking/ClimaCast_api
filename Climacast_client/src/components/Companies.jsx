import bg from '../assets/bg.jpg'
import companyLogo1 from '../assets/company-logo-1.png'
import companyLogo2 from '../assets/company-logo-2.png'
import companyLogo3 from '../assets/company-logo-3.png'
import companyLogo4 from '../assets/company-logo-4.png'

import Services from './Services'

function Companies() {
	return (
		<div className='w-full h-screen py-[5px]' style={{backgroundImage:`url(${bg})`}}>
			<div className='md:max-w-[1480px] m-auto  max-w-[600px]'>
				<h1 className='text-center text-2x1 font-bold text-[#0e7490] pt-4'>Used in over 50 countries around the world</h1>
				<p className='text-center text-x1 text-[#0e7490]'>Leading Companies use our API to plan and schedule their events</p>
				<div className='flex justify-center pt-8 pb-2 md:gap-8'>
					<img src={companyLogo1}/>
					<img src={companyLogo2}/>
					<img src={companyLogo3}/>
					<img src={companyLogo4}/>
				</div>
				<Services/>
			</div>
		</div>
	);
}

export default Companies;