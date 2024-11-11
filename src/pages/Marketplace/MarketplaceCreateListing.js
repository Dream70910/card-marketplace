import React, { useEffect, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import TextInput from "../../components/commons/TextInput"
import TextAreaInput from "../../components/commons/TextAreaInput"
import TextInputDropdown from "../../components/commons/TextInputDropdown"
import Dropdown from "../../components/commons/Dropdown"
import UploadInput from "../../components/commons/UploadInput"
import Button from "../../components/commons/Button"
import { getAllCategories } from "../../firebase/categories"

const MarketplaceCreateListing = () => {
	const [categories, setCategories] = useState([])
	const [title, setTitle] = useState("")
	const [condition, setCondition] = useState("")
	const [price, setPrice] = useState(null)
	const [category, setCategory] = useState("")
	const [description, setDescription] = useState("")

	const options = [
		{ value: "", label: "Select Category" },
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	]

	const options2 = [
		{ value: "", label: "Select  Sub - Category" },
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	]

	const priceOptions = [
		{ value: "", label: "USD ($)" },
		{ value: "option1", label: "Option 1" },
		{ value: "option2", label: "Option 2" },
		{ value: "option3", label: "Option 3" },
	]

	useEffect(() => {
		getAllCategories().then((cats) => {
			const catOptions = []

			cats.forEach((cat) => {
				catOptions.push({ value: cat.id, label: cat.name })
			})

			setCategories(catOptions)
		})
	}, [])

	const handleDropdownChange = (event) => {
		console.log(event.target.value)
	}

	const handleDropdownChange2 = (event) => {
		console.log(event.target.value)
	}

	const createListing = () => {

	}

	return (
		<div>
			<Header isLogin />
			<div className="container mx-auto px-5  py-32 lg:py-48 relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[80%] after:blur-[250px] after:bg-primary after:rounded-full after:absolute after:z-[1]">
				<h1 className="font-aero uppercase text-white leading-[1.2] text-[32px] lg:text-[48px]">
					create Listing
				</h1>

				<div className="mt-12 flex flex-col lg:flex-row gap-12">
					<div className="space-y-8 w-full">
						<div className="text-white">
							<label className="w-full">
								<span className="text-base lg:text-xl mb-3 block">Title</span>
								<TextInput
									placeholder="Enter your title here"
									inputClassName="placeholder:text-white/60"
									onChange={(value) => setTitle(value)}
								/>
							</label>
						</div>
						<div className="text-white">
							<label className="w-full">
								<span className="text-base lg:text-xl mb-3 block">
									Condition & edition details
								</span>
								<TextInput
									placeholder="Add details"
									inputClassName="placeholder:text-white/60"
									onChange={(value) => setCondition(value)}
								/>
							</label>
						</div>
						<div className="text-white">
							<label className="w-full">
								<span className="text-base lg:text-xl mb-3 block">Price</span>
								<TextInput
									placeholder="Add price"
									inputClassName="placeholder:text-white/60"
									defaultType="number"
								/>
								{/* <TextInputDropdown
                  dropdownOptions={priceOptions}
                  dropdownPlaceholder="USD ($)"
                  inputPlaceholder="Enter product price"
                  inputClassName="placeholder:text-white/60"
                /> */}
							</label>
						</div>
						<div className="text-white">
							<label className="w-full">
								<span className="text-base lg:text-xl mb-3 block">
									Category
								</span>
								<Dropdown
									options={categories}
									placeholder="Select Category"
									onChange={handleDropdownChange}
									className="w-full "
								/>
							</label>
						</div>
						{/* <div className="text-white">
              <label className="w-full">
                <span className="text-base lg:text-xl mb-3 block">
                  Sub - Category
                </span>
                <Dropdown
                  options={options2}
                  placeholder="Select Sub - Category"
                  onChange={handleDropdownChange2}
                  className="w-full "
                />
              </label>
            </div> */}
						<div className="text-white">
							<label className="w-full">
								<span className="text-base lg:text-xl mb-3 block">
									Description
								</span>
								<TextAreaInput
									placeholder="Add Description"
									textAreaClassName="placeholder:text-white/60 h-[190px]"
								/>
							</label>
						</div>
					</div>

					<div className="w-full flex flex-col gap-6">
						<div>
							<UploadInput
								onFileSelect={(file) => console.log("Selected file:", file)}
								className="custom-upload-class !h-[220px] lg:!h-[420px]"
							/>
							<div className="grid grid-cols-3 gap-4 mt-6">
								<UploadInput
									onFileSelect={(file) => console.log("Selected file:", file)}
									className="custom-upload-class !h-[100px] lg:!h-[170px] border-style-decoration"
									titleClassName="hidden"
									subtitleClassName="hidden"
									placeholderIcon="/assets/icons/icon-add.svg"
								/>
								<UploadInput
									onFileSelect={(file) => console.log("Selected file:", file)}
									className="custom-upload-class !h-[100px] lg:!h-[170px] border-style-decoration"
									titleClassName="hidden"
									subtitleClassName="hidden"
									placeholderIcon="/assets/icons/icon-add.svg"
								/>
								<UploadInput
									onFileSelect={(file) => console.log("Selected file:", file)}
									className="custom-upload-class !h-[100px] lg:!h-[170px] border-style-decoration"
									titleClassName="hidden"
									subtitleClassName="hidden"
									placeholderIcon="/assets/icons/icon-add.svg"
								/>
							</div>
						</div>

						<div className="flex mt-auto flex-col lg:flex-row gap-4">
							<button className="hover:bg-white relative w-full hover:text-[#141414] justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap">
								Preview
							</button>
							<Button isActive divClassName="w-full" onClick={createListing}>
								Create
							</Button>
						</div>
						{/*  */}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default MarketplaceCreateListing
