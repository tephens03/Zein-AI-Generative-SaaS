import { auth } from "@clerk/nextjs";
import { FREE_LIMIT_COUNT } from '@/constants'
import prismadb from '@/lib/prismadb'

export const increaseApiLimit = async () => {

    const { userId } = auth();
    if (!userId) {
        return;
    }



    const userCurrentLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })


    if (userCurrentLimit) {
        await prismadb.userApiLimit.update({
            where: { userId },
            data: { count: userCurrentLimit.count + 1 }
        })
    } else {
        await prismadb.userApiLimit.create({
            data: { userId, count: 1 }
        })
    }
}

export const checkApiLimit = async () => {

    const { userId } = auth();

    if (!userId) {
        return;
    }

    const userCurrentLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (!userCurrentLimit || userCurrentLimit.count < FREE_LIMIT_COUNT) {

        return true

    } else {

        return false

    }
}

export const getApiLimit = async () => {

    const { userId } = auth();

    if (!userId) {
        return 0;
    }

    const userCurrentLimit = await prismadb.userApiLimit.findUnique({
        where: {
            userId
        }
    })

    if (!userCurrentLimit) {
        return 0
    }

    return userCurrentLimit.count
}