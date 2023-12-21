import MainLayout from "@/components/layout/MainLayout";
import { useAppDispatch, useAppSelector } from "@/hook/Redux";
import { useAuth } from "@/hook/Auth";
import { useRouter } from "next/router";
import { User } from "@/types/userType";
import { useEffect, useState } from "react";
import { getUser } from "@/api/user";
import { addUser } from "@/store/features/user/userSlice";
import { Ticket } from "@/types/TicketType";
import { getMyTickets } from "@/api/ticket";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

// register chartjs
ChartJS.register(ArcElement, Tooltip, Legend);

const Profile = () => {
  // auth
  useAuth();

  // router
  const router = useRouter();

  // redux state
  const user: User = useAppSelector((state) => state.user).value as User;

  // state
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [statusList, setStatusList] = useState<String[]>([]);
  const [Colors, SetColors] = useState<String[]>([]);
  const [ticketStatisticsData, setTicketStatisticsData] = useState<number[]>(
    []
  );
  // redux dispatch
  const dispatch = useAppDispatch();

  // get user and tickets on page load
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

    getMyTickets(localStorage.getItem("token") || "").then((res) => {
      if (res) {
        setTickets(res);

        const statusList = res.map((ticket: Ticket) => ticket.status.status);
        const statusSet = new Set(statusList);
        const statusArray = Array.from(statusSet);
        setStatusList(statusArray as String[]);
        randomRGBGenerator(statusArray.length);

        const data: number[] = [];
        statusArray.forEach((status) => {
          const count: number = statusList.filter(
            (s: string) => s === status
          ).length;
          data.push(count);
        });
        setTicketStatisticsData(data);
      }
    });
  }, []);

  // random rgba color generator
  const randomRGBGenerator = (lenght: number) => {
    const list = [];
    for (let i = 0; i < lenght; i++) {
      list.push(
        `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(
          Math.random() * 255
        )}, ${Math.floor(Math.random() * 255)})`
      );
    }
    SetColors(list);
  };

  // chart data
  const data: any = {
    labels: statusList,
    datasets: [
      {
        label: "Status",
        data: ticketStatisticsData,
        backgroundColor: Colors,
        borderColor: Colors,
        borderWidth: 1,
      },
    ],
  };

  return (
    <MainLayout>
      <div className="container w-full text-center mt-5">
        <h1 className="text-6xl font-bold">Your Help Desk Statistics</h1>
        <h4 className="text-3xl mt-5 text-gray-400">
          Here are some insights based on your activity.
        </h4>
        <div className="grid grid-flow-col gap-3 mt-20">
          <Card>
            <CardHeader className="font-bold">Number of Tickets</CardHeader>
            <CardContent>
              <h2 className="text-5xl font-bold">{tickets.length}</h2>
            </CardContent>
          </Card>
          {statusList &&
            statusList.map((_, index) => {
              return (
                <Card key={index}>
                  <CardHeader className="font-bold">
                    Number of {statusList[index]}
                  </CardHeader>
                  <CardContent>
                    <h2 className="text-5xl font-bold">
                      {ticketStatisticsData[index]}
                    </h2>
                  </CardContent>
                </Card>
              );
            })}
        </div>
        <div className="w-full flex justify-center">
          <div className="h-96 w-96 mt-20">
            <Pie data={data} />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
