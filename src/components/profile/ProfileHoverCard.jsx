import React, { useState } from "react";
import apiClient from "../../utils/apiClient";

const ProfileHoverCard = ({ profileImage, username, nickname, onFollow, targetMemberId }) => {
  const [isHovered, setIsHovered] = useState(false);

  const defaultImage = "/default-avatar.png"; // 대체 이미지 경로

  const handleNewChat = async () => {
    try {
      const response = await apiClient.post("/rooms", {
        memberId: localStorage.getItem("memberId"),
        targetMemberId: targetMemberId,
      });

      const chatRoom = response.data;
      alert(`채팅방이 생성되었습니다. Room ID: ${chatRoom.roomId}`);
    } catch (error) {
      console.error("채팅방 생성 중 오류 발생:", error);
      alert("채팅방 생성에 실패했습니다.");
    }
  };


  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 프로필 이미지 */}
      <img
        src={profileImage || defaultImage}
        alt={username}
        className="w-12 h-12 rounded-full cursor-pointer"
      />

      {/* 호버 시 표시될 카드 */}
      {isHovered && (
        <div className="absolute left-1/2 transform -translate-x-1/2 top-14 w-60 p-4 bg-white border rounded-lg shadow-lg z-10">
          {/* 유저 정보 */}
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={profileImage || defaultImage}
              alt={username}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h3 className="text-lg font-semibold">{nickname}</h3>
              <p className="text-gray-500 text-sm">@{username}</p>
            </div>
          </div>

          {/* 버튼들 */}
          <div className="flex justify-end space-x-2">
            <button
              onClick={onFollow}
              className="px-4 py-2 bg-red-500 text-white text-sm rounded hover:bg-red-600 transition"
            >
              Follow
            </button>
            <button
              onClick={handleNewChat}
              className="px-4 py-2 bg-gray-500 text-white text-sm rounded hover:bg-gray-600 transition"
            >
              New Chat
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileHoverCard;
