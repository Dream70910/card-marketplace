import React, { useEffect, useState } from "react";
import CardItemListing from "../../components/cards/CardItemListing";
import { useAtom } from "jotai";
import { userAtom } from "../../store";
import { getListingsByUserId } from "../../firebase/listings";

const YourListing = () => {
  const [items, setItems] = useState([])

  const [userData,] = useAtom(userAtom)

  useEffect(() => {
    if (userData && userData.id) {
      getListingsByUserId(userData.id).then(data => {
        setItems(data)
      })
    }
  }, [userData])

  return (
    <div className="mt-10 lg:mt-24">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
        {
          items.map(item =>
            <CardItemListing
              imageSrc={item.pictures[0]}
              title={item.title}
              price={`$ ${item.price.toFixed(2)}`}
              description={item.description}
              buttonText="View Product"
              id={item.id}
              key={`your-listing-${item.id}`}
            />
          )
        }
      </div>
      {/* <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-16">
        <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]">
          Load More
        </button>
      </div> */}
    </div>
  );
};

export default YourListing;
