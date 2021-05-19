import { styled } from '@stitches/react'
import { colors } from '~/styles'

export default function Button({ children, disabled, onClick, ...rest }) {
    return <Component {...rest} disabled={disabled} onClick={() => (!onClick || disabled) ? null : onClick()}>{children}</Component>
}

const Component = styled('button', {
    backgroundColor: colors.accent,
    border: `3px solid ${colors.accent}`,
    color: 'white',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: 'bold',
    height: '54px',
    padding: '15px 15px',
    position: 'relative',

    variants: {
        theme: {
            white: {
                backgroundColor: 'white',
                color: colors.text,
                border: `3px solid ${colors.bg}`,
            },
        },
        size: {
            small: {
                fontSize: '16px',
                fontWeight: 'bold',
                height: '42px',
                padding: '10px 12px',
            }
        },
        disabled: {
            true: {
                backgroundColor: colors.gray,
                borderColor: colors.gray,
                cursor: 'default',
            }
        }
    }
})