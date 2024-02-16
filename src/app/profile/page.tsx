"use server";

import React from 'react'
import Image from 'next/image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram, faSteam } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot } from '@fortawesome/free-solid-svg-icons'

export default async function Profile(){
    
    return (
            <div className='flex flex-row h-screen w-screen p-8'>

                <div className='flex flex-col i'>
                    <Image src='/profile-pictures/defaultUser.jpg' className='rounded-full' alt='Google' width={150} height={150} />
                    <h1 className='text-2xl font-bold'>Doug Dimmadome</h1>
                    <p className='text-sm'><span className='text-gray-500'>@</span>dDimma</p>
                    <p className='text-sm'>Hey! My name is Doug Dimmadome and I like videogames!</p>
                    <button className='max-w-max max-w-max'>Edit:</button>
                    <div className='flex flex-row items-center'><FontAwesomeIcon icon={faLocationDot} style={{color: "#606060",}} className='w-6' /><div className='m-4'>Miami</div></div>
                    <div className='flex flex-row items-center'><FontAwesomeIcon icon={faInstagram} style={{color: "#606060",}} className='w-6'/><div className='m-4'>@dDimma</div></div>
                    <div className='flex flex-row items-center'><FontAwesomeIcon icon={faSteam} style={{color: "#606060",}} className='w-6' /><div className='m-4'>dDimma</div></div>

                </div>

                <div className='flex flex-col h-screen items-center w-8/12'>
                    <h1 className='text-2xl font-bold'>Reviews:</h1>
                    {/* <Review />
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                    <Review />
                    <Review /> */}
                </div>

            </div>
    );
};