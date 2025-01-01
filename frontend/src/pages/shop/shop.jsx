import { useState } from 'react'

import ProductCards from './product-cards'
import ShopFiltering from './shop-filtering'
import { useFetchAllProductsQuery } from '../../redux/features/productsApi'

const filters = {
	categories: ['all', 'accessories', 'dress', 'jewellery', 'cosmetics'],
	colors: ['all', 'black', 'red', 'gold', 'blue', 'silver', 'beige', 'green'],
	priceRanges: [
		{ label: 'Under $50', min: 0, max: 50 },
		{ label: '$50 - $100', min: 50, max: 100 },
		{ label: '$100 - $200', min: 100, max: 200 },
		{ label: '$200 and above', min: 200, max: Infinity },
	],
}

export default function ShopPage() {
	const [filtersState, setFiltersState] = useState({
		category: 'all',
		color: 'all',
		priceRange: '',
	})
	const [currentPage, setCurrentPage] = useState(1)
	const [ProductsPerPage] = useState(8)

	const { category, color, priceRange } = filtersState
	const [minPrice, maxPrice] = priceRange.split('-').map(Number)

	const {
		data: { products = [], totalPages, totalProducts } = {},
		error,
		isLoading,
	} = useFetchAllProductsQuery({
		category: category !== 'all' ? category : '',
		color: color !== 'all' ? color : '',
		minPrice: isNaN(minPrice) ? '' : minPrice,
		maxPrice: isNaN(maxPrice) ? '' : maxPrice,
		page: currentPage,
		limit: ProductsPerPage,
	})

	const clearFilters = () => {
		setFiltersState({
			category: 'all',
			color: 'all',
			priceRange: '',
		})
	}

	const handlePageChange = (pageNumber) => {
		if (pageNumber > 0 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber)
		}
	}

	if (isLoading) return <div>Loading....</div>
	if (error) return <div>Error loading products.</div>

	const startProduct = (currentPage - 1) * ProductsPerPage + 1
	const endProduct = startProduct + products.length - 1

	return (
		<>
			<section className='bg-primary-light section__container'>
				<h2 className='capitalize section__header'>Shop Page</h2>
				<p className='section__subheader'>
					Discover the Hottest Picks: Elevate Your Style with Our Curated
					Collection of Trending Women&rsquo;s Fashion Products.
				</p>
			</section>

			<section className='section__container'>
				<div className='flex md:flex-row flex-col gap-8 md:gap-12'>
					{/* left side */}
					<ShopFiltering
						filters={filters}
						filtersState={filtersState}
						setFiltersState={setFiltersState}
						clearFilters={clearFilters}
					/>

					{/* right side */}
					<div>
						<h3 className='mb-4 font-medium text-xl'>
							Showing {startProduct} to {endProduct} of {totalProducts} products
						</h3>
						<ProductCards products={products} />

						{/* pagination controls */}
						<div className='flex justify-center mt-6'>
							<button
								disabled={currentPage === 1}
								className='bg-gray-300 mr-2 px-4 py-2 rounded-md text-gray-700'
								onClick={() => handlePageChange(currentPage - 1)}
							>
								Previous
							</button>

							{[...Array(totalPages)].map((_, index) => (
								<button
									key={index}
									className={`px-4 py-2 ${currentPage === index + 1
										? 'bg-blue-500 text-white'
										: 'bg-gray-300 text-gray-700'
										}
									rounded-md mx-1
									`}
									onClick={() => handlePageChange(index + 1)}
								>
									{index + 1}
								</button>
							))}

							<button
								className='bg-gray-300 ml-2 px-4 py-2 rounded-md text-gray-700'
								disabled={currentPage === totalPages}
								onClick={() => handlePageChange(currentPage + 1)}
							>
								Next
							</button>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}