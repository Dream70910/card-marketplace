import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import SidebarFilterMarketplaceCategories from "../../components/sidebars/SidebarFilterMarketplaceCategories"
import Dropdown from "../../components/commons/Dropdown"
import CardItem from "../../components/cards/CardItem"
import DialogMarketplaceFilterCategories from "../../components/dialogs/DialogMarketplaceFilterCategories"
import { getAllListings, getListingsByCategories } from "../../firebase/listings"
import { useLocation, useNavigate } from "react-router-dom"
import { getAllCategories } from "../../firebase/categories"
import DialogConfirmation from "../../components/dialogs/DialogConfirmation";

const MarketplaceCategories = () => {
	const [openDialog, setOpenDialog] = useState(null)
	const [listings, setListings] = useState([])
	const [categories, setCategories] = useState([])
	const queries = new URLSearchParams(useLocation().search)
	const [loading, setLoading] = useState(true)
	const selectedCategories = queries.get('categories') ? queries.get('categories').split(',') : []
	const navigate = useNavigate()

	useEffect(() => {
		getAllCategories().then((items) => {
			const temp = items.filter((item) => selectedCategories.includes(item.id))
			setCategories(temp)
		})

		if (selectedCategories.length > 0) {
			getListingsByCategories(selectedCategories).then((items) => {
				setListings(items)
			})
		} else {
			getAllListings().then((items) => {
				setListings(items)
				setLoading(false)
			})
		}
	}, [queries])

	const options = [
		{ value: "popular", label: "Popular" },
		{ value: "latest", label: "Latest" },
		{ value: "price-high", label: "Price High" },
		{ value: "price-low", label: "Price Low" },
	]

	const handleDropdownChange = (event) => {
		console.log(event.target.value)
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

						<div className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6 mt-8">
							{
								listings.map((item) =>
									<CardItem
										imageSrc={item.images[0]}
										title={item.title}
										price={item.price}
										description={item.description}
										cardId={item.id}
										buttonText="Buy Now"
										isRare
									/>
								)
							}
						</div>

						<div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
							<button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
								Load More
							</button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default MarketplaceCategories
