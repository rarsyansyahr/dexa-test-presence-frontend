import { NextRequest, NextResponse } from "next/server";

const employeeRoutePrefix = "/employees/";
const hrRoutePrefix = "/hr/";

const employeeRoutes = ["home", "profile"].map(
  (route) => employeeRoutePrefix + route
);

const hrRoutes = ["home", "presence-summaries", "employees"].map(
  (route) => hrRoutePrefix + route
);

const publicRoutes = ["/auth/login"];

export default async function middleware(req: NextRequest) {
  const level: "hr" | "employee" | null = "hr";

  const path = req.nextUrl.pathname;

  if (path === "/")
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));

  if (path === employeeRoutePrefix)
    return NextResponse.redirect(new URL("/employees/home", req.nextUrl));

  if (path === hrRoutePrefix)
    return NextResponse.redirect(new URL("/hr/home", req.nextUrl));

  if (!level && !publicRoutes.includes(path))
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));

  if (level === "hr" && !hrRoutes.includes(path))
    return NextResponse.redirect(new URL(hrRoutePrefix, req.nextUrl));

  if (level === "employee" && !employeeRoutes.includes(path))
    return NextResponse.redirect(new URL(employeeRoutePrefix, req.nextUrl));

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
