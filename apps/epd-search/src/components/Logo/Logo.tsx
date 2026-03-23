import { Image, rem } from '@mantine/core'
import lcaxLogo from '@/assets/lcax.svg'
import { Link } from 'react-router'

interface LogoProps {
  height?: string
}

export const Logo = ({ height = rem(50) }: LogoProps) => (
  <Link to='/'>
    <Image src={lcaxLogo} alt='logo' h={height} w='auto' />
  </Link>
)
