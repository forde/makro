import { styled, keyframes } from '@stitches/react'

export default function Modal({ children, onCloseRequest, className }) {
    return (
        <Wrapper id="modal" onClick={e => onCloseRequest && e.target.id === 'modal' ? onCloseRequest() : null}>
            <div>
                <ModalEl className={`shadow p-32 ${className || ''}`} id="modal-window" >
                    {children}
                </ModalEl>
            </div>
        </Wrapper>
    )
}

const Wrapper = styled('div', {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    background: 'rgba(0,0,0,.48)',
    zIndex: '99999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: `url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABGdBTUEAALGPC/xhBQAAAQBJREFUSA2tldENgjAQQIkJI8AejuAE/jML/25jHMT45QYO4AIm+K56eiS00F4vuVwJ6XttaWnTfGOapp22a1TlBSgPR6BXal8JPsI5w2sbMZE3UuJOuiT0HwVEvMhDGDCNnhS4RLGEvhY+zFaDly5JEq6mUskmeKkkC54rKYJvlbjga5Iq8ITkhEBC9vl8K2qn3ArIbuG6cB0MVB25CB6k68QrN1Rg9oQKXKL4xKfgA2C7XD4JMDvy3wetIonBdXouyRo8Ien0XbRuhStgYSZxSS48S1IKN5IOhr20/jPxwpMS4HInX8gq/xY4ek6etPdBTqMlPxe0DsdRYclyBfgbXpalja44wn4AAAAASUVORK5CYII='), auto`,
})

const ModalEl = styled('div', {
    background: '#fff',
    width: '760px',
    maxWidth: '90vw',
    maxHeight: '90vh',
    cursor: 'default',
    position: 'relative',
    overflow: 'auto',
    borderRadius: '12px',
    '-webkit-overflow-scrolling': 'touch',
    '-ms-overflow-style': '-ms-autohiding-scrollbar',
    '&::-webkit-scrollbar': {
        display: 'none',
    }
})
