"use client";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { SelectLangModal } from "@/components/modal/SelectLangModal";
import { useGlobalModalStore } from "@/store/globalModalStore";
import { CreateNewListModal } from "@/components/modal/CreateNewListModal";

export default function GlobalModal() {
  const { key, onClose } = useGlobalModalStore();
  const renderModal = (key: string) => {
    switch (key) {
      case "selectLang":
        return <SelectLangModal />;
      case "createNewList":
        return <CreateNewListModal />;
      default:
        return null;
    }
  };

  if (!key) return null;

  return (
    <Dialog
      open={!!key}
      onOpenChange={(e) => {
        if (!e) onClose();
      }}
    >
      <DialogTrigger hidden />
      {renderModal(key)}
    </Dialog>
  );
}
