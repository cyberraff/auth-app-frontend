import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
	return (
		<div className=' text-2xl grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
				<h1 className='text-4xl font-bold text-center sm:text-left'>
					Welcome to the Auth App
				</h1>
				<p className='text-lg text-center sm:text-left'>
					This is a simple authentication app built with Next.js and
					Tailwind CSS.
				</p>
				<div className='flex gap-4'>
					<Button asChild>
						<Link href='/login'>Login</Link>
					</Button>

					<Button asChild>
						<Link href='/signup'>Sign Up</Link>
					</Button>
				</div>
			</main>
		</div>
	);
}
