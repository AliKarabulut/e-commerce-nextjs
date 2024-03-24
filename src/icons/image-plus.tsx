type ImagePlusProps = {
  className?: string
  size?: number
}

const ImagePlus = ({ className, size = 20 }: ImagePlusProps) => {
  return (
    <svg
      {...{ className }}
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M15 8h.01" />
      <path d="M12.5 21h-6.5a3 3 0 0 1 -3 -3v-12a3 3 0 0 1 3 -3h12a3 3 0 0 1 3 3v6.5" />
      <path d="M3 16l5 -5c.928 -.893 2.072 -.893 3 0l4 4" />
      <path d="M14 14l1 -1c.67 -.644 1.45 -.824 2.182 -.54" />
      <path d="M16 19h6" />
      <path d="M19 16v6" />
    </svg>
  )
}

export default ImagePlus