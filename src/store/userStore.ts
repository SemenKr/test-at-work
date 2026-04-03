import { create } from 'zustand'
import type { UserDraft } from '@/entities/user/utils'

type UserStore = {
    archived: number[]
    hidden: number[]
    editedUsers: Record<number, UserDraft>
    archiveUser: (id: number) => void
    unarchiveUser: (id: number) => void
    hideUser: (id: number) => void
    saveUser: (id: number, data: UserDraft) => void
}

export const useUserStore = create<UserStore>((set) => ({
    archived: [],
    hidden: [],
    editedUsers: {},

    archiveUser: (id) =>
        set((state) => ({
            archived: state.archived.includes(id) ? state.archived : [...state.archived, id],
        })),

    unarchiveUser: (id) =>
        set((state) => ({
            archived: state.archived.filter((i) => i !== id),
        })),

    hideUser: (id) =>
        set((state) => ({
            hidden: state.hidden.includes(id) ? state.hidden : [...state.hidden, id],
        })),

    saveUser: (id, data) =>
        set((state) => ({
            editedUsers: {
                ...state.editedUsers,
                [id]: data,
            },
        })),
}))
