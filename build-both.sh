# !bin/bash
echo "🚀 Building APK..."
eas build --profile local-apk --platform android --local
echo "🚀 Building AAB..." 
eas build --profile local-aab --platform android --local
echo "✅ Builds completed."

# chmod +x build-both.sh
# ./build-both.sh
# eas build --profile local-simple --platform android --local