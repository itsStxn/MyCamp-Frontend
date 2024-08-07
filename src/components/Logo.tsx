"use client";

import { IBaseComponent } from '@/interfaces/IBaseComponent';
import React, { memo } from 'react';


const Logo: React.FC<IBaseComponent> = ({ className }) => {
	return (
		<a href='/'
			className={`Logo text-white font-thin ${className ?? ''}`}
			style={{ textShadow: 'rgba(0, 0, 0, 0.300) 0.2rem 0.2rem 0.2rem' }}>
			My<strong className='font-bold'>Camp</strong>
		</a>
	)
}

const MemoLogo = memo(Logo);
MemoLogo.displayName = 'Logo';

export default MemoLogo;