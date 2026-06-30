import { calculateTodayAndTomorrowTrash } from "./(utils)/functions/";
import { TrashReminder, PhoneNumbers } from "./components";
import PushNotifications from "./components/push_notifications/push_notifications";

export default async function Home() {
  const {todayMaterials, tomorrowMaterials} =  await calculateTodayAndTomorrowTrash()
  return (
    <main className="mx-10 lg:mx-8">
      <PushNotifications />
      <TrashReminder todayMaterials={todayMaterials} tomorrowMaterials={tomorrowMaterials} />
      <PhoneNumbers />
    </main>
  );
}
