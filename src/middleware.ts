import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

/**
 * El panel `/admin` no debe exponerse en la tienda pública en producción.
 * En `next dev` sigue accesible para trabajar en local.
 * Para forzar acceso en un deploy de prueba: `NEXT_PUBLIC_STOREFRONT_ADMIN_ROUTES=true`.
 */
export const config = {
  matcher: ["/admin", "/admin/:path*"],
};

export const middleware = (request: NextRequest) => {
  const pathname = request.nextUrl.pathname;
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const isDev = process.env.NODE_ENV === "development";
  const allowOnStorefront =
    isDev || process.env.NEXT_PUBLIC_STOREFRONT_ADMIN_ROUTES === "true";

  if (!allowOnStorefront) {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.next();
};
