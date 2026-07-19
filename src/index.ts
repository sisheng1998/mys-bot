import { Bot, webhookCallback } from "grammy"
import { UserFromGetMe } from "grammy/types"

import { isAuthorized } from "@/middleware"
import { handlePhotoMessage } from "@/photo"
import { handleTextMessage } from "@/text"
import { getUserIds } from "@/utils"

interface Env {
  APP_URL: string
  BOT_INFO: UserFromGetMe
  BOT_TOKEN: string
  ALLOWED_USER_IDS: string
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method === "GET") return Response.redirect(env.APP_URL, 302)

    const bot = new Bot(env.BOT_TOKEN, { botInfo: env.BOT_INFO })

    bot.use(isAuthorized(getUserIds(env.ALLOWED_USER_IDS)))

    bot.on("message:text", handleTextMessage)

    bot.on("message:photo", handlePhotoMessage)

    return webhookCallback(bot, "cloudflare-mod")(request)
  },
}
