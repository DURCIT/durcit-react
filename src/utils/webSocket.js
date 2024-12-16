import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";

const socketUrl = "http://localhost:8080/ws"; // WebSocket 서버 URL

let stompClient = null;

export const connectWebSocket = (onMessage) => {
  const socket = new SockJS(socketUrl); // SockJS를 사용하여 WebSocket 생성
  stompClient = Stomp.over(socket);

  stompClient.connect({}, () => {
    console.log("WebSocket Connected via SockJS");

    // 이모지 업데이트 이벤트 구독
    stompClient.subscribe("/topic/emojiUpdate", (message) => {
      const data = JSON.parse(message.body);
      console.log("Emoji Update:", data);
      if (onMessage) onMessage(data);
    });
  }, (error) => {
    console.error("WebSocket Connection Error:", error);
  });
};

export const addEmoji = (postId, emoji) => {
  if (stompClient && stompClient.connected) {
    stompClient.send(
      "/app/addEmoji", // 서버의 MessageMapping 경로
      {},
      JSON.stringify({ postId, emoji })
    );
  } else {
    console.error("WebSocket is not connected");
  }
};

export const disconnectWebSocket = () => {
  if (stompClient) {
    stompClient.disconnect(() => {
      console.log("WebSocket Disconnected");
    });
  }
};