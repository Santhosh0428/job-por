import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from './ui/button'
import { SignedIn, SignedOut, SignIn, SignInButton, UserButton, useUser } from '@clerk/clerk-react'
import { BriefcaseBusiness, Heart, PenBox } from 'lucide-react'

const Head = () => {
  const [signIn,setSignIn]=useState(false);
  const [find,setFind]=useSearchParams();
  const {user} =useUser();
  useEffect(()=>{
    if(find.get('sign-in')){
      setSignIn(true);
    }
  },[find]);



   const handle=(e)=>{
    if(e.target === e.currentTarget){
      setSignIn(false);
      setFind({});
    }
   };
  return (
    <>
    <nav className='py-4 flex justify-between items-center'>
      <Link>
       <img src="/logo.webp" alt="" className='h-20'/>
      </Link>

      <div className='flex gap-8'>
      <SignedOut>
      <Button variant="outline" onClick={()=>setSignIn(true)}>Login</Button>
      </SignedOut>
      <SignedIn>

        {user?.unsafeMetadata?.role==="recruiter" && (
        <Link to='/post-job'>
        <Button variant="red" className='rounded-full'>
        <PenBox size={20} className='mr-2'></PenBox>
          Post Job
        </Button>
        </Link>)
        }
      <UserButton appearance={{
        elements:{
          avatarBox:"w-10 h-10"
        }
      }}>
        <UserButton.MenuItems>
          <UserButton.Link 
            label='My Jobs'
            labelIcon={<BriefcaseBusiness size={15} />}
            href='/myjobs'
          />
          <UserButton.Link 
            label='Saved Jobs'
            labelIcon={<Heart size={15} />}
            href='/save'
          />
        </UserButton.MenuItems>
      </UserButton>
      </SignedIn>
      </div>
    </nav>
    {signIn && <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handle}>
      <SignIn signUpForceRedirectUrl='/onboard' fallbackRedirectUrl='/onboard'>

      </SignIn>
      
      </div>
      
      }

    </>
    
  )
}

export default Head
