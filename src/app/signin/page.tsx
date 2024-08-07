"use client";

import CircularProgress from '@mui/material/CircularProgress';
import { IBaseComponent } from '@/interfaces/IBaseComponent';
import { memo, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReqSignIn } from "@/interfaces/api/ISignIn";
import { useAuth } from '@/contexts/AuthContext';
import { Input } from "@/components/ui/input";
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form";
import axiosUtil from '@/utils/axiosUtil';
import { Toast } from 'primereact/toast';
import lazy from 'next/dynamic';
import { z } from "zod";
import "./SignIn.scss";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { IUser } from '@/interfaces/api/IUser';

const Button = lazy(() => import('@/components/Button'), { ssr: false });
const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[!@#*?])(?=.*[A-Z])(?=.*[a-z]).*[^\s\'";$%<>|`^~\\\\]+$');

const FormSchema = z.object({
	identifier: z.string()
						.min(2, { message: "Field must be filled" })
						.regex(/^[a-zA-Z\s0-9_@\.]+$/, { message: "Must be a username or email" })
						.max(25, { message: "Field must be less than 10 characters" }),
	password: z.string()
						.min(2, { message: "Field must be filled" })
						.regex(passwordRegex, { message: "At least 1 uppercase, 1 lowercase, 1 number, 1 special character" })
						.min(8, { message: "Password must be at least 8 characters" })
});

const SignIn: React.FC<IBaseComponent> = ({ className }) => {
	const { login } = useAuth();
	const router = useRouter();
  const [loading, setLoading] = useState(false);
	const toast = useRef<Toast>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema)
  });

  const show = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const request: ReqSignIn = {
			email: data.identifier,
			username: data.identifier,
			password: data.password
    }

		try {
			const res = await axiosUtil.post("/AuthUsers/Login", request);
			toast.current?.show({ severity: 'success', summary: "Logging in", detail: 'Redirecting to the dashboard' });
			const { jwt, user } = res.data;
			login(user, jwt);
			setTimeout(() => router.push("/dashboard"), 3000);
		} catch (e: any) {
			toast.current?.show({ severity: 'error', summary: 'Wrong credentials', detail: e.response.data });
		} finally {
			setLoading(false);
		}
  }

  return (
		<>
			<a href="/">
				<Button className="home hover:bg-[--color-bg-dark] hover:opacity-[.8] ml-[--padding] 
				mt-[--padding] bg-[--color-bg-dark] text-white" variant="rounded">Back to home</Button>
			</a>
			<div className={`SignIn my-[10rem] w-[30rem] h-[20rem] m-auto px-[--padding] flex flex-col justify-center items-center ${className ?? ''}`}>
				<div className="deco h-full w-[30rem] flex items-center justify-center text-white rounded-tl-lg rounded-tr-lg 
				bg-gradient-to-br from-[--color-main-1] to-[--color-main-2] font-thin">
					<h1 className="text-[length:--h1] text-center">Welcome back,<br/><strong className="font-extrabold"> camper</strong></h1>
				</div>
				<Form {...form}>
					<Toast ref={toast} />
					<form 
					onSubmit={form.handleSubmit(show)} 
					className="form w-[30rem] h-full rounded-bl-lg rounded-br-lg outline-none flex flex-col 
					gap-[1rem] bg-transparent backdrop-blur-lg box-border py-[48px] px-[32px] shadow-lg">
						<FormField
							control={form.control}
							name="identifier"
							render={({ field }) => (
								<FormItem>
									<FormControl>
										<Input className='input' placeholder="Username or email" {...field} />
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
						{loading
						? <CircularProgress color='primary' className="m-auto mt-5" /> 
						: <Button className='w-[10rem] m-auto mt-5' variant='filled' type="submit">Submit</Button>}
					</form>
				</Form>
			</div>
		</>
  )
}

export default SignIn;