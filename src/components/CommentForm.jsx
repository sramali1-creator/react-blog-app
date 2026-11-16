import { useState } from 'react';

function CommentForm({ postId, onCommentAdded }) {
  const [name, setName] = useState('');
  const [body, setBody] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [success, setSuccess] = useState('');

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required.';
    if (!body.trim()) newErrors.body = 'Comment cannot be empty.';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setSubmitError('');

    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    setSubmitting(true);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${postId}/comments`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json; charset=UTF-8' },
          body: JSON.stringify({
            postId: Number(postId),
            name: name.trim(),
            body: body.trim(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const newComment = await response.json();
      // JSONPlaceholder returns the same fake id for every new comment,
      // so add a unique key for rendering.
      onCommentAdded({ ...newComment, clientKey: `new-${Date.now()}` });

      setName('');
      setBody('');
      setSuccess('Comment posted successfully!');
    } catch (err) {
      console.error('Error posting comment:', err);
      setSubmitError('Sorry, your comment could not be posted. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit} noValidate>
      <h3>Leave a Comment</h3>

      <label htmlFor="name">Name</label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name"
        className={errors.name ? 'invalid' : ''}
      />
      {errors.name && <span className="field-error">{errors.name}</span>}

      <label htmlFor="body">Comment</label>
      <textarea
        id="body"
        rows="4"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Write your comment..."
        className={errors.body ? 'invalid' : ''}
      />
      {errors.body && <span className="field-error">{errors.body}</span>}

      {submitError && <div className="error-box">{submitError}</div>}
      {success && <div className="success-box">{success}</div>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Posting...' : 'Post Comment'}
      </button>
    </form>
  );
}

export default CommentForm;
