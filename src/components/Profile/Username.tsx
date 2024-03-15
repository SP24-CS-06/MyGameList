"use client";
import React from "react";

type Props = {
    username: string;
  };

const Username = (props: Props) => {

    const copyUsernameToClipboard = () => {
    navigator.clipboard.writeText(props.username.toLowerCase());
  }

  return (
    <p className="text-md cursor-pointer" onClick={copyUsernameToClipboard}>
          <span className="text-gray-500">@</span>{props.username.toLowerCase()}
    </p>
  );
};

export default Username;



