type MailIconProps = {
  className?: string;
};

const MailIcon: React.FC<MailIconProps> = ({ className }) => (
  <svg
    {...{ className }}
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    strokeWidth="1.2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
    <path d="M3 7l9 6l9 -6"></path>
  </svg>
);

export default MailIcon;