import UserPage from "./_component/UserPage";
import { Row } from "@/components/layout";

export default function page() {
  return (
    <Row className={"w-full justify-center"}>
      <UserPage fetchUser={{ id: "cm7a8hvga0000adm03c7v2jhz" }} />
    </Row>
  );
}
