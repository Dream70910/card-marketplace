import React, { useEffect, useRef, useState } from "react"
import Header from "../../components/Header"
import Footer from "../../components/Footer"
import TextInput from "../../components/commons/TextInput"
import { Link, useParams } from "react-router-dom"
import { useAtom } from "jotai"
import { userAtom } from "../../store"
import { addRecipient, getUserData } from "../../firebase/users"
import { addDoc, collection, onSnapshot, orderBy, query, Timestamp, where } from "firebase/firestore"
import { db } from "../../firebase/config"
import DialogConfirmation from "../../components/dialogs/DialogConfirmation"
import { setMessageRead } from "../../firebase/messages"
import { useAuth } from "../../context/authContext"
const MarketplaceChat = () => {
  const fileInputRef = useRef(null)
  const { recipientId } = useParams()
  const { getUpdatedUserData } = useAuth()
  const [userData, setUserData] = useAtom(userAtom)
  const [partyData, setPartyData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [messages, setMessages] = useState([])
  const [sentMessages, setSentMessages] = useState([])
  const [receivedMessages, setReceivedMessages] = useState([])
  const [messageText, setMessageText] = useState('')

  useEffect(() => {
    let newMsgs = [...sentMessages, ...receivedMessages]

    newMsgs = newMsgs.sort((a, b) => {
      const aTime = a.timestamp.seconds * 1e9 + a.timestamp.nanoseconds
      const bTime = b.timestamp.seconds * 1e9 + b.timestamp.nanoseconds
      return aTime - bTime
    })

    setMessages(newMsgs)
  }, [sentMessages, receivedMessages])

  useEffect(() => {
    setLoading(true)

    getUserData(recipientId).then(data => {
      setPartyData(data)
      setLoading(false)
    })
  }, [recipientId])

  useEffect(() => {
    if (userData && userData.id) {
      setMessages([])

      const q1 = query(
        collection(db, "messages"),
        where("recipientId", "==", recipientId),
        where("senderId", "==", userData.id),
        // where("timestamp", ">=", afterTimestamp),
        orderBy("timestamp")
      )

      const q2 = query(
        collection(db, "messages"),
        where("recipientId", "==", userData.id),
        where("senderId", "==", recipientId),
        // where("timestamp", ">=", afterTimestamp),    
        orderBy("timestamp")
      )

      const unsubscribe1 = onSnapshot(q1, (snapshot) => {
        const msgs1 = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setSentMessages(msgs1)
      })

      const unsubscribe2 = onSnapshot(q2, (snapshot) => {
        const msgs2 = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
        setReceivedMessages(msgs2)
      })

      return () => {
        unsubscribe1()
        unsubscribe2()
      }
    }
  }, [recipientId, userData])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (userData && userData.unReadMessages) {
      userData.unReadMessages.filter(item => item.senderId === recipientId).forEach(async (msg) => {
        await setMessageRead(msg.id)
      })

      getUpdatedUserData()
    }
  }, [loading])

  const scrollToBottom = () => {
    const element = document.querySelector("#product-ask-section")
    if (element) element.scrollTop = element.scrollHeight
  }

  const sendMessage = async () => {
    if (messageText === '') return

    setMessageText('')

    await addDoc(collection(db, "messages"), {
      text: messageText,
      senderId: userData.id,
      recipientId: recipientId,
      timestamp: new Date(),
      state: 'unread'
    })

    if (!userData.recipients || userData.recipients.findIndex(item => item.id === recipientId) === -1) {
      await addRecipient(userData.id, recipientId)
      await addRecipient(recipientId, userData.id)
    }
  }

  const onChangeMessageText = (value) => {
    setMessageText(value)
  }

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  const formatDate = (date) => {
    const options = { hour: 'numeric', minute: 'numeric', hour12: true }
    const timeString = date.toLocaleTimeString('en-US', options)
    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    return `${timeString} ${dateString}`
  }

  const getUnReadMessagesCount = (senderId) => {
    return userData.unReadMessages.filter(item => item.senderId === senderId).length
  }

  // const handleButtonClick = () => {
  //   fileInputRef.current.click()
  // }

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0]
  //   if (file) {
  //     console.log("Selected file:", file)
  //     // Handle the file here (e.g., upload it or store it in state)
  //   }
  // }

  return (
    <>
      <Header isLogin />

      {
        loading ?
          <DialogConfirmation
            open={loading}
            onClose={() => { }}
            type="loading"
            title="Please wait"
            message="We are processing your booking request. Please wait and don’t close this page"
            buttonText="Cancel"
            onButtonClick={() => setOpenDialog(null)}
          /> :
          <div className="container mx-auto px-5 py-32 lg:py-48 relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[80%] after:blur-[250px] after:bg-primary after:rounded-full after:absolute after:z-[1]">
            <div className="flex items-center mb-7 -ml-3">
              <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_772_551" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="-1" y="0" width="36" height="35">
                  <rect width="34.3333" height="34.3333" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 34.332 34.667)" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_772_551)">
                  <path d="M12.8746 17.4991L20.0273 24.6519L20.0273 10.3463L12.8746 17.4991Z" fill="white" />
                </g>
              </svg>

              <Link to="/marketplace/chat/all" className="text-white">
                Go Back
              </Link>
            </div>

            <div className="flex items-center justify-between">
              <h1 className="font-aero uppercase text-white leading-[1.2] text-[32px] lg:text-[48px]">
                Chat
              </h1>

              <Link to="/user-profile">
                <button
                  className={`relative w-full max-w-[168px] lg:max-w-[214px] justify-center text-sm lg:text-base flex items-center p-4 px-6 whitespace-nowrap border-style-decoration after:bottom-[-.5px] right-[-.5px] text-white hover:bg-white hover:text-[#141414]`}
                >
                  View Profile
                </button>
              </Link>
            </div>

            <div className="flex mt-10 lg:mt-16">
              {
                userData.recipients && userData.recipients.length > 0 ?
                  <div className="mr-10 border-default min-w-[250px]">
                    {
                      userData.recipients.map((item) =>
                        <Link
                          to={`/marketplace/chat/${item.id}`}
                          className={`flex items-center hover:bg-[#1AB6F950] p-5 ${item.id === recipientId ? 'bg-[#1AB6F950]' : ''}`}
                          key={`recipent-${item.id}`}
                        >
                          {/* <img
                            src={item.picture}
                            className="border-style-decoration max-w-[48px] mr-4"
                          /> */}

                          <div className="bg-primary w-10 h-10 flex justify-center items-center mr-3">
                            <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <g clipPath="url(#clip0_772_194)">
                                <mask id="mask0_772_194" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="11">
                                  <path d="M7.28144 8.14928L5.29655 10.4669H1.73101C0.779557 10.4669 0.000976562 9.68847 0.000976562 8.73702V7.00699H3.70436L5.0038 5.48985L7.28155 8.14938L7.28144 8.14928ZM5.0037 4.97716L3.70426 3.45993H0.000976562V1.73C0.000976562 0.778448 0.779455 -3.05176e-05 1.73101 -3.05176e-05H5.29655L7.28144 2.31764L5.0037 4.97716Z" fill="white" />
                                </mask>
                                <g mask="url(#mask0_772_194)">
                                  <path d="M7.28144 -3.05176e-05H0.000976562V10.4668H7.28144V-3.05176e-05Z" fill="#151415" />
                                </g>
                                <mask id="mask1_772_194" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="5" y="0" width="10" height="11">
                                  <path d="M9.77717 5.23349L11.296 3.45996H14.9994V1.73003C14.9994 0.778478 14.2209 0 13.2694 0H9.70385L7.46277 2.61674L5.22168 5.23349L7.46277 7.85023L9.70385 10.467H13.2694C14.2208 10.467 14.9994 9.6885 14.9994 8.73705V7.00712H11.296L9.77717 5.23359V5.23349Z" fill="white" />
                                </mask>
                                <g mask="url(#mask1_772_194)">
                                  <path d="M14.9994 0H5.22168V10.4669H14.9994V0Z" fill="white" />
                                </g>
                                <path opacity="0.15" fillRule="evenodd" clipRule="evenodd" d="M5.00275 4.58248L6.94241 2.3177L5.17746 0.256836H1.73006C0.920237 0.256836 0.256836 0.920237 0.256836 1.73006V3.20329H3.82156L5.00275 4.58258V4.58248Z" fill="#151415" />
                              </g>
                              <defs>
                                <clipPath id="clip0_772_194">
                                  <rect width="15" height="10.4669" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>

                          <span className="text-white">
                            {item.displayName}
                          </span>

                          {
                            getUnReadMessagesCount(item.id) > 0 &&
                            <div className="relative ml-2 bg-[#f00] rounded-[50%] w-4 h-4">
                              <span className="absolute left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 text-white text-[12px]">{getUnReadMessagesCount(item.id)}</span>
                            </div>
                          }
                        </Link>
                      )
                    }
                  </div> : ""
              }

              <div className="w-full">
                <div className="product-ask-section nice-scrollbar p-5 lg:p-10" id="product-ask-section">
                  {messages.map(msg =>
                    msg.senderId === userData.id ?
                      <div className="flex flex-row-reverse items-start gap-6" key={`sent-${msg.id}`}>
                        <div className="bg-primary w-10 h-10 flex justify-center items-center mr-3">
                          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_772_194)">
                              <mask id="mask0_772_194" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="11">
                                <path d="M7.28144 8.14928L5.29655 10.4669H1.73101C0.779557 10.4669 0.000976562 9.68847 0.000976562 8.73702V7.00699H3.70436L5.0038 5.48985L7.28155 8.14938L7.28144 8.14928ZM5.0037 4.97716L3.70426 3.45993H0.000976562V1.73C0.000976562 0.778448 0.779455 -3.05176e-05 1.73101 -3.05176e-05H5.29655L7.28144 2.31764L5.0037 4.97716Z" fill="white" />
                              </mask>
                              <g mask="url(#mask0_772_194)">
                                <path d="M7.28144 -3.05176e-05H0.000976562V10.4668H7.28144V-3.05176e-05Z" fill="#151415" />
                              </g>
                              <mask id="mask1_772_194" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="5" y="0" width="10" height="11">
                                <path d="M9.77717 5.23349L11.296 3.45996H14.9994V1.73003C14.9994 0.778478 14.2209 0 13.2694 0H9.70385L7.46277 2.61674L5.22168 5.23349L7.46277 7.85023L9.70385 10.467H13.2694C14.2208 10.467 14.9994 9.6885 14.9994 8.73705V7.00712H11.296L9.77717 5.23359V5.23349Z" fill="white" />
                              </mask>
                              <g mask="url(#mask1_772_194)">
                                <path d="M14.9994 0H5.22168V10.4669H14.9994V0Z" fill="white" />
                              </g>
                              <path opacity="0.15" fillRule="evenodd" clipRule="evenodd" d="M5.00275 4.58248L6.94241 2.3177L5.17746 0.256836H1.73006C0.920237 0.256836 0.256836 0.920237 0.256836 1.73006V3.20329H3.82156L5.00275 4.58258V4.58248Z" fill="#151415" />
                            </g>
                            <defs>
                              <clipPath id="clip0_772_194">
                                <rect width="15" height="10.4669" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="mb-5 flex flex-col items-end">
                          <div className="border-style-decoration p-4 px-6 bg-white/5 backdrop-blur-sm">
                            <span className="uppercase text-xs lg:text-sm text-white/60 font-medium block">
                              YOU
                            </span>
                            <p className="text-white text-sm lg:text-base mt-1">
                              {msg.text}
                            </p>
                          </div>
                          <span className="text-white/40 text-sm mt-2 block">
                            {formatDate(new Date(msg.timestamp.seconds * 1000))}
                          </span>
                        </div>
                      </div> :
                      <div className="flex items-start gap-6 mb-5" key={`received-${msg.id}`}>
                        <div className="bg-primary w-10 h-10 flex justify-center items-center mr-3">
                          <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_772_194)">
                              <mask id="mask0_772_194" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="0" y="0" width="8" height="11">
                                <path d="M7.28144 8.14928L5.29655 10.4669H1.73101C0.779557 10.4669 0.000976562 9.68847 0.000976562 8.73702V7.00699H3.70436L5.0038 5.48985L7.28155 8.14938L7.28144 8.14928ZM5.0037 4.97716L3.70426 3.45993H0.000976562V1.73C0.000976562 0.778448 0.779455 -3.05176e-05 1.73101 -3.05176e-05H5.29655L7.28144 2.31764L5.0037 4.97716Z" fill="white" />
                              </mask>
                              <g mask="url(#mask0_772_194)">
                                <path d="M7.28144 -3.05176e-05H0.000976562V10.4668H7.28144V-3.05176e-05Z" fill="#151415" />
                              </g>
                              <mask id="mask1_772_194" style={{ maskType: "luminance" }} maskUnits="userSpaceOnUse" x="5" y="0" width="10" height="11">
                                <path d="M9.77717 5.23349L11.296 3.45996H14.9994V1.73003C14.9994 0.778478 14.2209 0 13.2694 0H9.70385L7.46277 2.61674L5.22168 5.23349L7.46277 7.85023L9.70385 10.467H13.2694C14.2208 10.467 14.9994 9.6885 14.9994 8.73705V7.00712H11.296L9.77717 5.23359V5.23349Z" fill="white" />
                              </mask>
                              <g mask="url(#mask1_772_194)">
                                <path d="M14.9994 0H5.22168V10.4669H14.9994V0Z" fill="white" />
                              </g>
                              <path opacity="0.15" fillRule="evenodd" clipRule="evenodd" d="M5.00275 4.58248L6.94241 2.3177L5.17746 0.256836H1.73006C0.920237 0.256836 0.256836 0.920237 0.256836 1.73006V3.20329H3.82156L5.00275 4.58258V4.58248Z" fill="#151415" />
                            </g>
                            <defs>
                              <clipPath id="clip0_772_194">
                                <rect width="15" height="10.4669" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                        <div className="flex flex-col items-start">
                          <div className="border-style-decoration p-4 px-6 bg-white backdrop-blur-sm">
                            <span className="uppercase text-xs lg:text-sm text-[#7F8289] font-medium block">
                              {partyData.displayName}
                            </span>
                            <p className="text-black text-sm lg:text-base mt-1">
                              {msg.text}
                            </p>
                          </div>
                          <span className="text-white/40 text-sm mt-2 block">
                            {formatDate(new Date(msg.timestamp.seconds * 1000))}
                          </span>
                        </div>
                      </div>
                  )}
                </div>

                <div className="flex flex-col lg:flex-row items-center pt-8 gap-4">
                  <TextInput
                    divClassName="bg-white/5 backdrop-blur-sm"
                    placeholder="Type your text here"
                    inputClassName="placeholder:text-white/60"
                    onChange={onChangeMessageText}
                    onKeyDown={onKeyDown}
                    value={messageText}
                  />
                </div>
              </div>
            </div>
          </div>
      }
      <Footer />
    </>
  )
}

export default MarketplaceChat
