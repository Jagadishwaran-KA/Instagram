import { useRecoilState } from "recoil";

import { modalState } from "../atoms/modalatoms"

import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useRef, useState } from 'react'
import { CameraIcon, VideoCameraIcon } from "@heroicons/react/outline";

import { db, storage } from "../firebase"
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getDownloadURL, ref, uploadString } from "firebase/storage";
import { async } from "@firebase/util";

function Modal() {
    const [open, setOpen] = useRecoilState(modalState);
    const { data: session } = useSession();
    const filePickerRef = useRef(null);
    const captionRef = useRef(null);
    const [selectedfile, setSelectedfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const uploadPost = async () => {
        if (loading) return;
        setLoading(true);
        const docsref = await addDoc(collection(db, 'posts'), {
            username: "Jagadish",
            caption: captionRef.current.value,
            profileImg: session.user.image,
            timestamp: serverTimestamp()
        })

        console.log("New Doc Added")

        const imageRef = ref(storage, `posts/${docsref.id}/image`)

        await uploadString(imageRef, selectedfile, "data_url").then(async snapshot => {
            const downloadUrl = await getDownloadURL(imageRef);

            await updateDoc(doc(db, 'posts', docsref.id), {
                image: downloadUrl
            })
        })

        setOpen(false);
        setSelectedfile(null);
        setLoading(false);
    }


    function addImageToPost(e) {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            setSelectedfile(readerEvent.target.result);
        }
    }


    return (
        <Transition appear show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-25" />
                </Transition.Child>



                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">


                                {selectedfile ? (

                                    <>
                                        <img src={selectedfile} alt="some" className="w-full object-contain cursor-pointer" onClick={() => setSelectedfile(null)} />
                                        <div className="mt-2">
                                            <input type="text" placeholder="Enter a Caption" ref={captionRef} className="border-none focus:ring-0  w-full text-center" />
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                disabled={!selectedfile}
                                                className="disabled:cursor-not-allowed inline-flex justify-center rounded-md bg-red-500 border border-transparent text-white px-4 py-2 text-sm font-medium  hover:bg-blue-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={uploadPost}
                                            >
                                                {loading ? "Uploading ..." : "Upload a Post"}
                                            </button>
                                        </div>
                                    </>


                                ) : (


                                    <>
                                        <div
                                            onClick={() => filePickerRef.current.click()}
                                            className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer"
                                        >
                                            <VideoCameraIcon
                                                className="h-6 w-6 text-red-600"
                                                aria-hidden="true"
                                            />
                                        </div>
                                        <Dialog.Title
                                            as="h3"
                                            className="text-lg text-center mt-5 font-medium leading-6 text-gray-900"
                                        >
                                            Upload a Photo
                                        </Dialog.Title>

                                        <div>
                                            <input
                                                ref={filePickerRef}
                                                onChange={addImageToPost}
                                                type="file" hidden />
                                        </div>
                                        <div className="mt-2">
                                            <input type="text" placeholder="Enter a Caption" ref={captionRef} className="border-none focus:ring-0  w-full text-center" />
                                        </div>
                                        <div className="mt-4">
                                            <button
                                                type="button"
                                                className="inline-flex justify-center rounded-md border border-transparent bg-blue-5d00 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                                                onClick={() => setOpen(false)}
                                            >
                                                POST
                                            </button>
                                        </div>
                                    </>
                                )}
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>

    )
}

export default Modal
