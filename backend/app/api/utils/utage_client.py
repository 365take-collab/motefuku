"""
Utage APIクライアント
"""
import os
import httpx
from typing import Optional, Dict, Any
import logging

logger = logging.getLogger(__name__)


class UtageClient:
    """Utage APIクライアント"""
    
    def __init__(self):
        self.api_key = os.getenv("UTAGE_API_KEY")
        self.api_url = os.getenv("UTAGE_API_URL", "https://api.utage-system.com")
        self.scenario_id_prospect = os.getenv("UTAGE_SCENARIO_ID_PROSPECT")
        self.scenario_id_customer = os.getenv("UTAGE_SCENARIO_ID_CUSTOMER")
        self.scenario_id_dormant = os.getenv("UTAGE_SCENARIO_ID_DORMANT")
        
    async def register_email(
        self,
        email: str,
        name: str,
        source: str = "top_page",
        scenario_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Utageにメールアドレスを登録
        
        Args:
            email: メールアドレス
            name: お名前
            source: 登録元（デフォルト: "top_page"）
            scenario_id: シナリオID（指定がない場合は見込み客シナリオを使用）
        
        Returns:
            登録結果
        """
        if not self.api_key:
            logger.warning("UTAGE_API_KEYが設定されていません。Utageへの登録をスキップします。")
            return {"success": False, "message": "APIキーが設定されていません"}
        
        # シナリオIDが指定されていない場合は、見込み客シナリオを使用
        if not scenario_id:
            scenario_id = self.scenario_id_prospect
        
        if not scenario_id:
            logger.warning("UTAGE_SCENARIO_ID_PROSPECTが設定されていません。Utageへの登録をスキップします。")
            return {"success": False, "message": "シナリオIDが設定されていません"}
        
        try:
            # TODO: Utage APIの実際のエンドポイントとリクエスト形式を確認
            # 公式マニュアル: https://help.utage-system.com/knowledge-allpages
            # 「UTAGEのAPI公開について」のページを参照
            
            # 仮の実装（実際のAPI仕様に合わせて修正が必要）
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    f"{self.api_url}/api/v1/members",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "email": email,
                        "name": name,
                        "scenario_id": scenario_id,
                        "custom_fields": {
                            "source": source,
                            "registered_at": None,  # Utage側で自動設定される可能性
                        }
                    },
                    timeout=10.0
                )
                
                if response.status_code == 200 or response.status_code == 201:
                    logger.info(f"Utageへのメール登録成功: {email}")
                    return {"success": True, "message": "Utageへの登録が完了しました"}
                else:
                    logger.error(f"Utageへのメール登録失敗: {response.status_code} - {response.text}")
                    return {"success": False, "message": f"Utageへの登録に失敗しました: {response.status_code}"}
                    
        except Exception as e:
            logger.error(f"Utageへのメール登録でエラーが発生しました: {str(e)}")
            return {"success": False, "message": f"エラーが発生しました: {str(e)}"}
    
    async def update_custom_fields(
        self,
        email: str,
        custom_fields: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        カスタムフィールドを更新
        
        Args:
            email: メールアドレス
            custom_fields: 更新するカスタムフィールド
        
        Returns:
            更新結果
        """
        if not self.api_key:
            logger.warning("UTAGE_API_KEYが設定されていません。Utageへの更新をスキップします。")
            return {"success": False, "message": "APIキーが設定されていません"}
        
        try:
            # TODO: Utage APIの実際のエンドポイントとリクエスト形式を確認
            async with httpx.AsyncClient() as client:
                response = await client.patch(
                    f"{self.api_url}/api/v1/members/{email}",
                    headers={
                        "Authorization": f"Bearer {self.api_key}",
                        "Content-Type": "application/json",
                    },
                    json={
                        "custom_fields": custom_fields
                    },
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    logger.info(f"Utageのカスタムフィールド更新成功: {email}")
                    return {"success": True, "message": "カスタムフィールドの更新が完了しました"}
                else:
                    logger.error(f"Utageのカスタムフィールド更新失敗: {response.status_code} - {response.text}")
                    return {"success": False, "message": f"カスタムフィールドの更新に失敗しました: {response.status_code}"}
                    
        except Exception as e:
            logger.error(f"Utageのカスタムフィールド更新でエラーが発生しました: {str(e)}")
            return {"success": False, "message": f"エラーが発生しました: {str(e)}"}
