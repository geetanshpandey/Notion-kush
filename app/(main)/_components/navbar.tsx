"use client";

import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";

import { Title } from "./title";
import { Banner } from "./banner";
import { Menu } from "./menu";
import { Publish } from "./publish";

interface NavbarProps {
  isCollapsed: boolean;
  onResetWidth: () => void;
}

export const Navbar = ({ isCollapsed, onResetWidth }: NavbarProps) => {
  const params = useParams();

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId as Id<"documents">,
  });

  if (document === undefined) {
    return (
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-end fixed top-0 right-0 left-0">
        <Title.Skeleton />
        <div className="flex items-center gap-x-2">
          <Menu.Skeleton />
        </div>
      </nav>
    );
  }

  if (document === null) {
    return null;
  }

  return (
    <>
      {/* Navbar positioned at the top */}
      <nav className="bg-background dark:bg-[#1F1F1F] px-3 py-2 w-full flex items-center justify-between">
        {isCollapsed ? (
          <div className="flex items-center flex-row-reverse gap-2">
            <Title initialData={document} />
            <MenuIcon
              role="button"
              onClick={onResetWidth}
              className="h-6 w-6 text-muted-foreground"
            />
          </div>
        ) : (
          <Title initialData={document} />
        )}
      </nav>

      {/* Publish and Menu buttons aligned to the top-right */}
      {/* Publish and Menu buttons aligned to the top-right */}
      <div className="absolute top-3 right-4 flex flex-col items-center gap-y-5 mt-2 mr-4"> {/* Change to flex-col for vertical alignment */}
        <Publish initialData={document} />
        <Menu documentId={document._id} />
      </div>
      {/* Displaying banner if the document is archived */}
      {document.isArchived && <Banner documentId={document._id} />}
    </>
  );
};
