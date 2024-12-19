import React from "react"
import { Link } from "react-router-dom"

const CardPurchaseHistory = ({
  imageSrc,
  title,
  status,
  date,
  avatarSrc,
  userName,
  price,
  onContactSeller,
  sellerId,
  onCancelBuy,
  onReview,
  confirmArrived
}) => {
  return (
    <div className="border-style-decoration p-5">
      <div className="flex flex-col lg:flex-row lg:items-center lg:gap-6">
        <div className="flex items-center w-full gap-4 lg:gap-6">
          <img
            src={imageSrc}
            className="w-full max-w-[140px] object-cover border-style-decoration"
            alt="Product"
          />
          <div className="flex gap-1 lg:gap-10 flex-col lg:flex-row lg:items-center w-full justify-between">
            <h4 className="w-full max-w-[240px] lg:max-w-[300px] font-aero text-sm lg:text-xl text-white leading-[1.1] uppercase">
              {title}
            </h4>

            <div className="w-full flex justify-between lg:justify-evenly flex-col-reverse lg:flex-row lg:items-center gap-1 lg:gap-6">
              <div className="flex lg:flex-col gap-1">
                <span className="text-xs lg:text-sm text-primary block whitespace-nowrap">
                  {status[0].toUpperCase() + status.slice(1, status.length)}
                </span>
                <span className="text-xs lg:text-sm text-white block whitespace-nowrap">
                  {date}
                </span>
              </div>

              <div className="flex lg:hidden items-center space-x-2 lg:space-x-4">
                <img
                  src={avatarSrc}
                  className="max-w-[32px] lg:max-w-[48px] border-style-decoration object-cover"
                  alt="User Avatar"
                />
                <div className="flex flex-col items-start">
                  <span className="text-sm lg:text-base text-white whitespace-nowrap">
                    {userName}
                  </span>
                </div>
              </div>

              <span className="gradient-text  font-aeonik font-bold text-base lg:text-2xl ">
                {price}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-4 w-full lg:max-w-[300px] 2xl:max-w-[420px] justify-end mt-4 lg:mt-0">
          {
            status === 'pending' ?
              <Link
                to={`/marketplace/chat/${sellerId}`}
                className="hover:bg-primary relative w-full lg:max-w-[152px] hover:text-white !border-primary after:!border-t-primary after:!border-l-primary before:!border-b-primary before:!border-r-primary justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
              >
                Contact Seller
              </Link>
              :
              <button
                onClick={confirmArrived}
                className="hover:bg-primary relative w-full lg:max-w-[152px] hover:text-white !border-primary after:!border-t-primary after:!border-l-primary before:!border-b-primary before:!border-r-primary justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
              >
                Confirm
              </button>
          }

          <button
            onClick={onCancelBuy}
            className="hover:bg-white relative w-full lg:max-w-[152px] hover:text-[#141414] justify-center text-sm lg:text-base flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardPurchaseHistory
