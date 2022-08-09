import React, { useContext, useState, useEffect, useRef } from 'react';
import gql from 'graphql-tag';
//import moment from 'moment';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { AuthContext } from '../../context/auth';

import Conversation from '../../components/Conversation';
import Message from '../../components/Message';
//import ChatOnline from '../components/ChatOnline';
import Slider from '../../components/Slider/index';
import slayout from '../../components/Layout/Layout.module.scss';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';

function Messenger({ own }) {
  const [side, setSide] = useState(true);
  // const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [receiverId, setReceiverId] = useState(null);
  const [currentMembers, setCurrentMembers] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(null);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const { user } = useContext(AuthContext);
  const memberId = user.id;
  const senderId = user.id;
  const scrollRef = useRef();

  const { loading: conversationLoading, data: conversationData } = useQuery(
    FETCH_CONVERSATIONS_QUERY,
    {
      pollInterval: 5000,
      variables: {
        memberId,
      },
    }
  );

  const conversationId = currentChat;
  // alert(JSON.stringify(currentChat));

  {
    conversationData
      ? console.log(conversationData)
      : console.log('No Conversations');
  }

  const { loading: Pending, data: messagesData } = useQuery(
    FETCH_MESSAGES_QUERY,

    {
      pollInterval: 5000,
      variables: {
        conversationId,
      },
    }
  );

  const [submitMessage] = useMutation(CREATE_MESSAGE_MUTATION, {
    update() {
      setMessage('');
    },

    variables: {
      conversationId: conversationId,
      sender: senderId,
      receiver: receiverId,
      body: message,
    },
  });

  const handleSubmit = async (e) => {
    submitMessage({
      variables: {
        conversationId: conversationId,
        sender: senderId,
        receiver: receiverId,
        body: message,
      },
    });
  };

  const [updateMessageStatus, { data, loading, error }] = useMutation(
    UPDATE_MESSAGE_STATUS_MUTATION
  );

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  function ManageCurrentChats(convId, receiverId) {
    setCurrentChat(convId);
    setReceiverId(receiverId);

    /*updateMessageStatus({
      variables: { conversationId: convId, status: 'Read' },
    });*/
  }

  //alert(currentMembers);

  //console.log(JSON.stringify(messagesData));

  /* useEffect(() => {
    const getConversations = async () => {
      setConversations(data);
    };
  });*/

  //console.log(data);

  /*useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messagesData]);*/

  var receiverNewId = null;

  return (
    <div className={slayout.root}>
      <div className={slayout.wrap} style={{ marginBottom: '60px' }}>
        <Header changeSide={(side) => setSide(side)} />
        <Sidebar side={side} />
        {user ? <Slider /> : ''}
        <div className={own ? 'message own' : 'messenger'}>
          <div className="chatMenu">
            <div className="chatMenuWrapper">
              <input
                placeholder="Search for friends"
                className="chatMenuInput"
              />
              {conversationLoading ? (
                <h1>Loading chats..</h1>
              ) : (
                conversationData &&
                conversationData.getConversations.map(
                  (conv) => (
                    conv.members[1] == user.id
                      ? (receiverNewId = conv.members[0])
                      : (receiverNewId = conv.members[1]),
                    (
                      <div
                        onClick={() => {
                          ManageCurrentChats(conv.id, receiverNewId);
                        }}
                      >
                        <Conversation
                          key={conv.id}
                          conversation={conv}
                          Id={memberId}
                        />
                      </div>
                    )
                  )
                )
              )}
            </div>
          </div>
          <div className="chatBox">
            <div className="chatBoxWrapper">
              {currentChat ? (
                <>
                  <div className="chatBoxTop">
                    {Pending ? (
                      <h1>Loading messages..</h1>
                    ) : (
                      messagesData &&
                      messagesData.getMessages.map((m) => (
                        <div ref={scrollRef}>
                          <Message
                            key={m.id}
                            message={m}
                            own={m.sender === memberId}
                            userId={m.sender}
                          />
                        </div>
                      ))
                    )}
                  </div>
                  <div className="chatBoxBottom">
                    <textarea
                      className="chatMessageInput"
                      placeholder="Write something..."
                      name="message"
                      value={message}
                      onChange={(event) => setMessage(event.target.value)}
                    ></textarea>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="chatSubmitButton"
                    >
                      Send
                    </button>
                  </div>
                </>
              ) : (
                <span className="noConversationText">
                  Open a conversation to start a chat
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <footer className="auth-footer">
        {new Date().getFullYear()} &copy; Motorluv{' '}
        <a
          href="https://motorluv.online"
          rel="noopener noreferrer"
          target="_blank"
        >
          Connect
        </a>
        .
      </footer>
    </div>
  );
}

const FETCH_CONVERSATIONS_QUERY = gql`
  query ($memberId: String!) {
    getConversations(memberId: $memberId) {
      id
      members
    }
  }
`;

const FETCH_MESSAGES_QUERY = gql`
  query ($conversationId: String!) {
    getMessages(conversationId: $conversationId) {
      id
      sender
      receiver
      body
      status
      createdAt
    }
  }
`;

const CREATE_MESSAGE_MUTATION = gql`
  mutation createMessage(
    $conversationId: String!
    $sender: String!
    $receiver: String!
    $body: String!
  ) {
    createMessage(
      conversationId: $conversationId
      sender: $sender
      receiver: $receiver
      body: $body
    ) {
      id
      conversationId
      sender
      receiver
      body
      status
      createdAt
    }
  }
`;

const UPDATE_MESSAGE_STATUS_MUTATION = gql`
  mutation updateMessageStatus($conversationId: String!, $status: String!) {
    updateMessageStatus(conversationId: $conversationId, status: $status) {
      status
    }
  }
`;

export default Messenger;
