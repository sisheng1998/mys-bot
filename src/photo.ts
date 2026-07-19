import { Context } from "grammy"

export const handlePhotoMessage = async (ctx: Context): Promise<void> => {
  const photo = await ctx.getFile()
  if (!photo.file_path) return

  await ctx.reply(photo.file_path)
}
