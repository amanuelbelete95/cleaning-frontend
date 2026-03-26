import { Box, useToast } from '@chakra-ui/react';
import { registerUser } from '../../components/auth/api/registerUser';
import CreateUserAccountForm from '../../components/users/components/UserForm';

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
                onConfirm={registerUser}
                onSuccess={handleSuccess}
                onError={handleError}
                title="Create New User"
                isNew={true}
            />
        </Box>
    );
}

export default CreateUserAccount;