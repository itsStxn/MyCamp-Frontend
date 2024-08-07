"use client";

import React, { memo } from 'react';
import lazy from 'next/dynamic';
import "./styles/Main.scss";


const PicsLazy = lazy(() => import('./Pics'), {ssr: false});
const ReviewsLazy = lazy(() => import('./Reviews'), {ssr: false});
const PoweredByLazy = lazy(() => import('./PoweredBy'), {ssr: false});
const ContactUsLazy = lazy(() => import('./ContactUs'), {ssr: false});

const Main = () => {
	return (
		<main className='Main'>
			<PicsLazy className={`mt-[20rem]`}/>
			<ReviewsLazy className={`mt-[20rem]`}/>
			<PoweredByLazy className={`mt-[20rem]`}/>
			<ContactUsLazy className={`mt-[20rem]`}/>
		</main>
	)
}

const MemoMain = memo(Main);
MemoMain.displayName = 'Main';

export default MemoMain;