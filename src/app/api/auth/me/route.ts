import { NextResponse } from "next/server";

import AuthService from "@/features/auth/auth.service";
import { ResponseFactory } from "@/helpers/route-handler.helper";
import { getServerSession } from "@/lib/next-auth";
import { RestApiError } from "@/types/api";

// Gets the authenticated from the access token
export async function GET() {
  const session = await getServerSession();
  if (!session) {
    return ResponseFactory.create(401, {
      statusCode: 401,
      message: "The access token is missing",
    });
  }
  const accessToken = session.access_token;
  try {
    const authUser = await AuthService.getAuthUser(accessToken);
    return NextResponse.json(authUser);
  } catch (err) {
    const error = err as RestApiError;
    if (error.statusCode) {
      return ResponseFactory.create(error.statusCode, error);
    }
    throw error;
  }
}
