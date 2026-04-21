import { createStandaloneToast, Heading, Flex, useColorModeValue } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import  LogInForm from './components/UserForm';
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
    <Flex minH="100vh" align="center" justify="center" bg={bgPage} px={4} w="100%">
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
        title='LogIn' 
        />
    </Flex>
  )
}

export default LogInPage