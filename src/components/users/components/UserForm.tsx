import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, VStack, HStack, Icon, SimpleGrid, Divider, useColorModeValue, Text, InputGroup, InputRightElement } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { useState } from "react";
import { FiUser, FiMail, FiLock, FiCheck, FiShield, FiSend } from "react-icons/fi";
import { EventDesignSystem } from "../../events/designSystem";
import { CreateUpdateUser } from "../schema";
import { UserAPIResponse } from "../users.type";

interface FormSectionProps {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}

const FormSection = ({ title, icon, children }: FormSectionProps) => (
  <Box
    bg={useColorModeValue("white", "gray.700")}
    borderRadius="xl"
    p={6}
    boxShadow="sm"
    borderWidth="1px"
    borderColor={useColorModeValue("gray.100", "gray.600")}
  >
    <HStack mb={5} spacing={3}>
      <Box
        p={2}
        borderRadius="lg"
        bg={`${EventDesignSystem.primaryColor}15`}
      >
        <Icon as={icon} color={EventDesignSystem.primaryColor} boxSize={5} />
      </Box>
      <Text fontWeight="bold" fontSize="lg" color="gray.700">
        {title}
      </Text>
    </HStack>
    {children}
  </Box>
);

interface FormFieldProps {
  label: string;
  icon?: React.ElementType;
  isRequired?: boolean;
  children: React.ReactNode;
}

const FormField = ({ label, icon, isRequired, children }: FormFieldProps) => (
  <FormControl isRequired={isRequired}>
    <FormLabel fontWeight="medium" fontSize="sm" color="gray.600" mb={1}>
      <HStack spacing={1}>
        {icon && <Icon as={icon} boxSize={3.5} />}
        <Text>{label}</Text>
      </HStack>
    </FormLabel>
    {children}
  </FormControl>
);

interface UserLogInResponse {
  message: string,
  user: UserAPIResponse,
  token?: string
}

type FormKey = "login" | "register" | "edit" | "create";
export interface UserFormProps<T extends FieldValues = FieldValues> {
  initialValues?: Partial<T>;
  schema: yup.ObjectSchema<T>;
  onConfirm: (data: CreateUpdateUser) => Promise<any>
  onSuccess?: (data: Partial<UserLogInResponse>) => void;
  onError?: (error: any) => void;
  title: string;
  formKey: FormKey;
}

export default function UserForm(props: UserFormProps) {
  const {
    initialValues,
    onConfirm,
    onSuccess,
    onError,
    title,
    schema,
    formKey,
  } = props;

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: initialValues,
    mode: "onTouched",
    resolver: yupResolver(schema as any),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: onConfirm,
    onSuccess: onSuccess,
    onError: onError,
  });

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data: Record<string, unknown>) => {
    mutate(data as unknown as CreateUpdateUser);
  };

  const getSubtitle = () => {
    switch (formKey) {
      case "login": return "Sign in to your account";
      case "register": return "Create a new account to get started";
      case "edit": return "Update your profile information";
      case "create": return "Add a new user to the system";
      default: return "Fill in the details below";
    }
  };

  return (
    <Box maxW="600px" mx="auto" py={8}>
      <Box mb={8} textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" color="gray.800" mb={2}>
          {title}
        </Text>
        <Text color="gray.500" fontSize="sm">
          {getSubtitle()}
        </Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6} align="stretch">
          {["register", "edit", "create"].includes(formKey) && (
            <FormSection title="Personal Information" icon={FiUser}>
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
                <FormField label="First Name" icon={FiUser} isRequired>
                  <Input
                    {...register("firstname")}
                    type="text"
                    placeholder="Enter first name"
                    size="lg"
                    focusBorderColor={EventDesignSystem.primaryColor}
                    bg={useColorModeValue("gray.50", "gray.600")}
                    border="2px"
                    borderColor="transparent"
                    _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                    _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                  />
                  <FormErrorMessage>{errors.firstname?.message as string}</FormErrorMessage>
                </FormField>

                <FormField label="Last Name" icon={FiUser} isRequired>
                  <Input
                    {...register("lastname")}
                    type="text"
                    placeholder="Enter last name"
                    size="lg"
                    focusBorderColor={EventDesignSystem.primaryColor}
                    bg={useColorModeValue("gray.50", "gray.600")}
                    border="2px"
                    borderColor="transparent"
                    _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                    _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                  />
                  <FormErrorMessage>{errors.lastname?.message as string}</FormErrorMessage>
                </FormField>
              </SimpleGrid>
            </FormSection>
          )}

          {["login", "register", "create"].includes(formKey) && (
            <FormSection title="Account Credentials" icon={FiMail}>
              <FormField label="Email / Username" icon={FiMail} isRequired>
                <Input
                  {...register("username")}
                  type="text"
                  placeholder="Enter your email address"
                  size="lg"
                  focusBorderColor={EventDesignSystem.primaryColor}
                  bg={useColorModeValue("gray.50", "gray.600")}
                  border="2px"
                  borderColor="transparent"
                  _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                  _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                />
                <FormErrorMessage>{errors.username?.message as string}</FormErrorMessage>
              </FormField>

              <FormField label="Password" icon={FiLock} isRequired>
                <InputGroup size="lg">
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    focusBorderColor={EventDesignSystem.primaryColor}
                    bg={useColorModeValue("gray.50", "gray.600")}
                    border="2px"
                    borderColor="transparent"
                    _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                    _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                  />
                  <InputRightElement h="full" pr={2}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.password?.message as string}</FormErrorMessage>
              </FormField>
            </FormSection>
          )}

          {["register"].includes(formKey) && (
            <FormSection title="Confirm Password" icon={FiCheck}>
              <FormField label="Confirm Password" icon={FiLock} isRequired>
                <InputGroup size="lg">
                  <Input
                    {...register("confirmPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    focusBorderColor={EventDesignSystem.primaryColor}
                    bg={useColorModeValue("gray.50", "gray.600")}
                    border="2px"
                    borderColor="transparent"
                    _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                    _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                  />
                  <InputRightElement h="full" pr={2}>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? "Hide" : "Show"}
                    </Button>
                  </InputRightElement>
                </InputGroup>
                <FormErrorMessage>{errors.confirmPassword?.message as string}</FormErrorMessage>
              </FormField>
            </FormSection>
          )}

          {["edit", "create"].includes(formKey) && (
            <FormSection title="Access Control" icon={FiShield}>
              <FormField label="User Role" icon={FiShield} isRequired>
                <Select
                  {...register("role")}
                  placeholder="Select user role"
                  size="lg"
                  focusBorderColor={EventDesignSystem.primaryColor}
                  bg={useColorModeValue("gray.50", "gray.600")}
                  border="2px"
                  borderColor="transparent"
                  _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                  _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                >
                  <option value="admin">Admin - Full system access</option>
                  <option value="employee">Employee - Limited management access</option>
                  <option value="user">User - Basic access</option>
                </Select>
                <FormErrorMessage>{errors.role?.message as string}</FormErrorMessage>
              </FormField>
            </FormSection>
          )}

          <Divider borderColor="gray.300" />

          <HStack spacing={4} justify="flex-end" pt={2}>
            {["create", "register"].includes(formKey) && (
              <Button
                variant="outline"
                size="lg"
                onClick={() => reset()}
                colorScheme="gray"
                px={8}
              >
                Reset Form
              </Button>
            )}
            <Button
              type="submit"
              bg={EventDesignSystem.primaryColor}
              color="white"
              size="lg"
              px={10}
              isLoading={isPending || isSubmitting}
              loadingText={`${title}...`}
              _hover={{
                bg: EventDesignSystem.primaryDark,
                transform: "translateY(-2px)",
                boxShadow: "lg"
              }}
              _active={{ transform: "translateY(0)" }}
              boxShadow="md"
              fontWeight="bold"
              disabled={isSubmitting || !isValid}
              leftIcon={<FiSend />}
              transition="all 0.2s"
            >
              {title}
            </Button>
          </HStack>
        </VStack>
      </form>
    </Box>
  );
}