import { Flex, Spinner, Text } from "@chakra-ui/react";
import { Navigate, Outlet } from "react-router-dom";
import { EventDesignSystem } from "../events/designSystem";
import { useAuth } from "./AuthProvider";
export type Role = "admin" | "employee" | "any";

interface ProtectedRouteProps {
  isSignedIn?: boolean;
  requiredRole?: Role;
  redirectPath?: string;
  children?: React.ReactNode;
}



const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  redirectPath = '/',
  children
}) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <Flex
        position="fixed"
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        alignItems="center"
        justifyContent="center"
        backgroundColor="var(--bg-primary)"
        zIndex={9999}
        flexDirection="column"
        gap={4}
      >
        <Spinner
          thickness="4px"
          speed="0.7s"
          emptyColor="gray.200"
          color={EventDesignSystem.primaryColor}
          size="xl"
        />
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold" color={EventDesignSystem.primaryLight}>
          EMS
        </Text>
      </Flex>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace={true} />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;