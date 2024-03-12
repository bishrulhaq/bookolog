"use client"

import Image from "next/image";
import { useFormState, useFormStatus } from 'react-dom'
import { createAccount } from "./actions";
import Link from "next/link";

const initialState = {
    message: '',
    error: ''
}

function SubmitButton() {
    const status = useFormStatus();
    return (
        <button disabled={status.pending}
            className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300 dark:text-white dark:bg-gray-800">
            Log In
        </button>
    )
}

export default function RegisterPage() {

    const [state, formAction] = useFormState(createAccount, initialState);

    return (
        <>
            <section className="py-10 flex items-center justify-center">

                <div className="dark:border-gray-700 dark:bg-gray-800 bg-gray-200 flex rounded-3xl shadow-lg max-w-4xl p-5 items-center b-shadow">
                    <div className="md:w-1/2 px-5">
                        <h2 className="font-bold text-2xl text-[#002D74] dark:text-white">Register</h2>
                        <form action={formAction} className="flex flex-col gap-4">

                            <div className="md:flex md:gap-4 mt-8 ">
                                <div className="flex-1 mb-4 md:mb-0">
                                    <input className="p-2 rounded-xl border w-full" type="text" name="first_name" placeholder="First Name" />
                                </div>
                                <div className="flex-1">
                                    <input className="p-2 rounded-xl border w-full" type="text" name="last_name" placeholder="Last Name" />
                                </div>
                            </div>

                            <input className="p-2 rounded-xl border" type="email" name="email" placeholder="Email" />
                            <div className="relative">
                                <input
                                    className="p-2 rounded-xl border w-full"
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                />
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="gray"
                                    className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                                    viewBox="0 0 16 16"
                                >
                                </svg>
                            </div>
                            <button type="submit" className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Register</button>
                        </form>

                        <Link href="/login" className="mt-3 text-xs flex justify-between items-center text-[#002D74] dark:text-white">
                            <p>Already have an account?</p>
                            <SubmitButton />
                        </Link>

                        <div className="mt-3 text-xs flex justify-between items-center text-[#002D74] dark:text-white">
                            <p className="text-white">
                                {state?.message}
                            </p>
                            <p className="text-red-500">
                                {state?.error}
                            </p>
                        </div>
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