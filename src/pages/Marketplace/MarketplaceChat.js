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

const MarketplaceChat = () => {
  const fileInputRef = useRef(null)
  const { recipientId } = useParams()
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

  // const getParties = async () => {
  //   const q1 = query(
  //     collection(db, "messages"),
  //     where("recipientId", "==", recipientId),
  //     where("senderId", "==", userData.id),
  //     where("timestamp", ">", afterTimestamp),
  //     orderBy("timestamp")
  //   )

  //   const q2 = query(
  //     collection(db, "messages"),
  //     where("recipientId", "==", userData.id),
  //     where("senderId", "==", recipientId),
  //     where("timestamp", ">", afterTimestamp),
  //     orderBy("timestamp")
  //   )

  //   const querySnapshot = await getDocs(q1)
  //   if (!querySnapshot.empty) {
  //     querySnapshot.map(item => )
  //   }
  // }

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
            <div className="flex items-center justify-between">
              <h1 className="font-aero uppercase text-white leading-[1.2] text-[32px] lg:text-[48px]">
                Chat
              </h1>

              {/* <button
            className={`relative w-full max-w-[168px] lg:max-w-[214px] justify-center text-sm lg:text-base flex items-center p-4 px-6 whitespace-nowrap border-style-decoration after:bottom-[-.5px] right-[-.5px] text-white hover:bg-white hover:text-[#141414]`}
          >
            View Profile
          </button> */}
            </div>

            <div className="flex mt-10 lg:mt-16">
              {
                userData.recipients && userData.recipients.length > 0 ?
                  <div className="mr-10 border-default min-w-[250px]">
                    {
                      userData.recipients.map((item) =>
                        <Link
                          to={`/marketplace/chat/${item.id}`}
                          className={`flex hover:bg-primary p-5 ${item.id === recipientId ? 'bg-primary' : ''}`}
                          key={`recipent-${item.id}`}
                        >
                          <img
                            src={item.picture}
                            className="border-style-decoration max-w-[48px] mr-4"
                          />

                          <span className="text-white">
                            {item.displayName}
                          </span>
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
                        <img
                          src={userData.picture}
                          className="border-style-decoration max-w-[48px]"
                        />
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
                        <img
                          src={partyData.picture}
                          className="border-style-decoration max-w-[48px]"
                        />
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
                  // endIcon={
                  //   <button className="flex justify-center items-center bg-primary-gradient p-1.5 mr-[-10px]">
                  //     <img src="/assets/icons/icon-upward.svg" />
                  //   </button>
                  // }
                  />

                  {/* <button
              className="hover:bg-primary relative w-full lg:max-w-[300px] hover:text-white !border-primary after:!border-t-primary after:!border-l-primary before:!border-b-primary before:!border-r-primary justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
              onClick={handleButtonClick}
            >
              Add attachment
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <img src="/assets/icons/icon-plus.svg" className="ml-2" />
            </button> */}
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
