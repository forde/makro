import Link from 'next/link';

import Button from '~/components/Button'

export default function Custom404() {
    return (
        <main className="container flex-center card">
            <h1 className="bold mb-48 pt-24">404 - That page does not seem to exist...</h1>
            <iframe
                src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
                width="480"
                height="362"
                frameBorder="0"
                className="mb-48"
                allowFullScreen
            ></iframe>
            <Link href="/">
                <Button className="btn-blue mb-24">Go home</Button>
            </Link>
        </main>
    )
}