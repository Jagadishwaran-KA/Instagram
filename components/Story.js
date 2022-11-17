import { use } from "react"


function Story({ img, username }) {
  return (
    <div >
      <div className="hover:scale-110  transition transform duration-200 ease-out">
        <img src={img} alt="uvan" className="border-red-500 border-2 p-[1.5] w-14 h-14 rounded-full object-cover cursor-pointer" />
        <p className="truncate text-xs w-14 text-center">{username}</p>
      </div>

    </div>
  )
}

export default Story
