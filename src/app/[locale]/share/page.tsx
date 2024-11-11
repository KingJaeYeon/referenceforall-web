import React from "react";
import SiteShareForm from "@/app/[locale]/share/_component/SharePage";

function Page() {
  const inputs = {
    link: "https://medium.com/",
    title: "Medium",
    description: "Medium is a place to write, read, and connect",
    tags: ["writing", "reading", "connecting"],
    image: {
      main: "https://plus.unsplash.com/premium_photo-1730988915408-209c1ab59554?q=80&w=1624&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      screenshots: [
        "https://images.unsplash.com/photo-1695048260733-5f7e0fc024a2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1731008948824-ad26f0aeb243?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    usageTiming: ["writing", "reading", "connecting"],
    features: ["writing", "reading", "connecting"],
  };
  return <SiteShareForm />;
}

export default Page;
