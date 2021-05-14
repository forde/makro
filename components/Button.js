import { styled } from '@stitches/react'
import { colors } from '~/styles'

export default function Button({ children, ...rest }) {
    return <Component {...rest}>{children}</Component>
}

const Component = styled('button', {
    backgroundColor: colors.purple,
    border: `3px solid ${colors.purple}`,
    color: 'white',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
    height: '54px',
    padding: '15px 15px',
    position: 'relative',

    variants: {
        theme: {
            tertiary: {
                backgroundColor: 'white',
                color: colors.text,
                border: `3px solid ${colors.bg}`,
            }
        }
    }
})