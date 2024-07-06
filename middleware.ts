import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

const ADMIN_API_URL = 'https://moodle.edu4wb.com/api/details';

export async function middleware(request:NextRequest) {
  const url = request.nextUrl.clone();
  
  const token = request.cookies.get('token')?.value;

  if (url.pathname.startsWith('/admin') || url.pathname.startsWith('/dashboard')) {

    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    if (url.pathname.startsWith('/admin')) {
      const response = await (await fetch(ADMIN_API_URL, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })).json();
      if (response.role_id != 795734325693) {
        return NextResponse.redirect(new URL('/login', request.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/dashboard/:path*'], // Primijenite middleware na /admin i /dashboard rute
};
