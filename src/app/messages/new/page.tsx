import { addMessage } from '@/service/messages/services';
import { revalidateTag } from 'next/cache';
import { redirect } from 'next/navigation';

/* eslint-disable @typescript-eslint/ban-ts-comment */
export default function NewMessagePage() {
  // @ts-ignore
  async function createMessage(formData) {
    'use server';

    const message = formData.get('message');
    addMessage(message);
    // revalidatePath('/', 'layout'); // clear cache all routes cache
    revalidateTag('msg'); // clear all fetch with tag `msg`
    redirect('/messages');
  }

  return (
    <>
      <h2>New Message</h2>
      <form action={createMessage}>
        <p className="form-control">
          <label htmlFor="message">Your Message</label>
          <textarea id="message" name="message" required rows={5} />
        </p>

        <p className="form-actions">
          <button type="submit">Send</button>
        </p>
      </form>
    </>
  );
}
