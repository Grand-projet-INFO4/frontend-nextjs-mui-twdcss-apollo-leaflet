import Image from 'next/image';
import '../css/login.css';
// @ts-ignore
import picture from '../assets/cover2.png';
// @ts-ignore
import picture2 from '../assets/cover3.png'
//@ts-ignore
//import rectangle from '../assets/square.png'

export default function Login() {
    return (
        // <div className=' mx-auto w-full p-4 bg-white' style={{
        //     backgroundImage: `url(${rectangle.src})`,
        //     backgroundSize:'cover',
        //     backgroundRepeat:'no-repeat',
        //     width: '75%',
           
        // }}>
            <div className="mx-auto mt-24 w-[75%] h-auto grid grid-cols-1 bg-white shadow-lg  md:grid-cols-2 ">
             <div className="img-section relative w-full h-auto carousel  bg-white ">
                <div className=' w-full flex items-center justify-center carousel-item'>
                     <Image src={picture} alt="login-picture" className='w-[80%] h-[80%]'/>
                </div>
                <div className='w-full flex items-center justify-center carousel-item'>
                     <Image src={picture2} alt="login-picture" className='w-[80%] h-[80%]'/>
                </div>
            </div>
            <div className="w-auto h-auto p-4 flex flex-col bg-white">
                <div className='row-span-1 flex flex-[0.2] justify-center items-center bg-white'>
                     <h1 className='text-center'>Zaha-dia</h1>
                </div>
                <div className='flex-[0.8]  w-full bg-white'>
                      <form className='mx-auto'>
                            <div className='mb-5'>
                                <label className="block text-gray-700" htmlFor="email">
                                    Adresse email
                                </label>
                                <div className='flex justify-between items-center p-4 w-[90%] h-11 bg-white shadow-md appearance-none border rounded'>
                                    <i className='fa fa-id-badge text-2xl'></i>
                                    <input id="email" type='mail' className='w-[90%] h-11 border-t border-b outline-none'/>
                                </div>
                            </div>
                             <div className='mb-5'>
                                <label className="block text-gray-700  " htmlFor="password">
                                   Mot de passe
                                </label>
                            <div className='flex justify-between items-center p-3 w-[90%] h-11 bg-white shadow-md appearance-none border rounded'>
                                    <i className='fa fa-lock text-2xl'></i>
                                    <input id="password" type='password' className='w-[90%] h-11 border-t border-b outline-none' />
                                </div>
                            </div>

                            <div className='mb-5'>
                                 <button className='w-[90%] h-11 bg-[#156d95] border rounded-sm  text-white' type='button'>Se connecter</button>
                             </div>
                        </form>
                </div>
            </div>
        </div>
        //  </div>
       
    )
}