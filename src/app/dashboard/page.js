"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { signOut } from "firebase/auth";

import { app, getOne } from "@/Api/firebase/page";
import Aside from "../aside/page";
import { Single_Day } from "next/font/google";
export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [userFullInfo , setUserInfo] = useState("")
  const auth = getAuth();


  useEffect( () => {
   onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const uid = user.uid;
        setUser(user);
       single()
      
       
        

        // ...
      } else {
        // User is signed out
        // ...
      }
    });  

  }, [Logout]);

  async function Logout() {
    await signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        // An error happened.
      });
  }



async  function single(){
  if(user){
    const res = await getOne(user.uid)
    setUserInfo(res)
  }

}






  
  return (
    <div>
      <div className="w-screen items-center bg-white flex">
        <div className="w-64  ">
          <h3 className="text-2xl text-center font-mono ">Scrollink</h3>
        </div>
        <div className="   w-1/3 ">
          <form>
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center  pointer-events-none">
                <svg
                  className="w-4 h-3 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Mockups, Logos..."
                required=""
              />
            </div>
          </form>
        </div>

        <div className=" w-[17%]     ">
          {!user && (
            <div className="mx-auto w-[60%] bg-blue-100">
              <button
                onClick={() => router.push("Login")}
                className="bg-blue-500 py-2 w-full border rounded-md text-white"
              >
                Login
              </button>
            </div>
          )}
          {user && (
            <div className="mx-auto w-[60%] bg-blue-100">
              <button
                onClick={Logout}
                className="bg-blue-500 py-2 w-full border rounded-md text-white"
              >
                Logout
              </button>
            </div>
          )}
        </div>
        {userFullInfo && (
          <div className="w-auto px-3 mx-auto">
            <div className="flex items-center gap-4">
              <div className="font-medium text-blue-500">
                <div>{userFullInfo.fullName}</div>
              </div>
              <img
                className="w-10 h-10 rounded-full"
                src={userFullInfo.imageURL}
                alt=""
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <Aside />
      </div>
    </div>
  );
}
