import { Container } from "../components";
import {SocialIcons} from "../components";
import {Icons} from './Menus'


function Footer() {
	return ( 
		<footer className="bg-gray-900 test-white">
			<Container/> 
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10
			text-center pt-2 text-gray-400 text-sm pb-8">
				<span>@ 2020 ClimaCast. All rights reserved.</span>
				<span>Terms. Privacy Policy</span></div>
				<SocialIcons icons={Icons}/>
			</footer>
	 );
}

export default Footer;