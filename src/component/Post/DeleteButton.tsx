"use client";
import { deletePost } from "@/api/post";
import React from "react";

interface DeleteButtonProps {
  querystring: number;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({ querystring }) => {
  const handleDelete = async (pk: number) => {
    await deletePost(pk);
  };

  return (
    <button
      className="bg-orange-500 ml-2 text-white py-1 px-2 rounded text-[13px]"
      type="button"
      onClick={() => handleDelete(querystring)}
    >
      삭제하기
    </button>
  );
};

export default DeleteButton;
