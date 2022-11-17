import Posts from "./Posts"
import Stories from "./Stories"
import MiniProfile from "./MiniProfile"
import Suggestions from "./Suggestions"

function Feed() {
  return (
    <div className="grid grid-cols-1  md:grid-cols-2 xl:grid-cols-3 md:max-w-3xl xl:max-w-6xl mx-auto">
      <div className="col-span-2">
        <Stories />
        <Posts />
      </div>
      <div className="hidden xl:inline-grid md:col-span-1">
        <div className="fixed top-20">
          <MiniProfile />
          <Suggestions />
        </div>
      </div>
    </div>
  )
}

export default Feed


