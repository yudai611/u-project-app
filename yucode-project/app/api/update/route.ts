import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

//データを更新する
export async function POST(request: Request) {
    const {update}: {update: User} = await request.json();

    try {
            await prisma.User.update({
                where: {
                    id: update.id
                },
                data: {
                    name: update.name,
                    affiliation: update.affiliation,
                    position: update.position,
                    employeeClassification: update.employeeClassification,
                }
            });

            return NextResponse.json("更新が完了しました。");
    } catch(err) {
        return NextResponse.json(err);
    }
}