import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useQuery } from "react-router-dom"
import { getAllCategories } from "../../firebase/categories"
import { brands, conditions } from "../../utils/data"
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"
import { useAtom } from "jotai"
import { priceRangeAtom, yearRangeAtom } from "../../store"

const SidebarFilterMarketplaceCategories = ({ className }) => {
	// State to control open/close for each category
	const [openSections, setOpenSections] = useState({
		categories: false,
		gradingCompanies: false,
		grades: false,
		set: false,
		variations: false,
		price: false,
	})

	const [priceValue, setPriceValue] = useAtom(priceRangeAtom)
	const [yearValue, setYearValue] = useAtom(yearRangeAtom)
	const [categories, setCategories] = useState([])
	const queries = new URLSearchParams(useLocation().search)
	const selectedCategories = queries.get('categories') ? queries.get('categories').split(',') : []
	const selectedBrands = queries.get('brands') ? queries.get('brands').split(',') : []
	const selectedConditions = queries.get('conditions') ? queries.get('conditions').split(',') : []
	const navigate = useNavigate()

	useEffect(() => {
		getAllCategories().then((items) => {
			setCategories(items)
		})
	}, [])

	// Toggle function for each section
	const toggleSection = (section) => {
		setOpenSections((prev) => ({
			...prev,
			[section]: !prev[section],
		}))
	}

	const toggleCategory = (categoryId) => {
		let newCategories = []
		if (selectedCategories.includes(categoryId)) {
			newCategories = selectedCategories.filter(id => id !== categoryId)
		} else {
			newCategories = [...selectedCategories, categoryId]
		}
		const categoryQuery = newCategories.join(',')

		navigate(`/marketplace/categories?categories=${categoryQuery}`)
	}

	const toggleBrand = (brandValue) => {
		let newBrands = []
		if (selectedBrands.includes(brandValue)) {
			newBrands = selectedBrands.filter(id => id !== brandValue)
		} else {
			newBrands = [...selectedBrands, brandValue]
		}
		const categoryQuery = newBrands.join(',')

		navigate(`/marketplace/categories?brands=${categoryQuery}`)
	}

	const toggleCondition = (conditionValue) => {
		let newConditions = []
		if (selectedConditions.includes(conditionValue)) {
			newConditions = selectedConditions.filter(id => id !== conditionValue)
		} else {
			newConditions = [...selectedConditions, conditionValue]
		}
		const conditionQuery = newConditions.join(',')

		navigate(`/marketplace/categories?conditions=${conditionQuery}`)
	}

	return (
		<div className={`w-full space-y-6 ${className}`}>
			{/* Categories Section */}
			<div
				className={`border-style-decoration bg-white/5 backdrop-blur-sm p-5 w-full`}
			>
				<div>
					<div
						className="w-full flex justify-between items-center cursor-pointer"
						onClick={() => toggleSection("categories")}
					>
						<span>Categories</span>
						<img
							src="/assets/icons/icon-arrow-drop-down.svg"
							className={`${!openSections.categories ? "rotate-180" : ""}`}
						/>
					</div>
					{openSections.categories && (
						<div className="flex flex-col items-center gap-2 mt-5 lg:gap-4">
							{
								categories.map((cat) =>
									<button
										className={`hover:border-primary w-full hover:text-white text-[11px] lg:text-base flex items-center p-3 px-4 lg:p-4 lg:px-6   border-style-decoration ${!selectedCategories.includes(cat.id) ? "text-white/40" : ""}`}
										onClick={() => { toggleCategory(cat.id) }}
										key={cat.id}
									>
										{cat.name}
									</button>
								)
							}
						</div>
					)}
				</div>
			</div>

			<div
				className={`border-style-decoration bg-white/5 backdrop-blur-sm p-5 w-full`}
			>
				<div>
					<div
						className="w-full flex justify-between items-center cursor-pointer"
						onClick={() => toggleSection("brands")}
					>
						<span>Brands</span>
						<img
							src="/assets/icons/icon-arrow-drop-down.svg"
							className={`${!openSections.brands ? "rotate-180" : ""}`}
						/>
					</div>
					{
						openSections.brands && (
							<div className="flex flex-col items-center gap-2 mt-5 lg:gap-4">
								{
									brands.map((brand) =>
										<button
											className={`hover:border-primary w-full hover:text-white text-[11px] lg:text-base flex items-center p-3 px-4 lg:p-4 lg:px-6   border-style-decoration ${!selectedBrands.includes(brand.value) ? "text-white/40" : ""}`}
											onClick={() => { toggleBrand(brand.value) }}
											key={`sidebar-brand-${brand.value}`}
										>
											{brand.label}
										</button>
									)
								}
							</div>
						)}
				</div>
			</div>



			<div
				className={`border-style-decoration bg-white/5 backdrop-blur-sm p-5 w-full`}
			>
				<div>
					<div
						className="w-full flex justify-between items-center cursor-pointer"
						onClick={() => toggleSection("conditions")}
					>
						<span>Conditions</span>
						<img
							src="/assets/icons/icon-arrow-drop-down.svg"
							className={`${!openSections.conditions ? "rotate-180" : ""}`}
						/>
					</div>
					{openSections.conditions && (
						<div className="flex flex-col items-center gap-2 mt-5 lg:gap-4">
							{
								conditions.map((condition) =>
									<button
										className={`hover:border-primary w-full hover:text-white text-[11px] lg:text-base flex items-center p-3 px-4 lg:p-4 lg:px-6   border-style-decoration ${!selectedConditions.includes(condition.value) ? "text-white/40" : ""}`}
										onClick={() => { toggleCondition(condition.value) }}
										key={`sidebar-condition-${condition.value}`}
									>
										{condition.label}
									</button>
								)
							}
						</div>
					)}
				</div>
			</div>

			<div
				className={`border-style-decoration bg-white/5 backdrop-blur-sm p-5 w-full`}
			>
				<div>
					<div
						className="w-full flex justify-between items-center cursor-pointer"
						onClick={() => toggleSection("year")}
					>
						<span>Year</span>
					</div>

					<div className="mt-8 mb-4 mx-2">
						<InputRange
							maxValue={2024}
							minValue={2010}
							step={1}
							value={yearValue}
							onChange={(v) => setYearValue(v)}
						/>
					</div>
				</div>
			</div>

			<div
				className={`border-style-decoration bg-white/5 backdrop-blur-sm p-5 w-full`}
			>
				<div>
					<div
						className="w-full flex justify-between items-center cursor-pointer"
						onClick={() => toggleSection("price")}
					>
						<span>Price</span>
						{/* <img
				src="/assets/icons/icon-arrow-drop-down.svg"
				className={`${!openSections.price ? "rotate-180" : ""}`}
			/> */}
					</div>

					<div className="mt-8 mb-4 mx-2">
						<InputRange
							maxValue={2000}
							minValue={0}
							formatLabel={v => `$ ${v}`}
							step={10}
							value={priceValue}
							onChange={(v) => setPriceValue(v)}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SidebarFilterMarketplaceCategories
