import { calculateTodayAndTomorrowTrash } from "./(utils)/functions/";
import { TrashReminder } from "./components";
import { ActiveReminderButton } from "./components/active_reminder_button/active_reminder_button_client_button";


export default async function Home() {
  const {todayObj, tomorrowObj} =  await calculateTodayAndTomorrowTrash()
  return (
    <main className="mx-10 lg:mx-8">
      <ActiveReminderButton />
      <TrashReminder todayObj={todayObj} tomorrowObj={tomorrowObj} />
    </main>
  );
}
