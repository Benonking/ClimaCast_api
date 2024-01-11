import { Icons } from "./Menus";

function SocialIcons() {
	return ( 
		<div className="text-teal-500">
			{Icons.map(icon=>(
				<span className="p-2 cursor-pointer">
					<ion-icon name={icon.name}></ion-icon>
				</span>
			))}
		</div>
	 );
}

export default SocialIcons;