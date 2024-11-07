"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import { toast } from "sonner";

import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { ConfirmModal } from "@/components/modals/confirm-modal";

interface BannerProps {
  documentId: Id<"documents">;
};

export const Banner = ({
  documentId
}: BannerProps) => {
  const router = useRouter();

  const remove = useMutation(api.documents.remove);
  const restore = useMutation(api.documents.restore);

  const onRemove = () => {
    const promise = remove({ id: documentId });

    toast.promise(promise, {
      loading: "Deleting note...",
      success: "Note deleted!",
      error: "Failed to delete note."
    });

    router.push("/documents");
  };

  const onRestore = () => {
    const promise = restore({ id: documentId });

    toast.promise(promise, {
      loading: "Restoring note...",
      success: "Note restored!",
      error: "Failed to restore note."
    });
  };

  return (
    <div className="w-full bg-gray-200 font-bold text-center text-sm p-4 text-black flex flex-col items-center gap-y-2 h-22">
      <p>This page is in the Trash.</p>
      <div className="flex space-x-4">
        <Button
          size="sm"
          onClick={onRestore}
          variant="default"
          className="border-white text-white bg-gray-900 hover:bg-emerald-400 px-4 py-2 font-semibold rounded-md"
        >
          Restore page
        </Button>
        <ConfirmModal onConfirm={onRemove}>
          <Button
            size="sm"
            variant="destructive"
            className="border-white text-white bg-gray-900 hover:bg-rose-400 px-4 py-2 font-semibold rounded-md"
          >
            Delete forever
          </Button>
        </ConfirmModal>
      </div>
    </div>
  );
};
