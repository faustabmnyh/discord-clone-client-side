import { Avatar } from "@material-ui/core";
import "./Message.css";

const Message = ({ user, message, timestamp }) => {
  return (
    <div className="message">
      <Avatar src={user.photo} />
      <div className="message__info">
        <h4>
          {user.displayName}
          <span className="message__timestamp">
            {new Date(parseInt(timestamp)).toDateString()}
          </span>
        </h4>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Message;
