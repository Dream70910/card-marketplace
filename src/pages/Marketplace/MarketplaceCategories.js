import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import SidebarFilterMarketplaceCategories from "../../components/sidebars/SidebarFilterMarketplaceCategories"
import Dropdown from "../../components/commons/Dropdown"
import CardItem from "../../components/cards/CardItem"
import DialogMarketplaceFilterCategories from "../../components/dialogs/DialogMarketplaceFilterCategories"
import { getAllListings, getListingsByBrands, getListingsByCategories, getListingsByConditions } from "../../firebase/listings"
import { useLocation, useNavigate } from "react-router-dom"
import { getAllCategories } from "../../firebase/categories"
import DialogConfirmation from "../../components/dialogs/DialogConfirmation";
import { useAtom } from "jotai"
import { priceRangeAtom, userAtom } from "../../store"
import { brands, conditions } from "../../utils/data"

const MarketplaceCategories = () => {
	const [openDialog, setOpenDialog] = useState(null)
	const [listings, setListings] = useState([])
	const [userData, setUserData] = useAtom(userAtom)
	const [priceRange, setPriceRange] = useAtom(priceRangeAtom)
	const [categories, setCategories] = useState([])
	const [selectedBrands, setSelectedBrands] = useState([])
	const [selectedConditions, setSelectedConditions] = useState([])
	const [sortBy, setSortBy] = useState('price-low')
	const queries = new URLSearchParams(useLocation().search)
	const [loading, setLoading] = useState(true)
	const [itemsToShow, setItemsToShow] = useState(6)
	const selectedCategories = queries.get('categories') ? queries.get('categories').split(',') : []
	const selectedBrandValues = queries.get('brands') ? queries.get('brands').split(',') : []
	const selectedConditionValues = queries.get('conditions') ? queries.get('conditions').split(',') : []
	const searchText = queries.get('search') ? queries.get('search') : ''
	const navigate = useNavigate()

	useEffect(() => {
		if (userData && userData.id) {
			getAllCategories().then((items) => {
				const temp = items.filter((item) => selectedCategories.includes(item.id))
				setCategories(temp)

				const temp1 = brands.filter((item) => selectedBrands.includes(item.value))
				setSelectedBrands(temp1)

				const temp2 = conditions.filter((item) => selectedConditionValues.includes(item.value))
				setSelectedConditions(temp2)
			})

			if (selectedCategories.length > 0) {
				getListingsByCategories(selectedCategories, userData.id).then((items) => {
					let temp = [...items]
					temp = temp.filter(item => item.title.includes(searchText) && item.price >= priceRange.min && item.price <= priceRange.max)

					if (sortBy === 'price-low') {
						temp.sort((a, b) => a.price - b.price)
					}

					if (sortBy === 'price-high') {
						temp.sort((a, b) => b.price - a.price)
					}

					setListings(temp)
					setLoading(false)
				})
			}

			if (selectedBrandValues.length > 0) {
				getListingsByBrands(selectedBrandValues, userData.id).then((items) => {
					let temp = [...items]
					temp = temp.filter(item => item.title.includes(searchText) && item.price >= priceRange.min && item.price <= priceRange.max)

					if (sortBy === 'price-low') {
						temp.sort((a, b) => a.price - b.price)
					}

					if (sortBy === 'price-high') {
						temp.sort((a, b) => b.price - a.price)
					}
					setListings(temp)
					setLoading(false)
				})
			}

			if (selectedConditionValues.length > 0) {
				getListingsByConditions(selectedConditionValues, userData.id).then((items) => {
					let temp = [...items]
					temp = temp.filter(item => item.title.includes(searchText) && item.price >= priceRange.min && item.price <= priceRange.max)

					if (sortBy === 'price-low') {
						temp.sort((a, b) => a.price - b.price)
					}

					if (sortBy === 'price-high') {
						temp.sort((a, b) => b.price - a.price)
					}
					setListings(temp)
					setLoading(false)
				})
			}

			if (selectedCategories.length === 0 && selectedBrandValues.length === 0 && selectedConditionValues.length === 0)
				getAllListings(userData.id).then((items) => {
					let temp = [...items]
					temp = temp.filter(item => item.title.includes(searchText) && item.price >= priceRange.min && item.price <= priceRange.max)

					if (sortBy === 'price-low') {
						temp.sort((a, b) => a.price - b.price)
					}

					if (sortBy === 'price-high') {
						temp.sort((a, b) => b.price - a.price)
					}
					setListings(temp)
					setLoading(false)
				})
		}
	}, [queries, userData])

	const options = [
		{ value: "price-high", label: "Price High" },
		{ value: "price-low", label: "Price Low" },
	]

	const handleDropdownChange = (event) => {
		setSortBy(event.target.value)
	}

	const removeCategory = (categoryId) => {
		let newCategories = []
		if (selectedCategories.includes(categoryId)) {
			newCategories = selectedCategories.filter(id => id !== categoryId)
		} else {
			newCategories = [...selectedCategories, categoryId];
		}
		const categoryQuery = newCategories.join(',');

		navigate(`/marketplace/categories?categories=${categoryQuery}`)
	}

	const removeBrand = (brandValue) => {
		let newBrands = []
		if (selectedBrandValues.includes(brandValue)) {
			newBrands = selectedBrandValues.filter(id => id !== brandValue)
		} else {
			newBrands = [...selectedBrandValues, brandValue];
		}
		const brandQuery = newBrands.join(',');

		navigate(`/marketplace/categories?brands=${brandQuery}`)
	}

	const removeCondition = (conditionValue) => {
		let newConditions = []
		if (selectedConditionValues.includes(conditionValue)) {
			newConditions = selectedConditionValues.filter(id => id !== conditionValue)
		} else {
			newConditions = [...selectedConditionValues, conditionValue];
		}
		const conditionQuery = newConditions.join(',');

		navigate(`/marketplace/categories?conditions=${conditionQuery}`)
	}

	return (
		<div>
			<DialogConfirmation
				open={loading}
				onClose={() => { }}
				type="loading"
				title="Please wait"
				message="We are processing your booking request. Please wait and don’t close this page"
				buttonText="Cancel"
				onButtonClick={() => setOpenDialog(null)}
			/>

			<Header isLogin />
			<DialogMarketplaceFilterCategories
				open={openDialog === "filter"}
				onClose={() => setOpenDialog(null)}
			/>
			<div className="container mx-auto px-5 text-white relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[50%] after:blur-[250px] after:bg-primary after:rounded-full after:absolute after:z-[-1]">
				<div className="flex flex-col lg:flex-row py-24 lg:py-48 gap-16">
					<div className="w-full hidden lg:block lg:max-w-[285px] mt-9">
						<h4 className="text-xl mb-8">Filter By</h4>
						<SidebarFilterMarketplaceCategories />
					</div>
					<div className="w-full">
						<div className="flex flex-col lg:flex-row items-center justify-between">
							{
								categories.length > 0 &&
								<div className="flex items-center gap-2 mt-5 lg:mt-0 lg:gap-4 overflow-x-auto w-full no-scrollbar">
									{
										categories.map((item) =>
											<button
												className="hover:bg-white relative w-full lg:w-fit hover:text-[#141414] justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
												key={item.id}
												onClick={() => removeCategory(item.id)}
											>
												{item.name}
												<span className="cursor-pointer absolute top-2 right-2 hidden lg:block">
													<img src="/assets/icons/icon-x-blue.svg" />
												</span>
											</button>
										)}
								</div>
							}

							{
								selectedBrands.length > 0 &&
								<div className="flex items-center gap-2 mt-5 lg:mt-0 lg:gap-4 overflow-x-auto w-full no-scrollbar">
									{
										selectedBrands.map((item) =>
											<button
												className="hover:bg-white relative w-full lg:w-fit hover:text-[#141414] justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
												key={item.value}
												onClick={() => removeBrand(item.value)}
											>
												{item.label}
												<span className="cursor-pointer absolute top-2 right-2 hidden lg:block">
													<img src="/assets/icons/icon-x-blue.svg" />
												</span>
											</button>
										)}
								</div>
							}

							<div className="flex items-center gap-2 mt-5 lg:mt-0 lg:gap-4 overflow-x-auto w-full no-scrollbar">
								{
									selectedConditions.length > 0 && selectedConditions.map((item) =>
										<button
											className="hover:bg-white relative w-full lg:w-fit hover:text-[#141414] justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
											key={item.value}
											onClick={() => removeCondition(item.value)}
										>
											{item.label}
											<span className="cursor-pointer absolute top-2 right-2 hidden lg:block">
												<img src="/assets/icons/icon-x-blue.svg" />
											</span>
										</button>
									)}
							</div>


							<div className="flex items-center gap-3 w-full lg:max-w-[285px] mt-5 lg:mt-0">
								<button
									className="w-full lg:hidden hover:border-primary hover:text-white text-base flex justify-between items-center p-4 px-6 text-white border-style-decoration"
									onClick={() => setOpenDialog("filter")}
								>
									Filter By
									<img
										src="/assets/icons/icon-arrow-drop-down.svg"
										className={`rotate-180`}
									/>
								</button>
								<Dropdown
									options={options}
									placeholder="Popular"
									onChange={handleDropdownChange}
									className="w-full lg:max-w-[285px]"
								/>
							</div>
						</div>

						{
							listings.length > 0 ?
								<div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mt-8">
									{
										listings.slice(0, itemsToShow).map((item) =>
											<CardItem
												imageSrc={item.pictures[0]}
												title={item.title}
												price={item.price}
												description={item.description}
												cardId={item.id}
												sellerId={item.sellerId}
												sellerName={item.sellerName}
												buttonText="Add to cart"
												sellerUserName={item.sellerUserName}
												isRare
												key={`listing-${item.id}`}
											/>
										)
									}
								</div> :
								<div className="mt-20">
									<h4 className="text-center">No Listings Here</h4>
								</div>
						}

						<div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
							{
								itemsToShow < listings.length &&
								<button
									className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]"
									onClick={() => setItemsToShow(itemsToShow + 6)}
								>
									Load More
								</button>
							}
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default MarketplaceCategories
