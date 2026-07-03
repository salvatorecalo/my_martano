import { calculateTodayAndTomorrowTrash } from "./(utils)/functions/";
import { TrashReminder, PhoneNumbers } from "./components";
import PushNotifications from "./components/push_notifications/push_notifications";

export const dynamic = "force-dynamic"

export default async function Home() {
  const {todayMaterial, tomorrowMaterial} =  await calculateTodayAndTomorrowTrash()
  return (
    <main className="mx-10 lg:mx-8">
      <PushNotifications />
      <TrashReminder todayMaterial={todayMaterial} tomorrowMaterial={tomorrowMaterial} />
      <PhoneNumbers />
    </main>
  );
}
