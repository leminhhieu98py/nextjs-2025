import Messages from '@/components/messages/messages';
import { getMessages } from '@/service/messages/services';

// export const revalidate = 5;
// export const dynamic = 'force-dynamic'; // === cache: 'no-store'

export default async function MessagesPage() {
  const messages = await getMessages();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
