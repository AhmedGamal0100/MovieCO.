import { patchState, signalStore, withMethods, withState } from '@ngrx/signals'

const initialNotificationState: { id: number, notificationState: string }[] = [];
const initialIdNumber = 0;
export const NotificationStore = signalStore(
    { providedIn: 'root' },
    withState({
        id: initialIdNumber,
        notificationState: initialNotificationState,
    }),
    withMethods((state) => ({
        pushNotification: (message: string) => {
            const newId = state.notificationState().length > 0
                ? Math.max(...state.notificationState().map(n => n.id)) + 1
                : 1;
            const newNotification = { id: newId, notificationState: message };
            patchState(state, {
                notificationState: [...state.notificationState(), newNotification]
            });
            setTimeout(() => {
                patchState(state, {
                    notificationState: state.notificationState().filter(n => n.id !== newId)
                });
            }, 15000);
        },
    }))
)