#!/bin/bash
# ドメイン設定確認スクリプト

echo "🔍 ドメイン設定の確認を開始します..."
echo ""

echo "1. DNSレコードの確認:"
nslookup motefuku.com 2>&1 | head -10
echo ""

echo "2. ネームサーバーの確認:"
dig NS motefuku.com +short 2>&1
echo ""

echo "3. SSL証明書の確認:"
echo | openssl s_client -connect motefuku.com:443 -servername motefuku.com 2>&1 | grep -E "(subject=|issuer=|Verify return code:)" | head -3
echo ""

echo "4. HTTPステータスの確認:"
curl -I https://motefuku.com 2>&1 | head -5
echo ""

echo "✅ 確認完了"
