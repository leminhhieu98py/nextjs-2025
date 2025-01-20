import MessageHeader from '@/components/messages/header';
import { PropsWithChildren } from 'react';
import './globals.css';

export default async function MessagesLayout({ children }: PropsWithChildren) {
  const response = await fetch('http://localhost:8081/messages', {
    cache: 'no-store'
  });
  const messages = await response.json();
  const totalMessages = messages.length;

  return (
    <>
      <MessageHeader />
      <h1>Important Messages</h1>
      <p>{totalMessages} messages found</p>
      <hr />
      {children}
    </>
  );
}
