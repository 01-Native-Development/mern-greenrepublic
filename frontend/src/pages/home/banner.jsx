import { Link } from 'react-router-dom'

import bannerImg from '../../assets/header.png'

export default function Banner() {
	return (
		<div className='header__container section__container'>
			<div className='z-30 header__content'>
				<h4 className='uppercase'>UP TO 15% Discount on</h4>
				<h1>Cannibis Products</h1>
				<p>
					Discover the latest trends and express your unique style with our
					Women's Fashion website. Explore a curated collection of clothing,
					accessories, and footwear that caters to every taste and occasion.
				</p>
				<button className='btn'>
					<Link to='/shop'>EXPLORE NOW</Link>
				</button>
			</div>
			<div className='header__image'>
				<img src={bannerImg} alt='banner image' />
			</div>
		</div>
	)
}
