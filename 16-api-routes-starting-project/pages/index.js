import { useRef } from 'react';

function HomePage() {
  const emailRef = useRef(null);
  const feedbackRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();

    const email = emailRef.current.value;
    const feedback = feedbackRef.current.value;

    fetch('/api/feedback', {
      method: 'POST',
      body: JSON.stringify({
        email,
        feedback
      }),
      headers: {
        'Content-Type': 'Application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form id="auth-form" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input ref={emailRef} type="email" name="email" id="email" />
        </p>
        <p>
          <label htmlFor="feedback">Feedback</label>
          <textarea ref={feedbackRef} name="feedback" id="feedback" />
        </p>
        <p>
          <button type="submit">Send feedback</button>
        </p>
      </form>
    </div>
  );
}

export default HomePage;
