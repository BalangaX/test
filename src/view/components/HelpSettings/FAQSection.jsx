import { faqs } from '../../../data/faq';

const FAQSection = () => (
  <div>
    <h2>FAQ</h2>
    <ul>
      {faqs.map((f, idx) => (
        <li key={idx}>
          <strong>{f.q}</strong> {f.a}
        </li>
      ))}
    </ul>
  </div>
);

export default FAQSection;
