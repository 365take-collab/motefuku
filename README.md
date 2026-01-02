# メンズファッション提案サービス

700人実績のナンパ師が監修するモテる服を、最安値で購入できるサービス

## プロジェクト構成

```
メンズファッション提案サービス/
├── backend/          # バックエンド（FastAPI）
├── frontend/         # フロントエンド（Next.js）
├── data/             # データファイル
│   └── templates/    # コーディネートテンプレート
└── README.md
```

## 技術スタック

### バックエンド
- Python 3.11+
- FastAPI
- PostgreSQL
- Celery + Redis

### フロントエンド
- Next.js 14+
- TypeScript
- Tailwind CSS

## セットアップ

### バックエンド

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### フロントエンド

```bash
cd frontend
npm install
```

## 開発

### バックエンド起動

```bash
cd backend
source venv/bin/activate
uvicorn app.api.main:app --reload
```

### フロントエンド起動

```bash
cd frontend
npm run dev
```

## ドキュメント

詳細な設計ドキュメントは `中間生成物/20251229/` フォルダを参照してください。
