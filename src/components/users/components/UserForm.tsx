import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Select, VStack, useColorModeValue } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm, FieldValues } from "react-hook-form";
import * as yup from "yup";
import { EventDesignSystem } from "../../events/designSystem";
import { CreateUpdateUser } from "../schema";
import { UserAPIResponse } from "../users.type";

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
  name?: string;
}

export default function UserForm(props: UserFormProps) {
  const {
    initialValues,
    onConfirm,
    onSuccess,
    onError,
    title,
    name,
    schema,
    formKey,
  } = props;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues,
    mode: "onTouched",
    resolver: yupResolver(schema as any),
  });

  const { mutate } = useMutation({
    mutationFn: onConfirm,
    onSuccess: onSuccess,
    onError: onError,

  });

  const onSubmit: SubmitHandler<Record<string, unknown>> = (data) => {
    mutate(data as unknown as CreateUpdateUser);
  };

  return (
    <Box
      maxW="600px"
      mx="auto"
      p={8}
      borderRadius={EventDesignSystem.card.borderRadius}
      boxShadow={EventDesignSystem.card.shadow}
      bg={useColorModeValue("white", "gray.700")}
      borderWidth={EventDesignSystem.card.borderWidth}
      borderColor={EventDesignSystem.card.borderColor}
    >
      <Heading
        size="xl"
        mb={6}
        textAlign="center"
        color={EventDesignSystem.primaryColor}
        fontWeight="bold"
      >
        {name}
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>

        <VStack spacing={4} align="stretch">
          {["register", "edit"].includes(formKey) && (
            <>
              <FormControl isInvalid={!!errors.firstname}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="md"
                >
                  First Name
                </FormLabel>
                <Input
                  {...register("firstname")}
                  type="text"
                  placeholder="Please enter your name"
                />
                <FormErrorMessage>{errors.firstname?.message as string}</FormErrorMessage>
              </FormControl>
              <FormControl isInvalid={!!errors.lastname}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="md"
                >
                  Last Name
                </FormLabel>
                <Input
                  {...register("lastname")}
                  type="text"
                  placeholder="Please enter your last name"
                />
                <FormErrorMessage>{errors.lastname?.message as string}</FormErrorMessage>
              </FormControl>
            </>
          )}
          {["login", "register"].includes(formKey) &&
            <>
              <FormControl isInvalid={!!errors.username}>
                <FormLabel
                  fontWeight="semibold"
                  fontSize="md"
                >
                  Username
                </FormLabel>
                <Input
                  {...register("username")}
                  type="text"
                  placeholder="Enter username"
                />
                <FormErrorMessage>{errors.username?.message as string}</FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={!!errors.password}>
                <FormLabel
                  fontWeight="semibold"
                  color={EventDesignSystem.form.label.color}
                  fontSize="md"
                >
                  Password
                </FormLabel>
                <Input
                  {...register("password")}
                  type="password"
                  placeholder="Enter password"
                />
                <FormErrorMessage>{errors.password?.message as string}</FormErrorMessage>
              </FormControl>
            </>
          }
          {
            ["register"].includes(formKey) &&
            (
              <>
                <FormControl isInvalid={!!errors.confirmPassword
                }>
                  <FormLabel
                    fontWeight="semibold"
                    color={EventDesignSystem.form.label.color}
                    fontSize="md"
                  >
                    Confirm Password
                  </FormLabel>
                  <Input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="confirm password"
                  />
                  <FormErrorMessage>{errors.confirmPassword?.message as string}</FormErrorMessage>
                </FormControl>
              </>
            )
          }
          {
            ["edit"].includes(formKey) &&
            (<FormControl isInvalid={!!errors.role}>
              <FormLabel
                fontWeight="semibold"
                color={EventDesignSystem.form.label.color}
                fontSize="md"
              >
                Role
              </FormLabel>
              <Select {...register("role")} placeholder="Select role">
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
                <option value="user">User</option>
              </Select>
              <FormErrorMessage>{errors.role?.message as string}</FormErrorMessage>
            </FormControl>
            )}
          <Button
            type="submit"
            bg={EventDesignSystem.primaryColor}
            color="white"
            size="lg"
            width="full"
            isLoading={isSubmitting}
            loadingText="Saving..."
            _hover={{ bg: EventDesignSystem.primaryDark }}
            _active={{ transform: "scale(0.98)" }}
            boxShadow="md"
            fontSize="md"
            fontWeight="bold"
            mt={2}
            cursor={"pointer"}
          >
            {isSubmitting ? "Saving..." : `${title}`}
          </Button>
        </VStack>
      </form>
    </Box>
  );
}