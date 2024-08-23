import { useState } from 'react';
import './Feedback.css';

export default function Feedback() {
    const [feedback, setFeedback] = useState('');

    return <section className="feedback">
        <h2>Feedback</h2>
        <p>We'd love to hear from you! Please send us your feedback and suggestions</p>
        <form onSubmit={e => e.preventDefault()}>
            <textarea
                id="feedback"
                name="feedback"
                rows={4}
                required
                value={feedback}
                onChange={e => setFeedback(e.target.value)}
            />
            <a
                target='_blank'
                href={`mailto:david3emmanuel@gmail.com?cc=ololade@gmail.com&subject=Climax%20Feedback&body=${feedback}`}
            >
                Submit
            </a>
        </form>
    </section>
}