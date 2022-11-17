import { DotsHorizontalIcon, HeartIcon, PaperAirplaneIcon, ChatIcon, BookmarkIcon, EmojiHappyIcon } from "@heroicons/react/outline"



function Post({ id, username, userImg, caption, img }) {
  return (
    <div className="bg-white my-7 border rounded-sm p-4 mx-auto">
      <div className="flex space-x-2 items-center">
        <img src={userImg} alt="uvan" className="h-10 w-10 object-cover  rounded-full" />
        <p className="font-sans flex-1">{username}</p>
        <DotsHorizontalIcon className="h-7" />
      </div>
      <img src={userImg} alt="uvan" className="object-cover w-full mt-3" />

      <div className="flex mt-2 mx-auto">
        <div className="flex space-x-3 flex-1">
          <HeartIcon className="h-6" />
          <PaperAirplaneIcon className="h-6" />
          <ChatIcon className="h-6" />
        </div>
        <BookmarkIcon className="h-6" />
      </div>
      <p className="text-sm mt-2 pt-1">{caption}</p>
      <form className="flex items-center mx-auto pt-3 focus:ring-0">
        <EmojiHappyIcon className="h-7" />
        <input type="text" placeholder="Add a Comment" className="border-none ml-2 text-black flex-1 focus:border-none focus:ring-0 outline-none" />
        <button className="text-sm text-blue-400">POST</button>
      </form>
    </div>
  )
}

export default Post
