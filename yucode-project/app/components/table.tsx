'use client'

import { useEffect, useState } from "react"
import Recode from "./recode";

const Table = ({ filteredUserData }: { filteredUserData: User[] }) => {

  //値が半角かどうか
  const isHalfWidth = (str: string) => {
    return /^[\x00-\x7F]*$/.test(str);
  }

  //モーダルの表示を制御
  const [showModal, setShowModal] = useState(false);

  //新規登録する情報(氏名、社員コード、所属など)を保持する
  const [userName, setUserName] = useState(" ");
  const [number, setNumber] = useState(" ");
  const [affiliation, setAffiliation] = useState("エンジニア");
  const [position, setPosition] = useState("メンバー");
  const [employeeClassification, setEmployeeClassification] = useState("正社員");

  //新規ユーザーを登録するAPIにリクエストを送信する
  const registerHandle = async () => {
    try {
      //氏名のテキストフィールド、社員コードのテキストフィールドに値が存在する場合
      if (userName.trim() !== "" && number.trim() !== "" && isHalfWidth(number)) {
        setShowModal(false);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              number: number,
              name: userName,
              affiliation: affiliation,
              position: position,
              employeeClassification: employeeClassification
            })
          }
        );

        const data = await res.json();
        alert(data);

        //入力内容をリセットする
        setUserName("");
        setNumber("")
        setAffiliation("エンジニア");
        setPosition("メンバー");
        setEmployeeClassification("正社員");
      } else {
        alert("社員コード(半角英数字)、氏名を入力してください。");
      }

    } catch (err) {
      console.error(err);
    }
  }

  //新規ボタンクリック時
  const showModalHandle = () => {
    setShowModal(true);
  }

  //新規登録モーダルの閉じるボタンクリック時
  const registerCloseHandle = () => {
    setShowModal(false);
  }

  return (
    <>
      {showModal &&
        <div className="register-modal">
          <dl>
            <dt>社員コード</dt>
            <dd>
              <input type="text" className="register-input" value={number} onChange={(e) => setNumber(e.target.value)} />
            </dd>
            <dt>氏名</dt>
            <dd>
              <input type="text" className="register-input" value={userName} onChange={(e) => setUserName(e.target.value)} />
            </dd>
            <dt>所属</dt>
            <dd>
              <select name="affiliation" id="affiliation" onChange={(e) => setAffiliation(e.target.value)}>
                <option value="エンジニア">エンジニア</option>
                <option value="デザイナー">デザイナー</option>
                <option value="ディレクター">ディレクター</option>
                <option value="営業">営業</option>
                <option value="管理">管理</option>
              </select>
            </dd>
            <dt>役職</dt>
            <dd>
              <select name="position" id="position" onChange={(e) => setPosition(e.target.value)}>
                <option value="メンバー">メンバー</option>
                <option value="チーフ">チーフ</option>
                <option value="課長">課長</option>
                <option value="部長">部長</option>
              </select>
            </dd>
            <dt>社員区分</dt>
            <dd>
              <select name="employeeClassification" id="employeeClassification" onChange={(e) => setEmployeeClassification(e.target.value)}>
                <option value="正社員">正社員</option>
                <option value="アルバイト">アルバイト</option>
              </select>
            </dd>
          </dl>
          <div className="register-button-area">
            <button className="register-close" onClick={() => registerCloseHandle()}>閉じる</button>
            <button className="register-button" onClick={() => registerHandle()}>登録</button>
          </div>
        </div>
      }
      <div className="data-hed">
        <button onClick={() => showModalHandle()} className="register">新規</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">氏名</th>
            <th scope="col">所属</th>
            <th scope="col">役職</th>
            <th scope="col">社員区分</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredUserData.map((user: User) => (
            <Recode key={user.id} user={user} />
          ))}
        </tbody>
      </table>
    </>
  )
}

export default Table;