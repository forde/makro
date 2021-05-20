import { styled } from '@stitches/react'
import { colors } from '~/styles'

export default function Component({ value, onChange=()=>null, suffix, onEnter, className, ...rest }) {
    return(
        <>
            <Wrapper className={className}>
                <Input
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    className="shadow"
                    onKeyPress={e => (onEnter && e.key === 'Enter') ? onEnter() : null}
                    onFocus={e => e.target.select()}
                    {...rest}
                />
                {suffix && <span className="suffix">{suffix}</span>}
                {onEnter &&
                    <svg width="34px" height="28px" viewBox="0 0 484.5 484.5" >
                        <polygon fill={colors.gray} points="433.5,114.75 433.5,216.75 96.9,216.75 188.7,124.95 153,89.25 0,242.25 153,395.25 188.7,359.55 96.9,267.75 484.5,267.75 484.5,114.75 "/>
                    </svg>
                }
            </Wrapper>
        </>
    )
}

const Wrapper = styled('div', {
    position: 'relative',
    svg: {
        position: 'absolute',
        top: '52%',
        right: '16px',
        transform: 'translateY(-50%)'
    },
    '.suffix': {
        position: 'absolute',
        right: '16px',
        top: '50%',
        transform: 'translateY(-50%)',
    },
})

const Input = styled('input', {
    height: '54px',
    border: '3px solid white',
    background: '#fff',
    outline: 'none',
    borderRadius: '12px',
    padding: '16px 16px 15px',
    fontSize: '17px',
    lineHeight: 1,
    boxShadow: '0 6px 24px rgba(0,0,0,.06), 0 2px 6px rgba(31,26,34,.06), 0 0 0 50px white inset!important',
    backgroundImage: '-webkit-linear-gradient(hsla(0,0%,100%,0), hsla(0,0%,100%,0))!important',
    color: colors.text,
    transition: 'all .2s ease-in-out',
    '&::placeholder': {
        color: colors.gray,
        opacity: 1,
    },
    '&:focus': {
        border: `3px solid ${colors.accent}`,
    },
    '&:hover': {

    },
    '&:read-only': {

    },
    '&:disabled': {
        opacity: '.5',
    },
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
    },

    variants: {
        theme: {
            flat: {
                border: `3px solid ${colors.bg}`,
                boxShadow: 'none!important',
            }
        }
    }
})