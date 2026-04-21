import { createStandaloneToast, Heading, Flex, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import LogInForm from './components/UserForm';
import { logInSchema } from './schema';
import { EventDesignSystem } from '../events/designSystem';
const { toast } = createStandaloneToast();


function LogInPage() {
  const { isAuthenticated, login, error } = useAuth();
  const navigate = useNavigate();
  const bgPage = useColorModeValue(EventDesignSystem.background.primary, EventDesignSystem.background.dark);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    navigate("/login")
  }, [isAuthenticated, error]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <LogInForm
        formKey='login'
        schema={logInSchema}
        onConfirm={login}
        onSuccess={(data) => {
          console.log(data)
          toast({
            title: "Login successful!",
            status: "success",
            duration: 3000,
            isClosable: true,
            position: "top-right"

          });
          navigate("/");

        }}
        onError={(error) => {
          console.log(error)
          toast({
            title: "Login failed",
            description: `${error.message}`,
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right"
          });
        }}
        title='Login'
      />
    </div>

  )
}

export default LogInPage