import React, { useEffect, useState } from "react"
import TextInput from "../../components/commons/TextInput"
import Button from "../../components/commons/Button"
import TextAreaInput from "../../components/commons/TextAreaInput"
import DialogEditCategory from "../../components/dialogs/DialogEditCategory"
import DialogAddCategory from "../../components/dialogs/DialogAddCategory"
import { getAllCategories, updateCategory } from "../../firebase/categories"

const CategoriesSection = () => {
    const [openDialog, setOpenDialog] = useState(null)
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [activeCategories, setActiveCategories] = useState([])

    useEffect(() => {
        updateCategories()
    }, [])

    const updateCategories = () => {
        getAllCategories(["active", "pending"]).then((cats) => {
            setCategories(cats)
        })

        getAllCategories(["active"]).then((cats) => {
            setActiveCategories(cats)
        })
    }

    const closeDialog = () => {
        setOpenDialog(null)
        updateCategories()
    }

    const makeCategoryActive = (cat) => {
        updateCategory(cat.id, { ...cat, state: "active" })
        updateCategories()
    }

    const makeCategoryPending = (cat) => {
        updateCategory(cat.id, { ...cat, state: "pending" })
        updateCategories()
    }

    return (
        <>
            <DialogEditCategory
                open={openDialog === "edit-category"}
                onClose={closeDialog}
            />
            <DialogAddCategory
                open={openDialog === "add-category"}
                onClose={closeDialog}
            />

            <div className="product-ask-section w-full mt-14">
                <h4 className="uppercase font-aero w-full bg-white/5 backdrop-blur-sm p-5 px-10 text-white text-base lg:text-xl">
                    MANAGE CATEGORIES
                </h4>
                <div>
                    <div className="p-5 pb-8 border-b-2 border-b-white/20">
                        <h4 className="uppercase font-aero w-full text-white text-base lg:text-xl mt-4 my-8">
                            live CATEGORIES
                        </h4>

                        <div className="flex flex-wrap gap-5 ">
                            {
                                activeCategories.map((cat) =>
                                    <button className="border-style-decoration flex items-center justify-between text-white p-5 py-3 w-full lg:max-w-[200px]">
                                        {cat.name}{" "}
                                        <button className="p-2 bg-primary-gradient" onClick={() => makeCategoryPending(cat)}>
                                            <img src="/assets/icons/icon-close.svg" />
                                        </button>
                                    </button>
                                )}
                            {/* <button className="border-style-decoration flex items-center justify-between text-white p-5 py-3 w-full lg:max-w-[200px]">
                                Formula 1{" "}
                                <button className="p-2 bg-primary-gradient">
                                    <img src="/assets/icons/icon-close.svg" />
                                </button>
                            </button>
                            <button className="border-style-decoration flex items-center justify-between text-white p-5 py-3 w-full lg:max-w-[200px]">
                                Naruto{" "}
                                <button className="p-2 bg-primary-gradient">
                                    <img src="/assets/icons/icon-close.svg" />
                                </button>
                            </button>
                            <button className="border-style-decoration flex items-center justify-between text-white p-5 py-3 w-full lg:max-w-[200px]">
                                One Piece{" "}
                                <button className="p-2 bg-primary-gradient">
                                    <img src="/assets/icons/icon-close.svg" />
                                </button>
                            </button>
                            <button className="border-style-decoration flex items-center justify-between text-white p-5 py-3 w-full lg:max-w-[200px]">
                                Football{" "}
                                <button className="p-2 bg-primary-gradient">
                                    <img src="/assets/icons/icon-close.svg" />
                                </button>
                            </button>
                            <button className="border-style-decoration flex items-center justify-between text-white p-5 py-3 w-full lg:max-w-[200px]">
                                AOT{" "}
                                <button className="p-2 bg-primary-gradient">
                                    <img src="/assets/icons/icon-close.svg" />
                                </button>
                            </button>
                            <button className="border-style-decoration flex items-center justify-between text-white p-5 py-3 w-full lg:max-w-[200px]">
                                Pokemon{" "}
                                <button className="p-2 bg-primary-gradient">
                                    <img src="/assets/icons/icon-close.svg" />
                                </button>
                            </button>
                            <button className="border-style-decoration flex items-center justify-between text-white p-5 py-3 w-full lg:max-w-[200px]">
                                WWE{" "}
                                <button className="p-2 bg-primary-gradient">
                                    <img src="/assets/icons/icon-close.svg" />
                                </button>
                            </button> */}
                        </div>

                        <Button isActive divClassName="!mt-5 lg:max-w-[580px]">
                            Manage Categories
                        </Button>
                    </div>
                </div>
            </div>

            <div className="p-5 pb-8">
                <h4 className="uppercase font-aero w-full text-white text-base lg:text-xl mt-4 my-8">
                    ALL CATEGORIES
                </h4>

                <div className="flex items-center gap-6">
                    <div className="w-full">
                        <div className="space-y-4">
                            {
                                categories.map((cat) => (
                                    <button
                                        className="border-style-decoration hover hover:!border-primary hover:after:!border-l-primary hover:after:!border-t-primary hover:before:!border-b-primary hover:!border-r-primary flex items-center justify-between text-white p-5 pr-3 py-3 w-full"
                                        onClick={() => setSelectedCategory(cat)}
                                    >
                                        {cat.name}{" "}

                                        {
                                            cat.state === "pending" ?
                                                <button className="p-2 px-6 border-style-decoration hover:bg-white hover:text-[#141414]" onClick={() => makeCategoryActive(cat)}>
                                                    Make Live
                                                </button> : ""
                                        }
                                    </button>
                                ))
                            }
                        </div>

                        <Button
                            isActive
                            divClassName="!mt-5"
                            onClick={() => setOpenDialog("add-category")}
                        >
                            Add new category
                        </Button>
                    </div>

                    {
                        selectedCategory ?
                            <div className="border-style-decoration p-5 w-full hidden lg:block" key={selectedCategory.cat}>
                                <div className="flex items-end gap-6">
                                    {
                                        selectedCategory.image ?
                                            <>
                                                <img src={selectedCategory.image} alt="selected-category" width={200} height={200} />
                                                <div>
                                                    <button className="p-2 mt-4 text-white px-6 border-style-decoration hover:bg-white hover:text-[#141414]">
                                                        Edit Image
                                                    </button>
                                                </div>
                                            </>
                                            :
                                            <div>
                                                <button className="p-2 mt-4 text-white px-6 border-style-decoration hover:bg-white hover:text-[#141414]">
                                                    Upload Image
                                                </button>
                                            </div>
                                    }

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
                                            placeholder="Pokerman"
                                            defaultValue={selectedCategory.name}
                                            inputClassName="placeholder:text-white/60"
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
                                            defaultValue={selectedCategory.description}
                                        />
                                    </label>
                                </div>
                            </div> : ""
                    }
                </div>
            </div>
        </>
    )
}

export default CategoriesSection