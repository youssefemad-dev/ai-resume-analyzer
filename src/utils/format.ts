/**
 * Converts a file size in bytes to a human-readable string.
 * @param bytes - The size in bytes.
 * @param decimals - Number of decimal places to show (default: 2).
 * @returns A formatted string like "1.23 KB", "4.56 MB", "7.89 GB", etc.
 */
export function formatSize(bytes: number, decimals: number = 2): string {
    if (bytes === 0) return "0 Bytes";

    const units = ["Bytes", "KB", "MB", "GB", "TB"];
    const k = 1024;
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const value = bytes / Math.pow(k, i);

    return `${value.toFixed(decimals)} ${units[i]}`;
}
export const generateUUID = () => crypto.randomUUID();