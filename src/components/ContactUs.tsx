"use client";

import CircularProgress from '@mui/material/CircularProgress';
import { IBaseComponent } from '@/interfaces/IBaseComponent';
import { ReqContactUs } from "@/interfaces/api/IContactUs";
import { zodResolver } from "@hookform/resolvers/zod";
import { memo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import axiosUtil from '@/utils/axiosUtil';
import { Textarea } from './ui/textarea';
import { Toast } from 'primereact/toast';
import "./styles/ContactUs.scss";
import lazy from 'next/dynamic';
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";


const Button = lazy(() => import('./Button'), { ssr: false });

const FormSchema = z.object({
  email: z.string()
					.min(2, { message: "Email must be filled" })
					.email({ message: "Email must be valid" })
					.max(50, { message: "Email must be less than 50 characters" }),
	subject: z.string()
						.min(2, { message: "Fill in the subject first" })
						.max(25, { message: "Subject must be less than 25 characters" }),
	message: z.string()
						.min(2, { message: "Fill in the message first" })
						.max(255, { message: "Message must be less than 500 characters" }),
})

const ContactUs: React.FC<IBaseComponent> = ({ className }) => {
  const [loading, setLoading] = useState(false);
	const toast = useRef<Toast>(null);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      subject: "",
      message: "",
    },
  })

  const show = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    const request: ReqContactUs = {
      email: data.email,
      subject: data.subject,
      message: data.message
    }
    try {
      const res = await axiosUtil.post("/Emails/contactUs", request);
      console.log(res.data);
      form.reset();
      toast.current?.show({ severity: 'success', summary: 'We have received your message' });
    } catch (e: any) {
      console.log(e.message); 
      toast.current?.show({ severity: 'error', summary: 'Something went wrong. Try later' });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={`ContactUs w-full px-[--padding] flex flex-wrap justify-center items-center gap-[3rem] ${className ?? ''}`}>
      <h1><strong className="strong">Contact</strong> Us</h1>
      <Form {...form}>
        <Toast ref={toast} />
        <form 
        onSubmit={form.handleSubmit(show)} 
        className="w-[35rem] h-fit outline-none flex flex-col gap-[1rem] bg-transparent backdrop-blur-md box-border py-[16px] px-[32px] rounded-lg shadow-lg">
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
            name="subject"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input className='input' placeholder="Subject" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Textarea className='input min-h-[20rem]' placeholder="Type your message" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {loading
          ? <CircularProgress color='primary' /> 
          : <Button className='w-[10rem]' variant='filled' type="submit">Submit</Button>}
        </form>
      </Form>
    </div>
  )
}

const MemoContactUs = memo(ContactUs);
MemoContactUs.displayName = "ContactUs";

export default MemoContactUs;