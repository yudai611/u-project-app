import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

//データベースのユーザー情報を削除する
export async function POST(request: Request) {
    const {id} = await request.json();

    console.log(id);
    
    try {
        await prisma.User.delete({
            where: {
                id: id
            }
        });

        return NextResponse.json("ユーザーを削除しました。");
    } catch(err) {
        return NextResponse.json("削除に失敗しました。");
    }
}