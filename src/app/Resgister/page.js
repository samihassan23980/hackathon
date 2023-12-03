"use client";
import { AddUser } from "@/Api/firebase/page";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Register() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [passwrod, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [file ,setFile] = useState([])

  async function singinUser() {
    if(!email || !passwrod || !fullName || !file){
      return alert("please fill all fields")
    }
   await AddUser(email, passwrod ,fullName , file[0]);
   setEmail("")
   setPassword("")
   setFullName("")
   setFile([])

   router.push('/Login')
  }

  return (
    <>
      <div>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div>
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Full NAme
              </label>
              <div className="mt-2">
                <input
                  onChange={(e) => setFullName(e.target.value)}
                  type="text"
                  value={fullName}
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                value={passwrod}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Image
                </label>
              </div>
              <div className="mt-2">
                <input
                  onChange={(e) => setFile(e.target.files)}
                 
                  type="file"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
              onClick={singinUser}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>

            <p
              onClick={() => router.push("/Login")}
              className="mt-10 text-center text-sm text-gray-500"
            >
              if you have already member go to login page
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
