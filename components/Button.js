import { styled } from '@stitches/react'
import { colors } from '~/styles'

export default function Button({ children, ...rest }) {
    return <Component {...rest}>{children}</Component>
}

const Component = styled('button', {
    backgroundColor: colors.purple,
    color: 'white',
    borderRadius: '12px',
    fontSize: '17px',
    padding: '10px 15px',
    position: 'relative',
})