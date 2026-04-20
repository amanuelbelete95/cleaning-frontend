import * as yup from "yup"

export const logInSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters")
});

export const registerSchema = yup.object({
  id: yup.string().optional(),
  firstname: yup.string().optional(),
  lastname: yup.string().optional(),  
  username: yup.string().required("Username is required"),
 password: yup
    .string()
    .required("Password is required")
    .min(3, "Password must be at least 3 characters"),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
});

export const updateUserSchema =  yup.object({
  firstname: yup.string().optional(),
  lastname: yup.string().optional(),
  role: yup.string().optional(),
})

// export const userSchema = yup.object({
//   id: yup.string().optional(),
//   username: yup.string().required("Username is required"),
//   password: yup.string().required("Password is required"),
//   confirmPassword: yup.string().optional(),
//   firstname: yup.string().optional(),
//   lastname: yup.string().optional(),
//   role: yup.mixed().oneOf(["admin", "employee", "user"]).required("Role is required"),
// });

export type CreateUpdateUser = yup.InferType<typeof userSchema>;
