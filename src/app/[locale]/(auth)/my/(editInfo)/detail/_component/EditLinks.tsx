import { Link } from "@/service/user.service";
import React from "react";
import { Col, Row } from "@/components/layout";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash } from "lucide-react";
import { errorType } from "@/app/[locale]/(auth)/my/(editInfo)/detail/_component/EditProfilePage";

export function EditLinks({
  links,
  error,
  setError,
  setLinks,
}: {
  links: Link[] | [];
  setLinks: React.Dispatch<React.SetStateAction<Link[] | []>>;
  error: errorType;
  setError: React.Dispatch<React.SetStateAction<errorType>>;
}) {
  const addLink = () => {
    if (links.length >= 5) return;
    setLinks([...links, { url: "", label: "" }]);
    setError((prevError: any) => ({
      ...prevError,
      links: [...prevError.links, { url: "", label: "" }],
    }));
  };
  const removeLink = (index: number) => {
    setLinks(links.filter((_: any, i: number) => i !== index));
    setError((prevError: any) => ({
      ...prevError,
      links: prevError.links.filter((_: any, i: number) => i !== index),
    }));
  };

  const setValues = (index: number, key: string, value: string) => {
    setLinks(
      links.map((link, i) => {
        if (i === index) {
          return { ...link, [key]: value };
        }
        return link;
      }),
    );
  };
  return (
    <Col className={"gap-6"}>
      <p className={"heading2"}>{`Additional links ${links.length}/5`}</p>
      {links?.map((link: { url: string; label: string }, index: number) => (
        <Row className={"gap-2"} key={index}>
          <Col className={"flex-1 gap-2"}>
            <Label font={"heading6"}>Link name</Label>
            <Input
              maxLength={20}
              placeholder={"Label to Link"}
              value={link.label}
              hasError={!!error.links[index].label}
              onChange={(e) => setValues(index, "label", e.target.value.trim())}
            />
            {error.links[index].label && <p className={"body7 pl-2 text-destructive"}>{error.links[index].label}</p>}
          </Col>
          <Col className={"flex-[3] gap-2"}>
            <Label font={"heading6"}>URL</Label>
            <Row className={"gap-2"}>
              <Input
                value={link.url}
                hasError={!!error.links[index].url}
                placeholder={"https://example.com/ex"}
                onChange={(e) => setValues(index, "url", e.target.value.trim())}
              />
              <Button color={"secondary"} onClick={() => removeLink(index)} className={"h-full px-[10px] md:px-[15px]"}>
                <Trash size={20} />
              </Button>
            </Row>
            {error.links[index].url && <p className={"body7 pl-2 text-destructive"}>{error.links[index].url}</p>}
          </Col>
        </Row>
      ))}
      {links.length < 5 && (
        <Button className={"rounded-[4px]"} font={"body4"} onClick={addLink}>
          Add Link <Plus size={20} className={"ml-[6px]"} />
        </Button>
      )}
    </Col>
  );
}
