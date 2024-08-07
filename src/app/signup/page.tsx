"use client";

import CircularProgress from '@mui/material/CircularProgress';
import { IBaseComponent } from '@/interfaces/IBaseComponent';
import { useRouter, useSearchParams } from 'next/navigation';
import { memo, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReqSignUp } from "@/interfaces/api/ISignUp";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axiosUtil from '@/utils/axiosUtil';
import { Toast } from 'primereact/toast';
import lazy from 'next/dynamic';
import { z } from "zod";
import "./SignUp.scss";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";


const Button = lazy(() => import('@/components/Button'), { ssr: false });
const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[!@#*?])(?=.*[A-Z])(?=.*[a-z]).*[^\s\'";$%<>|`^~\\\\]+$');

const FormSchema = z.object({
  name: z.string()
				.min(2, { message: "Field must be filled" })
				.regex(/^[a-zA-Z\s]+$/, { message: "Name must be valid" })
				.max(15, { message: "Name must be less than 15 characters" }),
  surname: z.string()
						.min(2, { message: "Field must be filled" })
						.regex(/^[a-zA-Z\s]+$/, { message: "Surname must be valid" })
						.max(15, { message: "Surname must be less than 15 characters" }),
	email: z.string()
					.min(2, { message: "Field must be filled" })
					.email({ message: "Email must be valid" })
					.max(25, { message: "Email must be less than 25 characters" }),
	username: z.string()
						.min(2, { message: "Field must be filled" })
						.regex(/^[a-zA-Z\s0-9_]+$/, { message: "Username can only contain letters, numbers and underscores" })
						.max(10, { message: "Username must be less than 10 characters" }),
	password: z.string()
						.min(2, { message: "Field must be filled" })
						.regex(passwordRegex, { message: "At least 1 uppercase, 1 lowercase, 1 number, 1 special character" })
						.min(8, { message: "Password must be at least 8 characters" }),
	confirmPassword: z.string()
						.min(2, { message: "Field must be filled" })
						.regex(passwordRegex, { message: "At least 1 uppercase, 1 lowercase, 1 number, 1 special character" })
						.min(8, { message: "Password must be at least 8 characters" })
}).superRefine(({ confirmPassword, password }, ctx) => {
  if (confirmPassword !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['confirmPassword']
    });
  }
});

const SignUp: React.FC<IBaseComponent> = ({ className }) => {
	const router = useRouter();
  let searchParams = useSearchParams();
	const name = searchParams.get("name");
	const surname = searchParams.get("surname");
	const email = searchParams.get("email");
	const username = searchParams.get("username");

	const profilePics = [
		"/profile_pics/pic (1).png",
		"/profile_pics/pic (2).png",
		"/profile_pics/pic (3).png",
		"/profile_pics/pic (4).png",
		"/profile_pics/pic (5).png",
	]
	
	const [picId, setPicId] = useState(1);
  const [loading, setLoading] = useState(false);
	const toast = useRef<Toast>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  })
	
	const changePic = () => {
		if (picId === profilePics.length) {
			setPicId(1);
		} else {
			setPicId(picId + 1);
		}
	}

  const show = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const request: ReqSignUp = {
			email: data.email,
			name: data.name,
			surname: data.surname,
			username: data.username,
			password: data.password,
			profilePicID: picId,
			active: false
    }

		try {
			const res = await axiosUtil.post("/AuthUsers/signup", request);
			console.log(res.data);
			toast.current?.show({ severity: 'success', summary: res.data, detail: 'Please check your email to activate your account.' });
			setTimeout(() => router.push("/"), 3000);
		} catch (e: any) {
			toast.current?.show({ severity: 'error', summary: 'Registration failed', detail: e.response.data });
			router.push(`/signup?name=${data.name}&surname=${data.surname}&email=${data.email}&username=${data.username}`);
		} finally {
			setLoading(false);
		}
  }

	useEffect(() => {
		form.setValue("name", name ?? "");
		form.setValue("surname", surname ?? "");
		form.setValue("email", email ?? '');
		form.setValue("username", username ?? '');
	}, [])

  return (
		<>
			<a href="/">
				<Button className="home hover:bg-[--color-bg-dark] hover:opacity-[.8] ml-[--padding] 
				mt-[--padding] bg-[--color-bg-dark] text-white" variant="rounded">Back to home</Button>
			</a>
			<div className={`SignUp my-[10rem] w-full h-[50rem] px-[--padding] flex justify-center items-center ${className ?? ''}`}>
				<div className="deco h-full w-[32.5%] flex items-center justify-center text-white rounded-tl-lg rounded-bl-lg 
				bg-gradient-to-br from-[--color-main-1] to-[--color-main-2] font-thin">
					<h1 className="text-[length:--hero-title]">Become<br/>a<strong className="font-extrabold"> camper</strong></h1>
				</div>
				<Form {...form}>
					<Toast ref={toast} />
					<form 
					onSubmit={form.handleSubmit(show)} 
					className="form w-[30rem] h-full rounded-tr-lg rounded-br-lg outline-none flex flex-col 
					gap-[1rem] bg-transparent backdrop-blur-md box-border py-[48px] px-[32px] shadow-lg">
						<img 
						onClick={ changePic }
						src={profilePics[picId-1]} 
						className="profilePic size-[10rem] object-contain transition-all hover:cursor-pointer hover:opacity-50 
						rounded-full border-white border-[.25rem] shadow-lg bg-yellow-300 m-auto" />
						<div className="names flex w-full gap-[1rem]">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input className='input' placeholder="Name" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="surname"
								render={({ field }) => (
									<FormItem>
										<FormControl>
											<Input className='input' placeholder="Surname" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='input' placeholder="Email" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='input' placeholder="Username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='input mt-7' type="password" placeholder="Password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="confirmPassword"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='input' type="password" placeholder="Confirm Password" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						{loading
						? <CircularProgress color='primary' className="m-auto mt-5" /> 
						: <Button className='w-[10rem] m-auto mt-5' variant='filled' type="submit">Submit</Button>}
					</form>
				</Form>
			</div>
		</>
  )
}

export default SignUp;