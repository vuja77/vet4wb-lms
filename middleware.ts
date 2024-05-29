// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// URL vašeg API-a za provjeru administratorskih privilegija
const ADMIN_API_URL = 'https://moodle.edu4wb.com/api/details';

export async function middleware(request:NextRequest) {
  const url = request.nextUrl.clone();
  let role = 1;
  // Provjerite da li ruta sadrži /admin
  if (url.pathname.startsWith('/admin')) {
    // Uzimanje tokena iz kolačića
    const token = request.cookies.get('token')?.value;

    if (!token) {
      // Ako nema tokena, preusmjerite korisnika na stranicu za login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // Provjerite da li korisnik ima administratorske privilegije
    // const response = await fetch(ADMIN_API_URL, {
    //   method: 'GET',
    //   headers: {
    //     'Authorization': `Bearer ${token}`
    //   }
    // });

    // const data = await response.json();

    if (role === 1) {
      // Ako korisnik nije admin, preusmjerite ga na stranicu za login ili neku drugu stranicu
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Ako je sve u redu, proslijedite zahtjev dalje
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'], // Primijenite middleware samo na /admin rute
};
