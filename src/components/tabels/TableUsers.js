import React, { useEffect, useState } from "react";
import { getAllUserData } from "../../firebase/users";
import CardUser from "../cards/CardUser";

const TableUsers = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeUser, setActiveUser] = useState(null)

  useEffect(() => {
    getAllUserData().then(data => {
      setUsers(data)
      setLoading(false)
      setActiveUser(data[0])
    })
  }, [])

  return (
    !loading && <div className="flex items-start gap-8 mt-14">
      <div className="product-ask-section w-full">
        <h4 className="uppercase font-aero w-full bg-white/5 backdrop-blur-sm p-5 px-10 text-white text-base lg:text-xl">
          Users
        </h4>
        <div className="px-8 pb-1 hidden lg:block">

          <table
            className="border-separate w-full mt-[-15px]"
            style={{ borderSpacing: "0 15px" }}
          >
            <thead className="text-white !font-normal border-b border-b-white/20 relative after:content-[''] after:absolute after:w-[calc(100%+4rem)] after:h-[2px] after:bg-white/20 after:left-[-2rem] before:content-[''] before:absolute before:bottom-0 before:left-[-2rem] before:w-[calc(100%+4rem)] before:h-[2px] before:bg-white/20">
              <th
                align="left"
                className="bg-transparent py-5 uppercase !font-medium text-white/60 p-4 px-6 text-sm"
              >
                Users
              </th>
              <th
                align="left"
                className="bg-transparent py-5 uppercase !font-medium text-white/60 p-4 px-6 text-sm"
              >
                User Name
              </th>
              <th
                align="left"
                className="bg-transparent py-5 uppercase !font-medium text-white/60 p-4 px-6 text-sm"
              >
                Role
              </th>
              <th
                align="left"
                className="bg-transparent py-5 uppercase !font-medium text-white/60 p-4 px-6 text-sm"
              >
                Phone
              </th>

              <th
                align="left"
                className="bg-transparent py-5 uppercase !font-medium text-white/60 p-4 px-6 text-sm"
              >
                tickets
              </th>
              <th
                align="left"
                className="bg-transparent py-5 uppercase !font-medium text-white/60 p-4 px-6 text-sm"
              ></th>
            </thead>
            <tbody>
              {
                users.map((user) =>
                  <tr
                    className="bg-white/5 hover:bg-white hover:text-[#141414] group text-white backdrop-blur-sm text-base border-style-decoration"
                    key={user.username}
                  >
                    <td className="p-4 border-l border-l-white/20 border-y border-y-white/20">
                      <div className="flex items-center space-x-4 ">
                        <img
                          src="/assets/avatars/avatar_2.png"
                          className="max-w-[48px] lg:max-w-[48px] border-style-decoration object-cover"
                          alt="User Avatar"
                        />
                        <div className="flex items-center">
                          <span className="text-sm lg:text-base whitespace-nowrap">
                            {user.displayName}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 w-fit border-y border-y-white/20">{user.username}</td>
                    <td className="p-4 border-y border-y-white/20">{user.role}</td>
                    <td className="h-full p-4 border-y border-y-white/20">{user.phoneNumber}</td>
                    <td className="h-full p-4 border-y border-y-white/20">{user.tickets}</td>

                    <td className="p-4 pr-8 border-y border-y-white/20 border-r border-r-white/20">
                      <div className="flex items-center gap-4 justify-end">
                        <button
                          className="group-hover:text-[#141414] group-hover:!border-[#141414] group-hover:after:!border-t-[#141414] group-hover:after:!border-l-[#141414] group-hover:before:!border-b-[#141414] group-hover:before:!border-r-[#141414] relative w-full max-w-[85px] justify-center text-sm lg:text-base flex items-center p-4 py-3 text-white border-style-decoration after:bottom-[-.5px] right-[-.5px] whitespace-nowrap"
                          onClick={() => setActiveUser(user)}
                        >
                          View
                        </button>
                        <img
                          src="/assets/icons/icon-more-vert.svg"
                          className="invert group-hover:invert-0 cursor-pointer"
                        />
                      </div>
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </div>
        <div className="p-5 space-y-4 lg:hidden">
          {
            users.map((user) =>
              <CardUser
                username={user.username}
                role={user.role}
                phoneNumber={user.phoneNumber}
                tickets={user.tickets}
                onDelete={() => console.log("Delete clicked")}
                onView={() => setOpenDialog("view-user")}
                userProfile="/assets/avatars/avatar_2.png"
                key={user.name}
              />
            )
          }
        </div>
      </div>
      <div className="hidden lg:block product-ask-section w-full max-w-[431px]">
        <h4 className="uppercase font-aero w-full bg-white/5 backdrop-blur-sm p-5 px-10 text-white text-base lg:text-xl">
          User Overview
        </h4>
        <div className="p-5">
          <div className="flex items-start justify-between w-full">
            <div className="flex items-center space-x-2 lg:space-x-4">
              <img
                src={activeUser.picture ? activeUser.picture : '/assets/avatars/avatar.png'}
                className=" max-w-[32px] lg:max-w-[74px] border-style-decoration object-cover"
              />
              <div className="flex flex-col items-start">
                <span className="text-sm lg:text-xl text-white">
                  {activeUser.displayName}
                </span>
                <div className="text-[10px] lg:text-base flex items-center text-primary">
                  <img
                    src="/assets/icons/icon-verified.svg"
                    className="max-w-[12px] lg:max-w-[unset] mr-1 lg:mr-2"
                  />{" "}
                  Verified
                </div>
              </div>
            </div>

            <img
              src="/assets/icons/icon-more-vert.svg"
              className="invert group-hover:invert-0 cursor-pointer mt-2"
            />
          </div>

          <div className="mt-6">
            <h4 className="uppercase text-white/60 text-sm">
              Key statistics
            </h4>

            <div className="">
              <div className="flex items-center gap-4 py-4">
                <div className="bg-primary-gradient border-style-decoration p-4 w-fit">
                  <img src="/assets/icons/icon-rows.svg" />
                </div>
                <div>
                  <h4 className="text-white/60 text-sm">Total Listings</h4>
                  <span className="text-xl text-white block mt-1">24</span>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4 border-y border-y-white/20">
                <div className="bg-primary-gradient border-style-decoration p-4 w-fit">
                  <img src="/assets/icons/icon-shopping-bag.svg" />
                </div>
                <div>
                  <h4 className="text-white/60 text-sm">Total Purchases</h4>
                  <span className="text-xl text-white block mt-1">45</span>
                </div>
              </div>
              <div className="flex items-center gap-4 py-4">
                <div className="bg-primary-gradient border-style-decoration p-4 w-fit">
                  <img src="/assets/icons/icon-rows.svg" />
                </div>
                <div>
                  <h4 className="text-white/60 text-sm">Total Sales</h4>
                  <span className="text-xl text-white block mt-1">
                    $2300
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableUsers;
