"use client";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalModalStore } from "@/store/globalModalStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Col } from "@/components/layout";
import { usePathname } from "next/navigation";

export function CreateNewListModalTrigger() {
  const { setKey } = useGlobalModalStore();
  const pathname = usePathname();

  if (pathname !== "/my/lists") {
    return null;
  }

  return (
    <Button
      font={"body3"}
      className={"h-[42px] px-[20px] py-2"}
      rounded={"full"}
      onClick={() => setKey("createNewList")}
    >
      New list
    </Button>
  );
}

export function CreateNewListModal() {
  const { onClose } = useGlobalModalStore();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };
  return (
    <DialogContent className="md:max-w-[625px] md:px-16 md:py-14">
      <DialogHeader>
        <DialogTitle>Create New List</DialogTitle>
        <DialogDescription hidden>Create New List</DialogDescription>
      </DialogHeader>
      <Col className="gap-0 md:gap-[20px]">
        <Input
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value.slice(0, 60))}
          placeholder="Enter list name"
          inputClassName="pl-3 mt-[8px] rounded-[3px]"
          font={"body3"}
          icon={"length"}
          maxLength={60}
          required
        />
      </Col>

      <Col className="gap-2">
        <Label htmlFor="description" font={"body4"}>
          Description
        </Label>
        <Textarea
          showMaxLength
          id="description"
          value={description}
          maxLength={280}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Add a description"
          className="min-h-[200px] w-full resize-none md:min-h-[100px]"
          font={"body3"}
        />
      </Col>

      <div className="flex items-center justify-between">
        <Label htmlFor="private" className="cursor-pointer" font={"body4"}>
          Make it private
        </Label>
        <Switch
          id="private"
          checked={isPrivate}
          onCheckedChange={setIsPrivate}
        />
      </div>

      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          font={"body4"}
        >
          Cancel
        </Button>
        <Button type="submit" onClick={handleSubmit} font={"body4"}>
          Create List
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
