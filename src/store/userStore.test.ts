import { beforeEach, describe, expect, it } from 'vitest'
import { useUserStore } from './userStore'

const INITIAL_STATE = {
  archived: [],
  hidden: [],
  editedUsers: {},
}

describe('userStore', () => {
  beforeEach(() => {
    useUserStore.setState(INITIAL_STATE)
    localStorage.clear()
  })

  it('stores edited user data and UI state without duplicates', () => {
    const { archiveUser, hideUser, saveUser } = useUserStore.getState()

    archiveUser(3)
    archiveUser(3)
    hideUser(4)
    hideUser(4)
    saveUser(3, {
      name: 'John Doe',
      username: 'johnd',
      email: 'john@example.com',
      city: 'Berlin',
      phone: '+1 (555) 123-45-67',
      company: 'Acme',
      avatar: 'https://example.com/avatar.png',
    })

    expect(useUserStore.getState().archived).toEqual([3])
    expect(useUserStore.getState().hidden).toEqual([4])
    expect(useUserStore.getState().editedUsers[3]?.phone).toBe('+1 (555) 123-45-67')
  })

  it('persists only serializable user UI state to localStorage', () => {
    const { archiveUser, saveUser } = useUserStore.getState()

    archiveUser(7)
    saveUser(7, {
      name: 'Jane Doe',
      username: 'janed',
      email: 'jane@example.com',
      city: 'Paris',
      phone: '1-770-736-8031 x56442',
      company: 'Globex',
      avatar: 'https://example.com/jane.png',
    })

    const persisted = localStorage.getItem('test-at-work-user-store')

    expect(persisted).toBeTruthy()
    expect(persisted).toContain('"archived":[7]')
    expect(persisted).toContain('"phone":"1-770-736-8031 x56442"')
    expect(persisted).not.toContain('archiveUser')
  })

  it('resets archived, hidden and edited users state', () => {
    const { archiveUser, hideUser, saveUser, resetState } = useUserStore.getState()

    archiveUser(2)
    hideUser(3)
    saveUser(4, {
      name: 'Reset Me',
      username: 'reset',
      email: 'reset@example.com',
      city: 'Rome',
      phone: '+39 123 456',
      company: 'Reset Inc',
      avatar: 'https://example.com/reset.png',
    })

    resetState()

    expect(useUserStore.getState().archived).toEqual([])
    expect(useUserStore.getState().hidden).toEqual([])
    expect(useUserStore.getState().editedUsers).toEqual({})
  })
})
