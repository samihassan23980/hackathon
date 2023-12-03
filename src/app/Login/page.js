"use client";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { useRouter } from "next/navigation";
import { getAuth, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { useState } from "react";
import { AddUser, LoginWithUSer, app } from "@/Api/firebase/page";
import { MdPassword } from "react-icons/md";
export default function Login() {
  // Initialize Firebase

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const analytics = getAnalytics(app);
  const auth = getAuth();
  const provider = new FacebookAuthProvider();
  const [data, setUserData] = useState(null);

  const router = useRouter();

  function singInWIthFaceebookk() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;

        setUserData(user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        alert("sucess login");
        router.push("dashboard");

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  }

  async function loginUSer() {
    if (!email || !password) {
      return alert("please fill all fields");
    }
    const res = await LoginWithUSer(email, password);
    console.log(res);
    router.push("/dashboard");
  }

  return (
    <div>
      <div className="flex h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <div className="space-y-6" action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                onChange={(e)=>setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
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
                onChange={(e)=>setPassword(e.target.value)}
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
              <button
                onClick={loginUSer}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
            <div>
              <button
                onClick={singInWIthFaceebookk}
                type="submit"
                className="flex w-full justify-center rounded-md bg-blue-600 text-white px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login With Facebook
              </button>
            </div>
          </div>

          <p
            onClick={() => router.push("/Resgister")}
            className="mt-10 text-center text-sm text-gray-500"
          >
            Not a member?{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
