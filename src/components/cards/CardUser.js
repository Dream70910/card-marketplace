import React from "react";

const CardUser = ({
  status = "In-Process",
  tickets,
  onDelete,
  onView,
  userProfile,
  username,
  role,
  phoneNumber
}) => {
  const getStatusStyles = () => {
    switch (status) {
      case "Completed":
        return "text-primary border-primary bg-primary/20";
      case "On Hold":
        return "text-white bg-white/20 border-white";
      default: // "In-Process"
        return "text-primary border-primary";
    }
  };

  return (
    <div className="border-style-decoration bg-white/5 backdrop-blur-sm p-5">
      <div className="flex items-center space-x-4 ">
        <img
          src={userProfile}
          className="max-w-[48px] lg:max-w-[48px] border-style-decoration object-cover"
          alt="User Avatar"
        />
        <div className="flex items-center">
          <span className="text-sm text-white lg:text-base whitespace-nowrap">
            {username}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-8 mb-4">
        <div>
          <span className="block text-white/60 uppercase text-xs">
            User Name
          </span>
          <span className="block text-white text-xs mt-1">{username}</span>
        </div>
        <div>
          <span className="block text-white/60 uppercase text-xs">
            Role
          </span>
          <span className="block text-white text-xs mt-1">{role}</span>
        </div>
        <div>
          <span className="block text-white/60 uppercase text-xs">
            Phone
          </span>
          <span className="block text-white text-xs mt-1">{phoneNumber}</span>
        </div>
        {/* <div>
          <span className="block text-white/60 uppercase text-xs">tickets</span>
          <span className="block text-white text-xs mt-1">{tickets}</span>
        </div> */}
      </div>

      <div className="flex items-center gap-4 mt-5 justify-center w-full">
        <button
          className="group-hover:text-[#141414] w-full group-hover:!border-[#141414] group-hover:after:!border-t-[#141414] group-hover:after:!border-l-[#141414] group-hover:before:!border-b-[#141414] group-hover:before:!border-r-[#141414] relative justify-center text-sm lg:text-base flex items-center p-4 py-3 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
          onClick={onView}
        >
          View
        </button>
      </div>
    </div>
  );
};

export default CardUser;
