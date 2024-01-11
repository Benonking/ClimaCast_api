import {PRODUCTS, COMPANY, SUPPORT} from './Menus'
import Item from './Item'
function Container() {
	return (
		<div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-clos-4 gap-6 sm:px-8 px-5 py-4 text-white'>
			<Item Links={PRODUCTS} title='PRODUCTS'/>
			<Item Links={COMPANY} title='COMPANY'/>
			<Item Links={SUPPORT} title='SUPPORT'/>
		</div>
	  );
}

export default Container;