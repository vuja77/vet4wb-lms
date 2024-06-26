// middleware.js
import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

// URL vašeg API-a za provjeru administratorskih privilegija
const ADMIN_API_URL = 'https://moodle.edu4wb.com/api/details';

export async function middleware(request:NextRequest) {
  const url = request.nextUrl.clone();
  
  // Uzimanje tokena iz kolačića
  const token = request.cookies.get('token')?.value;

  // Provjerite da li ruta sadrži /admin ili /dashboard
  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/dashboard')) {

    if (!token) {
      // Ako nema tokena, preusmjerite korisnika na stranicu za login
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (url.pathname.startsWith('/admin')) {
      const response = await (await fetch(ADMIN_API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })).json();

      // const data = await response.json();
      if (response.role_id != 795734325693) {
        // Ako korisnik nije admin, preusmjerite ga na stranicu za login ili neku drugu stranicu
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  // Ako je sve u redu, proslijedite zahtjev dalje
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'], // Primijenite middleware na /admin i /dashboard rute
};
