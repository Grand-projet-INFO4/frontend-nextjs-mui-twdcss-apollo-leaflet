import Image from 'next/image';
import './login.css';
import picture from '../../image/34533-business-team.gif'
export default function Login() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 w-[75%] h-auto bg-white shadow-md mx-auto mt-10">
            <div className="flex justify-center w-auto">
               <Image src={picture} alt="login-picture" className='w-auto h-full pct'/>
            </div>
            <div className="w-auto h-full bg-white">
                <h4 className='font-sans justify-center text-center'>Welcome back</h4>
                <div className='w-full h-auto grid-cols-1 md:grid grid-rows-2 gap-4 mt-3'>
                    <div className='flex flex-col'>
                        <label className='font-sans'>Email</label>
                        <input type="mail" className='w-[90%] h-9 mt-4 px-2 outline-none rounded-sm bg-white shadow-md'/>
                     </div>
                     <div className='flex flex-col'>
                        <label className='font-sans'>Password</label>
                        <input type="password" className='w-[90%] h-9 mt-4 px-2 outline-none rounded-sm bg-white shadow-md'/>
                    </div>
                    <h6 className='font-sans justify-center text-center'>Forget password ?</h6>
                </div>
                <button className='w-[90%] h-9 mt-4 px-2 rounded-sm text-white bg-blue-400'>Login</button>
            </div>
        </div>
    )
}