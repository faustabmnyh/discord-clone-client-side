import ChatHeader from "../ChatHeader";
import "./Chat.css";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import CardGiftcardIcon from "@material-ui/icons/CardGiftcard";
import GifIcon from "@material-ui/icons/Gif";
import Message from "../Message";
import { useSelector } from "react-redux";
import { selectChannelId, selectChannelName } from "../../features/appSlice";
import { selectUser } from "../../features/userSlice";
import { useEffect, useRef, useState } from "react";
import axios from "../../utils/axios";
import Pusher from "pusher-js";

const pusher = new Pusher("23bd3fda0c1cc5b30b8f", {
  cluster: "mt1",
});

const Chat = () => {
  const user = useSelector(selectUser);
  const channelId = useSelector(selectChannelId);
  const channelName = useSelector(selectChannelName);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  const getConversation = (channelId) => {
    if (channelId) {
      axios
        .get(`/get/message?id=${channelId}`)
        .then((res) => setMessages(res.data[0].conversation))
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getConversation(channelId);

    const channel = pusher.subscribe("conversation");
    channel.bind("newMessage", function (data) {
      getConversation(channelId);
    });
  }, [channelId]);

  const sendMessage = (e) => {
    e.preventDefault();

    axios.post(`/message?id=${channelId}`, {
      message: input,
      timestamp: Date.now(),
      user,
    });

    setInput("");
  };

  console.log(channelId);

  return (
    <div className="chat">
      <ChatHeader channelName={channelName} />
      <div className="chat__messages">
        {messages.map((message) => (
          <Message
            key={message._id}
            timestamp={message.timestamp}
            message={message.message}
            user={message.user}
          />
        ))}
      </div>

      <div className="chat__input">
        <AddCircleIcon fontSize="large" />
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={!channelId}
            type="text"
            placeholder={`Message #${channelName}`}
          />
          <button
            type="submit"
            className="chat__inputButton"
            onClick={sendMessage}
          >
            Send Message
          </button>
        </form>

        <div className="chat__inputIcons">
          <CardGiftcardIcon />
          <GifIcon />
          <EmojiEmotionsIcon />
        </div>
      </div>
    </div>
  );
};

export default Chat;
