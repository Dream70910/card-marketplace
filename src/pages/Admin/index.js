import React, { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import TableUsers from "../../components/tabels/TableUsers";
import TableUsersTicket from "../../components/tabels/TableUsersTicket";
import TextInput from "../../components/commons/TextInput";
import CardUser from "../../components/cards/CardUser";
import DialogUserOverview from "../../components/dialogs/DialogUserOverview";
import DialogSupport from "../../components/dialogs/DialogSupport";
import CategoriesSection from "../../sections/admin/CategoriesSection";

const Admin = () => {
  const [openDialog, setOpenDialog] = useState(null);

  const closeDialog = () => {
    setOpenDialog(null);
  };

  return (
    <div>
      <DialogUserOverview
        open={openDialog === "view-user"}
        onClose={closeDialog}
      />
      <DialogSupport open={openDialog === "support"} onClose={closeDialog} />
      <Header isLogin />
      <div className="container mx-auto px-5 py-32 lg:py-48 relative after:content-[''] after:w-[360px] after:right-[100%] after:h-[360px] after:bottom-[80%] after:blur-[250px] after:bg-primary after:rounded-full after:absolute after:z-[1] before:content-[''] before:w-[360px] before:left-[100%] before:h-[360px] before:bottom-[50%] before:translate-y-[50%] before:blur-[250px] before:bg-primary before:rounded-full before:absolute before:z-[1]">
        <h1 className="font-aero uppercase text-white leading-[1.2] text-[32px] lg:text-[48px]">
          DASHBOARD
        </h1>

        <TableUsers />

        {/* <div className="flex items-start gap-8 mt-14">
          <div className="product-ask-section w-full lg:max-w-[560px]">
            <h4 className="uppercase font-aero w-full bg-white/5 backdrop-blur-sm p-5 px-10 text-white text-base lg:text-xl">
              User tickets
            </h4>
            <div className="p-4 lg:px-8 pb-2">
              <TableUsersTicket onClick={() => setOpenDialog("support")} />
            </div>
          </div>
          <div className="product-ask-section w-full hidden lg:block">
            <h4 className="uppercase font-aero w-full bg-white/5 backdrop-blur-sm p-5 px-10 text-white text-base lg:text-xl">
              support
            </h4>
            <div className="p-5">
              <div className="h-[17rem] overflow-y-auto no-scrollbar space-y-6">
                <div className="flex flex-row-reverse items-start gap-6">
                  <img
                    src="/assets/avatars/avatar_2.png"
                    className="border-style-decoration max-w-[48px]"
                  />
                  <div className="flex flex-col items-end">
                    <div className="border-style-decoration p-4 px-6 bg-white/5 backdrop-blur-sm">
                      <span className="uppercase text-xs lg:text-sm text-white/60 font-medium block">
                        Client
                      </span>
                      <p className="text-white text-sm lg:text-base mt-1">
                        I am not able to create a listing
                      </p>
                    </div>
                    <span className="text-white/40 text-sm mt-2 block">
                      11:32 AM
                    </span>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="border-style-decoration ">
                    <img
                      src="/assets/logos/card-marketplace.svg"
                      className="max-w-[48px]"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="border-style-decoration p-4 px-6 bg-[#5CC9F8] backdrop-blur-sm">
                      <span className="uppercase text-xs lg:text-sm text-black/60 font-medium block">
                        card shop exchange
                      </span>
                      <p className="text-black text-sm lg:text-base mt-1">
                        We have raised a ticket with number 634572. Our team
                        will get back to you shortly.
                      </p>
                    </div>
                    <span className="text-white/40 text-sm mt-2 block">
                      11:32 AM
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col lg:flex-row items-center pt-8 gap-4">
                <TextInput
                  divClassName="bg-white/5 backdrop-blur-sm"
                  placeholder="How can we help?"
                  inputClassName="placeholder:text-white/60"
                  endIcon={
                    <button className="flex justify-center items-center bg-primary-gradient p-1.5 mr-[-10px]">
                      <img src="/assets/icons/icon-upward.svg" />
                    </button>
                  }
                />
              </div>
            </div>
          </div>
        </div> */}

        <CategoriesSection />

      </div>

      <Footer />
    </div>
  );
};

export default Admin;
