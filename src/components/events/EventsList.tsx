
import { Box, Button, HStack, useToast } from '@chakra-ui/react';
import { ColumnDef } from '@tanstack/react-table';
import { useMemo } from 'react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import BasicTable from '../table/BasicTable';
import getAllEvents from './api/getAllEvents';
import { Event } from './events.type';
import { EVENTS_ROUTES } from './routes';
import { onDelete } from './api/deleteEvents';
import { DeleteIcon, EditIcon, ViewIcon } from '@chakra-ui/icons';

export const loader: LoaderFunction = async () => {
  const events = await getAllEvents();
  return events;
};



const EventList = () => {
  const navigate = useNavigate();
  const addisEvent = useLoaderData() as Event[];
  const toast = useToast();

  const handleDelete = async (id: string) => {

    try {
      const response = await onDelete(id);
      if (response.ok) {
        toast({
          title: "Event Deleted Successfully",
          status: 'success',
          description: "The event has been successfully deleted from the system.",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const errorData = await response.json();
        toast({
          title: "Error Deleting Event",
          status: 'error',
          description: errorData.message || "The event was not found or could not be deleted.",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        status: 'error',
        description: error.message || "An unexpected error occurred while deleting the event.",
        duration: 5000,
        isClosable: true,
      });
    }
  };


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
        header: 'Participant',
        accessorKey: 'participant',
      },
      {
        header: 'Event Action',
        id: 'actions',
        cell: (info: any) => {
          return (
            <HStack spacing={4} width={'100%'} alignItems={"center"} display={'flex'} justifyContent={"space-around"}>
              <Button
                size="sm"
                px={8}
                py={4}
                display={'inline-block'}
                borderRadius={'8px'}
                colorScheme="blue"
                _hover={{
                  background: "#4444"
                }}
                leftIcon={<ViewIcon/>}
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
                px={8}
                py={4}
                borderRadius={'8px'}
                colorScheme="yellow"
                _hover={{
                  background: "#4444"
                }}
                leftIcon={<EditIcon/>}
                onClick={() =>
                  navigate(EVENTS_ROUTES.EVENTS_EDIT.getAbsoluteLink(
                    info.row?.original?.id ?? ''
                  ))}>
                Edit
              </Button>
              <Button
                size="sm"
                px={8}
                py={4}
                _hover={{
                  background: "#4444"
                }}
                borderRadius={'8px'}
                colorScheme="red"
                leftIcon={<DeleteIcon/>}
                onClick={() => handleDelete(info.row.original?._id ?? '')}>
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
    <Box px={4} display={'flex'} flexDirection={'column'} alignItems={'center'} width={'100%'} justifyContent={'center'}>
      <Button cursor={'pointer'} border={'2px solid gray'} p={8} size={'lg'} onClick={() => navigate('/events/new')} alignSelf={'flex-end'}>Add Events</Button>
      <BasicTable data={addisEvent} columns={columns} />
    </Box>
  );
};

export default EventList;