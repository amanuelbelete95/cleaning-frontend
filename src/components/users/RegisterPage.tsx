import { createStandaloneToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../auth/api/registerUser';
import SignUpForm from './components/UserForm';
import { registerSchema } from './schema';

const { toast } = createStandaloneToast();

function RegisterPage() {
  const navigate = useNavigate();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <SignUpForm
        title={"Register"}
        formKey='register'
        schema={registerSchema}
        onConfirm={registerUser}
        onSuccess={() => {
          toast({
            title: "You have successfully registered!",
            status: "success",
            duration: 3000,
            isClosable: true,

          });
          navigate("/login")
        }}
        onError={(error: { message: string }) => toast({
          title: "Error Registering the User",
          status: "error",
          duration: 3000,
          description: `${error.message}`,
          isClosable: true,
          position: "top-right"

        })}
      />
    </div>
  )
}

export default RegisterPage