# 就活ログ
URL: https://shukatsu-log.vercel.app/
## 初回
npm install
npm install firebase

# API設計
## 会社登録
### 概要
会社名、会社URLを登録する
### パス
/companypost
### メソッド
- POST 
 - JSON (Req/Res)
### パラメーター 
|  パラメーター名  |  型  |  内容  | 
| ---- | ---- | ---- |
|  title  |  string  |  会社名  | 
|  url  |  string  |  URLのオブジェクト  | 
|  author  |  string  |  投稿者情報のオブジェクト  | 

## 会社表示
### 概要
会社のメモを一覧表示
### パス
/サンプル会社
## ファイル名
CompanyData.js
### メソッド
- POST 
 - JSON (Req/Res)
### パラメーター 
|  パラメーター名  |  型  |  内容  | 
| ---- | ---- | ---- |
|  title  |  string  |  会社名  | 
|  contents  |  string  |  内容  | 
|  author  |  string  |  投稿者情報のオブジェク

## 会社メモ登録
### 概要
会社のメモを登録する
### パス
/サンプル会社/companymemo
### メソッド
- GET 
### パラメーター 
|  パラメーター名  |  型  |  内容  | 
| ---- | ---- | ---- |
|  title  |  string  |  会社名  | 
|  contents  |  string  |  内容  | 
|  author  |  string  |  投稿者情報のオブジェクト  | 

~ ドロップダウンになるかも ~
## 会社メモ表示
### 概要
会社のメモを表示する
### パス
/サンプル会社/companymemo/サンプルid
## ファイル名
CompanyDetail.js
### メソッド
- GET 
### パラメーター 
|  パラメーター名  |  型  |  内容  | 
| ---- | ---- | ---- |
|  title  |  string  |  会社名  | 
|  contents  |  string  |  内容  | 
|  author  |  string  |  投稿者情報のオブジェクト  | 
