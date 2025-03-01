import { Col, Row } from "@/components/layout";
import { Label } from "@/components/ui/label";
import { IconLink } from "@/assets/svg";
import React from "react";

export function LinkList({ links }: { links: { url: string; label: string }[] | [] }) {
  if (links.length === 0) {
    return null;
  }

  return (
    <Col className={"mb-10 w-full"}>
      <Label font={"heading6"} className={"font-medium"}>
        LINK
      </Label>
      <Row className={"mt-2 gap-4"}>
        {links.map((link, index) => (
          <a key={index} className={"flex items-center"} href={link.url} target={"_blank"}>
            <IconLink className={"h-3 w-3"} /> <p className={"body5 ml-2"}>{link.label} </p>
          </a>
        ))}
      </Row>
    </Col>
  );
}
