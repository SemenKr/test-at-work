import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
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

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            archived: [],
            hidden: [],
            editedUsers: {},

            archiveUser: (id) =>
                set((state) => ({
                    archived: state.archived.includes(id) ? state.archived : [...state.archived, id],
                })),

            unarchiveUser: (id) =>
                set((state) => ({
                    archived: state.archived.filter((itemId) => itemId !== id),
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
        }),
        {
            name: 'test-at-work-user-store',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                archived: state.archived,
                hidden: state.hidden,
                editedUsers: state.editedUsers,
            }),
        }
    )
)

export const useArchivedUserIds = () => useUserStore((state) => state.archived)
export const useHiddenUserIds = () => useUserStore((state) => state.hidden)
export const useEditedUsers = () => useUserStore((state) => state.editedUsers)
export const useArchiveUser = () => useUserStore((state) => state.archiveUser)
export const useUnarchiveUser = () => useUserStore((state) => state.unarchiveUser)
export const useHideUser = () => useUserStore((state) => state.hideUser)
export const useSaveUser = () => useUserStore((state) => state.saveUser)
