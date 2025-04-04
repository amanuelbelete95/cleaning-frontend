import { Box, Button, HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import BasicTable from '../table/BasicTable';
import getAllEvents from './api/getAllEvents';
import { Event } from './events.type';
import { EVENTS_ROUTES } from './routes';

export const loader: LoaderFunction = async () => {
  const events = await getAllEvents();
  return events;
};

const EventList = () => {
  const navigate = useNavigate();
  const events = useLoaderData() as Event[];
  const updatedEvents = events.map((event, index) => ({
    ...event,
    id: event._id,
  }));

  const columns = useMemo(
    () => [
      {
        header: 'ID',
        accessor: 'id',
      },
      {
        header: 'Event Name',
        accessor: 'name',
      },
      {
        header: 'Event Location',
        accessor: 'location',
      },
      {
        header: 'Event Action',
        accessor: 'actions',
        cell: (info: any) => (
          <HStack spacing={2}>
            <Button
              size="sm"
              colorScheme="blue"
              onClick={() =>
                navigate(
                  EVENTS_ROUTES.EVENTS_DETAIL.getAbsoluteLink(
                    info.row?.original?.id ?? ''
                  )
                )
              }
            >
              View
            </Button>
            <Button
              size="sm"
              colorScheme="yellow"
              onClick={() =>
                navigate(EVENTS_ROUTES.EVENTS_EDIT.getAbsoluteLink(
                  info.row?.original?.id ?? ''
                ))}>
              Edit
            </Button>
            <Button
              size="sm"
              colorScheme="red"
              onClick={() =>
                navigate(EVENTS_ROUTES.EVENTS_REMOVE.getAbsoluteLink(
                  info.row.original.id ?? ''
                ))}
            >
              Delete
            </Button>
          </HStack>
        ),
      },
    ],
    [navigate]
  );

  return (
    <Box px={4}>
      <BasicTable data={updatedEvents} column={columns} />
    </Box>
  );
};

export default EventList;