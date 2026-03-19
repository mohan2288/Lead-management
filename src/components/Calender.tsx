import { Card, Calendar } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import "../styles/Calender.css";
import { WeekCard } from "../services/Followup";

interface FollowUp {
  Contacted_On: string;
}

function CalendarView() {
  const [highlightDates, setHighlightDates] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await WeekCard();

        // ✅ Convert API dates to YYYY-MM-DD
        const dates = res.data.map((item: FollowUp) =>
          dayjs(item.Contacted_On).format("YYYY-MM-DD")
        );

        setHighlightDates(dates);
      } catch (error) {
        console.error("Failed to load followups");
      }
    };

    fetchData();
  }, []);

  const dateCellRender = (value: dayjs.Dayjs) => {
    const dateStr = value.format("YYYY-MM-DD");

    const isHighlighted = highlightDates.includes(dateStr);

    return (
      <div
        className={`
          calendar-cell-box
          ${isHighlighted ? "highlight-box" : ""}
        `}
      >
        {value.date()}
      </div>
    );
  };

  return (
    <Card className="hover-card">
      <h1 className="text-2xl font-bold">Calendar View</h1>
      <br />
      <Calendar
        fullscreen={false}
        fullCellRender={dateCellRender}
      />
    </Card>
  );
}

export default CalendarView;