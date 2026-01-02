"""
メンズファッション提案サービス - FastAPI メインアプリケーション
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pathlib import Path
from app.api.routes import templates, products
from app.api.routes import brand_style_matching, email, checkout

app = FastAPI(
    title="メンズファッション提案サービス API",
    description="700人実績のナンパ師が監修するモテる服を、最安値で購入できるサービス",
    version="1.0.0"
)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://localhost:3003",
        "http://localhost",
    ],  # フロントエンドのURL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーターの登録
app.include_router(templates.router)
app.include_router(products.router)
app.include_router(brand_style_matching.router)
app.include_router(email.router)
app.include_router(checkout.router)

# 静的ファイルの配信（PDFファイルなど）
static_dir = Path(__file__).parent.parent.parent / "static"
if static_dir.exists():
    app.mount("/static", StaticFiles(directory=str(static_dir)), name="static")


@app.get("/")
async def root():
    """ヘルスチェック"""
    return {
        "message": "メンズファッション提案サービス API",
        "status": "ok"
    }


@app.get("/health")
async def health():
    """ヘルスチェック"""
    return {"status": "healthy"}
