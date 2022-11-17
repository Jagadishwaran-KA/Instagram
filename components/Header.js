import Image from "next/image"

import {
  SearchIcon,
  MenuIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/outline"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalatoms";

function Header() {

  const { data: session } = useSession();

  const [Open, setOpen] = useRecoilState(modalState)

  return (
    <div className="bg-gray-50  sticky z-50 ">
      <div className="cursor-pointer flex justify-between items-center max-w-6xl mx-auto">
        <div className="relative w-24 h-24">
          <Image src="https://links.papareact.com/ocw"
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="relative flex bg-white p-3 rounded-sm cursor-pointer ring-black w-1/3  space-x-2  shadow-sm">
          <SearchIcon className="h-6 text-gray-500 flex-grow" />
          <input type="text" placeholder="Search Instagram" className="w-full focus:border-black flex-grow text-gray-500 focus:outline-none" />
        </div>

        {session ? (
          <>

            <div className="flex space-x-3 cursor-pointer">
              <MenuIcon className="h-7 hover:scale-125 transition-all duration-200 ease-out md:hidden" />
              <div className="relative">
                <p className="absolute -top-2 left-4 bg-red-500 text-white rounded-full w-5 text-center">3</p>
                <PaperAirplaneIcon className="rotate-45  h-7 hover:scale-125 transition-all duration-200 ease-out " />
              </div>
              <PlusCircleIcon onClick={() => setOpen(true)} className="h-7 hover:scale-125 transition-all duration-200 ease-out " />
              <UserGroupIcon className="h-7 hover:scale-125 transition-all duration-200 ease-out " />
              <HeartIcon className="h-7 hover:scale-125 transition-all duration-200 ease-out " />
              <img onClick={signOut} src={session.user?.image} alt="some" className="rounded-full h-8 w-8 object-cover" />
            </div>
          </>
        ) : (
          <button onClick={signIn}>Sign In</button>
        )}


      </div>
    </div>
  )
}

export default Header
