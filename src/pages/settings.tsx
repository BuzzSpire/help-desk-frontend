import { UpdateUserBasicInfo, UpdateUserPassword, getUser } from "@/api/user";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/hook/Auth";
import { useAppDispatch, useAppSelector } from "@/hook/Redux";
import { addUser } from "@/store/features/user/userSlice";
import { User } from "@/types/userType";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// TODO: export all form schemas to a single file
// basic info form schema
const basicInfoFormSchema = z.object({
  name: z.string().min(2, "First name must be at least 2 characters"),
  surname: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
});

// password form schema
const passwordFormSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string().min(6, "Password must be at least 6 characters"),
});

const Settings = () => {
  // auth
  useAuth();

  // router
  const router = useRouter();

  // toast
  const { toast } = useToast();

  // redux state
  let user: User = useAppSelector((state) => state.user.value as User);

  // redux dispatch
  const dispatch = useAppDispatch();

  // basic info form
  const basicInfoForm = useForm<z.infer<typeof basicInfoFormSchema>>({
    resolver: zodResolver(basicInfoFormSchema),
    defaultValues: {
      name: "",
      surname: "",
      email: "",
    },
  });

  useEffect(() => {
    if (!user) {
      getUser(localStorage.getItem("token") || "").then((res) => {
        if (res) {
          dispatch(addUser(res));
        } else {
          router.push("/");
        }
      });
    }
  }, []);

  // basit info form submit
  const basicInfoFormSubmit = (data: z.infer<typeof basicInfoFormSchema>) => {
    UpdateUserBasicInfo(
      localStorage.getItem("token") || "",
      data,
      user.id
    ).then((res) => {
      if (res) {
        router.reload();
      } else {
        toast({
          title: "Error",
          description: "Something went wrong",
          duration: 2000,
        });
      }
    });
  };

  // password form
  const passwordForm = useForm<z.infer<typeof passwordFormSchema>>({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  // password form submit
  const passwordFormSubmit = (data: z.infer<typeof passwordFormSchema>) => {
    if (data.password === data.confirmPassword) {
      UpdateUserPassword(
        localStorage.getItem("token") || "",
        data.password,
        user.id
      ).then((res) => {
        if (res) {
          router.reload();
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            duration: 2000,
          });
        }
      });
    } else {
      toast({
        title: "Error",
        description: "Passwords do not match",
        duration: 2000,
      });
    }
  };

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mt-2">My Account</h1>
      {user && (
        <div>
          <Form {...basicInfoForm}>
            <form
              onSubmit={basicInfoForm.handleSubmit(basicInfoFormSubmit)}
              className="border-2 border-r-gray-200 rounded-xl p-4 mt-4 space-y-3">
              <FormField
                control={basicInfoForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>name</FormLabel>
                    <FormControl>
                      <Input placeholder={user.name} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={basicInfoForm.control}
                name="surname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>surname</FormLabel>
                    <FormControl>
                      <Input placeholder={user.surname} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={basicInfoForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>email</FormLabel>
                    <FormControl>
                      <Input placeholder={user.email} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-4 focus-visible:ring-2 focus-visible:ring-black focus-visible:border-2 focus-visible:border-white"
                type="submit">
                Update
              </Button>
            </form>
          </Form>
          <Form {...passwordForm}>
            <form
              onSubmit={passwordForm.handleSubmit(passwordFormSubmit)}
              className="border-2 border-r-gray-200 rounded-xl p-4 mt-4 space-y-3">
              <h1 className="text-2xl font-bold">Change Password</h1>
              <FormField
                control={passwordForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>password</FormLabel>
                    <FormControl>
                      <Input placeholder="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={passwordForm.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>confirm password</FormLabel>
                    <FormControl>
                      <Input placeholder="confirm password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="mt-4 focus-visible:ring-2 focus-visible:ring-black focus-visible:border-2 focus-visible:border-white"
                type="submit">
                Update
              </Button>
            </form>
          </Form>
        </div>
      )}
    </MainLayout>
  );
};

export default Settings;
