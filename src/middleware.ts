import { NextRequest, NextResponse } from "next/server";
import { UserLevel } from "./types";

const employeeRoutePrefix = "/employee";
const hrRoutePrefix = "/hr";
const loginRoute = "/auth/login";

const employeeRoutes = ["home", "profile"].map(
  (route) => `${employeeRoutePrefix}/${route}`
);
employeeRoutes.push(employeeRoutePrefix);

const hrRoutes = ["home", "presence-summaries", "employees"].map(
  (route) => `${hrRoutePrefix}/${route}`
);
hrRoutes.push(hrRoutePrefix);

const publicRoutes = [loginRoute];

export default async function middleware(req: NextRequest) {
  const level = req.cookies.get("level")?.value as UserLevel;
  const path = req.nextUrl.pathname;

  if (path === "/")
    return NextResponse.redirect(new URL(loginRoute, req.nextUrl));

  if (path === employeeRoutePrefix)
    return NextResponse.redirect(
      new URL(`${employeeRoutePrefix}/home`, req.nextUrl)
    );

  if (path === hrRoutePrefix)
    return NextResponse.redirect(new URL(`${hrRoutePrefix}/home`, req.nextUrl));

  if (!level && !publicRoutes.includes(path))
    return NextResponse.redirect(new URL(loginRoute, req.nextUrl));

  if (level === UserLevel.Hr && !hrRoutes.includes(path))
    return NextResponse.redirect(new URL(hrRoutePrefix, req.nextUrl));

  if (level === UserLevel.Employee && !employeeRoutes.includes(path))
    return NextResponse.redirect(new URL(employeeRoutePrefix, req.nextUrl));

  return NextResponse.next();
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
