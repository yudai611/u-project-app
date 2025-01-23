'use client'

import { useState } from "react";

const Filter = ({filterHandle} : {filterHandle: (e: any, filterAffiliations: string[], filterPosition: string[]) => void}) => {

    let affiliationArray: String[] = ['エンジニア', 'デザイナー', 'ディレクター', '営業', '管理'];

    let positionArray: String[] = ['メンバー', 'チーフ', '課長', '部長'];

    //選択された所属・役職を保持する。
  const [filterAffiliations, setFilterAffiliation] = useState<string[]>([]);
  const [filterPositions, setFilterPosition] = useState<string[]>([]);

    //所属フィルター(チェックボックス)で選択した値に配列を更新する
  const filterAffiliationHandle = (e: any) => {
    setFilterAffiliation(
      //チェックが入っている場合
      e.target.checked ?
        [...filterAffiliations, e.target.value]//配列に値を追加
        :
        //チェックが外れた場合
        [...filterAffiliations].filter(filterAffiliation => filterAffiliation !== e.target.value)//配列から値を削除
    )
  }

  //役職フィルター(チェックボックス)で選択した値に配列を更新する
  const filterPositionHandle = (e: any) => {
    setFilterPosition(
      //チェックが入っている場合
      e.target.checked ?
        [...filterPositions, e.target.value]//配列に値を追加
        :
        //チェックが外れた場合
        [...filterPositions].filter(filterPosition => filterPosition !== e.target.value)//配列から値を削除
    )
  }

  //Filterコンポーネントで選択された所属・役職をリセットする
  const filterResetHandle = () => {
    setFilterAffiliation([]);
    setFilterPosition([]);
  }

    return (
        <>
        <form action={"/"} onSubmit={(e: any) => filterHandle(e, filterAffiliations, filterPositions)}>
        <div className='affiliation-input filter-area'>
                    <div className="affiliation-title filter-title">
                        所属
                    </div>
                    <div className="label-area">
                        {affiliationArray.map((affiliation) => (
                            <label key={affiliationArray.indexOf(affiliation)}>
                                <input type="checkbox" value={affiliation.toString()} 
                                    onChange={
                                    (e) => {
                                        filterAffiliationHandle(e);
                                    }
                                    }
                                    checked={filterAffiliations.includes(affiliation.toString())}
                                /> {affiliation}
                            </label>
                        ))}
                    </div>
                </div>
                <div className='position-input filter-area'>
                    <div className="position-title filter-title">
                        役職
                    </div>
                    <div className="label-area">
                        {positionArray.map((position) => (
                            <label key={positionArray.indexOf(position)}>
                                <input
                                    className="filter" 
                                    type="checkbox" 
                                    value={position.toString()} 
                                    onChange={
                                        (e) => {
                                            filterPositionHandle(e);
                                        }
                                    }
                                    checked={filterPositions.includes(position.toString())}
                                /> {position}
                            </label>
                        ))}
                    </div>
                </div>
                <div className="submit-area">
                    <input type="reset" className="reset-button" onClick={filterResetHandle}/>
                    <input type="submit" value="検索" className="submit-button" />
                </div>
        </form>
        </>
    )
}

export default Filter;