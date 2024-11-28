"use client";
import { notFound } from "next/navigation";
import React from "react";
import { usePathname } from "@/i18n/routing";
import { BookmarkPreviewCard } from "@/components/BookmarkPreviewCard";

export default function TabContentCSR() {
  const pathName = usePathname();
  const target = pathName.split("/").pop();
  const bookmarks = [
    {
      id: 1,
      authorId: "a",
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 24,
      isPrivate: false,
      bookmarkPreviews: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1731586030995-a131d90a5d04?q=80&w=1672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1731951338443-360860e13f51?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
      ],
    },
    {
      id: 2,
      authorId: "a",
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 0,
      isPrivate: true,
      bookmarkPreviews: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
      ],
    },
    {
      id: 3,
      authorId: "a",
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 0,
      isPrivate: false,
      bookmarkPreviews: [],
    },
    {
      id: 4,
      authorId: "a",
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 0,
      isPrivate: false,
      bookmarkPreviews: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
      ],
    },
  ];

  const otherBookmarks = [
    {
      id: 1,
      authorId: "b",
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 24,
      isPrivate: false,
      bookmarkPreviews: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1731586030995-a131d90a5d04?q=80&w=1672&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1731951338443-360860e13f51?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
      ],
    },
    {
      id: 2,
      authorId: "b",
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 0,
      isPrivate: true,
      bookmarkPreviews: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
      ],
    },
    {
      id: 3,
      authorId: "b",
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 0,
      isPrivate: false,
      bookmarkPreviews: [],
    },
    {
      id: 4,
      authorId: "b",
      title: "2024 여행 버킷리스트",
      author: "여행러버",
      bookmarkCount: 0,
      isPrivate: false,
      bookmarkPreviews: [
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
        {
          thumbnail:
            "https://images.unsplash.com/photo-1732535725600-f805d8b33c9c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8",
        },
      ],
    },
  ];

  switch (target) {
    case "lists":
      return <BookmarkList data={bookmarks} />;
    case "saved":
      return <BookmarkList data={otherBookmarks} />;
    default:
      return notFound();
  }
}

const BookmarkList = ({ data }: { data: any }) => {
  return (
    <div className="mb-[60px] w-full">
      {data.map((bookmark: any) => (
        <BookmarkPreviewCard key={bookmark.id} {...bookmark} />
      ))}
    </div>
  );
};
