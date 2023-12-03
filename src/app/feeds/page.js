"use client";

import { getPost } from "@/Api/firebase/page";
import { useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { FaCommentAlt } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
function Feeds() {
  const [feeds, setFeeds] = useState("");

  useEffect(() => {
    getFeeds();
  }, []);

  async function getFeeds() {
    const res = await getPost();
    setFeeds(res);
  }



  if (!feeds) {
    return <h1>Loading</h1>;
  }

  return (
    <div className=" relative  top-28 z-30 w-[62%]">
      {feeds.map((item, index) => {
        return (
          <div key={index}>
            <div className="flex items-center space-x-4 py-2">
              <div className="flex-shrink-0">
                <img
                  className="w-8 h-8 rounded-full"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS0v6NgFdKsOSq_Zxc7hRoSh6Xqqsm4I21Y2nzZaFlzIw&s"
                  alt="Neil image"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                  {item.profileName}
                </p>
                <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                  demo user email
                </p>
              </div>
            </div>

            <div>
              <p className="indent-5">{item.message}</p>
            </div>
            <div className="py-2">
              <img src={item.feedImage} />
            </div>
            <div className="flex bg-green-500 justify-around">
              <button className="flex items-center py-2 space-x-3">
                <AiFillLike /> like
              </button>
              <button className="flex items-center py-2 space-x-3">
                <FaCommentAlt /> Comments
              </button>
              <button className="flex items-center py-2 space-x-3">
                <FaShare /> Share
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Feeds;
