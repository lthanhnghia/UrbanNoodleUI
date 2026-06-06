import OverviewToolbar from "./OverviewToolbar";
import StatCard from "./OverviewStatCard";
import OverviewTable from "./OverviewTable";
import { useEffect, useState } from "react";
import ApiRequest from "../../services/ApiRequest";
const Dashboard = () => {
  const [startDate, setStartDate] = useState<string | null>(null);
const [endDate, setEndDate] = useState<string | null>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await ApiRequest({
          method: "GET",
          path: "/api/dashboard",
          params: {
            start: startDate,
            end: endDate,
          },
        });
         console.log(res);
        setDashboardData(res);
      } catch (err) {
        console.error(err);
      } 
    };

    fetchData();
  }, [startDate, endDate]);

  const handleSubmitToday = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const handleSubmitFilter = (dates: { startDate: string; endDate: string }) => {
    setStartDate(dates.startDate);
    setEndDate(dates.endDate);
  };

  return (
    <div className="">
      <OverviewToolbar onSubmitToday={handleSubmitToday} onSubmitFilter={handleSubmitFilter} />
      <StatCard 
        totalAmount={dashboardData?.totalAmount}
        numberAccount={dashboardData?.numberAccount}
        numberOrder={dashboardData?.numberOrder}
        foodName={dashboardData?.foodName}
        totalSold={dashboardData?.totalSold}
      />
      <OverviewTable topfoods={dashboardData?.topFood || []} />
    </div>
  )




}
export default Dashboard;
