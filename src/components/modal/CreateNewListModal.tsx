"use client";
import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogBody } from "next/dist/client/components/react-dev-overlay/internal/components/Dialog";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { useGlobalModalStore } from "@/store/globalModalStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import Col from "@/components/Layout/Col";

export function CreateNewListModalTrigger() {
  const { setKey } = useGlobalModalStore();
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
    <DialogContent className="md:max-w-[525px]">
      <DialogHeader>
        <DialogTitle>Create New List</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            id="description"
            value={description}
            maxLength={280}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add a description"
            className="min-h-[100px] w-full resize-none"
            font={"body3"}
            style={{
              height: "auto",
              minHeight: "100px",
            }}
          />
        </Col>

        <div className="flex items-center justify-between">
          <Label htmlFor="private" className="cursor-pointer" font={"body4"}>
            Private list
          </Label>
          <Switch
            id="private"
            checked={isPrivate}
            onCheckedChange={setIsPrivate}
          />
        </div>

        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">Create List</Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
