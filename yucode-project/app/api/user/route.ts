import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    //パラメータからページ番号を取得し、整数に変換(デフォルトは1)
    //new URL(request.url)でURLをURLオブジェクトに変換して取得
    const page = parseInt(new URL(request.url).searchParams.get('page') || '1', 10);

    //パラメータからページごとの表示数を取得し、整数に変換(デフォルトは10)
    //new URL(request.url)でURLをURLオブジェクトに変換して取得
    const limit = parseInt(new URL(request.url).searchParams.get('limit') || '10', 10);
    //検索の開始位置を取得
    const offset = (page - 1) * limit;

    try {
        //prismaでUserデーブルのレコードを取得する
        const data = await prisma.User.findMany({
            skip: offset,//offsetで指定された件数をスキップ(offsetが10の場合、最初の10件をスキップ)
            take: limit//limitで指定されている件数を取得(limitが10の場合、10件を取得)
        });

        //全体件数を取得
        const totalItems = await prisma.User.count();

        //全体件数を1ページ当たりの件数で割り、総ページ数を計算する
        const totalPages = Math.ceil(totalItems / limit);

        return NextResponse.json({
            items: data,
            totalPages,
            currentPage: page
        });
    } catch(err) {
        return NextResponse.json({message: "データの取得に失敗しました。"});
    }
}