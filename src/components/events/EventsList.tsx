import { Box, Button, HStack } from '@chakra-ui/react';
import { useMemo } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import BasicTable from '../table/BasicTable';
import getAllEvents from './api/getAllEvents';
import { Event } from './events.type';
import { EVENTS_ROUTES } from './routes';
import { ColumnDef } from '@tanstack/react-table';

export const loader: LoaderFunction = async () => {
  const events = await getAllEvents();
  return events;
};

const EventList = () => {
  const navigate = useNavigate();
  const addisEvent = useLoaderData() as Event[];

  const columns = useMemo<ColumnDef<Event>[]>(
    () => [
      {
        header: 'ID',
        accessor: '_id',
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
        id: 'actions',
        cell: (info: any) => {

          return (
            <HStack spacing={2} border={"5px solid red"}>
              <Button
                size="sm"
                colorScheme="blue"
                onClick={() =>
                  navigate(
                    EVENTS_ROUTES.EVENTS_DETAIL.getAbsoluteLink(
                      info.row?.original?._id ?? ''
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
                    info.row?.original?._id ?? ''
                  ))}>
                Edit
              </Button>
              <Button
                size="sm"
                colorScheme="red"
                onClick={() =>
                  navigate(EVENTS_ROUTES.EVENTS_REMOVE.getAbsoluteLink(
                    info.row.original._id ?? ''
                  ))}
              >
                Delete
              </Button>
            </HStack>
          )
        }
      },
    ],
    []
  );

  return (
    <Box px={4} display={'flex'} flexDirection={'column'}>
      <Button cursor={'pointer'} border={'2px solid gray'} p={8} size={'lg'} onClick={() => navigate('/events/new')} alignSelf={'flex-end'}>Add Events</Button>
      <BasicTable data={addisEvent} columns={columns} />
    </Box>
  );
};

export default EventList;