export function getAssetUrl(assetPath: string): string {
    return new URL(assetPath.replace(/^\/+/, ""), document.baseURI).toString();
}