'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const formSchema = z.object({
	email: z.string().email({
		message: 'Invalid email address.',
	}),
	password: z.string().min(5, {
		message: 'Password must be at least 5 characters.',
	}),
});

const url = 'https://auth-app-backend-xwg2.onrender.com/api/v1/users/login';
// const devUrl = 'http://localhost:3000/api/v1/users/login';

export function LoginForm() {
	const router = useRouter();
	// 1. Define your form.
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	// 2. Define a submit handler.
	async function onSubmit(values: z.infer<typeof formSchema>) {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				// Authorization: `Bearer ${token}`,
			},
			credentials: 'include',
			body: JSON.stringify(values),
		});
		if (res.ok) {
			const data = await res.json(); // Parse the JSON response
			console.log('ds djhm jxchn jxchnm cjdgshg');

			sessionStorage.setItem('token', data.data.token); // Store the token in sessionStorage
			console.log('Token stored, navigating to dashboard...');
			router.push('/dashboard');
			console.log('dashboard');
		} else {
			alert('Login failed');
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input placeholder='email' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name='password'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Password</FormLabel>
							<FormControl>
								<Input placeholder='password' {...field} />
							</FormControl>

							<FormMessage />
						</FormItem>
					)}
				/>
				<div className='flex gap-4'>
					<Button type='submit'>Submit</Button>
					<Button asChild>
						<Link href='/'>Cancel</Link>
					</Button>
				</div>
			</form>
		</Form>
	);
}
