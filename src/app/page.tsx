import MapComponent from "@/components/mapComponent";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <>
      {/* <UserButton showName={true} /> */}
      <MapComponent/>
    </>
  );
}
