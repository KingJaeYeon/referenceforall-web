import { Col, Row } from "@/components/layout";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { IconLink } from "@/assets/svg";
import React from "react";

export function LinkList() {
  return (
    <Col className={"mb-10 w-full"}>
      <Label font={"heading6"} className={"font-medium"}>
        LINK
      </Label>
      <Row className={"mt-2 gap-4"}>
        <Link className={"flex items-center"} href={"http://localhost:3000"}>
          <IconLink className={"h-3 w-3"} /> <p className={"body5 ml-2"}>twitter </p>
        </Link>
        <Link className={"flex items-center"} href={"http://localhost:3000"}>
          <IconLink className={"h-3 w-3"} /> <p className={"body5 ml-2"}>twitter </p>
        </Link>
      </Row>
    </Col>
  );
}
