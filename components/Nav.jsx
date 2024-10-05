"use client"

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { signIn, signOut, useSession, 
  getProviders } from 'next-auth/react'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import { set } from 'mongoose'

const Nav = () => {
  const isUserLoggedIn = true
  const [providers, setProviders] = useState(null);
  const [toggleDropDown, setToggleDropDown] = useState(false)

  useEffect(() => {
    const setProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    setProviders();
  }, []);
  
  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href="/" className='flex gap-2 flex-center'>
        <Image
        src="/assets/images/logo.svg" 
        alt='promptopia logo'
        width={30}
        height={30}
        className='object-contain'
        />
        <p className='font-satoshi logo_text font-semibold'>Promtopia</p> 
      </Link>
      {/* desktop navigation */}
      <div className='sm:flex hidden'>
        {isUserLoggedIn? (
          <div className='flex gap-3 md:gap-5'>
            <Link href="/create-prompt" 
            className='btn black_btn'>
              Create Post
            </Link>
            <button type='button' onClick={signOut} 
            className='outline_btn'>
               Sign Out
            </button>
            <Link href="/profile" className="flex gap-2 flex-center">
              <Image
                src="/assets/image/logo.svg"
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
              />
            </Link>
          </div>
        ): (
          <>
            {providers && Object.values(providers).map((provider)=>(
              <button type='button'
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'>
                Sign In with {provider.name}
              </button>
            ))}
          </>
        )
      }
      </div>

      {/* mobile navigation */}
      <div className='sm:hidden flex relative'>
        {isUserLoggedIn ? (
          <div className='flex'>
            <Image
              src="/assets/images/logo.svg"
              width={37}
              height={37}
              className='rounded-full'
              alt='profile'
              onClick={ ()=> setToggleDropDown((prev)=> !prev) }
              />

              { toggleDropDown && (
                <div className='dropdown shadow-lg'>
                  <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={()=> setToggleDropDown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href='/create-prompt'
                    className='dropdown_link'
                    onClick={()=> setToggleDropDown(false)}
                  >
                    Create Prompt
                  </Link>
                  <button 
                    className='mt-5 w-full black_btn'
                    type="button"
                    onClick={()=> {
                      signOut();
                      setToggleDropDown(false);
                  }}
                  >
                    Sign Out
                  </button>
                </div>
              )}
          </div>
        ):(
          <>
            {providers && Object.values(providers).map((provider)=>(
              <button type='button'
              key={provider.name}
              onClick={() => signIn(provider.id)}
              className='black_btn'>
                Sign In with {provider.name}
              </button>
            ))}
          </>
        )}
      </div>

    </nav>
  )
}

export default Nav