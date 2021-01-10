import { useDispatch } from "react-redux";
import { setChannelInfo } from "../../features/appSlice";
import "./SidebarChannel.css";

const SidebarChannel = ({ id, channelName }) => {
  const dispatch = useDispatch();
  const handleChannelInfo = () => {
    dispatch(
      setChannelInfo({
        channelId: id,
        channelName,
      })
    );
  };

  return (
    <div className="sidebarChannel" onClick={() => handleChannelInfo()}>
      <h4>
        <span className="sidebarChannel__hash">#</span>
        {channelName}
      </h4>
    </div>
  );
};

export default SidebarChannel;
