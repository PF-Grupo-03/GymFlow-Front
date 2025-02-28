"use client"
import { signIn } from "next-auth/react"

export default function GoogleButton() {
    return (
        <button 
            type="button"
            onClick={(e) => { e.preventDefault(); signIn("google"); }}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-primary text-secondary border border-gray-300 rounded-lg shadow-md hover:bg-[#4d4d4d] transition-all"
        >
            <svg className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#4285F4" d="M24 9.5c3.35 0 6.27 1.15 8.63 3.04l6.42-6.42C34.8 2.3 29.83.5 24 .5 14.78.5 6.88 5.98 3.14 13.61l7.48 5.82C12.36 12.5 17.73 9.5 24 9.5z"/>
                <path fill="#34A853" d="M46.48 24.5c0-1.48-.12-2.91-.35-4.28H24v8.5h12.85c-.6 3-2.3 5.5-4.86 7.17l7.48 5.82c4.38-4.07 6.91-10.1 6.91-17.21z"/>
                <path fill="#FBBC05" d="M10.63 28.58c-1.11-3.02-1.11-6.34 0-9.36l-7.48-5.82C-.89 17.4-.89 30.6 3.14 38.11l7.49-5.83z"/>
                <path fill="#EA4335" d="M24 47.5c5.83 0 10.79-1.92 14.84-5.22l-7.48-5.82c-2.07 1.4-4.7 2.22-7.36 2.22-6.27 0-11.64-3-14.86-7.92l-7.48 5.82C6.88 42.02 14.78 47.5 24 47.5z"/>
            </svg>
            <span className="text-center">Inicia Sesión con Google</span>
        </button>
    )
}
