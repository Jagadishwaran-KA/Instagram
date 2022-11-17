import faker from "faker"
import React, { useEffect, useState } from 'react'
import Story from './Story';


function Stories() {

    const [suggestions,setSuggestions] = useState([]);

useEffect(() => {
const suggestions = [...Array(20)].map((_,i) => ({
    ...faker.helpers.contextualCard(),
    id:i
}))
setSuggestions(suggestions)
  }, [])




  return (
    <div className="flex space-x-5 overflow-x-scroll scrollbar-thin scrollbar-thumb-black p-6 rounded-sm bg-white">
      {
        suggestions.map(profile => (
            <Story
            key = {profile.id}
                img= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDa3BWapmgGSfbbEYAVvmLR3D1oFM2wjCIVw&usqp=CAU"
            username = {profile.username}
            />
        ))
      }
    </div>
  )
}

export default Stories
