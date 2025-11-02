import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/sign-in(.*)", "/sign-up(.*)", "/"]);
const isWorkspaceRoute = createRouteMatcher([
  "/workspaces/:workspaceId",
  "/workspaces/:workspaceId/:path*",
]);

async function getWorkspaceMembershipStatus(token: string | null, workspaceId: number) {
  const res = await fetch(`http://localhost:4000/workspaces/${workspaceId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.status
}

export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) {
    await auth.protect();
  }

  if (isWorkspaceRoute(req)) {
    const { getToken } = await auth();
    const token = await getToken();
	const workspaceId = Number(req.url.split("/")[4])
	const membershipStatus = await getWorkspaceMembershipStatus(token, workspaceId);

	if (membershipStatus === 403) {
		return NextResponse.redirect(new URL("/not-found", req.url));
	}

  }
});

export const config = {
  matcher: ["/((?!.*\\.\\w+$|_next).*)", "/(api|trpc)(.*)"],
};
