
import { Box, Button, HStack } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
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
  const addisEvent = useLoaderData() as Event[];
  const columns = useMemo<ColumnDef<Event>[]>(
    () => [
      {
        header: 'ID',
        accessorKey: '_id',
      },
      {
        header: 'Event Name',
        accessorKey: 'name',
      },
      {
        header: 'Event Location',
        accessorKey: 'location',
      },
      {
        header: 'Event Action',
        id: 'actions',
        cell: (info: any) => {
          return (
            <HStack spacing={4} width={'100%'}  >
              <Button
                size="sm"
                p={4}
                display={'inline-block'}
                borderRadius={'8px'}
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
                p={4}
                borderRadius={'8px'}
                colorScheme="yellow"
                onClick={() =>
                  navigate(EVENTS_ROUTES.EVENTS_EDIT.getAbsoluteLink(
                    info.row?.original?.id ?? ''
                  ))}>
                Edit
              </Button>
              <Button
                size="sm"
                p={4}
                borderRadius={'8px'}
                colorScheme="red"
                onClick={() =>
                  navigate(EVENTS_ROUTES.EVENTS_REMOVE.getAbsoluteLink(
                    info.row.original?._id ?? ''
                  ))}
              >
                Delete
              </Button>
            </HStack>
          )
        }
      },
    ],
    [navigate]
  );

  return (
    <Box px={4} display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} justifyContent={'center'}>
      <Button cursor={'pointer'} border={'2px solid gray'} p={8} size={'lg'} onClick={() => navigate('/events/new')} alignSelf={'flex-end'}>Add Events</Button>
      <BasicTable data={addisEvent} columns={columns} />
    </Box>
  );
};

export default EventList;