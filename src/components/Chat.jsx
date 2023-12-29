import React, { useEffect, useRef, useState } from 'react';
import { BsDot, BsArrowUpCircle, BsArrowDownCircle } from 'react-icons/bs';
import { FaTimes } from 'react-icons/fa';
import io from 'socket.io-client';
import axios from 'axios';
const Chat = () => {
  const [mohamed, setMohamed] = useState(false);
  const socket = io.connect(import.meta.env.APP_API_URL);
  const [openChat, setOpenChat] = useState(false);
  const chatInput = useRef(null);
  const [firstMessage, setFirstMessage] = useState('');
  const [chatMessage, setChatMessage] = useState();
  const [userCoords, setUserCoords] = useState([]);
  const [userName, setUserName] = useState('user');
  const [admin, setAdmin] = useState(false);
  const [messages, setMessages] = useState([]);
  const [isOpacity, setIsOpacity] = useState(false);
  const [onlineUser, setOnlineUser] = useState([]);
  const [serverElementPosition, setServerElementPosition] = useState([]);
  const [serverOpenChat, setServerOpenChat] = useState([]);
  const [position, setPosition] = useState({ x: 40, y: 570 });
  // const getMohamed = async () => {
  //   try {
  //     const res = await axios.get(import.meta.env.APP_API_URL + '/online');
  //     setMohamed(res.data);
  //     console.log(res.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // useEffect(() => {
  //   getMohamed();
  // }, []);
  const handleMouseDown = (event) => {
    event.preventDefault();
    if (document.querySelector('#chat'))
      document.querySelector('#chat').style.transition = 'none 0s';

    const startX = event.clientX;
    const startY = event.clientY;

    document.addEventListener('mousemove', handleMouseMove);
    // document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    // document.addEventListener('touchend', handleMouseUp);

    function handleMouseMove(event) {
      const newX = position.x + event.clientX - startX;
      const newY = position.y + event.clientY - startY;

      setPosition({ x: newX, y: newY });
    }

    function handleMouseUp() {
      document.querySelector('#chat').style.transition = 'all 1s';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    }
  };
  const handleServerMouseDown = (event, u) => {
    event.preventDefault();
    if (document.querySelector(`#${u}`) != null)
      document.querySelector(`#${u.replace(' ', '_')}`).style.transition =
        'none';

    const startX = event.clientX;
    const startY = event.clientY;

    document.addEventListener('mousemove', handleMouseMove);
    // document.addEventListener('touchmove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    // document.addEventListener('touchend', handleMouseUp);

    function handleMouseMove(event) {
      const newX =
        serverElementPosition.filter((el) => el.user == u)[0].x +
        event.clientX -
        startX;
      const newY =
        serverElementPosition.filter((el) => el.user == u)[0].y +
        event.clientY -
        startY;

      setServerElementPosition([
        ...serverElementPosition.filter((el) => el.user !== u),
        { user: u, x: newX, y: newY },
      ]);
    }

    function handleMouseUp() {
      document.querySelector(`#${u}`).style.transition = 'all 1s';
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchend', handleMouseUp);
    }
  };

  const serverChatTouchHandle = (e, id) => {
    let ServerElement;
    if (id !== undefined) ServerElement = document.querySelector(`#${id}`);
    else ServerElement = undefined;

    const startX = serverElementPosition.filter((el) => el.user == id)[0].x;
    const startY = serverElementPosition.filter((el) => el.user == id)[0].y;

    element.addEventListener('touchmove', moveElement);

    element.addEventListener('touchend', stopMovingElement);

    function moveElement(event) {
      // Calculate the new position of the element.
      const newX = startX + event.touches[0].clientX - startX;
      const newY = startY + event.touches[0].clientY - startY;
      ServerElement.style.transition = 'none';

      // Set the new position of the element.
      setServerElementPosition([
        ...serverElementPosition.filter((el) => el.user !== id),
        { user: id, x: newX, y: newY },
      ]);
    }

    // Function to stop moving the element.
    function stopMovingElement() {
      // Remove the event listeners.
      ServerElement.style.transition = 'all';

      element.removeEventListener('touchmove', moveElement);
      element.removeEventListener('touchend', stopMovingElement);
    }
  };

  const handleTouch = (e, id = undefined) => {
    e.preventDefault();
    const element = document.querySelector('#chat').firstChild;

    document.querySelector('#chat').style.transition = 'none 0s';
    // document.querySelector(`#${id}`)?.style.transition = 'none 0s';

    const startX = position.x;
    const startY = position.y;
    element.addEventListener('touchmove', moveElement);

    element.addEventListener('touchend', stopMovingElement);

    function moveElement(event) {
      // Calculate the new position of the element.
      const newX = startX + event.touches[0].clientX - startX;
      const newY = startY + event.touches[0].clientY - startY;
      element.style.transition = 'none';

      // Set the new position of the element.
      setPosition({ x: newX, y: newY });
    }

    // Function to stop moving the element.
    function stopMovingElement() {
      // Remove the event listeners.
      element.style.transition = 'all';

      element.removeEventListener('touchmove', moveElement);
      element.removeEventListener('touchend', stopMovingElement);
    }
  };

  useEffect(() => {
    onlineUser?.map((u, index) => {
      !serverElementPosition.includes((el) => el.user == u) &&
      screen.width > 960
        ? setServerElementPosition([
            ...serverElementPosition,
            {
              user: u,
              x:
                serverElementPosition[index - 1]?.x < 660
                  ? serverElementPosition[index - 1]?.x + 220
                  : 40,
              y: serverElementPosition[index - 1]?.x
                ? serverElementPosition[index - 1]?.x >= 660
                  ? serverElementPosition[index - 1]?.y - 40
                  : serverElementPosition[index - 1]?.y
                : 570,
            },
          ])
        : setServerElementPosition([
            ...serverElementPosition,
            {
              user: u,
              x: 40,
              y: serverElementPosition[index - 1]?.y
                ? serverElementPosition[index - 1]?.y == 530
                  ? 440
                  : serverElementPosition[index - 1]?.y - 40
                : 570,
            },
          ]);
      !serverOpenChat.includes((el) => el.user == u)
        ? setServerOpenChat([...serverOpenChat, { user: u, open: false }])
        : setServerOpenChat([{ user: u, open: false }]);
    });
    // console.log(onlineUser);

    // console.log(onlineUser);
  }, [onlineUser]);
  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.pageYOffset >= 30) {
        setIsOpacity(true);
      } else {
        setIsOpacity(false);
      }
    });
  }, []);
  useEffect(() => {
    messages?.map(
      (m) =>
        !onlineUser.includes(m.from) && setOnlineUser([...onlineUser, m.from])
    );
  }, [messages]);
  const clientName = () => {
    const chatInput = document.getElementById('chatInput');
    chatInput.value = 'my full name is: ';
    chatInput.focus();
  };
  useEffect(() => {
    socket.on('Cclient', (data) => {
      if (data.text == 'offline') {
        setMohamed(false);
      } else if (data.text == 'online') {
        setMohamed(true);
      }
    });
  }, []);

  useEffect(() => {
    socket.emit('online', {
      text: 'are you on',
      from: 'user',
      to: 'online',
      state: 'sent',
    });
  }, []);
  const sendMessage = (e, u = undefined) => {
    if (chatMessage === 'server letmein') {
      socket.on('server', (data) => {
        if (data.text === 'are you on' || data.from === 'online') {
          socket.emit('online', {
            text: 'online',
            from: 'server',
            to: 'online',
            state: 'sent',
          });
        } else setMessages((messages) => [...messages, data]);
      });
      socket.emit('server', {
        text: 'letmeon',
        from: 'server',
        to: 'onlineState',
        state: 'sent',
      });
      const chatInput = document.getElementById('chatInput');
      setAdmin(true);
      chatInput.value = ' ';
      return;
    }

    try {
      // const ms = chatMessage.split(" ");
      if (
        chatMessage.includes('my full name is:') &
        (chatMessage.length >= 14)
      ) {
        setUserName(chatMessage.split(': ')[1]);
        socket.on(chatMessage.split(': ')[1], (data) => {
          setMessages((messages) => [...messages, data]);
        });

        setMessages([
          ...messages,
          {
            text: `Welcome ${chatMessage.split(': ')[1]}`,
            from: 'server',
            to: `${chatMessage.split(':')[1]}`,
            state: 'sent',
          },
        ]);
      } else if (userName !== 'user') {
        socket.emit('client', {
          text: chatMessage,
          from: userName,
          to: 'server',
          state: 'sent',
        });

        setMessages((messages) => [
          ...messages,
          {
            text: chatMessage,
            from: userName,
            to: 'server',
            state: 'sent',
          },
        ]);
      } else if (admin == true && u !== undefined) {
        if (chatMessage == 'server letmeoff') {
          socket.emit('server', {
            text: 'letmeoff',
            from: 'server',
            to: 'onlineState',
            state: 'sent',
          });
        } else {
          socket.emit('client', {
            text: chatMessage,
            from: 'server',
            to: u,
            state: 'sent',
          });
          setMessages((messages) => [
            ...messages,
            {
              text: chatMessage,
              from: 'server',
              to: u,
              state: 'sent',
            },
          ]);
        }

        const chatInput = document.getElementById(`chatInput${u}`);

        chatInput.value = ' ';
      } else {
        setMessages([
          ...messages,
          {
            text: 'Please name your self',
            from: 'server',
            to: 'user',
            state: 'sent',
          },
        ]);
      }
      const chatInput = document.getElementById('chatInput');
      chatInput.value = ' ';
    } catch (error) {
      // alert("write your name after ':' ");
      console.log(error);
    }
  };
  const getUserGeolocation = () => {
    navigator.permissions.query({ name: 'geolocation' });

    navigator.geolocation.getCurrentPosition((position) => {
      setUserCoords([position.coords.longitude, position.coords.latitude]);
    });
  };
  useEffect(() => {
    openChat === true && getUserGeolocation();
  }, [openChat]);
  // useEffect(() => {
  //   userCoords.length > 0 &&
  // },[])
  // useEffect(() => {
  //   socket.on(userName, (data) => {
  //     alert(data.text);
  //   });
  // }, [socket]);
  return (
    <>
      {admin && (
        <BsDot
          style={{
            position: 'fixed',
            top: '550px',
            left: '64px',
            color: 'red',
            fontSize: '100px',
            cursor: 'pointer',
          }}
          onClick={() => {
            socket.emit('online', {
              text: 'offline',
              from: 'server',
              to: 'online',
              state: 'sent',
            });
            setAdmin(false);
          }}
        />
      )}
      {admin ? (
        onlineUser?.map(
          (u) =>
            u != 'server' && (
              <div
                draggable={true}
                key={u}
                id={u.replace(' ', '_')}
                className={`w-40  transition-all duration-1000 ${
                  serverOpenChat.filter((el) => el.user == u)[0]?.open !=
                    false &&
                  document
                    .querySelector(`#${u.replace(' ', '_')}`)
                    ?.getBoundingClientRect().top >= 300
                    ? 'mt-[-15rem]'
                    : 'mt-0'
                }  text-black flex flex-col items-start fixed right-16 bottom-5`}
                onMouseDown={(e) => handleServerMouseDown(e, u)}
                // onTouchStart={(e) => serverChatTouchHandle(e, u)}
                style={{
                  position: 'fixed',
                  left: serverElementPosition.filter((el) => el.user == u)[0]
                    ?.x,
                  // ? serverElementPosition[index].x
                  // : 40,
                  top: serverElementPosition.filter((el) => el.user == u)[0]?.y,
                  // ? serverElementPosition[index].y
                  // : 570,
                }}
              >
                <div
                  className={`w-52 cursor-pointer flex items-center
           shadow-[0_0_10px] shadow-black
          bg-gradient-to- from-[#3e065f] to-black transition-background duration-1000
           ${
             isOpacity | serverOpenChat.filter((el) => el.user == u)[0]?.open
               ? 'bg-white text-black'
               : 'bg-transparent text-white'
           } rounded-t-lg h-8 justify-start
           pr-2
           `}
                >
                  <div className='flex w-52 items-center justify-start  h-8'>
                    <BsDot
                      style={{
                        color: 'green',
                        fontSize: '50px',
                      }}
                    />
                    {u}
                  </div>
                  {serverOpenChat.filter((el) => el.user == u)[0]?.open ? (
                    <BsArrowDownCircle
                      onClick={() => {
                        setServerOpenChat([
                          ...serverOpenChat.filter((el) => el.user != u),
                          { user: u, open: false },
                        ]);
                      }}
                      onTouchStart={() => {
                        setServerOpenChat([
                          ...serverOpenChat.filter((el) => el.user != u),
                          { user: u, open: false },
                        ]);
                      }}
                      style={{
                        color: 'inhert',
                        fontSize: '20px',
                        marginLeft: '5px',
                      }}
                    />
                  ) : (
                    <BsArrowUpCircle
                      onClick={() =>
                        setServerOpenChat([
                          ...serverOpenChat.filter((el) => el.user != u),
                          { user: u, open: true },
                        ])
                      }
                      onTouchStart={() => {
                        setServerOpenChat([
                          ...serverOpenChat.filter((el) => el.user != u),
                          { user: u, open: false },
                        ]);
                      }}
                      style={{
                        color: 'inhert',
                        fontSize: '20px',
                        marginLeft: '5px',
                      }}
                    />
                  )}
                  <FaTimes
                    style={{
                      color: 'inhert',
                      fontSize: '20px',
                      marginLeft: '5px',
                    }}
                    onClick={() =>
                      setOnlineUser(onlineUser.filter((el) => el !== u))
                    }
                  />
                </div>
                <div
                  className={`transition-all duration-300
           ${
             serverOpenChat.filter((el) => el.user == u)[0]?.open
               ? ' border-l-2 flex flex-col h-60  w-52 bg-[#3e065f`]  bg-white messages-chat'
               : 'h-0 bg-transparent border-l-0'
           }`}
                >
                  {messages
                    ?.filter((m) => (m.from == u) | (m.to == u))
                    .map((m, index) =>
                      m.state === 'sent' ? (
                        <div
                          key={index}
                          className={
                            serverOpenChat.filter((el) => el.user == u)[0]?.open
                              ? 'sent flex'
                              : 'hidden'
                          }
                        >
                          {m.text}
                        </div>
                      ) : (
                        <div
                          key={index}
                          className={
                            serverOpenChat.filter((el) => el.user == u)[0]?.open
                              ? 'flex'
                              : 'hidden'
                          }
                        >
                          {m.text}
                        </div>
                      )
                    )}
                </div>
                {serverOpenChat.filter((el) => el.user == u)[0]?.open ? (
                  <div className='w-52'>
                    <input
                      className='w-40 rounded-sm border-[1px] z-[1001] text-black border-black'
                      name='message'
                      type='text'
                      id={`chatInput${u}`}
                      onClick={(e) => {
                        e.target.focus();
                        // console.log('hello');
                      }}
                      placeholder={userName === 'user' ? 'name' : 'message'}
                      onChange={(e) => {
                        setChatMessage(e.target.value);
                      }}
                    />
                    <button
                      onClick={(e) => {
                        sendMessage(e, u);
                        document.querySelector(`#chatInput${u}`).focus();
                      }}
                      className='w-12  bg-gradient-to-  from-violet-900 to-black bg-white'
                    >
                      Send
                    </button>
                  </div>
                ) : null}
              </div>
            )
        )
      ) : (
        <div
          id='chat'
          draggable={true}
          onMouseDown={!openChat && handleMouseDown}
          onTouchStart={handleTouch}
          style={{
            position: 'fixed',
            left: position.x,
            top: position.y,
          }}
          className={`w-40  transition-all duration-1000 ${
            openChat &&
            document.querySelector('#chat')?.getBoundingClientRect().top >= 300
              ? 'mt-[-15rem]'
              : 'mt-0'
          }  text-black flex flex-col items-start fixed right-16 bottom-5`}
        >
          <div
            className={`w-52 cursor-pointer flex items-center
           shadow-[0_0_10px] shadow-black z-[1000]
          bg-gradient-to- from-[#3e065f] to-black transition-background duration-1000
           ${
             isOpacity | openChat
               ? 'bg-white text-black'
               : 'bg-transparent text-white'
           } rounded-t-lg h-8 justify-start
           pr-2
           `}
          >
            {mohamed == true ? (
              <div className='flex w-52 items-center justify-start  h-8'>
                <BsDot
                  style={{
                    color: 'green',
                    fontSize: '50px',
                  }}
                />
                online
              </div>
            ) : (
              <div className='flex w-52 items-center justify-start  h-8'>
                <BsDot
                  style={{
                    color: 'red',
                    fontSize: '50px',
                  }}
                />
                offline
              </div>
            )}
            {openChat ? (
              <BsArrowDownCircle
                onClick={() => {
                  setOpenChat(!openChat);
                }}
                onTouchStart={() => {
                  setOpenChat(!openChat);
                }}
                style={{
                  color: 'inhert',
                  fontSize: '20px',
                  marginLeft: '5px',
                }}
              />
            ) : (
              <BsArrowUpCircle
                onClick={() => setOpenChat(!openChat)}
                onTouchStart={() => {
                  setOpenChat(!openChat);
                }}
                style={{
                  color: 'inhert',
                  fontSize: '20px',
                  marginLeft: '5px',
                }}
              />
            )}
          </div>
          <div
            id='chatContainer'
            className={`transition-all duration-300
           ${
             openChat
               ? ' shadow-[-5px_0_20px_black]  flex flex-col h-60 w-52 bg-[#3e065f`] bg-white messages-chat'
               : 'h-0 bg-transparent border-l-0'
           }`}
          >
            <div className={openChat ? 'flex' : 'hidden'}>
              What is your name ?
            </div>
            {userName === 'user' && (
              <button
                onClick={clientName}
                className={`${
                  openChat ? 'flex' : 'hidden'
                } border-black border-[1px] w-24 bg-none`}
              >
                Click me{' '}
              </button>
            )}
            {messages?.map((m, index) =>
              m.state === 'sent' ? (
                <div key={index} className={openChat ? 'sent flex' : 'hidden'}>
                  {m.text}
                </div>
              ) : (
                <div key={index} className={openChat ? 'flex' : 'hidden'}>
                  {m.text}
                </div>
              )
            )}
          </div>
          {openChat ? (
            <div className='w-52'>
              <input
                className='w-40 rounded-sm border-[1px] z-[10001] text-black border-black'
                name='message'
                type='text'
                onClick={(e) => {
                  e.target.focus();
                  // console.log('hello');
                }}
                id='chatInput'
                placeholder={userName === 'user' ? 'name' : 'message'}
                onChange={(e) => {
                  setChatMessage(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  sendMessage();
                  const el = document.querySelector(`#chatContainer`);
                  el.scrollTop = el.scrollHeight;

                  document.querySelector(`#chatInput`).focus();
                }}
                className='w-12  bg-gradient-to-  from-violet-900 to-black bg-white'
              >
                Send
              </button>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
};

export default Chat;
