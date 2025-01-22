import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import { checkApiLimit, increaseApiLimit } from "@/lib/api-limit";


const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(
    req: Request
) {

    try {


        const { userId } = auth();
        const body = await req.json();
        const { userMessage, and } = body;


        const isFreeTrial = await checkApiLimit()

        if (!isFreeTrial) {
            return new NextResponse("Trial is over", { status: 403 });
        }


        const response = await openai.createImage({
            prompt: userMessage.prompt,
            n: parseInt(userMessage.quantity),
            size: userMessage.resolution,
        });



        return NextResponse.json(response.data.data);


    } catch (error) {

        console.log('[CONVERSATION_ERROR]', error);

        return new NextResponse("Internal Error", { status: 500 });
    }
};

