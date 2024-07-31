import { fetchAuthUserAction } from "@/actions";
import Logout from "@/components/log-out";
import { redirect } from "next/navigation";


export default async function Home() {
  const currentUser=await fetchAuthUserAction()
  console.log(currentUser);
  if(!currentUser?.success) redirect('/sign-in')
  return (
    <div>
      <h1>NextJS Authentication</h1>
      <h2>{currentUser?.data?.userName}</h2>
      <h2>{currentUser?.data?.email}</h2>
      <Logout/>
    </div>
  );
}
