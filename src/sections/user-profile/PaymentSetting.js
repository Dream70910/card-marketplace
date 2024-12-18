import React, { useEffect, useState } from "react"
import Button from "../../components/commons/Button"
import axios from 'axios'
import { toast } from "react-toastify"
import { useAtom } from "jotai"
import { userAtom } from "../../store"
import { useAuth } from "../../context/authContext"

const PaymentSetting = () => {
  const [activeOption, setActiveOption] = useState("Deposit")
  const [amount, setAmount] = useState(0)
  const [message, setMessage] = useState('')
  const [userData,] = useAtom(userAtom)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [paypalAddress, setPaypalAddress] = useState(null)
  const itemsPerPage = 5
  const { getUpdatedUserData } = useAuth()


  useEffect(() => {
    if (userData && userData.transactions) {
      setTotalPages(Math.ceil(userData.transactions.length / itemsPerPage))
    }
  }, [userData])

  // const options = [
  //   { id: "Paypal", icon: "/assets/logos/paypal.svg", label: "Paypal" },
  //   { id: "Stax", icon: "/assets/logos/stax.svg", label: "Stax" },
  // ]
  const options = [
    { id: "Deposit", label: "Deposit" },
    { id: "Withdraw", label: "Withdraw" },
  ]

  const handleWithdraw = async () => {
    if (amount <= 0) {
      toast.error("Withdrawal amount must be over 0!")
      return
    }
    if (userData && userData.transactions && userData.transactions.findIndex(tr => tr.state === 'pending' && tr.type === 'withdraw') > -1) {
      toast.error("You can't withdraw funds while there is a pending transaction!")
    } else {
      if (amount > userData.balance) {
        toast.error("Withdrawal amount must be less than your available balance!")
      } else {
        try {
          await axios.post(process.env.REACT_APP_PAYMENT_API + '/api/withdraw', {
            email: paypalAddress,
            amount: amount,
            userId: userData.id
          }).then(res => {
            toast.success('Your withdrawal was successful and is now pending!')
            getUpdatedUserData()
          })
        } catch (error) {
          console.log("error is", error.response.data.response)
          if (error && error.response && error.response.data) {
            toast.error(error.response.data.response.details[0].issue)
          } else {
            toast.error(`Error: ${error.response.data.response.message ? error.response.data.response.message : 'Error processing withdrawal.'}`)
          }
        }
      }
    }
  }

  const handleDeposit = async () => {
    try {
      if (amount <= 0) toast.error("Deposit amount must be over 0!")

      else {
        const response = await axios.post(process.env.REACT_APP_PAYMENT_API + '/api/deposit', {
          amount: amount,
          userId: userData.id
        })

        if (response.data) {
          window.location.href = response.data.links[1].href
        }
      }
    } catch (error) {
      console.error(error)
      toast.error(`Error: ${error.response ? error.response.data.message : 'Error processing deposit.'}`)
    }
  }

  const toCapitalize = (str) => {
    return str[0].toUpperCase() + str.slice(1, str.length).toLowerCase()
  }

  const formatDate = (date) => {
    const formatOptions = { hour: 'numeric', minute: 'numeric', hour12: true }
    const timeString = date.toLocaleTimeString('en-US', formatOptions)
    const dateString = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    return `${timeString} ${dateString}`
  }

  const onSubmit = () => {
    if (activeOption === 'Deposit') {
      handleDeposit()
    } else {
      handleWithdraw()
    }
  }

  return (
    <div className="mt-12 lg:mt-24">
      <div className="flex items-center gap-6 justify-center">
        {options.map((option) => (
          <div
            key={option.id}
            onClick={() => setActiveOption(option.id)}
            className={`border-style-decoration p-5 w-full max-w-[200px] h-[120px] flex flex-col items-center justify-center cursor-pointer ${option.id === "Stax" && "hidden lg:flex"
              }
            ${activeOption === option.id
                ? "bg-white/5 backdrop-blur-sm !border-primary after:!border-l-primary after:!border-t-primary before:!border-r-primary before:!border-b-primary"
                : "bg-transparent border-white/20"
              }`}
          >
            {/* <img
              src={option.icon}
              className={`max-w-${option.id === "Stax" ? "[52px]" : "[28px]"}`}
              alt={`${option.label} Icon`}
            /> */}
            <span className="text-base text-white mt-1">{option.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 lg:mt-20">
        <div className="flex-col lg:flex-row gap-5 w-full mt-5 lg:mt-8">
          <label className="flex w-[80%] text-white mx-auto  border-b-2 border-gray-500">
            <input
              type="number"
              step="any"
              className="bg-transparent focus:border-blue-500 w-full text-center text-[4rem] overflow-hidden"
              min={0}
              placeholder="0.00"
              onChange={(e) => setAmount(e.currentTarget.value)}
            ></input>

            {message}
          </label>

          {
            activeOption === 'Withdraw' &&
            <label className="mt-8 flex w-[80%] text-white mx-auto  border-b-2 border-gray-500">
              <input
                type="email"
                className="bg-transparent w-full text-center text-[2rem] overflow-hidden"
                placeholder="your paypal address"
                onChange={(e) => setPaypalAddress(e.currentTarget.value)}
              ></input>

              {message}
            </label>
          }

          <div className="container mx-auto w-[80%]">
            <h2 className="text-xl font-bold mt-20 mb-4 text-white">Transaction History</h2>
            <table className="min-w-full border-gray-300">
              <thead>
                <tr className="bg-gray-700 text-white uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Payout ID</th>
                  <th className="py-3 px-6 text-left">Created At</th>
                  <th className="py-3 px-6 text-left">Type</th>
                  <th className="py-3 px-6 text-left">Amount</th>
                  <th className="py-3 px-6 text-left">State</th>
                </tr>
              </thead>
              <tbody className="text-white text-sm font-light">
                {userData && userData.transactions && userData.transactions.length > 0 ?
                  userData.transactions.slice(itemsPerPage * (currentPage - 1), itemsPerPage * currentPage).map(tr => (
                    <tr key={tr.id} className="border-b border-gray-300 hover:bg-gray-800">
                      <td className="py-3 px-6 text-left">{tr.id}</td>
                      <td className="py-3 px-6 text-left">{formatDate(new Date(tr.created_at.seconds * 1000))}</td>
                      <td className="py-3 px-6 text-left">{toCapitalize(tr.type)}</td>
                      <td className="py-3 px-6 text-left">{tr.amount}</td>
                      <td className="py-3 px-6 text-left">{toCapitalize(tr.state)}</td>
                    </tr>
                  )) :
                  <tr>
                    <td colSpan="5" className="py-3 px-6 text-center text-lg">No transactions yet</td>
                  </tr>
                }
              </tbody>
            </table>

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Previous
              </button>
              <span className="self-center text-white">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="bg-gray-700 text-white px-4 py-2 rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>

          <div className="flex flex-col  md:flex-row justify-end  items-center gap-5 mt-20">
            {/* <button
              className="hover:bg-primary relative w-full hover:text-white !border-primary after:!border-t-primary after:!border-l-primary before:!border-b-primary before:!border-r-primary justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap md:max-w-[300px]"
              onClick={handleDeposit}
            >
              Deposit
            </button> */}
            <Button isActive divClassName="w-full md:max-w-[300px]" onClick={onSubmit}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentSetting
