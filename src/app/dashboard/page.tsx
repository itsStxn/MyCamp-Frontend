"use client";

import { IBaseComponent } from '@/interfaces/IBaseComponent';
import { useAuth } from '@/contexts/AuthContext';
import { Book, Heart, Map, Edit } from '@/assets/svg';
import lazy from 'next/dynamic';
import React from 'react';


const Card_3 = lazy(() => import('@/components/Card_3'), { ssr: false });

const Dashboard: React.FC<IBaseComponent> = ({ className }) => {
	const { user } = useAuth();
	const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
	const name = capitalize(user?.name as string);

	return (
		<div className={`Dashboard flex flex-col items-center gap-[10rem] ${className ?? ''}`}>
			<div className="flex flex-col w-[70rem] items-center gap-10 mt-[10rem]">
				<h1 className='w-fit self-start'>
					<strong className="strong">Hey { name },</strong>
					<br />  Welcome to Your <strong className="strong">Dashboard</strong>
				</h1>
				<h3  className='w-[100%] text-[length:--h6] text-white font-["Satoshi-Variable"]'>
					Your personal hub for your camping adventures. Here you can manage your bookings and
					discover new destinations. Customize your profile, track your reservations and find all the
					information you need for a seemless camping experience. Happy camping!
				</h3>
			</div>
			<div className='mb-[15rem] flex flex-wrap gap-3 justify-center w-[60%] h-fit'>
				<a href='/dashboard/facilities'><Card_3 className='size-[20rem]' title='Explore Facilities' Icon={Map}/></a>
				<a href='/dashboard/reservations'><Card_3 className='size-[20rem]' title='Manage Reservations' Icon={Book}/></a>
				<a href='/dashboard/favorites'><Card_3 className='size-[20rem]' title='Saved Favorites' Icon={Heart}/></a>
				<a href='/dashboard/edit'><Card_3 className='size-[20rem]' title='Edit Profile' Icon={Edit}/></a>
			</div>
		</div>
	)
}


export default Dashboard