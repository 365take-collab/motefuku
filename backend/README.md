# バックエンド - メンズファッション提案サービス

## セットアップ

### 1. 仮想環境の作成と有効化

```bash
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
```

### 2. 依存関係のインストール

```bash
pip install -r requirements.txt
```

### 3. 環境変数の設定

`.env.example`をコピーして`.env`を作成し、必要な値を設定してください。

```bash
cp .env.example .env
```

### 4. サーバーの起動

```bash
uvicorn app.api.main:app --reload
```

APIドキュメントは `http://localhost:8000/docs` で確認できます。

## APIエンドポイント

### ヘルスチェック
- `GET /` - ルート
- `GET /health` - ヘルスチェック

### テンプレート
- `GET /api/templates/` - テンプレート一覧取得
- `GET /api/templates/{template_id}` - 特定のテンプレート取得

## プロジェクト構成

```
backend/
├── app/
│   ├── api/
│   │   ├── routes/
│   │   │   ├── templates.py
│   │   │   └── __init__.py
│   │   ├── main.py
│   │   └── __init__.py
│   └── __init__.py
├── requirements.txt
├── .env.example
└── README.md
```
