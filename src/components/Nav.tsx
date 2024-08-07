"use client";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IBaseComponent } from '@/interfaces/IBaseComponent';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import React, { memo } from 'react';
import lazy from 'next/dynamic';
import './styles/Nav.scss';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";


const Button = lazy(() => import('./Button'), { ssr: false });
const Logo = lazy(() => import('./Logo'), { ssr: false });

const Nav: React.FC<IBaseComponent> = ({ className }) => {
	const hamburger = <FontAwesomeIcon className='size-[1.5rem] transition-all hover:opacity-50' color='white' icon={faBars}/>;
	const galleryUrl = "https://www.flickr.com/photos/usforestservice/albums/72157669003030369/with/39389119024";
	const aboutUrl = "https://www.recreation.gov/about-us";
	
	const aTagHover = "transition-all hover:opacity-50";
	const home = <a target='_blank' className={ aTagHover } href="/">Home</a>;
	const gallery = <a target='_blank' className={ aTagHover } href={ galleryUrl }>Gallery</a>;
	const about = <a target='_blank' className={ aTagHover } href={ aboutUrl }>About</a>;
	const signIn = <a target='_blank' href="/signin">Sign In</a>;

	return (
		<nav className={`Nav w-full flex flex-row items-center justify-between ${className ?? ''}`}>
			<Logo className='text-[length:--h3]'/>
			<ul>
				<li className='flex flex-row gap-[5rem] text-sm text-white'>
					{ home } { gallery } { about }
				</li>
			</ul>
			<div className="Hamburger">
				<DropdownMenu>
					<DropdownMenuTrigger>{ hamburger }</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>{ signIn }</DropdownMenuItem>
						<DropdownMenuItem>{ home } </DropdownMenuItem>
						<DropdownMenuItem>{ gallery }</DropdownMenuItem>
						<DropdownMenuItem>{ about }</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<Button variant="outline">{ signIn }</Button>
		</nav>
	)
}

const MemoNav = memo(Nav);
MemoNav.displayName = "Nav";

export default MemoNav;