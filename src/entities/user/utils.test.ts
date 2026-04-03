import { describe, expect, it } from 'vitest'
import { type User } from './types'
import { VISIBLE_USERS_LIMIT, getArchivedUsers, getVisibleActiveUsers } from './utils'

const createUser = (id: number): User => ({
  id,
  name: `User ${id}`,
  username: `user-${id}`,
  email: `user-${id}@example.com`,
  phone: `+1 555 000 ${id}`,
  address: {
    city: `City ${id}`,
  },
  company: {
    name: `Company ${id}`,
  },
})

describe('user visibility helpers', () => {
  it('backfills visible users from the remaining pool when some are hidden', () => {
    const users = Array.from({ length: 12 }, (_, index) => createUser(index + 1))

    const visibleUsers = getVisibleActiveUsers(users, [], [1, 2])

    expect(visibleUsers).toHaveLength(VISIBLE_USERS_LIMIT)
    expect(visibleUsers.map((user) => user.id)).toEqual([3, 4, 5, 6, 7, 8])
  })

  it('keeps archived users out of active grid and exposes them for archive section', () => {
    const users = Array.from({ length: 12 }, (_, index) => createUser(index + 1))

    const visibleUsers = getVisibleActiveUsers(users, [2, 4], [])
    const archivedUsers = getArchivedUsers(users, [2, 4])

    expect(visibleUsers.map((user) => user.id)).not.toContain(2)
    expect(visibleUsers.map((user) => user.id)).not.toContain(4)
    expect(archivedUsers.map((user) => user.id)).toEqual([2, 4])
  })
})
