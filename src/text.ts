import { Context } from "grammy"

export const handleTextMessage = async (ctx: Context): Promise<void> => {
  const text = ctx.msg?.text
  if (!text) return

  await ctx.reply(text)
}
