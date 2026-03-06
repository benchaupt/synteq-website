/**
 * Rippling Job Sync Cron Worker
 *
 * Runs every 6 hours to trigger job listing sync from Rippling ATS
 * into the Payload CMS database via the main site's /api/sync-jobs endpoint.
 */

export interface Env {
  CRON_SECRET: string;
  SYNC_URL: string;
}

async function triggerSync(env: Env): Promise<{ success: boolean; data?: unknown; error?: string }> {
  console.log("Triggering job sync...");

  try {
    const response = await fetch(env.SYNC_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.CRON_SECRET}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();

    if (!response.ok) {
      console.error(`Sync failed with status ${response.status}:`, data);
      return { success: false, error: `HTTP ${response.status}`, data };
    }

    console.log("Sync result:", data);
    return { success: true, data };
  } catch (err) {
    const error = err instanceof Error ? err.message : "Unknown error";
    console.error("Sync request failed:", error);
    return { success: false, error };
  }
}

export default {
  async scheduled(controller: ScheduledController, env: Env, ctx: ExecutionContext): Promise<void> {
    console.log(`Cron triggered at ${new Date(controller.scheduledTime).toISOString()}`);
    ctx.waitUntil(triggerSync(env));
  },

  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/trigger" && request.method === "POST") {
      const authHeader = request.headers.get("Authorization");
      if (authHeader !== `Bearer ${env.CRON_SECRET}`) {
        return new Response("Unauthorized", { status: 401 });
      }

      const result = await triggerSync(env);
      return Response.json(result);
    }

    return new Response("Synteq Job Sync Worker", { status: 200 });
  },
} satisfies ExportedHandler<Env>;
