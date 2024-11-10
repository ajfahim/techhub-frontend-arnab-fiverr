import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useAuthContext } from "../../hooks/useAuthContext";

const socket = io(`${import.meta.env.VITE_APP_BACKEND_URL}`);

const MessageApp = () => {
  const { user } = useAuthContext();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch all users with the last message
  const fetchUsers = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/user/getUser`
    );
    const users = await response.json();

    // Fetch the last message for each user
    const usersWithLastMessage = await Promise.all(
      users.map(async (contactUser) => {
        const lastMessageResponse = await fetch(
          `${import.meta.env.VITE_APP_BACKEND_URL}/api/messages/last/${
            user.user._id
          }/${contactUser._id}`
        );
        const lastMessage = await lastMessageResponse.json();
        return {
          ...contactUser,
          lastMessage: lastMessage?.text || "No messages yet",
        };
      })
    );

    setAllUsers(usersWithLastMessage);
  };

  const loadMessages = async (contactId) => {
    const response = await fetch(
      `${import.meta.env.VITE_APP_BACKEND_URL}/api/messages/${
        user.user._id
      }/${contactId}`
    );
    const data = await response.json();
    setMessages(data);
  };

  useEffect(() => {
    if (user?.user?._id) fetchUsers();
  }, [user?.user?._id]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      // Check if the message is from/to the currently selected user
      if (
        (data.senderId === user.user._id &&
          data.receiverId === selectedUser?._id) ||
        (data.senderId === selectedUser?._id &&
          data.receiverId === user.user._id)
      ) {
        setMessages((prevMessages) => [...prevMessages, data]);
      }

      // Update last message in sidebar
      setAllUsers((prevUsers) =>
        prevUsers.map((contactUser) =>
          contactUser._id === data.senderId ||
          contactUser._id === data.receiverId
            ? { ...contactUser, lastMessage: data.text }
            : contactUser
        )
      );
    });

    return () => {
      socket.off("receive_message");
    };
  }, [selectedUser, user?.user?._id]);

  const handleUserSelect = (contactUser) => {
    setSelectedUser(contactUser);
    loadMessages(contactUser._id);
  };

  const sendMessage = () => {
    if (messageText.trim() && selectedUser) {
      const messageData = {
        senderId: user.user._id,
        receiverId: selectedUser._id,
        text: messageText,
        timestamp: new Date(),
      };
      socket.emit("send_message", messageData);

      setMessages((prevMessages) => [...prevMessages, messageData]);
      setAllUsers((prevUsers) =>
        prevUsers.map((contactUser) =>
          contactUser._id === selectedUser._id
            ? { ...contactUser, lastMessage: messageData.text }
            : contactUser
        )
      );
      setMessageText("");
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[85vh]">
      {/* Sidebar */}
      <div className="md:w-1/3 w-full bg-gray-100 p-4 border-b md:border-b-0 md:border-r border-gray-200">
        <h2 className="text-xl font-bold mb-4">All messages</h2>
        <input
          type="text"
          className="w-full p-2 mb-4 border border-gray-300 rounded-md"
          placeholder="Search users..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          {allUsers
            .filter(
              (user) =>
                user?.firstname
                  ?.toLowerCase()
                  .includes(searchTerm?.toLowerCase()) ||
                user?.lastname
                  ?.toLowerCase()
                  .includes(searchTerm?.toLowerCase())
            )
            .map((user) => (
              <div
                key={user._id}
                onClick={() => handleUserSelect(user)}
                className="flex items-center p-2 cursor-pointer hover:bg-gray-200 rounded-md border-2 border-transparent hover:border-teal-500"
              >
                <div className="relative">
                  <div className="bg-purple-500 text-white w-10 h-10 flex items-center justify-center rounded-full">
                    {user.firstname[0]}
                  </div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-black rounded-full"></div>
                </div>
                <div className="ml-3 flex-grow">
                  <p className="font-bold text-black">
                    {user.firstname + " " + user.lastname}
                  </p>
                  <p className="text-sm text-gray-600">
                    {user.lastMessage || "No messages yet"}
                  </p>
                </div>
                {/* <div className="flex flex-col gap-1 items-center ml-auto">
                  <span className="bg-green-200 text-green-800 text-xs font-bold py-1 px-2 rounded-full mr-2">
                    2
                  </span>
                  <span className="mr-2 text-lg">
                    <FaRegMessage />
                  </span>
                  <span className="mr-1 text-lg">
                    <FaRegStar />
                  </span>
                </div> */}
              </div>
            ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-grow flex flex-col w-full">
        {selectedUser ? (
          <>
            <div className="flex-shrink-0 bg-teal-500 p-4 text-white font-bold flex items-center">
              <div className="rounded-full w-10 h-10 bg-white flex items-center justify-center mr-3">
                {selectedUser.firstname[0]}
              </div>
              <div>{selectedUser.firstname + " " + selectedUser.lastname}</div>
            </div>

            <div className="flex-grow p-4 bg-white overflow-y-auto">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    message.senderId === user.user._id
                      ? "text-right"
                      : "text-left"
                  }`}
                >
                  <div
                    className={`inline-block p-2 rounded-md ${
                      message.senderId === user.user._id
                        ? "bg-gray-200"
                        : "bg-teal-100"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 bg-gray-100 flex items-center">
              <input
                type="text"
                className="flex-grow p-2 border border-gray-300 rounded-md"
                placeholder="Send a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button
                className="ml-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
                onClick={sendMessage}
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>Select a user to chat with</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageApp;
