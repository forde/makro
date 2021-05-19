import Link from 'next/link';

import Button from '~/components/Button'

export default function Custom404() {
    return (
        <main className="container flex-center">
            <div className="card  flex-center">
                <iframe
                    src="https://giphy.com/embed/l2JehQ2GitHGdVG9y"
                    width="480"
                    height="362"
                    frameBorder="0"
                    className="mb-32"
                    allowFullScreen
                ></iframe>
                <h1 className="bold mb-32">Nic tu nie ma (404)</h1>
                <Link href="/">
                    <a><Button className="btn-blue" size="small">Główna</Button></a>
                </Link>
            </div>
        </main>
    )
}