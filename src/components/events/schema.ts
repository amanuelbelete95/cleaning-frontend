import * as yup from "yup"


export const eventSchema = yup
  .object({
    name: yup.string().required("Event name is required").min(3, "Event name must be at least 3 characters"),
    location: yup.string().required("Location is required"),
    event_status: yup.string().required("Event status is required").oneOf(["draft", "published", "completed", "cancelled"], "Invalid event status"),
    event_date: yup.string().required("Event date is required").test("is-future-date", "Event date must be in the future", (value) => {
      if (!value) return false;
      const eventDate = new Date(value);
      const now = new Date();
      return eventDate > now;
    }),
    capacity: yup.number().required("Capacity is required").positive("Capacity must be a positive number").integer("Capacity must be an integer"),
    description: yup.string().optional(),

  });

export type CreateUpdateEvent = yup.InferType<typeof eventSchema>
