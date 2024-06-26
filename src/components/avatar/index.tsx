import Image from 'next/image'

type AvatarProps = {
  name?: string
  src?: string
  alt?: string
}

const Avatar = ({ src, name, alt }: AvatarProps) => {
  const getInitials = (name: string) => {
    const names = name.split(' ')
    if (names.length === 1) {
      return names[0].slice(0, 2).toUpperCase()
    } else {
      return names
        .map(n => n[0])
        .join('')
        .toUpperCase()
    }
  }
  return (
    <>
      {src ? (
        <Image
          width={32}
          height={32}
          className="avatar-image"
          src={src}
          alt={alt ? alt : name || 'avatar'}
          title={name || 'avatar'}
          aria-placeholder={alt ? alt : name || 'avatar'}
        />
      ) : (
        <div className="avatar-name">{name && getInitials(name)}</div>
      )}
    </>
  )
}

export default Avatar
