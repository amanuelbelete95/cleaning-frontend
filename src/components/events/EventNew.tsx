import { Box, FormControl, FormLabel, Input } from '@chakra-ui/react'
import React from 'react'
import { Form } from 'react-router-dom'

function EventNew() {
    return (
        <Box width={"400px"} alignItems={'center'} display={"flex"}>
            <Form>
                <Box className='form-control' display={"flex"} >
                    <FormControl>
                        <FormLabel htmlFor='name'>
                            Events Name :
                        </FormLabel>
                        <Input
                            type='text'
                            id='name'
                            placeholder='please provide events name'
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
                            id='location'
                            placeholder='please provide events location'
                            required
                        />
                    </FormControl>
                </Box>
            </Form>
        </Box>
    )
}

export default EventNew