"use client"

import Image from "next/image";
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

function SubmitButton() {
    const status = useFormStatus();
    return (
        <button
            className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 dark:text-white dark:bg-gray-800">
            {status.pending ? 'Loading' : 'Log In'}
        </button>
    )
}

export default function RegisterPage() {

    const router = useRouter();
    const authorizeAccount = async (formData) => {

        const res = await signIn('credentials', {
            redirect: false,
            email: formData.get("email"),
            password: formData.get("password"),
            callbackUrl: "/club",
        });

        if (!res?.error) {
            router.push("/club");
        } else {
            setError("invalid email or password");
        }
    }

    return (
        <>
            <section className="py-10 flex items-center justify-center">
                <div className="dark:border-gray-700 dark:bg-gray-800 bg-gray-200 flex rounded-3xl shadow-lg max-w-4xl p-5 items-center b-shadow">
                    <div className="md:w-1/2 px-5">

                        <h2 className="font-bold text-2xl text-[#002D74] dark:text-white">Login</h2>
                        <p className="text-xs mt-4 text-[#002D74] dark:text-white">If you are already a member, easily log in</p>

                        <form action={authorizeAccount} className="flex flex-col gap-4">
                            <input className="p-2 mt-8 rounded-xl border" type="email" name="email" placeholder="Email" />
                            <div className="relative">
                                <input className="p-2 rounded-xl border w-full" type="password" name="password" placeholder="Password" />
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16">
                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                </svg>
                            </div>
                            <SubmitButton />
                        </form>

                        <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
                            <hr className="border-gray-400" />
                            <p className="text-center text-sm">OR</p>
                            <hr className="border-gray-400" />
                        </div>

                        <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]">
                            <svg className="mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="25px">
                                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
                            </svg>
                            Login with Google
                        </button>

                        <div className="mt-5 text-xs border-b border-[#002D74] py-4 text-[#002D74] dark:text-white">
                            <a href="#">Forgot your password?</a>
                        </div>

                        <Link href="/register" className="mt-3 text-xs flex justify-between items-center text-[#002D74] dark:text-white">
                            <p>Don't have an account?</p>
                            <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 dark:text-white dark:bg-gray-800">Register</button>
                        </Link>
                    </div>


                    <div className="md:block hidden w-1/2">
                        <Image
                            className="rounded-3xl"
                            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAfQAAAK8CAIAAACWV9pBAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDYuMC1jMDAyIDc5LjE2NDQ2MCwgMjAyMC8wNS8xMi0xNjowNDoxNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDIxLjIgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkNEMjk0QzU0NzhEMDExRUVCREYwRTEzMjAzQzE2RDJDIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkNEMjk0QzU1NzhEMDExRUVCREYwRTEzMjAzQzE2RDJDIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0QyOTRDNTI3OEQwMTFFRUJERjBFMTMyMDNDMTZEMkMiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0QyOTRDNTM3OEQwMTFFRUJERjBFMTMyMDNDMTZEMkMiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5JxZS6AAAHhklEQVR42uzUQREAAAjDMMC/56EDLpHQRztJAfDLSABg7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuEgCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5i7BADmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A2DuAOYOgLkDYO4AmDsA5g5g7gCYOwDmDoC5A2DuAJg7gLkDYO4AmDsA5g6AuQOYOwDmDoC5A2DuAJg7AOYOYO4AmDsA5g6AuQNg7gDmDoC5A2DuAJg7AOYOgLkDmDsA5g6AuQNg7gCYO4C5A2DuAJg7AOYOgLkDYO4A5g6AuQNg7gCYOwDmDmDuAJg7AOYOgLkDYO4AmDuAuQNg7gCYOwDmDoC5A5g7AOYOgLkDYO4AmDsA5g5g7gDcsQIMAN6qCHV2Tu4dAAAAAElFTkSuQmCC"
                            src="https://images.unsplash.com/photo-1616606103915-dea7be788566?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80"
                            alt="Login Image"
                            width={1887}
                            height={1200}
                        />
                    </div>
                </div>
            </section>
        </>
    )
};