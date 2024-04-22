import React from 'react'
import { useNavigate } from 'react-router'


function EditProfile() {
    const navigate = useNavigate()

  return (
    <React.Fragment>
        <form className=' bg-white px-3 py-2 md:px-10 md:py-8 rounded-md'>
            <div action="" className=' py-2 flex flex-col gap-3 '>
                <label htmlFor="" className=' space-y-2'>
                    <p className=' text-sm font-light'>First name</p>
                        <input type="text" className=' w-full outline-none border-gray-300 border-[1px] rounded-md bg-white p-1' placeholder='James' />
                </label>
                <label htmlFor="" className=' space-y-2'>
                    <p  className=' text-sm font-light'>Last name</p>
                    <input className=' w-full px-2 py-2 border-[1px] border-gray-300 rounded-md  outline-none bg-white p-1' type="text" placeholder='Jacobs' />
                </label>
                <section className=' md:col-span-3 sm:grid sm:grid-cols-2 md:gap-6 flex flex-col w-full gap-3'>
                    <label htmlFor="" className=' space-y-2'>
                        <p className=' text-sm font-light'>Phone number</p>
                        <input className=' w-full px-2 py-1 border-[1px] border-gray-300 rounded-md  outline-none bg-white p-1' type="text" placeholder='08000000000'/>
                    </label>
                    <label htmlFor="" className=' space-y-2'>
                        <p className=' text-sm font-light'>Email address</p>
                        <input className=' w-full px-2 py-1 border-[1px] border-gray-300 rounded-md  outline-none bg-white p-1' type="text" placeholder='myemail@gmail.com'/>
                    </label>
                </section>
            </div>
            <section className=' space-y-3 md:grid-cols-2 grid-cols-1 grid pb-5  justify-between md:items-center'>
                <label htmlFor="" className=' space-y-2'>
                    <p className=' text-sm font-light'>City </p>
                    <input className='sm:w-64 md:w-52 lg:w-72 w-full px-2 py-1 border-[1px] border-gray-300 rounded-md  outline-none bg-white p-1' type="text" placeholder='Enter city'/>
                </label>
                <label htmlFor="" className=' space-y-2'>
                    <p className=' text-sm font-light'>State</p>
                    <select name="" id="" className='w-full px-2 py-1 border-[1px] border-gray-300 rounded-md  outline-none bg-white p-1'>
                        <option value="">Select State</option>
                    </select>
                </label>
            </section><br />
            <section className=' pb-5  md:grid md:grid-cols-2 space-y-4 flex flex-col justify-between md:items-center'>
                <label htmlFor="" className=' space-y-2'>
                    <p className=' text-sm font-light'>Password </p>
                    <input className='sm:w-64 md:w-52 lg:w-72 w-full px-2 py-1 border-[1px] border-gray-300 rounded-md  outline-none bg-white p-1' type="text" placeholder='Enter city'/>
                </label>
                <label htmlFor="" className=' space-y-2'>
                    <p className=' text-sm font-light'>Confirm password</p>
                    <input className='sm:w-64 md:w-52 lg:w-72 w-full px-2 py-1 border-[1px] border-gray-300 rounded-md  outline-none bg-white p-1' type="text" placeholder='Confirm password'/>
                </label>
            </section>
            <section className=' py-5 flex justify-between'>
                <button onClick={()=>{navigate("/seller/profile")}} className=' rounded-md border-[1px] border-green-800 text-green-800 px-3 py-1'>Cancel</button>
                <button className=' rounded-md bg-green-800 text-white px-3 py-1'>Save Changes</button>
            </section>
        </form>
        
    </React.Fragment>
  )
}

export default EditProfile