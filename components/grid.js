import { styled } from '@stitches/react'

const colNum = 12

const colGap = 16 // px

const trim2 = val =>  parseInt(val * 100)/100

export const Row = styled('div', {
    display: 'flex',
    width: `calc(100% + ${colGap}px)`,
    marginLeft: `-${trim2(colGap/2)}px`,
    marginRight: `-${trim2(colGap/2)}px`,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
})

const getWidth = (width, index) => {
    const cols = Array.isArray(width) ? (width[index] || width) : width
    return { width: `calc(${trim2((100/colNum)*cols)}% - 16px)` }
}

export const Col = ({ width, children }) => {

    const Column = styled('div', {
        marginLeft: `${trim2(colGap/2)}px`,
        marginRight: `${trim2(colGap/2)}px`,
        border: '1px dotted red',
        ...getWidth(width, 0),
        marginBottom: '16px',
        '@media (min-width: 768px) and (max-width: 1024px)': {
            ...getWidth(width, 1)
        },
        '@media(max-width: 767px)': {
            ...getWidth(width, 2)
        }
    })

    return <Column>{children}</Column>
}

/**
 * Example:
 * <Row>
 *      <Col width={[3,6,12]}> 3 col. on desktop / 6 on tablet / 12 on mobile </Col>
 *      <Col width={[3,6,12]}> 3 col. on desktop / 6 on tablet / 12 on mobile </Col>
 *      <Col width={[6,12,12]}> 6 col. on desktop / 12 on tablet / 12 on mobile </Col>
 * </Row>
 */