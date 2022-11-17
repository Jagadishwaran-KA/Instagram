import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import Header from "../../components/Header";


function signin({ providers }) {
    return (
        <>
            <Header />
            <div className="flex flex-col items-center  min-h-screen py-1">
                <img src="https://links.papareact.com/ocw" alt="sfi" className="w-80" />
                <p className="text-lg  font-medium">Instagram is a photo and video sharing social networking service owned by American company Meta Platforms. </p>
                <div className="mt-40">
                    {Object.values(providers).map((provider) => (
                        <div key={provider.name}>
                            <button className="p-3 bg-blue-500 rounded-lg text-white" onClick={() => signIn(provider.id, { callbackUrl: "/" })}>
                                Sign in with {provider.name}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps() {
    const providers = await getProviders();

    return {
        props: {
            providers
        }
    }
}



export default signin
