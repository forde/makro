import Link from 'next/link'
import dayjs from 'dayjs'
import ReactMarkdown from 'react-markdown'

export default function RecepieContent({ recepie }) {

    const createdAt = typeof recepie?.createdAt === 'number' ? new Date(recepie.createdAt) : recepie.createdAt.toDate()

    return(
        <>
            <h1 className="bold mb-24">{recepie?.title}</h1>
            <small className="mb-32">
                <span className="mr-8">by <AuthorLink username={recepie.username}/></span>
                <span className="mr-8">on {dayjs(createdAt).format('DD-MM-YYYY HH:mm:ss')}</span>
                <span>❤️‍ {recepie?.heartCount}</span>
            </small>
            <ReactMarkdown>{recepie?.content}</ReactMarkdown>
        </>
    )
}

function AuthorLink({ username }) {
    return(
        <Link href={`/[username]`} as={`/${username}`}>
            <a className="purple">@{username}</a>
        </Link>
    )
}