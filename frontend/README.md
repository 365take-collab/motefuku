# フロントエンド - メンズファッション提案サービス

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env.local.example`をコピーして`.env.local`を作成し、必要な値を設定してください。

```bash
cp .env.local.example .env.local
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

アプリケーションは `http://localhost:3000` で起動します。

## プロジェクト構成

```
frontend/
├── app/
│   ├── page.tsx          # トップページ
│   ├── layout.tsx        # レイアウト
│   └── ...
├── components/           # コンポーネント
├── public/              # 静的ファイル
└── package.json
```
