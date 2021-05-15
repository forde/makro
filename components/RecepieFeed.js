import { truncate } from '~/lib/helpers'
import Link from 'next/link'

export default function RecepieFeed({ recepies, admin }) {
    return (recepies || []).map(rec => <RecepieItem recepie={rec} key={rec.slug} admin={admin} />)
}

function RecepieItem({ recepie, admin }) {
    console.log(recepie)
    return(
        <Link href={`/[username]/[slug]`} as={`/${recepie.username}/${recepie.slug}`}>
            <a>
                <div className="card mb-32">
                    <h3 className="bold mb-16">{recepie.title}</h3>
                    <p className="label">{truncate(recepie.content, 70)}</p>
                </div>
            </a>
        </Link>
    )
}