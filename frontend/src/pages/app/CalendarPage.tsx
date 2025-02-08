import MainCalendar from "@/components/calendar/MainCalendar";
import H1 from "@/components/common/H1";
import Loading from "@/components/common/Loading";
import { CalendarEvent } from "@/components/ui/full-calendar";
import { useSchedules } from "@/hooks/queries/useSchedules";
import env from "@/lib/env";
import { useEffect } from "react";

export default function CalendarPage() {
  useEffect(() => {
    document.title = `Calendar | ${env.VITE_APP_NAME}`;
  }, []);

  const { data: schedules = [], isLoading } = useSchedules();

  const events: CalendarEvent[] = schedules.map((schedule) => ({
    id: schedule.id,
    title: `${schedule.course.course_code} | ${schedule.course_unit.name}`,
    start: new Date(schedule.start_datetime),
    end: new Date(schedule.end_datetime),
    color: "blue",
  }));

  return (
    <main>
      <H1>My Calendar</H1>
      {isLoading ? <Loading /> : <MainCalendar events={events} />}
    </main>
  );
}
