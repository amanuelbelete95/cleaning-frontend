import { createStandaloneToast } from '@chakra-ui/react';
import { LoaderFunction, useLoaderData, useNavigate } from 'react-router-dom';
import { getUser } from '../api/getUser';
import { updateUser } from '../api/updateUser';
import { updateUserSchema } from '../schema';
import { UserAPIResponse } from '../users.type';
import UpdateUserForm from "./UserForm";

const { toast } = createStandaloneToast();


export const loader: LoaderFunction = async ({ params }): Promise<UserAPIResponse> => {
    const { id } = params
    const user = await getUser(id ?? "")
    return user;
}


function UpdateUserPage() {
    const user = useLoaderData() as UserAPIResponse;
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <UpdateUserForm
                initialValues={user}
                title={"Update"}
                formKey='edit'
                schema={updateUserSchema}
                onConfirm={(data) => updateUser(user.id, data)}
                onSuccess={() => {
                    toast({
                        title: "You have successfully Updated User!",
                        status: "success",
                        duration: 3000,
                        isClosable: true,

                    });
                    navigate("/users")
                }}
                onError={(error: { message: string }) => toast({
                    title: "Error Updating User",
                    status: "error",
                    duration: 3000,
                    description: `${error.message}`,
                    isClosable: true,
                    position: "top-right"

                })}
                name='Update User'
            />
        </div>
    )
}

export default UpdateUserPage