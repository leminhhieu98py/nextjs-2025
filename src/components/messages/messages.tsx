type Props = {
  /* eslint-disable @typescript-eslint/no-explicit-any */
  messages: any[];
};

export default function Messages({ messages }: Props) {
  return (
    <ul className="messages">
      {messages.map((message) => (
        <li key={message.id}>{message.text}</li>
      ))}
    </ul>
  );
}
