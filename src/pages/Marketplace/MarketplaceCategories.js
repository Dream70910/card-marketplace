import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import SidebarFilterMarketplaceCategories from "../../components/sidebars/SidebarFilterMarketplaceCategories"
import Dropdown from "../../components/commons/Dropdown"
import CardItem from "../../components/cards/CardItem"
import DialogMarketplaceFilterCategories from "../../components/dialogs/DialogMarketplaceFilterCategories"
import { getAllListings, getListingsByBrands, getListingsByCategories, getListingsByConditions, getListingsByRarities } from "../../firebase/listings"
import { useLocation, useNavigate } from "react-router-dom"
import { getAllCategories } from "../../firebase/categories"
import DialogConfirmation from "../../components/dialogs/DialogConfirmation";
import { useAtom } from "jotai"
import { priceRangeAtom, userAtom, yearRangeAtom } from "../../store"
import { brands, conditions } from "../../utils/data"
import Button from "../../components/commons/Button"
import HeroSection from "../../sections/marketplace/HeroSection"

const MarketplaceCategories = () => {
	const [openDialog, setOpenDialog] = useState(null)
	const [listings, setListings] = useState([])
	const [userData, setUserData] = useAtom(userAtom)
	const [priceRange, setPriceRange] = useAtom(priceRangeAtom)
	const [yearRange,] = useAtom(yearRangeAtom)
	const [categories, setCategories] = useState([])
	const [selectedBrands, setSelectedBrands] = useState([])
	const [selectedConditions, setSelectedConditions] = useState([])
	const [searchInputText, setSearchText] = useState('')
	const [showSidebarFilter, setShowSidebarFilter] = useState(false)
	const [sortBy, setSortBy] = useState('price-low')
	const queries = new URLSearchParams(useLocation().search)
	const [loading, setLoading] = useState(true)
	const [itemsToShow, setItemsToShow] = useState(6)
	const searchText = queries.get('search') ? queries.get('search') : ''

	const navigate = useNavigate()

	useEffect(() => {
		const selectedCategories = queries.get('categories') ? queries.get('categories').split(',') : []
		const selectedRarities = queries.get('rarities') ? queries.get('rarities').split(',') : []
		const selectedBrandValues = queries.get('brands') ? queries.get('brands').split(',') : []
		const selectedConditionValues = queries.get('conditions') ? queries.get('conditions').split(',') : []
		const userId = userData && userData.id ? userData.id : null

		// if (userData && userData.id) {
		getAllCategories().then((items) => {
			const temp = items.filter((item) => selectedCategories.includes(item.id))
			setCategories(temp)

			// const temp1 = brands.filter((item) => selectedBrands.includes(item.value))
			// setSelectedBrands(temp1)

			// const temp2 = conditions.filter((item) => selectedConditionValues.includes(item.value))
			// setSelectedConditions(temp2)
		})

		if (selectedCategories.length > 0) {
			getListingsByCategories(selectedCategories, userId).then((items) => {
				updateListings(items)
			})
		}

		if (selectedRarities.length > 0) {
			getListingsByRarities(selectedRarities, userId).then((items) => {
				updateListings(items)
			})
		}

		if (selectedBrandValues.length > 0) {
			getListingsByBrands(selectedBrandValues, userId).then((items) => {
				updateListings(items)
			})
		}

		if (selectedConditionValues.length > 0) {
			getListingsByConditions(selectedConditionValues, userId).then((items) => {
				updateListings(items)
			})
		}

		if (selectedCategories.length === 0 && selectedBrandValues.length === 0 && selectedConditionValues.length === 0 && selectedRarities.length === 0)
			getAllListings(userId).then((items) => {
				updateListings(items)
			})
	}, [queries, userData])


	const onChangeSearch = (e) => {
		if (e.key === 'Enter') {
			navigate(`/marketplace/categories?search=${searchInputText}`)
		}
	}

	const getYear = (timestamp) => {
		let date
		if (timestamp) {
			date = new Date(timestamp.seconds * 1000)
		} else {
			date = new Date()
		}
		return date.getFullYear()
	}

	const updateListings = (items) => {
		let temp = [...items]
		temp = temp.filter(item => item.title.includes(searchText) && item.price >= priceRange.min
			&& item.price <= priceRange.max && getYear(item.created_at) >= yearRange.min && getYear(item.created_at) <= yearRange.max)

		if (sortBy === 'price-low') {
			temp.sort((a, b) => a.price - b.price)
		}

		if (sortBy === 'price-high') {
			temp.sort((a, b) => b.price - a.price)
		}

		setListings(temp)
		setLoading(false)
	}

	const options = [
		{ value: "price-low", label: "Price Low" },
		{ value: "price-high", label: "Price High" },
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

			<HeroSection />

			<div className="container mx-auto pt-36 px-5 lg:pt-12 text-white relative">
				{/* <div className="flex justify-between max-h-[360px] border-[#ffffff22] border-[1px]">
					<div className="p-16">

					</div>

					<div className="h-full -my-[2px]">
						<img src="/assets/decorations/market_bg.png" className="h-full" width={480} height={360} />
					</div>
				</div> */}

				<div className="flex flex-col lg:flex-row pb-24 lg:pb-48 lg:gap-16">
					<div className="w-full hidden lg:block lg:max-w-[285px] mt-9">
						{/* <div className="relative mb-8">
							<input
								className="px-4 py-4 bg-transparent w-full text-primary placeholder-primary"
								placeholder="SEARCH"
								onChange={(e) => setSearchText(e.currentTarget.value)}
								onKeyDown={onChangeSearch}
							>
							</input>

							<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[50%] -translate-y-1/2 right-4">
								<g clipPath="url(#clip0_772_1360)">
									<path d="M11.0109 19.2326C15.3457 19.2326 18.8598 15.7186 18.8598 11.3838C18.8598 7.04902 15.3457 3.53497 11.0109 3.53497C6.67615 3.53497 3.16211 7.04902 3.16211 11.3838C3.16211 15.7186 6.67615 19.2326 11.0109 19.2326Z" stroke="white" strokeWidth="2.09302" strokeLinecap="round" strokeLinejoin="round" />
									<path d="M16.5615 16.9337L21.9998 22.3719" stroke="white" strokeWidth="2.09302" strokeLinecap="round" strokeLinejoin="round" />
								</g>
								<defs>
									<clipPath id="clip0_772_1360">
										<rect width="25.1163" height="25.1163" fill="white" transform="translate(0.0224609 0.395386)" />
									</clipPath>
								</defs>
							</svg>
						</div> */}

						<h4 className="flex items-center text-xl mb-8">
							<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
								<mask id="mask0_651_157" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="18" height="18">
									<rect width="18" height="18" fill="#D9D9D9" />
								</mask>
								<g mask="url(#mask0_651_157)">
									<path d="M8.25 15.75V11.25H9.75V12.75H15.75V14.25H9.75V15.75H8.25ZM2.25 14.25V12.75H6.75V14.25H2.25ZM5.25 11.25V9.75H2.25V8.25H5.25V6.75H6.75V11.25H5.25ZM8.25 9.75V8.25H15.75V9.75H8.25ZM11.25 6.75V2.25H12.75V3.75H15.75V5.25H12.75V6.75H11.25ZM2.25 5.25V3.75H9.75V5.25H2.25Z" fill="white" />
								</g>
							</svg>

							<div className="text-lg">Filter By</div>
						</h4>

						<hr className="gradient-border mb-6" />

						<SidebarFilterMarketplaceCategories />
					</div>

					<div className="w-full block lg:hidden lg:max-w-[285px]">
						<Button
							divClassName={`text-sm lg:text-base flex mb-6 relative`}
							buttonClassName="justify-between"
							onClick={() => setShowSidebarFilter(!showSidebarFilter)}
						>
							Filter by

							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[50%] right-[1rem] -translate-y-1/2">
								<mask id="mask0_344_655" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
									<rect width="20" height="20" fill="#D9D9D9" />
								</mask>
								<g mask="url(#mask0_344_655)">
									<path d="M10.0007 12.4998L5.83398 8.33313H14.1673L10.0007 12.4998Z" fill="white" />
								</g>
							</svg>
						</Button>

						{
							showSidebarFilter &&
							<>
								<div className="rounded-[4px] relative border-[rgba(255,255,255,.4)] border-[1px] mb-8">
									<input
										className="px-4 py-4 bg-transparent w-full text-primary placeholder-primary text-sm"
										placeholder="SEARCH"
										onChange={(e) => setSearchText(e.currentTarget.value)}
										onKeyDown={onChangeSearch}
									>
									</input>

									<svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-[50%] -translate-y-1/2 right-4">
										<g clipPath="url(#clip0_772_1360)">
											<path d="M11.0109 19.2326C15.3457 19.2326 18.8598 15.7186 18.8598 11.3838C18.8598 7.04902 15.3457 3.53497 11.0109 3.53497C6.67615 3.53497 3.16211 7.04902 3.16211 11.3838C3.16211 15.7186 6.67615 19.2326 11.0109 19.2326Z" stroke="white" strokeWidth="2.09302" strokeLinecap="round" strokeLinejoin="round" />
											<path d="M16.5615 16.9337L21.9998 22.3719" stroke="white" strokeWidth="2.09302" strokeLinecap="round" strokeLinejoin="round" />
										</g>
										<defs>
											<clipPath id="clip0_772_1360">
												<rect width="25.1163" height="25.1163" fill="white" transform="translate(0.0224609 0.395386)" />
											</clipPath>
										</defs>
									</svg>
								</div>

								<SidebarFilterMarketplaceCategories show={showSidebarFilter} />
							</>
						}
					</div>

					<div className="w-full">
						{/* <div className="flex flex-col lg:flex-row items-center justify-between">
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
						</div> */}

						{
							listings.length > 0 ?
								<div className="grid grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6 mt-4z">
									{
										listings.slice(0, itemsToShow).map((item) =>
											<CardItem
												imageSrc={item.pictures[0]}
												title={item.title}
												price={item.price}
												description={item.description}
												cardId={item.id}
												rarity={item.rarity}
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
		</div >
	)
}

export default MarketplaceCategories
