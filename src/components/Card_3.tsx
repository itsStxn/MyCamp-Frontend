"use client";

import { ICard_1 } from '@/interfaces/ICard_1'
import React, { memo } from 'react'
import "./styles/Card_3.scss";


const Card_3: React.FC<ICard_1> = ({ className, title, Icon }) => {
	return (
		<div 
		className={`Card_3 relative text-center justify-center shadow-2xl box-border p-2 rounded-xl flex flex-col gap 
		items-center bg-[--color-bg-dark] fill-[--color-main-2] hover:opacity-[.9] hover:cursor-pointer transition-all ${className ?? ''}`}>
			<Icon className='shadow-2xl rounded-lg p-4 box-content' width="3.5rem" height="3.5rem" />
			<h3 className='text-[length:--h2] strong'>{ title }</h3>
		</div>
	)
}

const MemoCard_3 = memo(Card_3);
MemoCard_3.displayName = "Card_3";

export default MemoCard_3;