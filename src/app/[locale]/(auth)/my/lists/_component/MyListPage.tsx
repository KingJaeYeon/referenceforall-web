import Col from "@/components/Layout/Col";
import NavContentCSR from "@/app/[locale]/(auth)/my/lists/_component/NavContentCSR";

export default function MyListPage({ library }: { library?: string }) {
  return (
    <Col
      className={
        "hidden h-auto w-full max-w-[320px] border-l border-gray-200 ls:flex"
      }
      style={{
        paddingLeft: "clamp(24px,24px + 100vw - 1080px,40px)",
        paddingRight: "24px",
      }}
    >
      <NavContentCSR />
    </Col>
  );
}
