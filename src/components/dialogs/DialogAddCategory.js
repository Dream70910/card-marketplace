"use client"

import { useState } from "react"
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	DialogTitle,
} from "@headlessui/react"
import TextAreaInput from "../commons/TextAreaInput"
import TextInput from "../commons/TextInput"
import UploadInput from "../commons/UploadInput"
import { checkCategoryExists, createCategory } from "../../firebase/categories"
import { toast } from "react-toastify"

export default function DialogAddCategory({ open, onClose }) {
	const [name, setName] = useState(null)
	const [description, setDescription] = useState(null)
	const [image, setImage] = useState(null)
	const [editTimes, setEditTimes] = useState(0)

	const onCreateCategory = async () => {
		if (name === null || (name !== null && name.length === 0)) {
			return
		}

		if (description === null || (description !== null && description.length === 0)) {
			toast.error("Description is too short. Please provide at least 10 characters.")
			return
		}

		const isCategoryExisting = await checkCategoryExists(name)
		if (isCategoryExisting) {
			toast.error("Category already exists. Please choose a different name.")
			return
		}

		createCategory(image, name, description)
		toast.success("Category has been created successfully!")
	}

	const onEditImage = () => {
		setEditTimes(editTimes + 1)
	}

	return (
		<Dialog open={open} onClose={onClose} className="relative z-10">
			<DialogBackdrop
				transition
				className="fixed inset-0 bg-[#000] backdrop-blur-sm bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
			/>

			<div className="fixed inset-0 z-10 w-screen overflow-y-auto">
				<div className="flex min-h-full items-center justify-center p-4 sm:p-0">
					<DialogPanel
						transition
						className="relative transform overflow-hidden product-ask-section bg-[#141414] backdrop-blur-sm shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in w-full max-w-[604px]"
					>
						<div className="w-full relative">
							<button
								className="absolute top-2 right-2 cursor-pointer z-[1]"
								onClick={onClose}
							>
								<img
									src="/assets/icons/icon-close.svg"
									className="invert cursor-pointer"
								/>
							</button>
							<div className="p-5 w-full ">
								<div className="flex items-end gap-6">
									{/* <img
                    src="/assets/images/image_pokemon.svg"
                    className="max-w-[130px] lg:max-w-[unset]"
                  /> */}

									<UploadInput
										onFileSelect={(value) => setImage(value)}
										className="custom-upload-class !h-[140px] !w-[140px] lg:!h-[170px] lg:!w-[170px] "
										titleClassName="hidden"
										subtitleClassName="hidden"
										iconClassName="max-w-[28px] lg:max-w-[28px]"
										editTimes={editTimes}
									/>

									<div>
										<div>
											<h4 className="text-base lg:text-[24px] font-aero text-white uppercase">
												Upload Photo
											</h4>
											<span className="text-white/60 block leading-[1.4] text-[10px] mt-1">
												At least 256 x 256, PNG or JPG file <br /> format. Max
												20 MB
											</span>
										</div>
										<button
											className="p-2 mt-4 text-white px-6 border-style-decoration hover:bg-white hover:text-[#141414]"
											onClick={onEditImage}
										>
											Edit Image
										</button>
									</div>
								</div>

								<div className="mt-6 flex flex-col gap-8">
									<label className="w-full  text-white">
										<span className="w-full flex items-center justify-between  mb-3 ">
											<span className="text-base lg:text-xl block">
												Category Name
											</span>
											<span className="border-style-decoration p-2 px-2.5">
												<img src="/assets/icons/icon-pen-border.svg" />
											</span>
										</span>
										<TextInput
											placeholder="Pokemon"
											inputClassName="placeholder:text-white/60"
											onChange={(value) => setName(value)}
										/>
									</label>
									<label className="w-full  text-white">
										<span className="w-full flex items-center justify-between  mb-3 ">
											<span className="text-base lg:text-xl block">
												Description
											</span>
											<span className="border-style-decoration p-2 px-2.5">
												<img src="/assets/icons/icon-pen-border.svg" />
											</span>
										</span>
										<TextAreaInput
											placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco."
											textAreaClassName="placeholder:text-white/60 h-[110px]"
											onChange={(value) => setDescription(value)}
										/>
									</label>

									<button
										className="p-2 text-white px-6 border-style-decoration hover:bg-white hover:text-[#141414]"
										onClick={onCreateCategory}
									>
										Submit
									</button>
								</div>
								{/*  */}
							</div>
						</div>
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	)
}
