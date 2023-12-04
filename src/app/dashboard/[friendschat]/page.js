"use client";

import { getChatsInDB, getOne, getUsers, sendMessageInDb } from "@/Api/firebase/page";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { FaPhone } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { SlOptionsVertical } from "react-icons/sl";

function chat() {
  const auth = getAuth();
  const [allUser, setAllUSer] = useState(null);
  const [activeUSer, setActiveUSer] = useState(null);
  const [showChat, setShowChat] = useState(null);
  const [userTypeMessage, SetUSerTypeMEssage] = useState("");
  const [senderBhai, setSenderBhai] = useState(null);
  const [obj, setObj] = useState([]);

  useEffect(() => {
    allUsersInRegisterd();
    Current();
  }, []);

  async function allUsersInRegisterd() {
    const res = await getUsers();
   
    setAllUSer(res);
  }

  async function Current() {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setActiveUSer(user);

        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  async function startChat(item) {

    const res = await getOne(item.uid);  
setShowChat(res)

specificUserMessage(item)
  }

async function specificUserMessage(item){
    const chatres =  await getChatsInDB(item.uid)
    console.log(chatres)
    setObj(chatres)
}


  async function sendMessage() {
   const res = await sendMessageInDb(userTypeMessage, activeUSer.uid, showChat.uid , showChat.fullName );
SetUSerTypeMEssage("")
  }

  if (!allUser) {
    return console.log("loading");
  }


  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg
          className="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          />
        </svg>
      </button>
      <aside
        id="default-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
            {allUser.map((item, index) => {
              return (
                <li
                  onClick={() => startChat(item)}
                  key={index}
                  className="pb-3 sm:pb-4"
                >
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={item.imageURL}
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {item.fullName}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {item.uid}
                      </p>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </aside>
      <div className="p-4 sm:ml-64">
        {!showChat && <h1 className="text-2xl text-center py-20">Messenger</h1>}

        <>
          <div className="sm:[50%] md:w-full max-h-screen overflow-auto  ">
            {showChat && (
              <div className="w-full flex  fixed bg-white justify-between">
                <div className=" flex">
                  <ul className="max-w-md ml-2 py-2 divide-y max-h-screen overflow-auto divide-gray-200 dark:divide-gray-700">
                    <li className="">
                      <div className="flex items-center space-x-4 rtl:space-x-reverse">
                        <div className="flex-shrink-0">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={showChat.imageURL}
                            alt="Neil image"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {showChat.fullName}
                          </p>
                          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {showChat.email}
                          </p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {showChat && (
              <div className=" ml-1 mb-10">
                {obj.map((item, index) => {
                  return (
                    <div key={index} className="m-2">
                      <p
                        className={
                          item.me === "me"
                            ? "px-2 py-2  w-fit max-w-xs bg-yellow-400 border rounded-md"
                            : "px-2 ml-auto py-2 mt-1 w-fit max-w-xs bg-blue-700 text-white border rounded-md"
                        }
                      >
                        {item.message}
                      </p>
                    </div>
                  );
                })}
              </div>
            )}
            {showChat && (
              <div className="fixed min-w-full  bottom-0">
                <div className="min-w-full  flex-row space-x-9 ">
                  <input
                    onChange={(e) => {
                      SetUSerTypeMEssage(e.target.value);
                    }}
                    value={userTypeMessage}
                    type="search"
                    className="bg-slate-300 w-[50%] py-3 border rounded-md ml-1 "
                    placeholder="type any message"
                  />
                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white  py-3 px-3 border rounded-md "
                  >
                    Send Messages
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      </div>
    </>
  );
}

export default chat;
