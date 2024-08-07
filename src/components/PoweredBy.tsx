"use client";

import { IBaseComponent } from '@/interfaces/IBaseComponent';
import React, { memo } from 'react';


const PoweredBy: React.FC<IBaseComponent> = ({ className  }) => {
	return (
		<div className={`PoweredBy w-[80%] m-auto flex flex-wrap justify-center gap-5 ${className ?? ''}`}>
			<h1><strong className="strong">Powered</strong> by</h1>
			<img className='object-contain w-[30rem]' src="/RecLogo_Rev.png" alt="Recreation.gov logo"/>
		</div>
	)
}

const MemoPoweredBy = memo(PoweredBy);
MemoPoweredBy.displayName = 'PoweredBy';

export default MemoPoweredBy;