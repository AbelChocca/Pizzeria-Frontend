import { useState } from 'react'

type MenuProps = {
  logout: () => void;
};

const Menu = ({ logout }: MenuProps) => {
  const [pressed, setPressed] =  useState<boolean>(false);

  return (
    <div className='relative'>
        <button onClick={() => setPressed(!pressed)} className='cursor-pointer' >
            <img src='https://cdn.iconscout.com/icon/free/png-256/free-user-icon-download-in-svg-png-gif-file-formats--account-profile-ui-basic-needs-pack-interface-icons-528036.png?f=webp' alt='UserIcon' className='w-8 h-8' />
        </button>
        {pressed && (
            <div className='flex flex-col absolute bg-white items-center h-auto p-3'>
                <button onClick={logout}>Cerrar sessión</button>
            </div>
        )}
    </div>
  )
}

export default Menu
