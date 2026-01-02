"""
チェックアウト・アップセル関連のAPI
"""
from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from pathlib import Path
from typing import Optional

router = APIRouter(prefix="/api/checkout", tags=["checkout"])


class UpsellPurchaseRequest(BaseModel):
    offer_id: str
    type: str  # 'course' or 'consultation'
    email: Optional[str] = None
    name: Optional[str] = None


@router.post("/upsell")
async def purchase_upsell(request: UpsellPurchaseRequest):
    """
    アップセル商品の購入処理
    
    - **offer_id**: オファーID（例: 'course-complete-guide', 'consultation-basic'）
    - **type**: タイプ（'course' or 'consultation'）
    - **email**: メールアドレス（オプション）
    - **name**: 名前（オプション）
    
    処理内容:
    1. 購入情報を保存
    2. Utage（SendRight）に登録（メールアドレスがある場合）
    3. メール送信（購入確認、ダウンロードリンクなど）
    """
    # TODO: 実際の決済処理を実装
    # ここでは、購入情報を保存し、Utageに登録する処理を想定
    
    # オファーIDの検証
    valid_offer_ids = [
        'course-complete-guide',
        'consultation-basic',
        'consultation-premium',
    ]
    
    if request.offer_id not in valid_offer_ids:
        raise HTTPException(status_code=400, detail="Invalid offer_id")
    
    # 購入情報を保存（実際の実装では、データベースに保存）
    purchase_data = {
        'offer_id': request.offer_id,
        'type': request.type,
        'email': request.email,
        'name': request.name,
        'status': 'completed',
    }
    
    # TODO: Utage（SendRight）への登録
    # if request.email:
    #     # Utage APIを呼び出して登録
    #     pass
    
    # TODO: メール送信
    # - 購入確認メール
    # - ダウンロードリンク（PDFの場合）
    # - コンサルティングの詳細（コンサルの場合）
    
    return {
        'success': True,
        'message': '購入が完了しました',
        'offer_id': request.offer_id,
        'download_url': f'/api/checkout/downloads/{request.offer_id}' if request.type == 'course' else None,
    }


@router.get("/downloads/{offer_id}")
async def download_upsell(offer_id: str):
    """
    アップセル商品（PDF）のダウンロード
    
    - **offer_id**: オファーID（例: 'course-complete-guide'）
    """
    # PDFファイルのパス
    valid_offer_ids = {
        'course-complete-guide': 'static/bonuses/モテるコーディネート完全ガイド.pdf',
    }
    
    if offer_id not in valid_offer_ids:
        raise HTTPException(status_code=404, detail="Offer not found")
    
    # ファイルパスを取得
    file_path = Path(__file__).parent.parent.parent.parent / valid_offer_ids[offer_id]
    
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="File not found")
    
    # ファイルを返す
    return FileResponse(
        path=str(file_path),
        filename=file_path.name,
        media_type='application/pdf'
    )
