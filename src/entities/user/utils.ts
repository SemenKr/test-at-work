import { User } from './types'

export type UserDraft = {
  name: string
  username: string
  email: string
  city: string
  phone: string
  company: string
  avatar: string
}

export const VISIBLE_USERS_LIMIT = 6

export const getDefaultAvatar = (id: number) => `https://i.pravatar.cc/400?img=${id}`

export const toUserDraft = (user: User): UserDraft => ({
  name: user.name,
  username: user.username,
  email: user.email,
  city: user.address.city,
  phone: user.phone,
  company: user.company.name,
  avatar: user.avatar ?? getDefaultAvatar(user.id),
})

export const applyUserDraft = (user: User, draft?: Partial<UserDraft>): User => ({
  ...user,
  name: draft?.name ?? user.name,
  username: draft?.username ?? user.username,
  email: draft?.email ?? user.email,
  phone: draft?.phone ?? user.phone,
  avatar: draft?.avatar ?? user.avatar ?? getDefaultAvatar(user.id),
  address: {
    ...user.address,
    city: draft?.city ?? user.address.city,
  },
  company: {
    ...user.company,
    name: draft?.company ?? user.company.name,
  },
})

export const getActiveUsers = (users: User[], archivedIds: number[], hiddenIds: number[]) =>
  users.filter((user) => !archivedIds.includes(user.id) && !hiddenIds.includes(user.id))

export const getVisibleActiveUsers = (users: User[], archivedIds: number[], hiddenIds: number[]) =>
  getActiveUsers(users, archivedIds, hiddenIds).slice(0, VISIBLE_USERS_LIMIT)

export const getArchivedUsers = (users: User[], archivedIds: number[]) =>
  users.filter((user) => archivedIds.includes(user.id))
