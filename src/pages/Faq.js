import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TextInput from "../components/commons/TextInput";
import CardFaq from "../components/cards/CardFaq";

const Faq = () => {
  const [itemCount, setItemCount] = useState(6)


  // Example data array for FAQs
  const faqData = [
    {
      question: "What is Card Shop Exchange?",
      answer:
        "Card Shop Exchange is an online marketplace where collectors, players, and enthusiasts can buy, sell, and trade Pokémon and other collectible cards. Our platform is designed to provide a seamless experience for finding, listing, and trading cards.",
    },
    {
      question: "How do I create an account on Card Shop Exchange?",
      answer:
        "To create an account, click the “Log In” button at the top of the page, select “Sign Up,” and follow the simple steps to register using your email or social media accounts.",
    },
    {
      question: "How does buying and selling work on the platform?",
      answer:
        "Sellers list their cards with detailed descriptions and images, while buyers can browse categories, view listings, and make offers or purchases directly. Payments are secure and processed through our integrated system.",
    },
    {
      question: "What types of cards can I find on Card Shop Exchange?",
      answer:
        "You can explore a variety of categories, including Pokémon, Zelda, Naruto, Formula 1, One Piece, WWE, Football, and Attack on Titan (AOT), among others.",
    },
    {
      question: "Are the cards on the platform verified for authenticity?",
      answer:
        "While we encourage sellers to list only authentic cards, buyers are advised to review descriptions and images carefully. Our support team is available to assist with any concerns.",
    },
    {
      question: "How do I contact a seller or buyer?",
      answer:
        "Our integrated chat functionality allows you to communicate directly with other users regarding listings, offers, or trades.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We support various secure payment options, including credit/debit cards, PayPal, and other popular payment gateways, ensuring a smooth transaction process.",
    },
    {
      question: "Can I track my transactions and earnings?",
      answer:
        "Yes, your account dashboard provides easy access to your transaction history, listed items, earnings, and account details for streamlined management.",
    },
    {
      question: "What should I do if I have an issue with a transaction?",
      answer:
        "If you encounter any issues, our dedicated support team is here to help. Visit the “Support” section or contact us directly for prompt assistance.",
    },
    {
      question: "Is there a fee for using Card Shop Exchange?",
      answer:
        "Creating an account and browsing the marketplace is free. A small fee is applied to successful transactions to maintain and improve the platform’s features and security.",
    },
  ];

  return (
    <div>
      <Header />
      <h1 className="container py-32 lg:py-48 font-aero uppercase text-white leading-[1.2] text-[32px] lg:text-[32x]">
        Faqs
      </h1>
      <div className="container mx-auto px-5 relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[80%] after:blur-[250px] after:bg-primary after:rounded-full after:absolute after:z-[1]">
        <div className="w-full max-w-[960px] mx-auto">
          {/* <div className="w-full flex flex-col-reverse lg:flex-row items-center gap-3 my-12">
            <div className="grid grid-cols-2 mt-4 lg:mt-0 lg:flex w-full items-center gap-3 ">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative w-full justify-center text-sm lg:text-base flex items-center p-4 px-6 whitespace-nowrap border-style-decoration after:bottom-[-.5px] right-[-.5px]
                ${activeTab === tab
                      ? "bg-white text-black"
                      : "text-white hover:bg-white hover:text-[#141414]"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <TextInput
              divClassName="w-full max-w-[345px]"
              placeholder="Search for FAQs..."
              inputClassName="placeholder:text-white/60"
            />
          </div> */}

          <div className="space-y-6">
            {faqData.slice(0, itemCount).map((faq, index) => (
              <CardFaq key={index} title={faq.question} content={faq.answer} />
            ))}
          </div>

          {
            faqData.length > itemCount &&
            <div className="w-full lg:w-fit mx-auto mt-8 lg:mt-12">
              <button className="hover:bg-white w-full  lg:w-fit hover:text-[#141414] justify-center flex items-center p-4 px-6 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px]" onClick={() => setItemCount(itemCount + 6)}>
                Load More
              </button>
            </div>
          }
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Faq;
