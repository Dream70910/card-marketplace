import React from "react";
import Header from "../components/Header";
import HeroSection from "../sections/home/HeroSection";
import HottestCategorySection from "../sections/home/HottestCategorySection";
import ProductQuestionSection from "../sections/home/ProductQuestionSection";
import NewlyListedSection from "../sections/home/NewlyListedSection";
import KeyFeaturesSection from "../sections/home/KeyFeaturesSection";
import MostPopularSection from "../sections/home/MostPopularSection";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <div className="pt-64 ">
        <HottestCategorySection />
        <ProductQuestionSection />
        <NewlyListedSection />
        <KeyFeaturesSection />
        <MostPopularSection />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
