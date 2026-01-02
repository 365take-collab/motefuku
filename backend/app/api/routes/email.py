"""
メール登録APIエンドポイント
"""
from fastapi import APIRouter, HTTPException, Query
from pydantic import BaseModel, EmailStr
from typing import Optional
import os
from datetime import datetime
from app.api.utils.utage_client import UtageClient

router = APIRouter(prefix="/api/email", tags=["email"])


class EmailRegisterRequest(BaseModel):
    """メール登録リクエスト"""
    name: str
    email: EmailStr
    source: Optional[str] = "top_page"


class EmailRegisterResponse(BaseModel):
    """メール登録レスポンス"""
    success: bool
    message: str
    download_links: dict


@router.post("/register", response_model=EmailRegisterResponse)
async def register_email(request: EmailRegisterRequest):
    """
    メールアドレスを登録し、特典PDFのダウンロードリンクを返す
    
    - **name**: お名前
    - **email**: メールアドレス
    - **source**: 登録元（デフォルト: "top_page"）
    """
    try:
        # Utageへの自動登録
        utage_client = UtageClient()
        utage_result = await utage_client.register_email(
            email=request.email,
            name=request.name,
            source=request.source,
            scenario_id=os.getenv("UTAGE_SCENARIO_ID_PROSPECT")
        )
        
        # Utageへの登録が失敗しても、ダウンロードリンクは提供する
        if not utage_result.get("success"):
            # ログに記録するが、エラーは返さない（ダウンロードリンクは提供する）
            import logging
            logger = logging.getLogger(__name__)
            logger.warning(f"Utageへの登録に失敗しましたが、ダウンロードリンクは提供します: {utage_result.get('message')}")
        
        # ダウンロードリンクの生成
        base_url = os.getenv("BASE_URL", "http://localhost:8000")
        download_links = {
            "guide": f"{base_url}/static/bonuses/モテるコーディネート完全ガイド.pdf",
            "rules": f"{base_url}/static/bonuses/失敗しない服選び7つのルール.pdf",
            "templates": f"{base_url}/static/bonuses/シーン別コーディネートテンプレート集.pdf"
        }
        
        return EmailRegisterResponse(
            success=True,
            message="メールアドレスを登録しました。特典PDFのダウンロードリンクをメールでお送りします。",
            download_links=download_links
        )
        
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"メール登録に失敗しました: {str(e)}"
        )
