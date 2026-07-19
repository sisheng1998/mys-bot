import { MiddlewareFn } from "grammy"

export const isAuthorized =
  (allowedUserIds: number[]): MiddlewareFn =>
  async (ctx, next): Promise<void> => {
    const userId = ctx.from?.id
    const chatType = ctx.chat?.type

    if (
      !userId ||
      !allowedUserIds.includes(userId) ||
      !chatType ||
      chatType !== "private"
    )
      return

    await next()
  }
