import { getTicketById } from "@/api/ticket";
import { addTicketMessage, deleteTicketMessage } from "@/api/ticketMassage";
import { getUser } from "@/api/user";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Role } from "@/enums/Role";
import { useAuth } from "@/hook/Auth";
import { useAppDispatch, useAppSelector } from "@/hook/Redux";
import { addUser } from "@/store/features/user/userSlice";
import { Ticket } from "@/types/TicketType";
import { User } from "@/types/userType";
import { zodResolver } from "@hookform/resolvers/zod";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FiSend } from "react-icons/fi";

// form schema
const formSchema = z.object({
  massage: z.string().nonempty({
    message: "Message is required",
  }),
});

const TicketDetail = () => {
  // dispatch
  const dispatch = useAppDispatch();
  // router
  const router = useRouter();
  // get id from router
  const { id } = router.query;
  // auth
  useAuth();
  // redux state
  const user: User = useAppSelector((state) => state.user.value as User);

  // state
  const [ticket, setTicket] = useState<Ticket>();

  useEffect(() => {
    // check id
    if (id) {
      // Fetch user data if the `user` state is empty
      if (!user) {
        getUser(localStorage.getItem("token") || "")
          .then((res) => {
            // Dispatch an action to set the `user` state to the fetched user data.
            dispatch(addUser(res));
          })
          .catch((error) => {
            // Handle errors here
            console.error("Error fetching user data", error);
          });
      }
      // get ticket by id
      getTicketById(localStorage.getItem("token") || "", id).then((res) => {
        if (res) {
          setTicket(res);
        } else {
          router.push("/dashboard");
        }
      });
    }
  }, [id]);

  // form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      massage: "",
    },
  });

  // submit form
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    addTicketMessage(
      localStorage.getItem("token") || "",
      ticket?.id,
      data.massage
    ).then((res) => {
      if (res) {
        router.reload();
      }
    });
  };

  // delete message
  const handlerDelete = (id: number) => {
    deleteTicketMessage(id, localStorage.getItem("token") || "").then((res) => {
      if (res) {
        router.reload();
      }
    });
  };

  return (
    <MainLayout>
      <h1 className="text-2xl font-bold">
        #{ticket?.id} {ticket?.title}
      </h1>
      <div className="flex flex-row mt-10">
        <div className="flex flex-row space-x-3 items-center">
          <div className="w-5 h-5 rounded-full bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></div>{" "}
          <div className="ml-2">
            {ticket?.user.name} {ticket?.user.surname} (
            {ticket?.user.title.title})
          </div>
        </div>
      </div>
      <div className="mt-5 p-5 w-full border-2 border-gray-400 bg-gray-700 text-white rounded-xl">
        {ticket?.description}
      </div>
      <div>
        {ticket &&
          ticket.messages.map((message) => {
            return (
              <div key={message.id}>
                <div
                  className={`flex flex-row mt-10 items-center justify-between ${
                    message.sender.role === Role.ADMIN ||
                    message.sender.role === Role.SUPPORT
                      ? "flex-row-reverse"
                      : "justify-start"
                  } `}>
                  <div className="flex flex-row space-x-3 items-center">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-300 to-blue-500"></div>{" "}
                    <div className="ml-2">
                      {message.sender.name} {message.sender.surname} (
                      {message.sender.title.title})
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer" asChild>
                      <DotsHorizontalIcon />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                      <DropdownMenuGroup>
                        <DropdownMenuItem
                          onClick={() => handlerDelete(message.id)}>
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div
                  className={`
                flex flex-row 
                ${
                  message.sender.role === Role.ADMIN ||
                  message.sender.role === Role.SUPPORT
                    ? "justify-end"
                    : "justify-start"
                } 
                `}>
                  <div
                    className={`mt-5 p-5 w-fit border-2 border-gray-400 bg-gray-700 text-white rounded-xl`}>
                    {message.message}
                  </div>
                </div>
                <p
                  className={`
                ${
                  message.sender.role === Role.ADMIN ||
                  message.sender.role === Role.SUPPORT
                    ? "text-end"
                    : "text-start"
                }`}>
                  {message.date.toString().slice(0, 10)}
                </p>
              </div>
            );
          })}
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="mt-10 w-full text-end">
          <FormField
            control={form.control}
            name="massage"
            render={({ field }) => (
              <Textarea
                {...field}
                className="mt-5"
                placeholder="Enter message"
              />
            )}
          />
          <FormMessage>{form.formState.errors.massage?.message}</FormMessage>
          <Button className="space-x-3 mt-5 " type="submit">
            <p> Send</p>
            <FiSend />
          </Button>
        </form>
      </Form>
    </MainLayout>
  );
};

export default TicketDetail;
