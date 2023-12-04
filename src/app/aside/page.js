"use client";

import Feeds from "../feeds/page";
import { FaVideo } from "react-icons/fa6";
import { MdAddPhotoAlternate } from "react-icons/md";
import { RiUserFollowFill } from "react-icons/ri";
import { IoMdHome } from "react-icons/io";
import { FaShoppingCart } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { IoIosSettings } from "react-icons/io";
import { AiFillMessage } from "react-icons/ai";
import { useEffect, useState } from "react";
import { addBlogPost,  getOne,  getUsers } from "@/Api/firebase/page";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

function Aside() {
  const [text, setText] = useState("");
  const [user, setUser] = useState("");
  const [allUsers, setAllUSers] = useState([]);
  const [feedImage, setFeedImage] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [userFullInfo , setUserInfo] = useState("")
  const auth = getAuth();
  const router = useRouter()
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user);
        // ...
      } else {
        // User is signed out
        // ...
      }
    });

    getallUsers();
    single()
  }, []);

  async function addPost() {
    if (!next || !user) {
      return alert("please fill message");
    }

    await addBlogPost(text, user.displayName, feedImage[0]);
    setText("");
    alert("done");
  }

  async function getallUsers() {
    const res = await getUsers();
    setAllUSers(res);
  }

  if (!allUsers) {
    return <h3>Loading</h3>;
  }


  async  function single(){
    if(user){
      const res = await getOne(user.uid)
      setUserInfo(res)
    }
  
    }
   
  return (
    <>
      <button
        data-drawer-target="default-sidebar"
        data-drawer-toggle="default-sidebar"
        aria-controls="default-sidebar"
        type="button"
        className="inline-flex  items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
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
        className="fixed top-auto left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-screen px-3  overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-1 font-medium">
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoMdHome />
                <span className="flex-1 ms-3 whitespace-nowrap">Feeds</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdOutlineTravelExplore />
                <span className="flex-1 ms-3 whitespace-nowrap">Explore</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaShoppingCart />

                <span className="flex-1 ms-3 whitespace-nowrap">
                  MarketPlace
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <FaLayerGroup />
                <span className="flex-1 ms-3 whitespace-nowrap">Groups</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <MdFavorite />
                <span className="flex-1 ms-3 whitespace-nowrap">
                  My Favorites
                </span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <AiFillMessage />

                <span className="flex-1 ms-3 whitespace-nowrap">Messages</span>
              </a>
            </li>
            <li>
              <a
                href="#"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
              >
                <IoIosSettings />
                <span className="flex-1 ms-3 whitespace-nowrap">Setting</span>
              </a>
            </li>
          </ul>
          <div className="mt-2">
            <h1 className="indent-4 font-semibold py-2 ">My Contacts</h1>
            <div className="">
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                {allUsers.map((item, index) => {
                  return (
                    <li key={index} onClick={()=>router.push("/dashboard/"+item.uid)} className="pb-3 sm:pb-4">
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
                <li className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0v6NgFdKsOSq_Zxc7hRoSh6Xqqsm4I21Y2nzZaFlzIw&s"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        Demo user
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        demo user email
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </aside>

      <div className="overflow-auto  bg-slate-200  sm:ml-64 w-auto h-screen">
        {user && (
          <div className=" fixed  z-40  bg-blue-500 w-auto  ">
            <div className="flex  mx-auto py-2 px-2 space-x-3">
              <img
                className="h-9 w-9 rounded-full "
                src="https://static.vecteezy.com/system/resources/previews/002/002/403/original/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
              />
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full border rounded-xl "
                type="text"
                placeholder="write any post"
              />
            </div>
            <div className=" py-1 px-1 ">
              <div className="flex justify-around space-x-4">
                <button className="py-1  items-center text-sm space-x-1 flex">
                  <FaVideo />
                  Live Videos
                </button>
                <button className="py-1  items-center text-sm space-x-1 flex">
                  <MdAddPhotoAlternate />
                  <input
                    onChange={(e) => setFeedImage(e.target.files)}
                    type="file"
                  />
                </button>
                <button className="py-1  items-center text-sm  flex">
                  <RiUserFollowFill /> Following
                </button>
                <button
                  onClick={addPost}
                  className="py-1 bg-red-600 border rounded-sm text-white px-5"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        )}

        <Feeds />
      </div>
    </>
  );
}

export default Aside;
