import React, { useEffect, useState } from "react"
import UploadInput from "../../components/commons/UploadInput"
import TextInput from "../../components/commons/TextInput"
import Dropdown from "../../components/commons/Dropdown"
import Button from "../../components/commons/Button"
import DialogConfirmation from "../../components/dialogs/DialogConfirmation"
import { useAuth } from "../../context/authContext"
import { getUserData, updateUserProfile } from "../../firebase/users"
import { toast } from "react-toastify"
import { useAtom } from "jotai"
import { userAtom } from "../../store"

const PersonalInformation = () => {
  const [openDialog, setOpenDialog] = useState(null)
  const { user } = useAuth()
  const [initialData, setUserInitialData] = useState()
  const [loading, setLoading] = useState(true)
  const [, setUserData] = useAtom(userAtom)

  const options = [
    { value: "man", label: "Man" },
    { value: "woman", label: "Woman" }
  ]
  let userData = {}

  useEffect(() => {
    if (user) {
      getUserData(user.uid).then((data) => {
        userData = { ...userData, ...data }

        setUserInitialData(userData)

        setTimeout(() => {
          setLoading(false)
        }, 200);
      })
    }
  }, [user])

  const onSubmitUserProfile = async () => {
    updateUserProfile(user.uid, userData)

    await getUserData(user.uid).then((data) => {
      setUserData({ ...data, id: user.uid })
      localStorage.setItem('userData', JSON.stringify({ ...data, id: user.uid }))
    })

    toast.success("User data successfully updated !")
  }

  const onPictureChange = (file) => {
    userData['picture'] = file
  }

  return (
    !loading &&
    <div>
      <br />
      <DialogConfirmation
        open={openDialog === "error"}
        onClose={() => setOpenDialog(null)}
        type="failed"
        title="Failed"
        message="Your booking could not be completed due to error from payment getaway"
        buttonText="Try Again"
        onButtonClick={() => setOpenDialog(null)}
      />
      <div className="flex items-center gap-6 lg:gap-8">
        <UploadInput
          defaultPreview={initialData.picture}
          onFileSelect={onPictureChange}
          className="custom-upload-class !h-[140px] !w-[140px] lg:!h-[220px] lg:!w-[220px] "
          titleClassName="hidden"
          subtitleClassName="hidden"
          iconClassName="max-w-[36px] lg:max-w-[36px]"
        />

        <div>
          <h4 className="font-aero  uppercase text-xl lg:text-[36px] text-white">
            Upload Photo
          </h4>
          <span className="text-white/60 text-[10px] lg:text-sm mt-3 block">
            At least 256 x 256, PNG or JPG file format. <br /> Max 20 MB
          </span>
        </div>
      </div>
      <br />
      <br />
      <div className="flex flex-col lg:flex-row gap-5 w-full mt-5 lg:mt-8">
        <label className="w-full  text-white">
          <span className="text-base lg:text-xl mb-3 block">Display Name</span>
          <TextInput
            placeholder="Enter your name"
            inputClassName="placeholder:text-white/60"
            onChange={(value) => userData['displayName'] = value}
            defaultValue={initialData.displayName}
          />
        </label>
        <label className="w-full text-white">
          <span className="text-base lg:text-xl mb-3 block">User name</span>
          <TextInput
            placeholder="Enter your name"
            inputClassName="placeholder:text-white/60"
            disabled
            defaultValue={initialData.username}
          />
        </label>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 w-full mt-5 lg:mt-8">
        <label className="w-full  text-white">
          <span className="text-base lg:text-xl mb-3 block">Gender</span>
          <Dropdown
            options={options}
            placeholder="Select your gender"
            onChange={(e) => userData['gender'] = e.currentTarget.value}
            className="w-full"
          />
        </label>
        <label className="w-full text-white date-input">
          <span className="text-base lg:text-xl mb-3 block">Date of birth</span>
          <TextInput
            placeholder="00 / 00 / 00"
            inputClassName="placeholder:text-white/60"
            defaultType="date"
            defaultValue={initialData.dateOfBirth}
            onChange={(value) => userData['dateOfBirth'] = value}
          />
        </label>
      </div>
      <div className="flex flex-col lg:flex-row gap-5 w-full mt-5 lg:mt-8">
        <label className="w-full  text-white">
          <span className="text-base lg:text-xl mb-3 block">Email</span>
          {user && user.email && <TextInput
            placeholder="Enter your email"
            inputClassName="placeholder:text-white/60"
            disabled
            defaultValue={user.email}
          />}
        </label>
        <label className="w-full text-white">
          <span className="text-base lg:text-xl mb-3 block">Phone number</span>
          <TextInput
            placeholder="Enter your phone number"
            inputClassName="placeholder:text-white/60"
            onChange={(value) => userData['phoneNumber'] = value}
            defaultValue={initialData.phoneNumber}
          />
        </label>
      </div>

      <div className="w-full flex justify-center mt-10 lg:mt-20">
        <Button
          isActive
          divClassName="w-full lg:max-w-[300px]"
          onClick={onSubmitUserProfile}
        >
          Update
        </Button>
      </div>
    </div>
  )
}

export default PersonalInformation
