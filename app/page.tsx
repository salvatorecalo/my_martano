import { calculateTodayAndTomorrowTrash } from "./(utils)/functions/";
import { TrashReminder, ActiveReminderButton, PhoneNumbers } from "./components";

export default async function Home() {
  const {todayObj, tomorrowObj} =  await calculateTodayAndTomorrowTrash()
  return (
    <main className="mx-10 lg:mx-8">
      <ActiveReminderButton />
      <TrashReminder todayObj={todayObj} tomorrowObj={tomorrowObj} />
      <PhoneNumbers />
    </main>
  );
}
