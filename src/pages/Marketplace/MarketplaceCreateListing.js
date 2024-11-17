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
import { toast } from "react-toastify"
import { createListing } from "../../firebase/listings"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../../context/authContext"

const MarketplaceCreateListing = () => {
	const [categories, setCategories] = useState([])
	const [title, setTitle] = useState("")
	const [condition, setCondition] = useState("")
	const [price, setPrice] = useState(null)
	const [category, setCategory] = useState("")
	const [description, setDescription] = useState("")
	const [images, setImages] = useState([])
	const { user } = useAuth()
	const naviate = useNavigate()

	useEffect(() => {
		getAllCategories().then((cats) => {
			const catOptions = []

			cats.forEach((cat) => {
				catOptions.push({ value: cat.id, label: cat.name })
			})

			if (cats.length > 0)
				setCategory(cats[0].id)

			setCategories(catOptions)
		})
	}, [])

	const onCreateListing = () => {
		if (title.length === 0) {
			toast.error("Title cannot be empty. Please provide a title.")
			return
		}

		if (price === null || price === 0) {
			toast.error("Price is required and cannot be zero. Please provide a valid price.")
			return
		}

		if (description.length < 10) {
			toast.error("Description is too short. Please provide at least 10 characters.")
			return
		}

		if (images.length === 0) {
			toast.error("No images selected. Please upload at least one image.")
			return
		}

		createListing(user.uid, images, title, condition, price, category, description)
		toast.success("Listing has been created successfully!")
		naviate("/marketplace/categories")
	}

	const addImage = (file) => {
		const files = [...images, file]
		setImages(files)
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
									onChange={(value) => setPrice(value)}
								/>
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
									onChange={(e) => setCategory(e.target.value)}
									className="w-full"
								/>
							</label>
						</div>
						<div className="text-white">
							<label className="w-full">
								<span className="text-base lg:text-xl mb-3 block">
									Description
								</span>
								<TextAreaInput
									placeholder="Add Description"
									textAreaClassName="placeholder:text-white/60 h-[190px]"
									onChange={(value) => setDescription(value)}
								/>
							</label>
						</div>
					</div>

					<div className="w-full flex flex-col gap-6">
						<div>
							<UploadInput
								onFileSelect={(file) => addImage(file)}
								className="custom-upload-class !h-[220px] lg:!h-[420px]"
							/>
							<div className="grid grid-cols-3 gap-4 mt-6">
								<UploadInput
									onFileSelect={(file) => addImage(file)}
									className="custom-upload-class !h-[100px] lg:!h-[170px] border-style-decoration"
									titleClassName="hidden"
									subtitleClassName="hidden"
									placeholderIcon="/assets/icons/icon-add.svg"
								/>
								<UploadInput
									onFileSelect={(file) => addImage(file)}
									className="custom-upload-class !h-[100px] lg:!h-[170px] border-style-decoration"
									titleClassName="hidden"
									subtitleClassName="hidden"
									placeholderIcon="/assets/icons/icon-add.svg"
								/>
								<UploadInput
									onFileSelect={(file) => addImage(file)}
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
							<Button isActive divClassName="w-full" onClick={onCreateListing}>
								Create
							</Button>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	)
}

export default MarketplaceCreateListing
