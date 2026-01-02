"""
商品検索・推薦関連のAPI
"""
import json
from pathlib import Path
from fastapi import APIRouter, HTTPException, Query
from typing import List, Optional
from enum import Enum

router = APIRouter(prefix="/api/products", tags=["products"])

# 商品ファイルのパス
BASE_DIR = Path(__file__).parent.parent.parent.parent.parent
PRODUCTS_FILE = BASE_DIR / "data" / "products" / "products.json"

# デバッグ用: パスを確認
if not PRODUCTS_FILE.exists():
    # 代替パスを試す
    alt_path = Path(__file__).parent.parent.parent.parent / "data" / "products" / "products.json"
    if alt_path.exists():
        PRODUCTS_FILE = alt_path


class SortOrder(str, Enum):
    """ソート順"""
    PRICE_ASC = "price_asc"
    PRICE_DESC = "price_desc"
    MOTERU_SCORE_DESC = "moteru_score_desc"
    CREATED_AT_DESC = "created_at_desc"


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


@router.get("/search")
async def search_products(
    category: Optional[str] = Query(None, description="カテゴリ（パンツ、トップス、靴など）"),
    min_price: Optional[int] = Query(None, description="最小価格"),
    max_price: Optional[int] = Query(None, description="最大価格"),
    color: Optional[str] = Query(None, description="カラー"),
    size: Optional[str] = Query(None, description="サイズ"),
    brand: Optional[str] = Query(None, description="ブランド名"),
    returnable: Optional[bool] = Query(None, description="返品可否"),
    in_stock: Optional[bool] = Query(None, description="在庫状況"),
    min_moteru_score: Optional[float] = Query(None, description="最小モテる度スコア"),
    scene: Optional[str] = Query(None, description="シーン（デート、仕事、カジュアルなど）"),
    style: Optional[str] = Query(None, description="スタイル（カジュアル、ビジネス、ストリートなど）"),
    season: Optional[str] = Query(None, description="季節（春、夏、秋、冬）"),
    keyword: Optional[str] = Query(None, description="キーワード検索"),
    sort: Optional[SortOrder] = Query(SortOrder.MOTERU_SCORE_DESC, description="ソート順"),
    page: int = Query(1, ge=1, description="ページ番号"),
    limit: int = Query(20, ge=1, le=100, description="1ページあたりの件数")
):
    """
    商品検索API
    
    - **category**: カテゴリ（パンツ、トップス、靴など）
    - **min_price**: 最小価格
    - **max_price**: 最大価格
    - **color**: カラー
    - **size**: サイズ
    - **brand**: ブランド名
    - **returnable**: 返品可否
    - **in_stock**: 在庫状況
    - **min_moteru_score**: 最小モテる度スコア
    - **scene**: シーン（デート、仕事、カジュアルなど）
    - **style**: スタイル（カジュアル、ビジネス、ストリートなど）
    - **season**: 季節（春、夏、秋、冬）
    - **keyword**: キーワード検索
    - **sort**: ソート順（price_asc, price_desc, moteru_score_desc, created_at_desc）
    - **page**: ページ番号
    - **limit**: 1ページあたりの件数
    """
    products = load_products()
    
    # フィルタリング
    filtered_products = []
    
    for product in products:
        # カテゴリでフィルタリング
        if category and product.get("category") != category:
            continue
        
        # 価格でフィルタリング
        price = product.get("price", 0)
        if min_price is not None and price < min_price:
            continue
        if max_price is not None and price > max_price:
            continue
        
        # カラーでフィルタリング
        if color and color not in product.get("colors", []):
            continue
        
        # サイズでフィルタリング
        if size and size not in product.get("sizes", []):
            continue
        
        # ブランドでフィルタリング
        if brand and brand not in product.get("brand", ""):
            continue
        
        # 返品可否でフィルタリング
        if returnable is not None and product.get("returnable") != returnable:
            continue
        
        # 在庫状況でフィルタリング
        if in_stock is not None and product.get("in_stock") != in_stock:
            continue
        
        # モテる度でフィルタリング
        moteru_score = product.get("evaluation", {}).get("moteru_score", 0)
        if min_moteru_score is not None and moteru_score < min_moteru_score:
            continue
        
        # シーンでフィルタリング
        if scene:
            attributes = product.get("attributes", {})
            scenes = attributes.get("scene", [])
            if scene not in scenes:
                continue
        
        # スタイルでフィルタリング
        if style:
            attributes = product.get("attributes", {})
            styles = attributes.get("style", [])
            if style not in styles:
                continue
        
        # 季節でフィルタリング
        if season:
            attributes = product.get("attributes", {})
            seasons = attributes.get("season", [])
            if season not in seasons:
                continue
        
        # キーワードでフィルタリング
        if keyword:
            keyword_lower = keyword.lower()
            name = product.get("name", "").lower()
            description = product.get("description", "").lower()
            brand_name = product.get("brand", "").lower()
            
            if (keyword_lower not in name and 
                keyword_lower not in description and 
                keyword_lower not in brand_name):
                continue
        
        filtered_products.append(product)
    
    # ソート
    if sort == SortOrder.PRICE_ASC:
        filtered_products.sort(key=lambda p: p.get("price", 0))
    elif sort == SortOrder.PRICE_DESC:
        filtered_products.sort(key=lambda p: p.get("price", 0), reverse=True)
    elif sort == SortOrder.MOTERU_SCORE_DESC:
        filtered_products.sort(
            key=lambda p: p.get("evaluation", {}).get("moteru_score", 0), 
            reverse=True
        )
    elif sort == SortOrder.CREATED_AT_DESC:
        filtered_products.sort(
            key=lambda p: p.get("created_at", ""), 
            reverse=True
        )
    
    # ページネーション
    total_count = len(filtered_products)
    total_pages = (total_count + limit - 1) // limit
    start = (page - 1) * limit
    end = start + limit
    paginated_products = filtered_products[start:end]
    
    # レスポンス用のデータを整形
    response_products = []
    for product in paginated_products:
        response_products.append({
            "product_id": product.get("product_id"),
            "name": product.get("name"),
            "category": product.get("category"),
            "brand": product.get("brand"),
            "price": product.get("price"),
            "image_url": product.get("image_url"),
            "moteru_score": product.get("evaluation", {}).get("moteru_score"),
            "returnable": product.get("returnable"),
            "in_stock": product.get("in_stock"),
            "url": product.get("url"),
            "affiliate_url": product.get("affiliate_url")
        })
    
    return {
        "count": total_count,
        "page": page,
        "limit": limit,
        "total_pages": total_pages,
        "products": response_products
    }


@router.get("/recommend")
async def recommend_products(
    purpose: Optional[str] = Query(None, description="用途・要望（例: デート用、仕事用、カジュアルな服など）"),
    max_price: Optional[int] = Query(None, description="最大価格（予算上限）"),
    category: Optional[str] = Query(None, description="カテゴリ（パンツ、トップス、靴など）"),
    scene: Optional[str] = Query(None, description="シーン（デート、仕事、カジュアルなど）"),
    style: Optional[str] = Query(None, description="スタイル（カジュアル、ビジネス、ストリートなど）"),
    season: Optional[str] = Query(None, description="季節（春、夏、秋、冬）"),
    min_moteru_score: Optional[float] = Query(3.5, description="最小モテる度スコア"),
    body_type: Optional[str] = Query(None, description="体型（細身、標準、がっちり、小柄）"),
    height: Optional[int] = Query(None, description="身長（cm）"),
    weight: Optional[int] = Query(None, description="体重（kg）"),
    size: Optional[str] = Query(None, description="サイズ（XS, S, M, L, XL, XXL）"),
    fit: Optional[str] = Query(None, description="フィット感（スリム、レギュラー、オーバーサイズ、ルーズ）"),
    limit: int = Query(10, ge=1, le=20, description="推薦商品数")
):
    """
    商品推薦API
    
    ユーザーの要望・条件・体型に基づいて最適な商品を推薦します。
    モテる度を重視して、予算内で最適な商品を選びます。
    
    - **purpose**: 用途・要望（例: デート用、仕事用、カジュアルな服など）
    - **max_price**: 最大価格（予算上限）
    - **category**: カテゴリ（パンツ、トップス、靴など）
    - **scene**: シーン（デート、仕事、カジュアルなど）
    - **style**: スタイル（カジュアル、ビジネス、ストリートなど）
    - **season**: 季節（春、夏、秋、冬）
    - **min_moteru_score**: 最小モテる度スコア（デフォルト: 3.5）
    - **body_type**: 体型（細身、標準、がっちり、小柄）
    - **height**: 身長（cm）
    - **weight**: 体重（kg）
    - **size**: サイズ（XS, S, M, L, XL, XXL）
    - **fit**: フィット感（スリム、レギュラー、オーバーサイズ、ルーズ）
    - **limit**: 推薦商品数（デフォルト: 10、最大: 20）
    """
    products = load_products()
    
    # フィルタリング
    candidate_products = []
    
    for product in products:
        # 在庫チェック（在庫なしは除外）
        if not product.get("in_stock", True):
            continue
        
        # 価格でフィルタリング
        price = product.get("price", 0)
        if max_price is not None and price > max_price:
            continue
        
        # モテる度でフィルタリング
        moteru_score = product.get("evaluation", {}).get("moteru_score", 0)
        if moteru_score < min_moteru_score:
            continue
        
        # カテゴリでフィルタリング
        if category and product.get("category") != category:
            continue
        
        # シーンでフィルタリング
        if scene:
            attributes = product.get("attributes", {})
            scenes = attributes.get("scene", [])
            if scene not in scenes:
                continue
        
        # スタイルでフィルタリング
        if style:
            attributes = product.get("attributes", {})
            styles = attributes.get("style", [])
            if style not in styles:
                continue
        
        # 季節でフィルタリング
        if season:
            attributes = product.get("attributes", {})
            seasons = attributes.get("season", [])
            if season not in seasons:
                continue
        
        # 用途（purpose）でフィルタリング（キーワードマッチング）
        if purpose:
            purpose_lower = purpose.lower()
            name = product.get("name", "").lower()
            description = product.get("description", "").lower()
            brand = product.get("brand", "").lower()
            attributes = product.get("attributes", {})
            scenes = [s.lower() for s in attributes.get("scene", [])]
            styles = [s.lower() for s in attributes.get("style", [])]
            
            # 用途キーワードが商品情報に含まれているかチェック
            keyword_match = (
                purpose_lower in name or
                purpose_lower in description or
                purpose_lower in brand or
                any(purpose_lower in s for s in scenes) or
                any(purpose_lower in s for s in styles)
            )
            
            if not keyword_match:
                continue
        
        # 体型・サイズでフィルタリング（オプション）
        body_match_score = 1.0  # デフォルトは完全一致
        
        # サイズでフィルタリング
        if size:
            product_sizes = product.get("sizes", [])
            if product_sizes and size not in product_sizes:
                continue  # サイズが一致しない場合は除外
        
        # フィット感でフィルタリング
        if fit:
            attributes = product.get("attributes", {})
            product_fit = attributes.get("fit", "")
            if product_fit and fit.lower() not in product_fit.lower():
                # 完全一致しない場合でも、類似性を考慮
                if fit == "スリム" and "レギュラー" in product_fit:
                    body_match_score *= 0.8  # 少し減点
                elif fit == "オーバーサイズ" and "ルーズ" in product_fit:
                    body_match_score *= 0.8  # 少し減点
                elif fit.lower() not in product_fit.lower():
                    continue  # 全く一致しない場合は除外
        
        candidate_products.append({
            "product": product,
            "body_match_score": body_match_score
        })
    
    # 体型に基づく推薦スコアを計算
    def calculate_body_type_score(product: dict, body_type: Optional[str], height: Optional[int], weight: Optional[int]) -> float:
        """体型に基づくスコアを計算（0.0-1.0）"""
        if not body_type and not height and not weight:
            return 1.0  # 体型情報がない場合は完全一致
        
        score = 1.0
        attributes = product.get("attributes", {})
        product_fit = attributes.get("fit", "")
        evaluation = product.get("evaluation", {})
        
        # 体型別の推奨フィット感
        body_type_fit_preferences = {
            "細身": ["スリム", "レギュラー"],
            "標準": ["レギュラー", "スリム"],
            "がっちり": ["レギュラー", "ルーズ", "オーバーサイズ"],
            "小柄": ["スリム", "レギュラー"]
        }
        
        if body_type and body_type in body_type_fit_preferences:
            preferred_fits = body_type_fit_preferences[body_type]
            if product_fit:
                if any(fit.lower() in product_fit.lower() for fit in preferred_fits):
                    score = 1.0  # 推奨フィット感と一致
                else:
                    score = 0.7  # 推奨フィット感と一致しない（少し減点）
        
        # 身長・体重に基づく調整（簡易版）
        if height and weight:
            bmi = weight / ((height / 100) ** 2) if height > 0 else 0
            if bmi < 18.5:  # やせ型
                if "スリム" in product_fit or "レギュラー" in product_fit:
                    score *= 1.0
                else:
                    score *= 0.8
            elif bmi > 25:  # 肥満型
                if "ルーズ" in product_fit or "オーバーサイズ" in product_fit:
                    score *= 1.0
                else:
                    score *= 0.8
        
        return score
    
    # モテる度でソート（降順）
    candidate_products.sort(
        key=lambda item: item["product"].get("evaluation", {}).get("moteru_score", 0),
        reverse=True
    )
    
    # 価格も考慮した推薦スコアを計算（モテる度 × 価格効率 × 体型マッチ）
    scored_products = []
    for item in candidate_products:
        product = item["product"]
        body_match_score = item["body_match_score"]
        moteru_score = product.get("evaluation", {}).get("moteru_score", 0)
        price = product.get("price", 0)
        
        # 体型スコアを計算
        body_type_score = calculate_body_type_score(product, body_type, height, weight)
        combined_body_score = body_match_score * body_type_score
        
        # 推薦スコア = モテる度 × (価格効率の重み付け) × (体型マッチの重み付け)
        # 価格効率: 価格が低いほど高い（最大価格が指定されている場合はその範囲内で評価）
        if max_price:
            price_efficiency = 1.0 - (price / max_price) * 0.3  # 価格が高いほど少し減点（最大30%減点）
        else:
            price_efficiency = 1.0 / (1.0 + price / 50000)  # 価格が高いほど減点
        
        # スコア計算: モテる度70%、価格効率15%、体型マッチ15%
        recommendation_score = moteru_score * (0.7 + price_efficiency * 0.15 + combined_body_score * 0.15)
        
        scored_products.append({
            "product": product,
            "recommendation_score": recommendation_score,
            "body_match_score": combined_body_score
        })
    
    # 推薦スコアでソート（降順）
    scored_products.sort(key=lambda x: x["recommendation_score"], reverse=True)
    
    # 指定された件数まで取得
    recommended_products = scored_products[:limit]
    
    # レスポンス用のデータを整形
    response_products = []
    for item in recommended_products:
        product = item["product"]
        response_products.append({
            "product_id": product.get("product_id"),
            "name": product.get("name"),
            "category": product.get("category"),
            "brand": product.get("brand"),
            "price": product.get("price"),
            "image_url": product.get("image_url"),
            "moteru_score": product.get("evaluation", {}).get("moteru_score"),
            "recommendation_score": round(item["recommendation_score"], 2),
            "recommendation_reason": _generate_recommendation_reason(product, purpose, scene, style, body_type, fit),
            "returnable": product.get("returnable"),
            "in_stock": product.get("in_stock"),
            "url": product.get("url"),
            "affiliate_url": product.get("affiliate_url")
        })
    
    return {
        "count": len(response_products),
        "purpose": purpose,
        "max_price": max_price,
        "products": response_products
    }


def _generate_recommendation_reason(product: dict, purpose: Optional[str], scene: Optional[str], style: Optional[str], body_type: Optional[str] = None, fit: Optional[str] = None) -> str:
    """推薦理由を生成"""
    reasons = []
    
    moteru_score = product.get("evaluation", {}).get("moteru_score", 0)
    if moteru_score >= 4.5:
        reasons.append("モテる度が非常に高い")
    elif moteru_score >= 4.0:
        reasons.append("モテる度が高い")
    
    if scene:
        reasons.append(f"{scene}シーンに最適")
    
    if style:
        reasons.append(f"{style}スタイルに合う")
    
    if purpose:
        reasons.append(f"{purpose}に適している")
    
    # 体型・サイズに基づく推薦理由
    if body_type:
        attributes = product.get("attributes", {})
        product_fit = attributes.get("fit", "")
        if product_fit:
            reasons.append(f"{body_type}体型に適したフィット感")
    
    if fit:
        attributes = product.get("attributes", {})
        product_fit = attributes.get("fit", "")
        if product_fit and fit.lower() in product_fit.lower():
            reasons.append(f"希望の{fit}フィット")
    
    price = product.get("price", 0)
    if price <= 5000:
        reasons.append("お手頃価格")
    elif price <= 10000:
        reasons.append("コスパが良い")
    
    evaluation = product.get("evaluation", {})
    if evaluation.get("oversize_lower_body"):
        reasons.append("オーバーサイズシルエットでモテる")
    
    if not reasons:
        reasons.append("条件に合致した商品")
    
    return "・".join(reasons)


@router.get("/{product_id}")
async def get_product(product_id: str):
    """
    特定の商品を取得
    
    - **product_id**: 商品ID（例: PROD_001）
    """
    products = load_products()
    
    product = next(
        (p for p in products if p.get("product_id") == product_id),
        None
    )
    
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    return product


@router.get("/{product_id}/related")
async def get_related_products(
    product_id: str,
    limit: int = Query(5, ge=1, le=10, description="推薦商品数")
):
    """
    関連商品を取得（購入選択時の追加商品提案用）
    
    - **product_id**: 商品ID（例: PROD_001）
    - **limit**: 推薦商品数（デフォルト: 5）
    
    推薦ロジック:
    1. 同じカテゴリの商品
    2. 同じシーンの商品
    3. 補完商品（小物など）
    4. モテる度が高い商品
    """
    products = load_products()
    
    # 現在の商品を取得
    current_product = next(
        (p for p in products if p.get("product_id") == product_id),
        None
    )
    
    if not current_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # 関連商品を推薦
    related_products = []
    
    # 1. 同じカテゴリの商品（現在の商品を除く）
    same_category = [
        p for p in products
        if p.get("product_id") != product_id
        and p.get("category") == current_product.get("category")
    ]
    
    # 2. 同じシーンの商品（現在の商品を除く）
    current_scenes = current_product.get("attributes", {}).get("scene", [])
    same_scene = [
        p for p in products
        if p.get("product_id") != product_id
        and any(scene in p.get("attributes", {}).get("scene", []) for scene in current_scenes)
    ]
    
    # 3. 補完商品（小物など）- カテゴリが異なる商品
    complementary = [
        p for p in products
        if p.get("product_id") != product_id
        and p.get("category") != current_product.get("category")
        and p.get("category") in ["時計", "ベルト", "バッグ", "小物"]
    ]
    
    # 4. モテる度が高い商品（現在の商品を除く）
    high_moteru = [
        p for p in products
        if p.get("product_id") != product_id
        and p.get("moteru_score", 0) >= 4.0
    ]
    
    # 優先順位: 同じカテゴリ > 同じシーン > 補完商品 > モテる度が高い商品
    all_related = []
    
    # 同じカテゴリの商品を追加（最大2件）
    for p in same_category[:2]:
        if p not in all_related:
            all_related.append(p)
    
    # 同じシーンの商品を追加（最大2件）
    for p in same_scene[:2]:
        if p not in all_related and len(all_related) < limit:
            all_related.append(p)
    
    # 補完商品を追加（最大2件）
    for p in complementary[:2]:
        if p not in all_related and len(all_related) < limit:
            all_related.append(p)
    
    # モテる度が高い商品を追加（残りを埋める）
    for p in high_moteru:
        if p not in all_related and len(all_related) < limit:
            all_related.append(p)
    
    # モテる度でソート
    all_related.sort(key=lambda x: x.get("moteru_score", 0), reverse=True)
    
    # 最大limit件まで
    related_products = all_related[:limit]
    
    # 在庫情報を追加（ランダムに生成、実際のデータでは商品データから取得）
    import random
    for p in related_products:
        if "stock_quantity" not in p:
            p["stock_quantity"] = random.randint(1, 50)  # 1-50のランダムな在庫数
        if "reviews" not in p:
            # レビュー情報を追加（ランダムに生成）
            review_count = random.randint(5, 50)
            avg_rating = round(random.uniform(3.5, 5.0), 1)
            p["reviews"] = {
                "count": review_count,
                "average_rating": avg_rating,
                "rating_distribution": {
                    "5": random.randint(review_count // 2, review_count),
                    "4": random.randint(0, review_count // 4),
                    "3": random.randint(0, review_count // 10),
                    "2": random.randint(0, review_count // 20),
                    "1": random.randint(0, review_count // 20)
                }
            }
    
    # 一緒に購入された商品の情報を追加（ランダムに生成）
    frequently_bought_together = []
    if len(related_products) >= 2:
        # 上位2件を「よく一緒に購入される商品」として追加
        for p in related_products[:2]:
            p["frequently_bought_together"] = {
                "percentage": random.randint(60, 90),  # 60-90%の人が一緒に購入
                "count": random.randint(100, 500)  # 100-500人が一緒に購入
            }
            frequently_bought_together.append({
                "product_id": p.get("product_id"),
                "name": p.get("name"),
                "percentage": p["frequently_bought_together"]["percentage"],
                "count": p["frequently_bought_together"]["count"]
            })
    
    return {
        "product_id": product_id,
        "related_products": related_products,
        "count": len(related_products),
        "frequently_bought_together": frequently_bought_together,
        "bundle_offers": [
            {
                "name": "2点セット",
                "discount_rate": 10,
                "description": "2点以上購入で10%オフ"
            },
            {
                "name": "3点セット",
                "discount_rate": 15,
                "description": "3点以上購入で15%オフ"
            },
            {
                "name": "コーディネート一式",
                "discount_rate": 20,
                "description": "コーディネート一式（トップス + パンツ + 靴）で20%オフ"
            }
        ],
        "free_shipping_threshold": 5000  # 無料配送の閾値（5000円）
    }
