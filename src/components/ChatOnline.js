import React from 'react';

function ChatOnline() {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
          <span className="chatOnlineName">John</span>
        </div>
      </div>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
          <span className="chatOnlineName">Ash</span>
        </div>
      </div>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
          <span className="chatOnlineName">Kylie</span>
        </div>
      </div>
      <div className="chatOnlineFriend">
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src="https://react.semantic-ui.com/images/avatar/large/molly.png"
            alt=""
          />
          <div className="chatOnlineBadge"></div>
          <span className="chatOnlineName">Nate</span>
        </div>
      </div>
    </div>
  );
}

export default ChatOnline;
