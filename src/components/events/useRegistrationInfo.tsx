import { useMemo } from "react";
import { EventAPIResponse } from "./events.type";

export const useRegistrationInfo = (event: EventAPIResponse) => {
    return useMemo(() => {
        const isEventFull = event.registration_count >= event.capacity;
        const isEventExpired = new Date(event.event_date) < new Date();
        const isRegistered = event.is_registered;

        const canRegister =
            !isEventExpired && !isEventFull && !isRegistered;

        return {
            isEventFull,
            isEventExpired,
            canRegister,
            isRegistered,
        };
    }, [
        event.registration_count,
        event.capacity,
        event.event_date,
        event.is_registered,
    ]);
};