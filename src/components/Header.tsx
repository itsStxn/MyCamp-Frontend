"use client";

import { IBaseComponent } from '@/interfaces/IBaseComponent';
import React, { memo } from 'react';
import lazy from 'next/dynamic';
import './styles/Header.scss';

const Hero = lazy(() => import('./Hero'), {ssr: false});
const Nav = lazy(() => import('./Nav'), {ssr: false});

const Header: React.FC<IBaseComponent> = ({ className }) => {
	return (
		<header 
		className={`Header overflow-hidden relative shadow-2xl box-border p-[--padding] rounded-br-[10%]
		rounded-bl-[10%] w-full font-["Switzer-Variable"] flex flex-col ${className ?? ''}`}>
			<Nav/>
			<Hero/>
		</header>
	)
}

const MemoHeader = memo(Header);
MemoHeader.displayName = "Header"; 

export default MemoHeader;