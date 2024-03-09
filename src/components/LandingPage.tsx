"use client";
import React from 'react'
import Link from 'next/link'
import { UserButton, useAuth } from "@clerk/nextjs";

export default function LandingPage() {
    const { isLoaded, userId, sessionId, getToken } = useAuth();
    console.log(userId);
    return (
        <div>
            <div className="fixed top-0 left-0 w-full h-full" style={{backgroundImage: `url(/images/leah-hetteberg-Q-Qd44h6DZU-unsplash.jpg)`, backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
            <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-60"></div>
            <header className="absolute inset-x-0 top-0 z-50">
                <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                    <div className="flex lg:flex-1">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">Your Company</span>
                        </a>
                    </div>
                    
                    <div className="lg:flex lg:flex-1 lg:justify-end">
                        {
                            userId != undefined && userId != null ? (
                                <>
                                    <UserButton/>
                                </>
                            ) : (
                                <>
                                    <a href="/sign-in" className="text-lg font-semibold leading-6 text-white">Log in <span aria-hidden="true">&rarr;</span></a>
                                </>
                            )
                        }
                    </div>
                </nav>
            </header>

            <div className="relative isolate px-6 pt-14 lg:px-8">
                <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
                    <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
                </div>
                <div className="mx-auto mt-14 max-w-2xl py-32 sm:py-48 lg:py-56">
                    <div className="text-center">
                        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">Sport Companion</h1>
                        <p className="mt-6 text-lg leading-8 text-gray-300">Sweat Together, Not Solo. Find Your Sports Community.</p>
                        <div className="mt-10 flex items-center justify-center gap-x-6">
                            <a href="#" className="rounded-md bg-indigo-600 px-16 py-2.5 text-lg font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Get started</a>
                            <Link href='/contact' className="text-lg font-semibold leading-6 text-white">Contact Us <span aria-hidden="true">→</span></Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}