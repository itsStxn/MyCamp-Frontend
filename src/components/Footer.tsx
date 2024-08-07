"use client";

import { IBaseComponent } from '@/interfaces/IBaseComponent';
import { Instagram, TikTok, Facebook } from '@/assets/svg';
import React, { memo } from 'react';
import "./styles/Footer.scss";


const Footer: React.FC<IBaseComponent> = ({ className }) => {
	return (
		<footer className={`Footer text-black flex flex-col items-center justify-center w-full h-fit pb-[10rem] pt-[5rem] box-border ${className ?? ''}`} >
			<div className='w-[80%] gap-[4rem] p-[--padding] h-fit flex flex-col items-center rounded-3xl backdrop-blur-md shadow-2xl'>
				<div className="flex gap-[2rem] flex-wrap justify-center w-full h-fit">
					<div className="flex flex-wrap flex-1 h-fit justify-center gap-[1rem]">
						<div className="section">
							<h1>MyCamp is everywhere you want to camp</h1>
							<p>
								Get in touch with nature in one of our recommended natural sites and  discover unique experiences on public 
								campgrounds across the U.S. Book with you friends, girlfriend, family, anyone. The more, the merrier!
							</p>
						</div>
						<div className="section">
							<h1>Perfect Escape</h1>
							<p>
								At MyCamp, we believe in the magic of the great outdoors. Our mission is to provide an unforgettable camping experience 
								where guests can unwind, explore, and connect with nature. Whether you’re seeking adventure or tranquility, 
								our campsites offer the perfect escape.
							</p>
						</div>
						<div className="section">
							<h1>Contact Us</h1>
							<p>
								Have questions or need assistance with your booking? Our friendly team is here to help! Reach out to us anytime 
								at support@mycamp.com or call us at (123) 456-7890. We look forward to helping you plan your perfect outdoor getaway.
							</p>
						</div>
						<div className="section">
							<h1>Stay Connected</h1>
							<p>
								Get in touch with nature in one of our recommended natural sites and  discover unique experiences on public campgrounds 
								across the U.S. Book with you friends, girlfriend, family, anyone. The more, the merrier!
							</p>
						</div>
					</div>
					<div className="flex w-fit h-fit gap-[1rem] justify-center">
						<a href="/"><TikTok className="w-[2.5rem] h-[2.5rem]" /></a>
						<a href="/"><Facebook className="w-[2.5rem] h-[2.5rem]" /></a>
						<a href="/"><Instagram className="w-[2.5rem] h-[2.5rem]" /></a>
					</div>
				</div>
				<pre className='text-[12px]'>© 2024 All rights reserved</pre>
			</div>
		</footer>
	)
}

const MemoFooter = memo(Footer);
MemoFooter.displayName = "Footer";

export default MemoFooter