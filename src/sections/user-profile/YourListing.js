import React, { useEffect, useState } from "react";
import CardItemListing from "../../components/cards/CardItemListing";
import { useAtom } from "jotai";
import { userAtom } from "../../store";
import { getListingsByUserId, updateCardState } from "../../firebase/listings";
import { toast } from "react-toastify";

const YourListing = () => {
  const [userData,] = useAtom(userAtom)
  const [localCards, setLocalCards] = useState([])
  const [marketCards, setMarketCards] = useState([])
  const [updatedTime, setUpdatedTime] = useState(0)

  useEffect(() => {
    if (userData && userData.id) {
      updateData()
    }
  }, [userData])

  const updateData = () => {
    getListingsByUserId(userData.id).then(data => {
      let temp = data.filter(item => item.state === 'local')
      setLocalCards(temp)

      temp = data.filter(item => item.state === 'market')
      setMarketCards(temp)

      setUpdatedTime(updatedTime + 1)
    })
  }

  const updateCard = async (id, state, title) => {
    await updateCardState(id, state)
    toast.success(`${title} state was changed to ${state}!`)
    updateData()
  }

  return (
    <div className="mt-10 lg:mt-24">
      <h3 className="text-white text-lg">
        Local Cards
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
        {
          localCards.length > 0 ?
            localCards.map(item =>
              <CardItemListing
                imageSrc={item.pictures[0]}
                title={item.title}
                price={`$ ${item.price.toFixed(2)}`}
                description={item.description}
                buttonText="View Product"
                id={item.id}
                key={`your-listing-${updatedTime}-${item.id}`}
                state={item.state}
                updateCard={updateCard}
              />
            )
            :
            <span className="ml-4 text-white">No local cards</span>
        }
      </div>

      <h3 className="mt-20 text-white text-lg">
        Market Cards
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6 mt-8">
        {
          marketCards.length > 0 ?
            marketCards.map(item =>
              <CardItemListing
                imageSrc={item.pictures[0]}
                title={item.title}
                price={`$ ${item.price.toFixed(2)}`}
                description={item.description}
                buttonText="View Product"
                id={item.id}
                key={`your-listing-${updatedTime}-${item.id}`}
                updateCard={updateCard}
                state={item.state}
              />
            )
            :
            <span className="ml-4 text-white">No market cards</span>
        }
      </div>
    </div>
  );
};

export default YourListing;
