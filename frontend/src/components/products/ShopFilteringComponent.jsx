import React from 'react';

export default function ShopFilteringComponent({filters,filtersState ,setFiltersState, clearFilters}) {

   return (
      <div className='space-y-5 flex-shrink-0'>
         <h3 className="font-header text-xl font-semibold tracking-wider mb-4">Shopping Filters</h3>
         {/* categories */}
         <div className='flex flex-col space-y-2'>
            <h4 className='font-semibold  text-lg'>Category</h4>
            <hr/>
            {
               filters.categories.map((category) => (
                  <label key={category} className='capitalize cursor-pointer'>
                     <input type="radio" name="category" id="category" value={category}
                            checked={filtersState.category === category}
                            onChange={(e) => setFiltersState({...filtersState, category: e.target.value})}
                     />
                     <span className='ml-1'>{category}</span>
                  </label>
               ))
            }
         </div>
         {/* colors */}
         <div className='flex flex-col space-y-2'>
            <h4 className='font-semibold text-lg'>Color</h4>
            <hr/>
            {
               filters.colors.map((color) => (
                  <label key={color} className='capitalize cursor-pointer'>
                     <input type="radio" name="color" id="color" value={color}
                            checked={filtersState.color === color}
                            onChange={(e) => setFiltersState({...filtersState, color: e.target.value})}
                     />
                     <span className='ml-1'>{color}</span>
                  </label>
               ))
            }
         </div>
         {/* price ranges */}
         <div className='flex flex-col space-y-2'>
            <h4 className='font-semibold text-lg'>Price Range</h4>
            <hr/>
            {
               filters.priceRanges.map((priceRange) => (
                  <label key={priceRange.label} className='capitalize cursor-pointer'>
                     <input type="radio" name="priceRange" id="priceRange"
                            value={`${priceRange.min}-${priceRange.max}`}
                            checked={filtersState.priceRange === `${priceRange.min}-${priceRange.max}`}
                            onChange={(e) => setFiltersState({...filtersState, priceRange: e.target.value})}
                     />
                     <span className='ml-1'>{priceRange.label}</span>
                  </label>
               ))
            }
         </div>
         {/* clear filters */}
         <button onClick={clearFilters}  className='btn uppercase font-semibold tracking-wider py-1 px-4 text-white rounded'>Clear Filters
         </button>
      </div>
   );
}