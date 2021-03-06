import { styled, keyframes } from '@stitches/react'
import { colors } from '~/styles'

export default function Loader({ visible, ...rest }) {
    return visible ? <Component {...rest}/> : null
}

const spin = keyframes({
    '0%': { transform: 'rotate(0deg)' },
    '100%': { transform: 'rotate(360deg)' }
});

const Component = styled('div', {
    border: `6px solid ${colors.bg}`,
    borderTop: `6px solid ${colors.accent}`,
    borderRadius: '50%',
    width: '30px',
    height: '30px',
    animation: `${spin} 1s linear infinite`,
})