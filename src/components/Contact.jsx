import React, { forwardRef, useRef, useState } from 'react';
import styled from 'styled-components';
import emailjs from 'emailjs-com';

const Container = styled.div`
  display: flex;
  /* background: linear-gradient(to bottom, white 0, #3e065f 100%); */
  background: radial-gradient(circle at center, white 0, white 100%);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #f7e7e6;
  position: relative;

  padding: 10px 20px;
`;
const Title = styled.h1`
  font-weight: 500;
  font-size: 40px;
  color: white;
  background: linear-gradient(to bottom, black 0, #3e065f 100%);
  width: 400px;
  box-shadow: 0px 3px 5px gray;

  @media screen and (max-width: 500px) {
    width: 200px;
  }
`;
const ContactWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* box-shadow: 0px 3px 5px gray; */
  height: 350px;
  min-width: 200px;
  width: 400px;
  @media screen and (max-width: 500px) {
    width: 200px;
  }
`;

const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 100%;
`;
const Input = styled.input`
  border: 1px solid gray;
  font-size: 16px;
  width: 300px;
  @media screen and (max-width: 500px) {
    width: 170px;
  }
`;

const InputText = styled.textarea`
  max-height: 100px;
  font-size: 16px;
  width: 300px;
  @media screen and (max-width: 500px) {
    width: 170px;
  }
  border: 1px solid gray;
`;
const Button = styled.button`
  margin-top: 20px;
  /* margin-bottom: 100px; */
  height: 50px;
  width: 100px;
  align-self: center;
  justify-content: center;
  background: none;
  color: black;
  border-color: black;
  cursor: pointer;
  box-shadow: 0 0 10px black;
  &:hover {
    box-shadow: 0 0 5px #712b75;
  }
`;
const Contact = forwardRef((props, ref) => {
  const name = useRef(null);
  const email = useRef(null);
  const subject = useRef(null);
  const message = useRef(null);
  const [sentMessage, setSentMessage] = useState(false);
  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm(
        'service_ltv3ip4',
        'template_dd2ehzm',
        e.target,
        'Tbzka54qsStELY1S3'
      )
      .then(
        (result) => {
          console.log(result.text);
          name.current.value = '';
          email.current.value = '';
          subject.current.value = '';
          message.current.value = '';
          setSentMessage(true);
          setTimeout(() => {
            setSentMessage(false);
          }, 3000);
        },
        (error) => console.log(error.text)
      );
  };
  return (
    <Container ref={ref}>
      <Title>Send Email</Title>
      <ContactWrapper>
        <ContactForm onSubmit={(e) => sendEmail(e)}>
          <Input ref={name} placeholder='name' name='name' />
          <Input ref={email} placeholder='email' name='email' />
          <Input ref={subject} placeholder='subject' name='subject' />
          <InputText ref={message} placeholder='Message' name='message' />
          <Button>send</Button>
        </ContactForm>
      </ContactWrapper>
      <div
        className={`transition-all duration-[3000ms] ${
          sentMessage ? 'opacity-100' : 'opacity-0'
        } fixed top-[48%] left-[0] flex w-full justify-center`}
      >
        <h1 className='p-4 bg-black text-white'>
          Message has been Sent, I will reply as soon as I can
        </h1>
      </div>
    </Container>
  );
});

export default Contact;
