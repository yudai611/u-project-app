'use client'

import './page.css'
import Filter from './components/filter'
import Table from './components/table'
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import PageNation from './components/pagination';
import { useRouter } from 'next/navigation';

export default function Home() {

  const router = useRouter();
  const searchParams = useSearchParams();
  //DBから取得してきたユーザー情報を管理
  const [userData, setUserData] = useState<User[]>([]);
  //ユーザーデータの表示に必要なページ数を管理
  const [totalPages, setTotalPages] = useState(1);
  //現在のページの値を管理
  const [currentPage, setCurrentPage] = useState(1);

  //ユーザー情報を取得するAPIにリクエストを送る
  useEffect(() => {
    // const fetchData = async () => {
    //   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`);

    //   const responseData = await res.json();

    //   setUserData(responseData.map((user: User) => (
    //     user
    //   )));
    //   setFilteredUserData(responseData.map((user: User) => (
    //     user
    //   )))
    // }
    // fetchData();
    const fetchData = async (page: number) => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user?page=${page}`);

        //レスポンスデータが正常でない(ステータスコードが400-599)場合
        if(!res.ok) {
          throw new Error('Bad response');
        }

        const newData = await res.json();

        setTotalPages(newData.totalPages);
        setCurrentPage(newData.currentPage);
        setUserData(newData.items);
        setFilteredUserData(newData.items);
      } catch (err) {
        console.log("Failed", err);
      }
    }

    const page = parseInt(searchParams.get('page') || '1', 10);
    fetchData(page);
    
  }, [searchParams]);

  //フィルタリングされたユーザー情報を管理
  const [filteredUserData, setFilteredUserData] = useState<User[]>([]);

  //フィルター条件を元に新しいユーザーデータを作成し、filteredUserDataを更新する
  const filterHandle = (e: any, filterAffiliations: string[], filterPositions: string[]) => {
    e.preventDefault();//フォーム送信時のリロードを無効

    //所属のみ選択している場合
    if (filterAffiliations.length > 0 && filterPositions.length <= 0) {
      //所属のフィルター条件を元に新しいユーザーデータを作成
      let filteredAffiliation = userData.filter((user) => {
        return filterAffiliations.some((filterAffiliation) =>
          user.affiliation.toLowerCase().includes(filterAffiliation.toLowerCase())
        );
      });
      setFilteredUserData(filteredAffiliation);
    }

    //役職のみ選択している場合
    if (filterAffiliations.length <= 0 && filterPositions.length > 0) {
      //役職のフィルター条件を元に新しいユーザーデータを作成
      let filteredPosition = userData.filter((user) => {
        return filterPositions.some((filterPosition) =>
          user.position.toLowerCase().includes(filterPosition.toLowerCase())
        );
      });
      setFilteredUserData(filteredPosition);
    }

    //所属・役職の両方を選択している場合
    if (filterAffiliations.length > 0 && filterPositions.length > 0) {

      let filteredData = userData.filter((user) => {
        return filterAffiliations.some((filterAffiliation) =>
          user.affiliation.toLowerCase().includes(filterAffiliation.toLowerCase())
        )
        &&
        filterPositions.some((filterPosition) => 
          user.position.toLowerCase().includes(filterPosition.toLowerCase())
        )
      });
      setFilteredUserData(filteredData);
    }

    //所属・役職が両方とも未選択の場合
    if(filterAffiliations.length <= 0 && filterPositions.length <= 0) {
      //フィルターが空の時はすべて表示
      setFilteredUserData(userData);
    }
  }

  //ページネーションの「前へ」「次へ」「番号」をクリック時、対象ページまで遷移
  const pageChangeHandle = (page: number) => {
        router.push(`/?page=${page}`);
        setCurrentPage(page);
  }

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="title">社員一覧</h1>
        <Filter
          // onChangeAffiliations={(e) => filterAffiliationHandle(e)}
          // onChangePositions={(e) => filterPositionHandle(e)}
          filterHandle={(e: any, filterAffiliations: string[], filterPositions: string[]) => filterHandle(e, filterAffiliations, filterPositions)}
          // filterResetHandle={() => filterResetHandle()}
        />
        <Table
          filteredUserData={filteredUserData}
        />
        <PageNation totalPages={totalPages} currentPage={currentPage} pageChangeHandle={(page) => pageChangeHandle(page)}/>
      </main>
    </div>
  );
}
