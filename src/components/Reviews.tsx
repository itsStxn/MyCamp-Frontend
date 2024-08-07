"use client";

import { IBaseComponent } from '@/interfaces/IBaseComponent';
import { testimonials } from '@/assets/ts/constants';
import { Carousel } from 'primereact/carousel';
import { ICard_2 } from '@/interfaces/ICard_2';
import React, { memo } from 'react';
import lazy from 'next/dynamic';
import './styles/Reviews.scss';


const Card_2 = lazy(() => import('./Card_2'), {ssr: false});

const Reviews: React.FC<IBaseComponent> = ({ className }) => {
	const responsiveOptions = [
		{
			breakpoint: '991px',
			numVisible: 3,
			numScroll: 1
		},
		{
			breakpoint: '750px',
			numVisible: 3,
			numScroll: 1
		}
	];
	const template: React.FC<ICard_2> = ({ fullname, src, message }) => {
		return <Card_2 className='w-[90%] m-auto' message={message} fullname={fullname} src={src}/>;
	}
	return (
		<div className={`Reviews box-border pl-[--padding] flex w-full h-fit ${className ?? ''}`}>
			<div className='title w-[40%] flex self-center items-center justify-center h-[20rem]'>
				<h1><strong className="strong">Words</strong> from<br/> fellow <strong className="strong">campers</strong></h1>
			</div>
			<div className='cards flex justify-start w-[60%] overflow-hidden h-fit'>
				<Carousel 
					numVisible={3} numScroll={1} 
					className='carousel w-[70rem] h-fit stroke-2 stroke-white' responsiveOptions={responsiveOptions}
					value={ testimonials } itemTemplate={ template } autoplayInterval={6000}/>
			</div>
		</div>
	)
}

const MemoReviews = memo(Reviews);
MemoReviews.displayName = 'Reviews';

export default MemoReviews;