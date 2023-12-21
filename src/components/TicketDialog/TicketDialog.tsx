import { TicketPriority } from "@/types/TicketPriorityType";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import axios from "axios";
import { TicketEndpoints, TicketPriorityEndpoints } from "@/enums/APIEnum";
import { Label } from "@radix-ui/react-dropdown-menu";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { Textarea } from "../ui/textarea";

// formSchema validation
const formSchema = z.object({
  title: z
    .string()
    .min(3, {
      message: "Title must be at least 3 characters long",
    })
    .max(50, {
      message: "Title must be less than 50 characters long",
    }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters long",
  }),
  priority: z.string().min(1, {
    message: "Please select a priority",
  }),
});

const TicketDialog = () => {
  // state
  const [priority, setPriority] = useState<TicketPriority[]>();

  // form hook
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
    },
  });

  useEffect(() => {
    axios
      .get(TicketPriorityEndpoints.GetAllTicketPriorities, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        setPriority(res.data.data);
      });
  }, []);

  // form submit
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    const formData = {
      ...data,
      priority: parseInt(data.priority.toString()),
    };
    axios
      .post(
        TicketEndpoints.AddTicket,
        {
          title: formData.title,
          description: formData.description,
          priority: formData.priority,
          status: 1,
        },
        {
          headers: {
            token: localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        console.log(res.data);
      });
    form.reset();
    window.location.reload();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="focus-visible:ring-2 focus-visible:ring-black focus-visible:border-2 focus-visible:border-white">
            New Ticket
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>New Ticket</DialogHeader>
          <DialogDescription>create a new ticket here</DialogDescription>
          <Form {...form}>
            <form
              className="flex flex-col space-y-3"
              onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                name="title"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Title</Label>
                    <FormControl>
                      <Input {...field} placeholder="Title" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="description"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Description</Label>
                    <FormControl>
                      <Textarea {...field} placeholder="Description" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="priority"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <Label>Priority</Label>
                    <FormControl>
                      <select
                        defaultValue=""
                        {...field}
                        className="flex h-9 w-full items-center justify-between rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                        <option value="" disabled>
                          Select a priority
                        </option>
                        {priority &&
                          priority.map((p) => {
                            return (
                              <option key={p.id} value={p.id}>
                                {p.priority}
                              </option>
                            );
                          })}
                      </select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                className="focus-visible:ring-2 focus-visible:ring-black focus-visible:border-2 focus-visible:border-white"
                type="submit">
                Submit
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TicketDialog;
