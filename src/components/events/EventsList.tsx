import { Box } from '@chakra-ui/react'
import { useMemo } from 'react'
import BasicTable from '../table/BasicTable'
import { COLUMN } from '../table/column'
import getAllEvents from './api/getAllEvents';
import { LoaderFunction, useLoaderData } from 'react-router-dom';
import { Event } from './events.type';


export const loader: LoaderFunction = async () => {
  const events = await getAllEvents();
  return events;
};


const EventList = () => {
  const columns = useMemo(() => COLUMN, [])
  const events = useLoaderData() as Event[];

  return (
    <Box px={4}>
      <BasicTable data={events} column={columns} />
    </Box>
  )
}


export default EventList;
