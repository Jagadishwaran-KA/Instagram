import { signIn, signOut, useSession } from "next-auth/react"



function MiniProfile() {

    const { data: session } = useSession();

    return (
        <div className="flex  space-x-3 cursor-pointer justify-between mt-14 ml-10">

            {session ? (
                <>
                    <img className="h-12 w-12 object-cover ml-4 rounded-full" alt="some" src={session.user?.image} />
                    <div className="flex-1 mx-4">
                        <h2>{session.user?.name}</h2>
                        <h3>Welcome to Instagram</h3>
                    </div>
                    <button className="text-blue-500" onClick={signOut}>Sign Out</button>
                </>
            ) : (<button onClick={signIn}>Sign In</button>)}
        </div>
    )
}

export default MiniProfile
