import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_TOKEN!,
});

export async function POST(
    req: Request
) {

    try {
        const { userId } = auth();

        const userPrompt = await req.json();

        const isFreeTrial = await checkApiLimit()

        if (!isFreeTrial) {
            return new NextResponse("Trial is over", { status: 403 });
        }

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        if (!userPrompt) {
            return new NextResponse("prompt are required", { status: 400 });
        }

        const response = await replicate.run(
            "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
            {
                input: {
                    prompt: userPrompt.prompt
                }
            }
        );

        await increaseApiLimit();

        return NextResponse.json(response);

    } catch (error) {
        console.log('[VIDEO_ERROR]\n', error);
        return new NextResponse("Internal Error", { status: 500 });
    }
};

