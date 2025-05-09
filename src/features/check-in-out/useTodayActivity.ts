import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

function useTodayActivity() {
  const {isPending, data: activities } = useQuery({
    queryKey: ["today-activity"],
    queryFn: getStaysTodayActivity
  })

  return { isPending, activities }
}

export default useTodayActivity