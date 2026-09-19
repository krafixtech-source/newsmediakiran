export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    console.log("🚀 [Instrumentation] Initializing News Media Kiran background auto-sync hook...");
    try {
      const { triggerAutoSyncIfNeeded } = await import("@/lib/sync/newsmediakiran");

      // Initial check 3 seconds after server starts
      setTimeout(() => {
        triggerAutoSyncIfNeeded().catch((err) => {
          console.error("⚠️ [Instrumentation] Initial auto-sync error:", err);
        });
      }, 3000);

      // Register recurring check every 3 minutes
      const globalAny = globalThis as any;
      if (!globalAny.__newsMediaKiranSyncInterval) {
        globalAny.__newsMediaKiranSyncInterval = setInterval(() => {
          triggerAutoSyncIfNeeded().catch((err) => {
            console.error("⚠️ [Instrumentation] Recurring auto-sync error:", err);
          });
        }, 3 * 60 * 1000);
      }
    } catch (err) {
      console.error("⚠️ [Instrumentation] Failed to setup auto-sync hook:", err);
    }
  }
}
