export const getUserIds = (userIds: string): number[] => [
  ...new Set(
    userIds
      .split(",")
      .map((id) => Number(id.trim()))
      .filter((id) => !Number.isNaN(id))
  ),
]
