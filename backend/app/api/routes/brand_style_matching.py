"""
ブランドスタイルマッチングAPI
デムナ、BALENCIAGAなどの高級ブランド風のデザインで、かつ安い服を探し出す
"""
import json
from pathlib import Path
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from enum import Enum

router = APIRouter(prefix="/api/brand-style", tags=["brand-style"])

# 商品ファイルのパス
BASE_DIR = Path(__file__).parent.parent.parent.parent.parent
PRODUCTS_FILE = BASE_DIR / "data" / "products" / "products.json"

# デバッグ用: パスを確認
if not PRODUCTS_FILE.exists():
    # 代替パスを試す
    alt_path = Path(__file__).parent.parent.parent.parent / "data" / "products" / "products.json"
    if alt_path.exists():
        PRODUCTS_FILE = alt_path


class BrandStyle(str, Enum):
    """ブランドスタイル（5つの大枠カテゴリ）"""
    OVERSIZE_LUXURY = "oversize-luxury"  # オーバーサイズ×ラグジュアリー（デムナ風推奨）
    MINIMAL_MONOCHROME = "minimal-monochrome"  # ミニマル×モノクロ
    STREET_GRAPHIC = "street-graphic"  # ストリート×グラフィック
    ATHLEISURE_STREET = "athleisure-street"  # アスレジャー×ストリート
    AVANT_GARDE = "avant-garde"  # アヴァンギャルド×デコンストラクション


# ブランドスタイルの特徴定義（5つの大枠カテゴリ）
BRAND_STYLE_FEATURES = {
    "oversize-luxury": {
        "name": "オーバーサイズ×ラグジュアリー",
        "description": "オーバーサイズ×ラグジュアリー融合スタイル",
        "is_recommended": True,  # 迷ったらこれがおすすめ
        "keywords": ["オーバーサイズ", "oversize", "デコンストラクション", "deconstruction", "ラグジュアリー", "luxury", "高級感", "premium", "ストリート", "street", "ロゴ", "logo", "グラフィック", "graphic"],
        "design_features": ["oversize", "deconstruction", "luxury", "street", "premium", "logo", "graphic"],
        "color_preferences": ["black", "white", "gray", "beige", "navy", "red"],
        "silhouette": "oversize",
        "luxury_atmosphere_min": 4.0,
        "uniqueness_min": 4.0,
        "street_luxury_fusion_min": 4.5,
        "similar_brands": [],
    },
    "minimal-monochrome": {
        "name": "ミニマル×モノクロ",
        "description": "シンプルで洗練されたミニマル×モノクロスタイル",
        "is_recommended": False,
        "keywords": ["ミニマル", "minimal", "モノクロ", "monochrome", "シンプル", "simple", "洗練", "sophisticated", "クリーン", "clean"],
        "design_features": ["minimal", "monochrome", "simple", "clean", "sophisticated"],
        "color_preferences": ["black", "white", "gray", "beige", "navy"],
        "silhouette": "regular",
        "luxury_atmosphere_min": 3.5,
        "uniqueness_min": 3.5,
        "street_luxury_fusion_min": 3.5,
        "similar_brands": [],
    },
    "street-graphic": {
        "name": "ストリート×グラフィック",
        "description": "ストリート×グラフィックが特徴的なスタイル",
        "is_recommended": False,
        "keywords": ["ストリート", "street", "グラフィック", "graphic", "ロゴ", "logo", "アローロゴ", "arrow", "ジッパー", "zipper", "インダストリアル", "industrial"],
        "design_features": ["graphic", "logo", "street", "industrial", "arrow"],
        "color_preferences": ["black", "white", "yellow", "orange", "red"],
        "silhouette": "regular",
        "luxury_atmosphere_min": 3.5,
        "uniqueness_min": 4.0,
        "street_luxury_fusion_min": 4.0,
        "similar_brands": [],
    },
    "athleisure-street": {
        "name": "アスレジャー×ストリート",
        "description": "スポーツウェアの要素を取り入れたストリートスタイル",
        "is_recommended": False,
        "keywords": ["アスレジャー", "athleisure", "ストリート", "street", "ミニマル", "minimal", "モノクロ", "monochrome", "スポーツ", "sport"],
        "design_features": ["athleisure", "street", "minimal", "monochrome", "sport"],
        "color_preferences": ["beige", "gray", "black", "white", "brown"],
        "silhouette": "oversize",
        "luxury_atmosphere_min": 3.5,
        "uniqueness_min": 3.5,
        "street_luxury_fusion_min": 4.0,
        "similar_brands": [],
    },
    "avant-garde": {
        "name": "アヴァンギャルド×デコンストラクション",
        "description": "前衛的で実験的なデコンストラクションスタイル",
        "is_recommended": False,
        "keywords": ["アヴァンギャルド", "avant-garde", "デコンストラクション", "deconstruction", "アシンメトリー", "asymmetry", "前衛", "experimental", "独創", "unique"],
        "design_features": ["avant-garde", "deconstruction", "asymmetry", "experimental", "unique"],
        "color_preferences": ["black", "white", "gray", "beige"],
        "silhouette": "oversize",
        "luxury_atmosphere_min": 4.0,
        "uniqueness_min": 4.5,
        "street_luxury_fusion_min": 4.0,
        "similar_brands": [],
    },
}


def load_products():
    """商品データを読み込む"""
    try:
        with open(PRODUCTS_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
            return data.get("products", [])
    except FileNotFoundError:
        return []
    except json.JSONDecodeError:
        return []


def calculate_brand_style_score(product: dict, brand_style: str) -> float:
    """
    商品が指定されたブランドスタイルにどれだけ近いかをスコアリング
    
    スコア計算:
    - キーワードマッチング: 30%
    - デザインフィーチャーマッチング: 25%
    - 評価スコアマッチング: 25%
    - 価格効率: 20%
    """
    if brand_style not in BRAND_STYLE_FEATURES:
        return 0.0
    
    features = BRAND_STYLE_FEATURES[brand_style]
    score = 0.0
    
    # 1. キーワードマッチング（30%）
    keyword_score = 0.0
    product_text = (
        product.get("name", "").lower() + " " +
        product.get("description", "").lower() + " " +
        product.get("brand", "").lower()
    )
    
    matched_keywords = sum(1 for keyword in features["keywords"] if keyword.lower() in product_text)
    keyword_score = min(matched_keywords / len(features["keywords"]) * 3, 1.0)  # 最大1.0
    score += keyword_score * 0.3
    
    # 2. デザインフィーチャーマッチング（25%）
    design_score = 0.0
    attributes = product.get("attributes", {})
    design_features = attributes.get("design", [])
    
    if design_features:
        matched_features = sum(1 for feature in features["design_features"] 
                              if any(feature.lower() in df.lower() for df in design_features))
        design_score = min(matched_features / len(features["design_features"]), 1.0)
    
    score += design_score * 0.25
    
    # 3. 評価スコアマッチング（25%）
    evaluation = product.get("evaluation", {})
    eval_score = 0.0
    
    luxury_atmosphere = evaluation.get("luxury_atmosphere", 0)
    uniqueness = evaluation.get("uniqueness", 0)
    street_luxury_fusion = evaluation.get("street_luxury_fusion", 0)
    
    # 各評価スコアが基準値を満たしているか
    luxury_match = min(luxury_atmosphere / features["luxury_atmosphere_min"], 1.0) if features["luxury_atmosphere_min"] > 0 else 1.0
    uniqueness_match = min(uniqueness / features["uniqueness_min"], 1.0) if features["uniqueness_min"] > 0 else 1.0
    fusion_match = min(street_luxury_fusion / features["street_luxury_fusion_min"], 1.0) if features["street_luxury_fusion_min"] > 0 else 1.0
    
    eval_score = (luxury_match + uniqueness_match + fusion_match) / 3
    score += eval_score * 0.25
    
    # 4. シルエットマッチング（追加ボーナス）
    if features["silhouette"] == "oversize":
        if evaluation.get("oversize_lower_body"):
            score += 0.1  # ボーナス
    
    # 5. 価格効率（20%）
    price = product.get("price", 0)
    # 価格が低いほど高スコア（最大50,000円を基準に正規化）
    price_efficiency = max(0, 1.0 - (price / 50000) * 0.5)  # 50,000円以上で0.5倍、それ以下で線形減少
    score += price_efficiency * 0.2
    
    return min(score, 1.0)  # 最大1.0


@router.get("/match")
async def match_brand_style(
    brand_style: BrandStyle = Query(..., description="ブランドスタイル（oversize-luxury, minimal-monochrome, street-graphic, athleisure-street, avant-garde）"),
    max_price: Optional[int] = Query(None, description="最大価格（予算上限）"),
    category: Optional[str] = Query(None, description="カテゴリ（パンツ、トップス、靴など）"),
    min_score: float = Query(0.5, ge=0.0, le=1.0, description="最小マッチングスコア（0.0-1.0）"),
    limit: int = Query(20, ge=1, le=50, description="推薦商品数")
):
    """
    ブランドスタイルマッチングAPI
    
    指定されたブランドスタイルカテゴリに似たデザインで、
    かつ安い服を探し出します。各カテゴリでデムナ風を推奨として表示します。
    
    - **brand_style**: ブランドスタイルカテゴリ
        - oversize-luxury: オーバーサイズ×ラグジュアリー（デムナ、BALENCIAGA、VETEMENTS風）- **デムナ風推奨**
        - minimal-monochrome: ミニマル×モノクロ（シンプルで洗練）- **デムナ風推奨**
        - street-graphic: ストリート×グラフィック（OFF-WHITE風など）- **デムナ風推奨**
        - athleisure-street: アスレジャー×ストリート（YEEZY風など）- **デムナ風推奨**
        - avant-garde: アヴァンギャルド×デコンストラクション（前衛的）- **デムナ風推奨**
    - **max_price**: 最大価格（予算上限）
    - **category**: カテゴリ（パンツ、トップス、靴など）
    - **min_score**: 最小マッチングスコア（0.0-1.0、デフォルト: 0.5）
    - **limit**: 推薦商品数（デフォルト: 20、最大: 50）
    """
    products = load_products()
    
    # マッチングスコアを計算
    scored_products = []
    
    for product in products:
        # 在庫チェック
        if not product.get("in_stock", True):
            continue
        
        # カテゴリでフィルタリング
        if category and product.get("category") != category:
            continue
        
        # 価格でフィルタリング
        price = product.get("price", 0)
        if max_price is not None and price > max_price:
            continue
        
        # ブランドスタイルマッチングスコアを計算
        style_score = calculate_brand_style_score(product, brand_style.value)
        
        if style_score < min_score:
            continue
        
        scored_products.append({
            "product": product,
            "style_score": style_score
        })
    
    # マッチングスコアでソート（降順）
    scored_products.sort(key=lambda x: x["style_score"], reverse=True)
    
    # 指定された件数まで取得
    matched_products = scored_products[:limit]
    
    # レスポンス用のデータを整形
    response_products = []
    for item in matched_products:
        product = item["product"]
        style_score = item["style_score"]
        
        # 推薦理由を生成
        features = BRAND_STYLE_FEATURES.get(brand_style.value, {})
        style_name = features.get("name", brand_style.value)
        
        reasons = []
        if style_score >= 0.8:
            reasons.append(f"{style_name}スタイルに非常に近い")
        elif style_score >= 0.6:
            reasons.append(f"{style_name}スタイルに近い")
        else:
            reasons.append(f"{style_name}スタイル")
        
        price = product.get("price", 0)
        if price <= 5000:
            reasons.append("5,000円以下でお手頃")
        elif price <= 10000:
            reasons.append("10,000円以下でコスパが良い")
        elif price <= 20000:
            reasons.append("20,000円以下で高級ブランド風")
        
        evaluation = product.get("evaluation", {})
        if evaluation.get("luxury_atmosphere", 0) >= 4.0:
            reasons.append("高級感のあるデザイン")
        
        if evaluation.get("street_luxury_fusion", 0) >= 4.0:
            reasons.append("ストリート×ラグジュアリー融合")
        
        if not reasons:
            reasons.append("条件に合致した商品")
        
        response_products.append({
            "product_id": product.get("product_id"),
            "name": product.get("name"),
            "category": product.get("category"),
            "brand": product.get("brand"),
            "price": product.get("price"),
            "image_url": product.get("image_url"),
            "moteru_score": product.get("evaluation", {}).get("moteru_score"),
            "style_score": round(style_score, 3),
            "recommendation_reason": "・".join(reasons),
            "returnable": product.get("returnable"),
            "in_stock": product.get("in_stock"),
            "url": product.get("url"),
            "affiliate_url": product.get("affiliate_url")
        })
    
    return {
        "brand_style": brand_style.value,
        "count": len(response_products),
        "max_price": max_price,
        "min_score": min_score,
        "products": response_products
    }


@router.get("/styles")
async def get_brand_styles():
    """
    利用可能なブランドスタイルの一覧を取得
    """
    styles = []
    for style_key, style_value in BrandStyle.__members__.items():
        features = BRAND_STYLE_FEATURES.get(style_value.value, {})
        styles.append({
            "key": style_value.value,
            "name": _get_style_display_name(style_value.value),
            "description": _get_style_description(style_value.value),
            "is_recommended": features.get("is_recommended", False),
            "keywords": features.get("keywords", []),
            "design_features": features.get("design_features", []),
            "similar_brands": features.get("similar_brands", [])
        })
    
    return {
        "styles": styles
    }


def _get_style_display_name(style: str) -> str:
    """スタイルの表示名を取得"""
    features = BRAND_STYLE_FEATURES.get(style, {})
    return features.get("name", style)


def _get_style_description(style: str) -> str:
    """スタイルの説明を取得"""
    features = BRAND_STYLE_FEATURES.get(style, {})
    return features.get("description", "")
