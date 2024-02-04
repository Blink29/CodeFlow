import React from 'react'
import NavDropDown from '../NavDropDownComponent/NavDropDown';
import './NavBar.scss'

type Props = {
    title: string,
    config?: {
        name: string,
        type: string,
        items?: {
            name: string,
            type: string
        }[]
    }
}

const NavBar = ({title, config}: Props) => {
  return (
    <div className='nav-container basis-1/5 bg-slate-900 text-white max-h-full'>
        {/* header */}
        <div className='bg-cyan-500 text-center py-10 text-2xl'>
            {title}
        </div>

        <div className='text-cyan-200 p-4 border-b text-xs font-bold'>
            CONTENTS
        </div>

        {/* content */}
        <div>
            <NavDropDown config={config} />
        </div>
    </div>
  )
}

export default NavBar