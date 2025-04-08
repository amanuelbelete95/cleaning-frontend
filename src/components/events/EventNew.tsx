import { Box, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { addEvents } from './api/addEvents';

function EventNew() {
    const [addisEvent, setAddisEvent] = useState({
        name: "",
        location: ""
    });

    const navigate = useNavigate();

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setAddisEvent((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            setIsSubmitting(true)
            await addEvents(addisEvent)
            setIsSubmitting(false);
            navigate('/events'); // One line redirect

        } catch (error) {
            console.error('Submission failed:', error);
        }
        return ('/events')
    }

    return (
        <Box width={"400px"} alignItems={'center'} display={"flex"}>
            <Form onSubmit={handleSubmit}>
                <Box className='form-control' display={"flex"} >
                    <FormControl>
                        <FormLabel htmlFor='name'>
                            Events Name :
                        </FormLabel>
                        <Input
                            type='text'
                            id='name'
                            name='name'
                            value={addisEvent.name}
                            onChange={handleInputChange}
                            placeholder='Enter event name'
                            required
                        />
                    </FormControl>
                </Box>
                <Box className='form-control' display={"flex"} >
                    <FormControl>
                        <FormLabel htmlFor='location'>
                            Events Location:
                        </FormLabel>
                        <Input
                            type='text'
                            name='location'
                            id='location'
                            value={addisEvent.location}
                            placeholder='Enter event location'
                            required
                            onChange={handleInputChange}
                        />
                    </FormControl>
                </Box>

                <Button type="submit" isDisabled={isSubmitting}>submit</Button>

            </Form>
        </Box>
    )
}
export default EventNew