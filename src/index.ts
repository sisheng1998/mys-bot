import { Bot, Context, webhookCallback } from "grammy"
import { UserFromGetMe } from "grammy/types"

import { isAuthorized } from "@/middleware"
import { getUserIds } from "@/utils"

export interface Env {
  BOT_INFO: UserFromGetMe
  BOT_TOKEN: string
  ALLOWED_USER_IDS: string
}

export default {
  async fetch(
    request: Request,
    env: Env,
    ctx: ExecutionContext
  ): Promise<Response> {
    const bot = new Bot(env.BOT_TOKEN, { botInfo: env.BOT_INFO })

    bot.use(isAuthorized(getUserIds(env.ALLOWED_USER_IDS)))

    bot.on("message", async (ctx: Context) => {
      await ctx.reply("Authorized")
    })

    return webhookCallback(bot, "cloudflare-mod")(request)
  },
}
