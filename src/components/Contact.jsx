import React, { forwardRef } from 'react';
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
  box-shadow: 0px 3px 5px gray;
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
`;

const InputText = styled.textarea`
  max-height: 100px;
  font-size: 16px;
  width: 95%;

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
        },
        (error) => console.log(error.text)
      );
  };
  return (
    <Container ref={ref}>
      <Title>Send Email</Title>
      <ContactWrapper>
        <ContactForm onSubmit={(e) => sendEmail(e)}>
          <Input placeholder='name' name='name' />
          <Input placeholder='email' name='email' />
          <Input placeholder='subject' name='subject' />
          <InputText placeholder='Message' name='message' />
          <Button>send</Button>
        </ContactForm>
      </ContactWrapper>
    </Container>
  );
});

export default Contact;
