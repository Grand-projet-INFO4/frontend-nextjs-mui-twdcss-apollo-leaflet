import '../css/index.css'
export default function Index() {
    return (
        <div>
            <nav className="grid grid-cols-2 w-full h-14 bg-[#156d95] fixed">
                <div className="w-full h-full flex justify-start items-center">
                    <h1 className='text-center'>Zaha-dia</h1>
                </div>
                <div className="w-full h-full flex justify-start items-center">
                    <ul className='flex space-x-4'>
                        <li>
                            <a>Meilleur Destination</a>
                        </li>

                        <li>
                            <a>Meilleur Destination</a>
                        </li>

                        <li>
                            <a>Meilleur Destination</a>
                        </li>
                        <li>
                            <a>Meilleur Destination</a>
                        </li>
                    </ul>
                 </div>
             </nav>
        </div>
    )
}