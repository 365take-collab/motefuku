"""
コーディネートテンプレート関連のAPI
"""
import json
from pathlib import Path
from fastapi import APIRouter, HTTPException
from typing import List, Optional

router = APIRouter(prefix="/api/templates", tags=["templates"])

# テンプレートファイルのパス
# backend/app/api/routes/templates.py から見て、プロジェクトルートのdata/templates/templates.json
# __file__ は backend/app/api/routes/templates.py
# プロジェクトルートは backend の親ディレクトリ
BASE_DIR = Path(__file__).parent.parent.parent.parent.parent
TEMPLATES_FILE = BASE_DIR / "data" / "templates" / "templates.json"

# デバッグ用: パスを確認
import os
if not TEMPLATES_FILE.exists():
    # 代替パスを試す
    alt_path = Path(__file__).parent.parent.parent.parent / "data" / "templates" / "templates.json"
    if alt_path.exists():
        TEMPLATES_FILE = alt_path


def load_templates():
    """テンプレートデータを読み込む"""
    try:
        with open(TEMPLATES_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("テンプレート", [])
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []


@router.get("/")
async def get_templates(
    scene: Optional[str] = None,
    style: Optional[str] = None,
    season: Optional[str] = None
):
    """
    テンプレート一覧を取得
    
    - **scene**: シーン（デート、仕事、カジュアルなど）
    - **style**: スタイル（カジュアル、ビジネスなど）
    - **season**: 季節（春、夏、秋、冬）
    """
    templates = load_templates()
    
    # フィルタリング
    if scene:
        templates = [t for t in templates if t.get("scene") == scene]
    if style:
        templates = [t for t in templates if t.get("style") == style]
    if season:
        templates = [t for t in templates if t.get("season") == season]
    
    return {
        "count": len(templates),
        "templates": templates
    }


@router.get("/{template_id}")
async def get_template(template_id: str):
    """
    特定のテンプレートを取得
    
    - **template_id**: テンプレートID（例: TEMPLATE_001）
    """
    templates = load_templates()
    
    template = next(
        (t for t in templates if t.get("template_id") == template_id),
        None
    )
    
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    
    return template
