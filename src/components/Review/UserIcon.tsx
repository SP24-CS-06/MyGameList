import { generateUserLink } from '@/lib/link';
import Image from 'next/image';
import React from 'react'

type Props = {
  userLink: string;
  userImg: string;
}

const UserIcon = (props: Props) => {
  return (
    <a href={props.userLink} className=''>
      <Image width={48} height={48} alt={`Profile Picture`} className='rounded-full min-w-[48px] min-h-[48px]' src={props.userImg}/>
    </a>
  )
}

export default UserIcon