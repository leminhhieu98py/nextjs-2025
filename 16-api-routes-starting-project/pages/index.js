import { useEffect, useRef, useState } from 'react';

function HomePage() {
  const emailRef = useRef(null);
  const feedbackRef = useRef(null);
  const [feedbacks, setFeedbacks] = useState([]);

  const getFeedbacks = async () => {
    fetch('/api/feedback')
      .then((res) => res.json())
      .then((data) => setFeedbacks(data.data));
  };

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
      .then(getFeedbacks);
  }

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <>
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
      <hr />
      <div>
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.id}>
              <p>From: {feedback.email}</p>
              <p>{feedback.feedback}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default HomePage;
