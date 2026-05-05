import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/contact')({
  component: Contact,
});

// eslint-disable-next-line react-refresh/only-export-components
function Contact() {
  return <div>Hello "/Contact"!</div>;
}
