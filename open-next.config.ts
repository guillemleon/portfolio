import { defineCloudflareConfig } from '@opennextjs/cloudflare';
import staticAssetsIncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache';

// Content is baked in at build time, so prerendered pages can be served
// straight from the deployed assets. No R2 or KV needed.
export default defineCloudflareConfig({
    incrementalCache: staticAssetsIncrementalCache,
});
