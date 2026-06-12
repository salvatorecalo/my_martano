import { calculateTodayAndTomorrowTrash } from "./(utils)/functions/";
import { TrashReminder, ActiveReminderButton, PhoneNumbers } from "./components";

export default async function Home() {
  const {todayMaterials, tomorrowMaterials} =  await calculateTodayAndTomorrowTrash()
  return (
    <main className="mx-10 lg:mx-8">
      <ActiveReminderButton />
      <TrashReminder todayMaterials={todayMaterials} tomorrowMaterials={tomorrowMaterials} />
      <PhoneNumbers />
    </main>
  );
}
