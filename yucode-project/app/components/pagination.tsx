import React from "react";

type pageNationProps = {
    totalPages: number;
    currentPage: number;
    pageChangeHandle: (page: number) => void;
}

const Pagination = ({ totalPages, currentPage, pageChangeHandle }: pageNationProps) => {

    //番号を表示するために必要な配列を作成
    const generatePagination = () => {
        const pages = [];
        //総ページ数の分配列に値を追加(総ページ数が3の場合[1, 2, 3])
        for(let i = 1; i <= totalPages; i++) {
            pages.push(i);
        }
        return pages;
    }

    return (
        //総ページ数が２ページ以上の場合はページネーションを表示する
        totalPages > 1 && (
            <div className="pagination-area">
                {/*現在表示しているページが2以上の場合「前へ」ボタンを表示*/}
                {currentPage > 1 && (
                    <button onClick={() => pageChangeHandle(currentPage - 1)}>
                        前へ
                    </button>
                )}
                <div>
                    {generatePagination().map((page) => (
                        <React.Fragment key={page}>
                            <button
                                //現在表示しているページ番号と一致するbutton要素にクラス名'active'を追加
                                className={`number-btn ${page == currentPage && 'active'}`}
                                onClick={() => pageChangeHandle(page)}
                            >
                                {page}
                            </button>
                        </React.Fragment>
                    ))}
                </div>
                {/*現在表示しているページが総ページ数より少ない(最後のページではない)場合「次へ」ボタンを表示*/}
                {currentPage < totalPages && (
                    <button onClick={() => pageChangeHandle(currentPage + 1)}>
                        次へ
                    </button>
                )}
            </div>
        )
    );
}

export default Pagination;