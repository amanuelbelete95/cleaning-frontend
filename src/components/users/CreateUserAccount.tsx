import { Box, useToast } from '@chakra-ui/react';
import { registerUser } from '../../components/auth/api/registerUser';
import CreateUserAccountForm from '../../components/users/components/UserForm';
import { userSchema } from './schema';

const CreateUserAccount = () => {
    const toast = useToast();
    const handleSuccess = () => {
        toast({
            title: "User created",
            description: "User created successfully",
            status: "success",
            duration: 5000,
            isClosable: true,
        });
    };

    const handleError = (error: any) => {
        toast({
            title: "User Creation Failed",
            description: error.message || "User creation failed",
            status: "error",
            duration: 5000,
            isClosable: true,
        });
    };
    return (
        <Box>
            <CreateUserAccountForm
                initialValues={{
                    username: '',
                    password: '',
                    role: '',
                }}
                schema={userSchema}
                onConfirm={registerUser}
                onSuccess={handleSuccess}
                onError={handleError}
                title="Create New User"
            />
        </Box>
    );
}

export default CreateUserAccount;