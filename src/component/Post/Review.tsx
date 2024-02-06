"use client";
import React, { useState } from "react";

interface CommentInputProps {
  onSubmit: (comment: {
    text: string;
    isSecret: boolean;
    password?: string;
  }) => void;
}

const Review = ({ onSubmit }: CommentInputProps) => {
  const [commentText, setCommentText] = useState("");
  const [isSecret, setIsSecret] = useState(false);
  const [password, setPassword] = useState(""); // 추가된 부분

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setCommentText(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    onSubmit({
      text: commentText,
      isSecret: isSecret,
      password: isSecret ? password : undefined, // 추가된 부분
    });

    setCommentText("");
    setIsSecret(false);
    setPassword(""); // 추가된 부분
  };

  return (
    <div className="mb-4">
      <textarea
        className="w-full h-[8rem] p-2 outline-none border rounded resize-none"
        value={commentText}
        onChange={handleCommentChange}
        placeholder="Write your comment..."
      />
      <div className="mt-2">
        <button
          className="bg-blue-500 text-white py-2 px-4 mr-4 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <label className="mr-2">
          <input
            type="checkbox"
            checked={isSecret}
            onChange={() => setIsSecret(!isSecret)}
            className="ml-2 w-[1rem] h-[1rem] relative top-[2px] cursor-pointer"
          />
          <span className="ml-1 text-[14px]">비밀글</span>
        </label>
        {isSecret && (
          <div className="mt-2">
            <input
              type="password"
              value={password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              className="p-2 outline-none border rounded"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Review;
