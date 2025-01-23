import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

//新規ユーザーを登録する
export async function POST(request: Request) {
    const { number, name, affiliation, position, employeeClassification} = await request.json();

    try {

        const existingRegister = await prisma.User.findFirst({
            where: {
                number: number
            }
        });

        if(!existingRegister) {
            await prisma.User.create({
                data: {
                    number: number,
                    name: name,
                    affiliation: affiliation,
                    position: position,
                    employeeClassification: employeeClassification,
                }
            });

            return NextResponse.json("ユーザーを登録しました。");
        } else {
            return NextResponse.json("登録しようとしたユーザーは既に登録されています。");
        }
    } catch (err) {
        return NextResponse.json(err);
    }
}