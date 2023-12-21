import {
  addConfig,
  deleteConfig,
  getDefaultConfig,
  getDefaultConfigList,
  updateDefaultConfig,
} from "@/api/config";
import {
  addSTickettatus,
  deleteTicketStatus,
  getTicketStatusList,
} from "@/api/status";
import { getUser } from "@/api/user";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import { Role } from "@/enums/Role";
import { useAuth } from "@/hook/Auth";
import { useAppSelector } from "@/hook/Redux";
import { addUser } from "@/store/features/user/userSlice";
import { Config } from "@/types/Config";
import { TicketStatus } from "@/types/TicketStatusType";
import { User } from "@/types/userType";
import { zodResolver } from "@hookform/resolvers/zod";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

// formSchema validation for config
const configFormSchema = z.object({
  id: z.string(),
});

// formSchema validation for add config
const addConfigFormSchema = z.object({
  openTicketStatusId: z.string(),
  closeTicketStatusId: z.string(),
});

// formSchema validation for add ticket status
const addTicketStatusFormSchema = z.object({
  status: z.string().min(1, "Status must be at least 1 character"),
});

const Admin = () => {
  // auth check
  useAuth();

  // router next
  const router = useRouter();

  // toast
  const { toast } = useToast();

  // dispatch
  const dispatch = useDispatch();

  // redux state
  const user: User = useAppSelector((state) => state.user.value as User);

  // state
  const [configList, setConfigList] = useState<Config[]>([]);
  const [defaultConfig, setDefaultConfig] = useState<Config | null>(null);
  const [ticketStatusList, setTicketStatusList] = useState<TicketStatus[]>([]);

  useEffect(() => {
    if (!user) {
      getUser(localStorage.getItem("token") || "").then((res) => {
        if (res) {
          const user = res;
          if (user.role !== Role.ADMIN) {
            router.push("/");
          } else {
            dispatch(addUser(user));
          }
        }
      });
    }
  }, [user]);

  useEffect(() => {
    // get config list
    getDefaultConfigList(localStorage.getItem("token") || "").then((res) => {
      if (res) {
        setConfigList(res);
      }
    });

    // get ticket status list
    getTicketStatusList(localStorage.getItem("token") || "").then((res) => {
      if (res) {
        console.log(res);
        setTicketStatusList(res);
      }
    });

    // get default config
    getDefaultConfig(localStorage.getItem("token") || "").then((res) => {
      if (res) {
        setDefaultConfig(res);
      }
    });
  }, []);

  // config form
  const configForm = useForm<z.infer<typeof configFormSchema>>({
    resolver: zodResolver(configFormSchema),
    defaultValues: {
      id: defaultConfig?.id.toString(),
    },
  });

  // add config form
  const addConfigForm = useForm<z.infer<typeof addConfigFormSchema>>({
    resolver: zodResolver(addConfigFormSchema),
  });

  // add ticket status form
  const addTicketStatusForm = useForm<
    z.infer<typeof addTicketStatusFormSchema>
  >({
    resolver: zodResolver(addTicketStatusFormSchema),
  });

  // config form submit
  const configFormSubmit = (data: z.infer<typeof configFormSchema>) => {
    const formData = {
      ...data,
      id: parseInt(data.id.toString()),
    };
    updateDefaultConfig(localStorage.getItem("token") || "", formData.id).then(
      (res) => {
        if (res) {
          toast({
            title: "Success",
            description: "Config updated",
            duration: 2000,
          });
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            duration: 2000,
          });
        }
      }
    );
  };

  // add config form submit
  const addConfigFormSubmit = (data: z.infer<typeof addConfigFormSchema>) => {
    const formData = {
      ...data,
      openTicketStatusId: parseInt(data.openTicketStatusId.toString()),
      closeTicketStatusId: parseInt(data.closeTicketStatusId.toString()),
    };
    addConfig(
      localStorage.getItem("token") || "",
      formData.openTicketStatusId,
      formData.closeTicketStatusId
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

  // add ticket status form submit
  const addTicketStatusFormSubmit = (
    data: z.infer<typeof addTicketStatusFormSchema>
  ) => {
    addSTickettatus(localStorage.getItem("token") || "", data.status).then(
      (res) => {
        if (res) {
          router.reload();
        } else {
          toast({
            title: "Error",
            description: "Something went wrong",
            duration: 2000,
          });
        }
      }
    );
  };

  // config table for table delete button click
  const handleConfigDelete = (id: number) => {
    deleteConfig(localStorage.getItem("token") || "", id).then((res) => {
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

  // status table for table delete button click
  const handleStatusDelete = (id: number) => {
    deleteTicketStatus(localStorage.getItem("token") || "", id).then((res) => {
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

  return (
    <MainLayout>
      <Tabs defaultValue="stats">
        <TabsList>
          <TabsTrigger value="stats">Stats</TabsTrigger>
          <TabsTrigger value="config">Config</TabsTrigger>
        </TabsList>
        <TabsContent className="w-full" value="stats">
          Stats
        </TabsContent>
        <TabsContent className="w-full" value="config">
          <div className="mt-16">
            <Table className="border-2">
              <TableCaption>A list of your config</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Open Ticket Status</TableHead>
                  <TableHead>Close Ticket Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {configList &&
                  configList.map((config) => {
                    return (
                      <TableRow key={config.id}>
                        <TableCell className="font-medium">
                          {config.id}
                        </TableCell>
                        <TableCell>{config.openTicketStatus.status}</TableCell>
                        <TableCell>{config.closeTicketStatus.status}</TableCell>
                        <TableCell>
                          <Button
                            className="text-red-400"
                            variant="ghost"
                            onClick={() => handleConfigDelete(config.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>

            <Table className="border-2 mt-5">
              <TableCaption>A list of your status</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {configList &&
                  ticketStatusList.map((status) => {
                    return (
                      <TableRow key={status.id}>
                        <TableCell className="font-medium">
                          {status.id}
                        </TableCell>
                        <TableCell>{status.status}</TableCell>
                        <TableCell>
                          <Button
                            className="text-red-400"
                            variant="ghost"
                            onClick={() => handleStatusDelete(status.id)}>
                            Delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>

            <div className="w-w flex flex-row justify-center">
              <Card className="w-full mt-20">
                <CardHeader>
                  <CardTitle>Config</CardTitle>
                  <CardDescription>
                    App config for default and other
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Form {...configForm}>
                    <form
                      onSubmit={configForm.handleSubmit(configFormSubmit)}
                      className="space-y-3">
                      <FormField
                        control={configForm.control}
                        name="id"
                        defaultValue={defaultConfig?.id.toString()}
                        render={({ field }) => (
                          <div>
                            <FormItem>
                              <Label>Select config ID</Label>
                              <select
                                defaultValue="0"
                                {...field}
                                className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                                <option value="0" disabled>
                                  Select config ID
                                </option>
                                {configList &&
                                  configList.map((config) => (
                                    <option key={config.id} value={config.id}>
                                      {config.id}
                                    </option>
                                  ))}
                              </select>
                            </FormItem>
                          </div>
                        )}
                      />
                      <Button
                        className="focus-visible:ring-2 focus-visible:ring-black focus-visible:border-2 focus-visible:border-white"
                        type="submit">
                        update config
                      </Button>
                    </form>
                  </Form>
                  <div className="mt-5">
                    <h3 className="font-bold">Add config form</h3>
                    <Form {...addConfigForm}>
                      <form
                        onSubmit={addConfigForm.handleSubmit(
                          addConfigFormSubmit
                        )}
                        className="space-y-3">
                        <FormField
                          control={addConfigForm.control}
                          name="openTicketStatusId"
                          render={({ field }) => (
                            <FormItem>
                              <Label>Select open ticket status</Label>
                              <FormControl>
                                <select
                                  {...field}
                                  className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  defaultValue="0">
                                  <option value="0" disabled>
                                    Select open ticket status
                                  </option>
                                  {ticketStatusList &&
                                    ticketStatusList.map((status) => (
                                      <option key={status.id} value={status.id}>
                                        {status.status}
                                      </option>
                                    ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={addConfigForm.control}
                          name="closeTicketStatusId"
                          render={({ field }) => (
                            <FormItem>
                              <Label>Select close ticket status</Label>
                              <FormControl>
                                <select
                                  {...field}
                                  className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                  defaultValue="0">
                                  <option value="0" disabled>
                                    Select close ticket status
                                  </option>
                                  {ticketStatusList &&
                                    ticketStatusList.map((status) => (
                                      <option key={status.id} value={status.id}>
                                        {status.status}
                                      </option>
                                    ))}
                                </select>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          className="focus-visible:ring-2 focus-visible:ring-black focus-visible:border-2 focus-visible:border-white"
                          type="submit">
                          add config
                        </Button>
                      </form>
                    </Form>
                    <h3 className="font-bold mt-5">Add ticket status</h3>
                    <Form {...addTicketStatusForm}>
                      <form
                        className="space-y-3"
                        onSubmit={addTicketStatusForm.handleSubmit(
                          addTicketStatusFormSubmit
                        )}>
                        <FormField
                          control={addTicketStatusForm.control}
                          name="status"
                          render={({ field }) => (
                            <FormItem>
                              <Label>Status</Label>
                              <FormControl>
                                <Input {...field} placeholder="Status" />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button
                          className="focus-visible:ring-2 focus-visible:ring-black focus-visible:border-2 focus-visible:border-white"
                          type="submit">
                          add ticket status
                        </Button>
                      </form>
                    </Form>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </MainLayout>
  );
};

export default Admin;
