import Messages from '@/components/messages/messages';

// export const revalidate = 5;
// export const dynamic = 'force-dynamic'; // === cache: 'no-store'

export default async function MessagesPage() {
  const response = await fetch('http://localhost:8081/messages', {
    cache: 'no-store',
    next: {
      tags: ['msg']
    }
  });
  const messages = await response.json();

  if (!messages || messages.length === 0) {
    return <p>No messages found</p>;
  }

  return <Messages messages={messages} />;
}
