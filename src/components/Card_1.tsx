"use client";

import { ICard_1 } from '@/interfaces/ICard_1';
import React, { memo } from 'react';
import './styles/Card_1.scss';

const Card_1: React.FC<ICard_1> = ({ className, title, Icon, children }) => {
	return (
		<div 
		className={`Card_1 box-border text-white backdrop-blur-md rounded-[1.5rem] p-[16px] gap-5 w-[18rem]
		h-[17rem] bg-[#f9f9f980] flex flex-col justify-center items-center text-center ${className ?? ''}`}>
			<Icon color='white' className='stroke-white opacity-65' width="3rem" height="3rem"/>
			<h5 className='text-[length:--h5] font-bold'>{ title }</h5>
			<div className='text-[length:--small-text]'>
				{ children }
			</div>
		</div>
	);
}

const MemoCard_1 = memo(Card_1);
MemoCard_1.displayName = "Card_1";

export default MemoCard_1;