import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Select, VStack, HStack, Textarea, Icon, SimpleGrid, Divider, useColorModeValue, Text } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { FiCalendar, FiMapPin, FiUsers, FiFileText, FiFlag, FiSend } from "react-icons/fi";
import { EventDesignSystem } from "../designSystem";
import { EventAPIResponse } from "../events.type";
import { CreateUpdateEvent } from "../schema";

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
  isValid?: boolean;
}

const FormField = ({ label, icon, isRequired, children, isValid }: FormFieldProps) => (
  <FormControl isRequired={isRequired} isInvalid={!isValid}>
    <FormLabel
      fontWeight="medium"
      fontSize="sm"
      color="gray.600"
      mb={1}
      
    >
      <HStack spacing={1}>
        {icon && <Icon as={icon} boxSize={3.5} />}
        <Text>{label}</Text>
      </HStack>
    </FormLabel>
    {children}
  </FormControl>
);

export interface EventFormProps {
  initialValues?: CreateUpdateEvent;
  schema: yup.ObjectSchema<CreateUpdateEvent>;
  onConfirm?: (data: CreateUpdateEvent) => Promise<EventAPIResponse>
  onSuccess?: (data: EventAPIResponse) => void;
  onError?: (error: any) => void;
  title: string;
}

export default function EventForm(props: EventFormProps) {
  const {
    initialValues,
    onConfirm,
    onSuccess,
    onError,
    title,
    schema,
  } = props;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: initialValues,
    mode: "onTouched",
    resolver: yupResolver(schema),
  });

  console.log("errors", errors)
  console.log("isValid", isValid)

  useEffect(() => {
    if (initialValues) {
      reset({
        ...initialValues,
        event_date: initialValues.event_date?.split("T")[0],
        event_status: initialValues.event_status,
      });
    }
  }, [initialValues, reset]);

  const { mutate } = useMutation({
    mutationFn: onConfirm,
    onSuccess: onSuccess,
    onError: onError,

  });

  const onSubmit: SubmitHandler<CreateUpdateEvent> = (data: CreateUpdateEvent) => {
    mutate(data);
  };


  return (
    <Box
      maxW="800px"
      mx="auto"
      py={8}
    >
      <Box
        mb={8}
        textAlign="center"
      >
        <Text
          fontSize="2xl"
          fontWeight="bold"
          color="gray.800"
          mb={2}
        >
          {title}
        </Text>
        <Text color="gray.500" fontSize="sm">
          Fill in the details below to create a new event
        </Text>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={6} align="stretch">
          <FormSection title="Basic Information" icon={FiFileText}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <FormField label="Event Name" icon={FiFileText} isRequired isValid={!errors.name}>
                <Input
                  {...register("name")}
                  type="text"
                  placeholder="Enter event title"
                  size="lg"
                  focusBorderColor={EventDesignSystem.primaryColor}
                  bg={useColorModeValue("gray.50", "gray.600")}
                  border="2px"
                  borderColor="transparent"
                  _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                  _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                />
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormField>

              <FormField label="Location / Venue" icon={FiMapPin} isRequired isValid={!errors.location}>
                <Input
                  {...register("location")}
                  type="text"
                  placeholder="Enter venue or address"
                  size="lg"
                  focusBorderColor={EventDesignSystem.primaryColor}
                  bg={useColorModeValue("gray.50", "gray.600")}
                  border="2px"
                  borderColor="transparent"
                  _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                  _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                />
                <FormErrorMessage>{errors.location?.message}</FormErrorMessage>
              </FormField>
            </SimpleGrid>

            <Box mt={5}>
              <FormField label="Event Description" icon={FiFileText} isRequired isValid={!errors.description}>
                <Textarea
                  {...register("description")}
                  placeholder="Describe your event details, agenda, and what attendees can expect..."
                  rows={4}
                  size="lg"
                  focusBorderColor={EventDesignSystem.primaryColor}
                  bg={useColorModeValue("gray.50", "gray.600")}
                  border="2px"
                  borderColor="transparent"
                  _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                  _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                  resize="vertical"
                />
                <FormErrorMessage>{errors.description?.message}</FormErrorMessage>
              </FormField>
            </Box>
          </FormSection>

          <FormSection title="Schedule & Capacity" icon={FiCalendar}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
              <FormField label="Event Date" icon={FiCalendar} isRequired isValid={!errors.event_date}>
                <Input
                  {...register("event_date")}
                  type="date"
                  size="lg"
                  focusBorderColor={EventDesignSystem.primaryColor}
                  bg={useColorModeValue("gray.50", "gray.600")}
                  border="2px"
                  borderColor="transparent"
                  _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                  _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                />
                <FormErrorMessage>{errors.event_date?.message}</FormErrorMessage>
              </FormField>

              <FormField label="Attendee Capacity" icon={FiUsers} isRequired isValid={!errors.capacity}>
                <Input
                  {...register("capacity")}
                  type="number"
                  placeholder="Max number of attendees"
                  size="lg"
                  min={1}
                  focusBorderColor={EventDesignSystem.primaryColor}
                  bg={useColorModeValue("gray.50", "gray.600")}
                  border="2px"
                  borderColor="transparent"
                  _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                  _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                />
                <FormErrorMessage>{errors.capacity?.message}</FormErrorMessage>
              </FormField>
            </SimpleGrid>
          </FormSection>

          <FormSection title="Publishing" icon={FiFlag}>
            <FormField label="Event Status" icon={FiFlag} isRequired isValid={!errors.event_status}>
              <Select
                {...register("event_status")}
                placeholder="Select status"
                size="lg"
                focusBorderColor={EventDesignSystem.primaryColor}
                bg={useColorModeValue("gray.50", "gray.600")}
                border="2px"
                borderColor="transparent"
                _hover={{ bg: useColorModeValue("gray.100", "gray.500") }}
                _focus={{ bg: "white", borderColor: EventDesignSystem.primaryColor }}
                defaultValue="draft"
              >
                <option value="draft">Draft - Save but don't publish</option>
                <option value="published">Published - Live and open for registration</option>
                <option value="completed">Completed - Event has ended</option>
                <option value="cancelled">Cancelled - Event was cancelled</option>
              </Select>
              <FormErrorMessage>{errors.event_status?.message}</FormErrorMessage>
            </FormField>
          </FormSection>

          <Divider borderColor="gray.300" />

          <HStack spacing={4} justify="flex-end" pt={2}>
            <Button
              variant="outline"
              size="lg"
              onClick={() => reset()}
              colorScheme="gray"
              px={8}
            >
              Reset Form
            </Button>
            <Button
              type="submit"
              bg={EventDesignSystem.primaryColor}
              color="white"
              size="lg"
              px={10}
              isLoading={isSubmitting}
              loadingText="Saving..."
              _hover={{ 
                bg: EventDesignSystem.primaryDark,
                transform: "translateY(-2px)",
                boxShadow: "lg"
              }}
              _active={{ transform: "translateY(0)" }}
              boxShadow="md"
              fontWeight="bold"
              disabled={!isValid}
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
