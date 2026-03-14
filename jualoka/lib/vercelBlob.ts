/**
 * lib/vercelBlob.ts
 *
 * Utility for safe image deletion from Vercel Blob.
 */

import { del } from "@vercel/blob"

/**
 * Deletes an image from Vercel Blob if the URL is valid and hosted on Vercel.
 * Safely ignores empty URLs and non-Vercel URLs (e.g. Unsplash placeholders).
 * Returns true if a deletion attempt was made, false otherwise.
 *
 * Does not throw errors so it won't crash the main process.
 */
export async function deleteBlobImage(url: string | null | undefined): Promise<boolean> {
    if (!url) return false

    // Only attempt to delete if the URL is from Vercel Blob
    if (url.includes("blob.vercel-storage.com")) {
        try {
            await del(url)
            console.log(`[Blob] Deleted image: ${url}`)
            return true
        } catch (error) {
            console.error(`[Blob] Failed to delete image ${url}:`, error)
            // Do not throw so we don't block DB transactions
            return false
        }
    }

    return false
}
