import { useState, useRef, useEffect } from 'react'
import { colors } from '~/styles'
import { onClickOutside } from '~/lib/helpers'
import { MdArrowDropDown, MdCancel } from 'react-icons/md'
import { styled } from '@stitches/react'

export default function Select(props) {

    const {
        value,
        placeholder,
        options,
        onChange,
        multiple,
        disabled,
        invalid,
        searchable,
        theme,
        ...rest
    } = props

    const isObject = x => typeof x === 'object' && x !== null

    const isEmpty = x => (!x || (Array.isArray(x) && !x.length)) ? true : false

    const [optionsVisible, setOptionsVisible] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')

    const selectWrapperRef = useRef()
    const searchInputRef = useRef()

    useEffect(() => {
        if(optionsVisible && searchInputRef?.current) searchInputRef.current.focus()
        if(!optionsVisible) setSearchQuery('')
    }, [optionsVisible])

    const onSelect = option => {

        if(disabled) return

        if(multiple) {
            onChange([...(value || []), option])
        } else {
            onChange(isObject(option) ? option.value : option)
        }
        setOptionsVisible(false)
    }

    const removeFromSelected = (e, item) => {
        if(disabled) return
        e.stopPropagation()
        setOptionsVisible(false)
        onChange(value.filter(o => o.value !== item.value))
    }

    const isSelected = option => {
        const val = isObject(option) ? option.value : option

        if(multiple) {
            return ~(value || []).map(o => o.value).indexOf(val)
        } else {
            return val === value
        }
    }

    const selectedValue = () => {

        if(searchable && optionsVisible) {
            return <input
                placeholder="Search"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="search"
                ref={searchInputRef}
            />
        }

        if(isEmpty(value) && placeholder) return placeholder

        if(Array.isArray(value)) {
            return value.map(item => {
                return(
                    <div key={item.value} className="value-item">
                        <span>
                            {item.name || item.label}
                        </span>
                        <MdCancel className="empty" onClick={e => removeFromSelected(e, item)} />
                    </div>
                )
            })
        }

        return (options.map(o => typeof o === 'string' ? { name: o, value: o } : o).filter(o => o.value === value)[0] || {}).name
    }

    onClickOutside(selectWrapperRef, () => {
        setOptionsVisible(false)
    })

    const filyterOptions = option => {
        const needle = searchQuery.trim().toLowerCase()
        const haystack = (isObject(option) ? `${option.value} ${option.name}` : option).toLowerCase()
        if(needle) return ~haystack.indexOf(needle)

        if(multiple) return !~(value || []).map(i => i.value).indexOf(option.value)

        return true
    }

    return (
        <>
            <Wrapper ref={selectWrapperRef} {...rest} >
                <MdArrowDropDown style={{fill: disabled ? colors.gray : colors.text, transform: `rotate(${optionsVisible ? 180 : 0}deg)` }} />
                <div
                    className={[
                        `select shadow`,
                        invalid ? 'invalid' : '',
                        disabled ? 'disabled' : '',
                        theme === 'flat' ? 'flat' : '',
                        optionsVisible ? 'options-visible' : '',
                        `value-${value}`,
                        (!isEmpty(value) && multiple) ? 'multiple' : null
                    ].join(' ')}
                    value={value}
                    onClick={(e) => {
                        !disabled ? setOptionsVisible(!optionsVisible) : null
                    }}
                >
                    {selectedValue()}
                </div>

                {optionsVisible &&
                    <div className="options shadow">
                        {options && options.filter(filyterOptions).map((option, i) => <div
                            key={i}
                            value={isObject(option) ? option.value : option}
                            className={['option', isSelected(option) ? 'selected' : null].join(' ')}
                            onClick={() => onSelect(option)}
                            >{isObject(option) ? option.name : option}</div>
                        )}
                    </div>
                }
            </Wrapper>
        </>
    )
}

const Wrapper = styled('div', {
    position: 'relative',
    //minWidth: '240px',
    maxWidth: '100%',

    '> svg': {
        position: 'absolute',
        top: '16px',
        zIndex: '1',
        right: '16px',
        pointerEvents: 'none',
        width: '24px',
        height: '24px',
    },

    '.select': {
        border: '3px solid transparent',
        background: '#fff',
        outline: 'none',
        borderRadius: '12px',
        fontSize: '17px!important',
        lineHeight: '1.3',
        color: colors.text,
        transition: 'border .2s ease-in-out',
        position: 'relative',
        backgroundImage: 'none',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        minHeight: '54px',
        padding: '12px 46px 14px 16px',

        '&.invalid': {
            border: `3px solid ${colors.red}`,
            boxShadow: 'none',
        },

        '&.multiple': {
            paddingLeft: '6px',
            paddingBottom: '0px',
            paddingTop: '6px',
        },

        '&.disabled': {
            color: colors.gray,
            cursor: 'default',
        },

        '&.flat': {
            border: `3px solid ${colors.bg}`,
            boxShadow: 'none!important',
        },

        '&.options-visible': {
            border: `3px solid ${colors.accent}`
        },

        '.value-item': {
            borderRadius: '12px',
            background: colors.bg,
            fontSize: '16px',
            lineHeight: '1',
            margin: '0 10px 6px 0',
            display: 'inline-flex',
            alignItems: 'center',
            padding: '6px 10px 6px 12px',
            lineHeight: '1',
            height: '36px',

            'span': {
                position: 'relative',
                top: '-1px',
            },

            '.empty': {
                cursor: 'pointer',
                marginLeft: '8px',
                '@media(pointer: fine) &:hover': {
                    path: {
                        fill: colors.red,
                    }
                }
            }
        },

        '.search': {
            padding: '0',
            fontSize: '16px',
            lineHeight: '1',
            height: 'auto',
            border: '0',
            background: 'transparent',
        },
    },

    '.options': {
        position: 'absolute',
        top: 'calc(100% + 8px)',
        width: '100%',
        //minWidth: '240px',
        left: '0',
        zIndex: '120',
        background: '#fff',
        borderRadius: '12px',
        transition: 'all .2s ease-in-out',
        maxHeight: '396px',
        overflow: 'auto',
        //-webkit-overflow-scrolling: 'touch',
        //-ms-overflow-style: '-ms-autohiding-scrollbar',

        '> .option': {
            fontSize: '15px',
            lineHeight: '1',
            minHeight: '40px',
            padding: '13px 16px 7px',
            cursor: 'pointer',
            transition: 'all .2s ease-in-out',
            textAlign: 'left',
            '&:hover': {
                '@media(pointer: fine)': {
                    background: '#f4f5f7',
                },
            },
            '&.selected': {
                color: `${colors.accent}!important`,
            }
        }
    },
})