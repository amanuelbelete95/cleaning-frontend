import { createStandaloneToast, Heading } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthProvider';
import  LogInForm from './components/UserForm';
import { logInSchema } from './schema';
const { toast } = createStandaloneToast();


function LogInPage() {
  const { isAuthenticated, login, error } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    navigate("/login")
  }, [isAuthenticated, error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
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
        name='Access your account'
        />
    </div>
  )
}

export default LogInPage