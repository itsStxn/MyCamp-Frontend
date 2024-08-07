
import { IFacilityCard } from '@/interfaces/IFacilityCard';
import React from 'react';


const FacilityCard: React.FC<IFacilityCard> = ({ className, description, src, title, info }) => {
	return (
		<div className={`FacilityCard shadow-2xl flex flex-col justify-end overflow-hidden relative w-[20rem] h-[25rem] rounded-2xl ${className ?? ''}`}>
			<img src={ src } alt="Facility pic" className='absolute top-0 left-0 w-full h-full z-[-1]' />
			<div className='flex flex-col gap-[1rem] items-center  w-full h-[55%] backdrop-blur-md'>
				<div className="w-full flex items-center justify-between box-border py-2 px-3">
					<h2>{ title }</h2>
					<div className='size-[3rem] rounded-full bg-slate-50'></div>
				</div>
				<div className=' w-[90%] h-[52%] text-[length:--small-text] overflow-hidden  line-clamp-6'>
					{ description }
				</div>
			</div>
		</div>
	)
}

export default FacilityCard