import { NextResponse } from "next/server";
import { getAllDocs } from "@/lib/docs/build";

export async function GET() {
    try {
        const docs = getAllDocs();
        return NextResponse.json({ docs }, { status: 200 });
    } catch (error) {
        console.error("Error building docs:", error);
        return NextResponse.json(
            { error: "Failed to build docs" },
            { status: 500 }
        );
    }
}

