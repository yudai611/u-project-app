'use client'

import { useState } from "react";

const Recode = ({ user }: { user: User }) => {

  //更新するときに利用するuserData
  // const userdata: UserData = {
  //   number: user.number,
  //   name: user.name,
  //   affiliation: user.affiliation,
  //   position: user.position,
  //   employeeClassification: user.employeeClassification
  // }

  const [input, setInput] = useState(false);
  const [update, setUpdate] = useState(user);//初期値は現在登録されているユーザー情報

  const inputHandle = (value: string, id: string) => {
    setUpdate(
      {...update, [id]: value}
    );
  }

  //編集した情報を元にデータベースを更新するAPIにリクエストを送る
  const updateHandle = async (update:User) => {

    setInput(false);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/update`,
      {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          update: update
        })
      }
    )
    const data = await res.json();
    console.log(data);
    alert(data);
  }

  //データベースに登録されているユーザーを削除するAPIにリクエストを送る
  const deleteHandle = async (id: string) => {
    const result = confirm(`${user.name}のデータを削除してもよろしいですか？`);

    if(result) {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/delete`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json"},
          body: JSON.stringify({
            id: id
          })
        }
      );

      const data = await res.json();

      alert(data);
    }
  }

  return (
    <>
      <tr>
        {!input ?
          <>
            <th scope="row">
              {update.name}
            </th>
            <td>{update.affiliation}</td>
            <td>{update.position}</td>
            <td>{update.employeeClassification}</td>
          </>
          :
          <>
            <th scope="row">
              <input id="name" type="text" value={update.name} style={{border: 'solid 2px #000'}} onChange={(e) => inputHandle(e.target.value, 'name')}/>
            </th>
            <td>
              <select name="affiliation" id="affiliation" value={update.affiliation} onChange={(e) => inputHandle(e.target.value, 'affiliation')}>
                <option value="エンジニア">エンジニア</option>
                <option value="デザイナー">デザイナー</option>
                <option value="ディレクター">ディレクター</option>
                <option value="営業">営業</option>
                <option value="管理">管理</option>
              </select>
            </td>
            <td>
              <select name="position" id="position" value={update.position}onChange={(e) => inputHandle(e.target.value, 'position')}>
                <option value="メンバー">メンバー</option>
                <option value="チーフ">チーフ</option>
                <option value="課長">課長</option>
                <option value="部長">部長</option>
              </select>
            </td>
            <td>
              <select name="employeeClassification" id="employeeClassification" value={update.employeeClassification} onChange={(e) => inputHandle(e.target.value, 'employeeClassification')}>
                <option value="正社員">正社員</option>
                <option value="アルバイト">アルバイト</option>
              </select>
            </td>
          </>
        }
        <td>
          {!input ?
            <button className="update-button" onClick={() => setInput(true)}>編集</button>
            :
            <>
              <button className="update-button" onClick={() => updateHandle(update)}>確定</button>
              <button className="update-button" onClick={() => setInput(false)}>閉じる</button>
            </>
          }
          <button className="delete-button" onClick={() => deleteHandle(user.id)}>削除</button>
        </td>
      </tr>
    </>
  )
}

export default Recode;
