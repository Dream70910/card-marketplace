import React, { useEffect, useState } from "react"
import { useLocation, useNavigate, useQuery } from "react-router-dom"
import { getAllCategories } from "../../firebase/categories"
import { brands, conditions } from "../../utils/data"
import InputRange from 'react-input-range'
import "react-input-range/lib/css/index.css"
import { useAtom } from "jotai"
import { priceRangeAtom, yearRangeAtom } from "../../store"

const CheckedIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<mask id="mask0_651_77" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
			<rect width="20" height="20" fill="#D9D9D9" />
		</mask>
		<g mask="url(#mask0_651_77)">
			<path d="M8.83333 13.5L14.7083 7.625L13.5417 6.45833L8.83333 11.1667L6.45833 8.79167L5.29167 9.95833L8.83333 13.5ZM4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H15.8333C16.2917 2.5 16.684 2.66319 17.0104 2.98958C17.3368 3.31597 17.5 3.70833 17.5 4.16667V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667Z" fill="#B1CCFF" />
		</g>
	</svg>
)

const UnCheckedIcon = () => (
	<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
		<g opacity="0.3">
			<mask id="mask0_651_92" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="20" height="20">
				<rect width="20" height="20" fill="#D9D9D9" />
			</mask>
			<g mask="url(#mask0_651_92)">
				<path d="M4.42345 17.0837C4.00248 17.0837 3.64616 16.9378 3.35449 16.6462C3.06283 16.3545 2.91699 15.9982 2.91699 15.5772V4.42345C2.91699 4.00248 3.06283 3.64616 3.35449 3.35449C3.64616 3.06283 4.00248 2.91699 4.42345 2.91699H15.5772C15.9982 2.91699 16.3545 3.06283 16.6462 3.35449C16.9378 3.64616 17.0837 4.00248 17.0837 4.42345V15.5772C17.0837 15.9982 16.9378 16.3545 16.6462 16.6462C16.3545 16.9378 15.9982 17.0837 15.5772 17.0837H4.42345ZM4.42345 15.8337H15.5772C15.6414 15.8337 15.7001 15.8069 15.7535 15.7535C15.8069 15.7001 15.8337 15.6414 15.8337 15.5772V4.42345C15.8337 4.35928 15.8069 4.30053 15.7535 4.2472C15.7001 4.19373 15.6414 4.16699 15.5772 4.16699H4.42345C4.35928 4.16699 4.30053 4.19373 4.2472 4.2472C4.19373 4.30053 4.16699 4.35928 4.16699 4.42345V15.5772C4.16699 15.6414 4.19373 15.7001 4.2472 15.7535C4.30053 15.8069 4.35928 15.8337 4.42345 15.8337Z" fill="white" />
			</g>
		</g>
	</svg>
)

const SidebarFilterMarketplaceCategories = ({ className, show }) => {
	// State to control open/close for each category
	const [openSections, setOpenSections] = useState({
		categories: true,
		brands: true,
		conditions: true,
		year: true,
		price: true,
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

			<div
				className={`w-full`}
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
						<div className="flex flex-col items-center gap-5 mt-5">
							{
								categories.map((cat) =>
									<button
										className={`hover:border-primary w-full hover:text-white text-[11px] lg:text-base flex items-center`}
										onClick={() => { toggleCategory(cat.id) }}
										key={cat.id}
									>
										{
											selectedCategories.includes(cat.id) ?
												<CheckedIcon />
												:
												<UnCheckedIcon />
										}
										<span className="ml-2">
											{cat.name}
										</span>
									</button>
								)
							}
						</div>
					)}
				</div>
			</div>

			<hr className="gradient-border my-8" />

			<div
				className={`w-full`}
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
											className={`hover:border-primary w-full hover:text-white text-[11px] lg:text-base flex items-center`}
											onClick={() => { toggleBrand(brand.value) }}
											key={`sidebar-brand-${brand.value}`}
										>
											{
												selectedBrands.includes(brand.value) ?
													<CheckedIcon />
													:
													<UnCheckedIcon />
											}
											<span className="ml-2">
												{brand.label}
											</span>
										</button>
									)
								}
							</div>
						)}
				</div>
			</div>

			<hr className="gradient-border my-8" />

			<div
				className={`w-full`}
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
										className={`hover:border-primary w-full hover:text-white text-[11px] lg:text-base flex items-center`}
										onClick={() => { toggleCondition(condition.value) }}
										key={`sidebar-condition-${condition.value}`}
									>
										{
											selectedConditions.includes(condition.value) ?
												<CheckedIcon />
												:
												<UnCheckedIcon />
										}
										<span className="ml-2">
											{condition.label}
										</span>
									</button>
								)
							}
						</div>
					)}
				</div>
			</div>

			<hr className="gradient-border my-8" />

			<div
				className={`w-full`}
			>
				<div>
					<div
						className="w-full flex justify-between items-center cursor-pointer"
						onClick={() => toggleSection("year")}
					>
						<span>Year</span>
						<img
							src="/assets/icons/icon-arrow-drop-down.svg"
							className={`${!openSections.year ? "rotate-180" : ""}`}
						/>
					</div>

					{openSections.year &&
						<>
							<div className="mt-7 mb-4">
								<div className="mx-2">
									<InputRange
										maxValue={2024}
										minValue={2010}
										step={1}
										formatLabel={v => ``}
										value={yearValue}
										onChange={(v) => setYearValue(v)}
									/>
								</div>

								<div className="grid grid-cols-2 gap-5 justify-between w-full mt-6">
									<div className="w-full">
										<p className="text-white text-xs">FROM</p>
										<p className="text-xs mt-4 mb-4 text-white/60">{yearValue.min}</p>
										<hr className="gradient-border w-full" />
									</div>

									<div className="w-full">
										<p className="text-white text-xs">TO</p>
										<p className="text-xs mt-4 mb-4 text-white/60">{yearValue.max}</p>
										<hr className="gradient-border w-full" />
									</div>
								</div>
							</div>
						</>
					}
				</div>
			</div>

			{
				!openSections.year &&
				<hr className="gradient-border my-8" />
			}

			<div
				className={`w-full !mt-8`}
			>
				<div>
					<div
						className="w-full flex justify-between items-center cursor-pointer"
						onClick={() => toggleSection("price")}
					>
						<span>Price</span>
						<img
							src="/assets/icons/icon-arrow-drop-down.svg"
							className={`${!openSections.price ? "rotate-180" : ""}`}
						/>
					</div>

					{openSections.price &&
						<>
							<div className="mt-7 mb-4">
								<div className="mx-2">
									<InputRange
										maxValue={10000}
										minValue={0}
										formatLabel={v => ``}
										step={10}
										value={priceValue}
										onChange={(v) => setPriceValue(v)}
									/>
								</div>

								<div className="grid grid-cols-2 gap-5 justify-between w-full mt-6">
									<div className="w-full">
										<p className="text-white text-xs">FROM</p>
										<p className="text-xs mt-4 mb-4 text-white/60">$ {priceValue.min}</p>
										<hr className="gradient-border w-full" />
									</div>

									<div className="w-full">
										<p className="text-white text-xs">TO</p>
										<p className="text-xs mt-4 mb-4 text-white/60">$ {priceValue.max}</p>
										<hr className="gradient-border w-full" />
									</div>
								</div>
							</div>
						</>
					}
				</div>
			</div>
		</div>
	)
}

export default SidebarFilterMarketplaceCategories
