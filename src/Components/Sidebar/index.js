import "./Sidebar.css";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AddIcon from "@material-ui/icons/Add";
import SignalCellularAltIcon from "@material-ui/icons/SignalCellularAlt";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import CallIcon from "@material-ui/icons/Call";
import SidebarChannel from "../SidebarChannel";
import { Avatar } from "@material-ui/core";
import HeadsetIcon from "@material-ui/icons/Headset";
import MicIcon from "@material-ui/icons/Mic";
import SettingsIcon from "@material-ui/icons/Settings";
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";
import db, { auth } from "../../utils/firebase";
import { useEffect, useState } from "react";
import axios from "../../utils/axios";
import Pusher from "pusher-js";

// pusher
const pusher = new Pusher("23bd3fda0c1cc5b30b8f", {
  cluster: "mt1",
});

const Sidebar = () => {
  const user = useSelector(selectUser);
  const [channels, setChannels] = useState([]);

  const getChannels = () => {
    axios
      .get("/get/channelList")
      .then((res) => {
        setChannels(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getChannels();
    // pusher
    const channel = pusher.subscribe("channels");
    channel.bind("newChannel", function (data) {
      getChannels();
    });
  }, []);

  const handleAddChannel = (e) => {
    e.preventDefault();

    const channelName = prompt("Enter a new channel name");

    if (channelName) {
      axios.post("/channel", {
        channelName,
      });
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <h3>Kale Group</h3>
        <ExpandMoreIcon />
      </div>

      <div className="sidebar__channels">
        <div className="sidebar__channelsHeader">
          <div className="sidebar__subHeader">
            <ExpandMoreIcon />
            <h4>This is channel</h4>
          </div>

          <AddIcon className="sidebar__AddChannel" onClick={handleAddChannel} />
        </div>
        <div className="sidebar__channelsList">
          {channels.map((channel) => {
            return (
              <SidebarChannel
                key={channel.id}
                channelName={channel.name}
                id={channel.id}
              />
            );
          })}
        </div>
      </div>

      <div className="sidebar__voice">
        <SignalCellularAltIcon
          className="sidebar__voiceIcon"
          fontSize="large"
        />
        <div className="sidebar__voiceInfo">
          <h3>Voice Connected</h3>
          <p>Stream</p>
        </div>
        <div className="sidebar__voiceIcons">
          <InfoOutlinedIcon />
          <CallIcon />
        </div>
      </div>
      <div className="sidebar__profile">
        <Avatar src={user.photo} onClick={() => auth.signOut()} />
        <div className="sidebar__profileInfo">
          <h3>{user.displayName}</h3>
          <p>#{user.uid.substring(0, 7)}</p>
        </div>

        <div className="sidebar__profileIcons">
          <MicIcon />
          <HeadsetIcon />
          <SettingsIcon />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
