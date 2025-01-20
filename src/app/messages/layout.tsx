import MessageHeader from '@/components/messages/header';
import { PropsWithChildren } from 'react';
import './globals.css';
import { getMessages } from '@/service/messages/services';

// export const revalidate = 5;
// export const dynamic = 'force-dynamic' // === cache: 'no-store'

export default function MessagesLayout({ children }: PropsWithChildren) {
  const messages = getMessages();
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
