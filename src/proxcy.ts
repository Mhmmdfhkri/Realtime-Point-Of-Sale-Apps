import { NextRequest } from "next/server";
import { updateSession } from "./lib/supabase/middleware";

export async function proxcy(request: NextRequest) {
    return await updateSession(request);
}

export const config = {
    matcher: [
        '/((?!_next/static|next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
    ]
}