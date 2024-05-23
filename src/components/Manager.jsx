import React, { useState, useEffect, useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';


const Manager = () => {
    const eyeRef = useRef();
    const passwordRef = useRef();

    const [form, setform] = useState({ url: "", username: "", password: "" });
    const [passwordArray, setpasswordArray] = useState([]);

    useEffect(() => {
        let passwords = localStorage.getItem("passwords");
        if (passwords) {
            setpasswordArray(JSON.parse(passwords));
        }
    }, [])

    const showPassword = () => {

        if (eyeRef.current.src.includes("images/hide.png")) {
            eyeRef.current.src = "images/view.png"
            passwordRef.current.type = "text";
        }
        else {
            eyeRef.current.src = "images/hide.png"
            passwordRef.current.type = "password";
        }
    }

    const savePassword = () => {

        if(form.url.length!==0 && form.username.length!==0 && form.password.length!==0) {
            setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]) //adding new creds from form data with unique id to passwordArray
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])) //saving password to local storage
            setform({ url: "", username: "", password: "" }) //populating the form with empty strings after saving password
        }
        else {
            alert("Enter credentials to save.")
        }
    }
    
    const editPassword = (id) => {
        let c=confirm("Do you really want to edit this credential?")
        if(c) {
            setform(passwordArray.filter(item => item.id===id)[0]) //populating the form with data of a particular item.id
            setpasswordArray(passwordArray.filter(item => item.id!==id)) //deleting the creds which is being edited from passwordArray, after editing on clicking save the creds will be saved again  
        }
    }
        
    const deletePassword = (id) => {
        let c=confirm("Do you really want to delete this credential?")
        if(c) {
            setpasswordArray(passwordArray.filter(item => item.id!==id)) //deleting creds from password array with unique id
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id!==id))) //updating the local storage
        }
    }

    const handleChange = (e) => {
        setform(
            {
                ...form,
                [e.target.name]: e.target.value
            })
    }

    const copyText = (item) => {
        toast.info('Copied to clipboard!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(item);
    }



    return (
        <>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <ToastContainer />

            <div className="bg-black mx-auto mt-10 max-w-4xl flex flex-col items-center justify-center">
                <h1 className='text-white text-4xl font-montserratFont font-extrabold w-full text-center' id='about'>Pass<span className='text-green-500'>Secure</span></h1>
                <p className="text-white text-2xl font-montserratFont font-semibold pt-4 pb-2 w-full text-center">Your Hassle-Free Solution for Ultimate Password Management</p>
                <div className="text-white flex flex-col p-4 gap-4 w-full">

                    <input name="url" value={form.url} onChange={handleChange} placeholder="Enter URL" className='text-black px-4 py-1 rounded-full border-green-500 border-2 w-full' type="text" />

                    <div className="flex flex-col md:flex-row gap-4 mx-auto w-full justify-between">
                        <input name="username" value={form.username} onChange={handleChange} placeholder="Enter Username" className='text-black px-4 py-1 rounded-full border-green-500 border-2 w-full' type="text" />

                        <div className="relative flex items-center md:w-1/2">
                            <input type="password" ref={passwordRef} name="password" value={form.password} onChange={handleChange} placeholder="Enter Password" className='text-black pr-7 pl-4 py-1 rounded-full border-green-500 border-2 w-full' />
                            <span className='absolute text-black right-1.5 cursor-pointer' onClick={showPassword}>
                                <img ref={eyeRef} src="images/hide.png" alt="eye" width={20} />
                            </span>
                        </div>

                    </div>

                    <button onClick={savePassword} className='text-black text-xl font-semibold flex justify-center items-center gap-2 bg-green-500 rounded-full px-4 py-2 w-fit mx-auto hover:bg-green-600'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover"
                            colors="primary:#000000">
                        </lord-icon>
                        Save
                    </button>

                </div>

                <div className="passwords text-black w-full">
                    <h2 id="creds" className='text-white text-2xl font-montserratFont font-semibold m-5 text-center'>Your Creds</h2>
                    {passwordArray.length === 0 && <div className='text-white text-2xl font-montserratFont font-semibold m-5 text-center'>No Passwords saved.</div>}
                    {passwordArray.length !== 0 && <table className="table-auto w-full rounded-md overflow-hidden">
                        <thead className='bg-green-500 border-2 border-solid border-gray-600'>
                            <tr>
                                <th className='py-2'>URL</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Passwords</th>
                                <th className='py-2'>Action</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-300 border-2 border-solid border-gray-600'>
                            {passwordArray.map((item, index) => {
                                
                                return <tr key={index} className='border border-solid border-gray-600'>

                                    <td className='text-center border-x border-gray-600'>
                                        <span className="w-full py-2"><a href={item.url} target='_blank'>{item.url}</a></span>
                                    </td>

                                    <td className='border-x border-gray-600'>
                                        <div className="text-center py-2 flex justify-center">
                                            <span className='w-full'>{item.username}</span>
                                            <img width={20} className="mr-1 cursor-pointer " src="/public/images/copy.png" alt="copy-button" onClick={() => { copyText(item.username) }} />
                                        </div>
                                    </td>

                                    <td className='border-x border-gray-600'>
                                        <div className="text-center py-2 flex justify-center">
                                            <span className='w-full'>{item.password}</span>
                                            <img width={20} className="mr-1 cursor-pointer " src="/public/images/copy.png" alt="copy-button" onClick={() => { copyText(item.password) }} />
                                        </div>
                                    </td>

                                    <td className='max-w-fit'>
                                        <div className="text-center py-2 flex justify-center gap-4">
                                            <div onClick={() => { editPassword(item.id) }} className="cursor-pointer text-center font-semibold p-2 flex justify-center border border-green-500 rounded-2xl ml-1">
                                                <span className='pr-2 h-fit'>Edit</span>
                                                <img width={20} src="/public/images/edit.png" alt="delete-button" />
                                            </div>

                                            <div onClick={() => { deletePassword(item.id) }} className="cursor-pointer text-center font-semibold p-2 flex justify-center border border-green-500 rounded-2xl mr-1">
                                                <span className='pr-2 h-fit'>Delete</span>
                                                <img width={20} src="/public/images/delete.png" alt="delete-button" />
                                            </div>
                                        </div>
                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>
                    }
                </div>

            </div>
        </>
    )
}

export default Manager
