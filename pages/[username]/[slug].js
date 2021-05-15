import { firestore, getUserByUsername, docToJson } from '~/lib/firebase'
import RecepieContent from '~/components/RecepieContent'
import { useDocumentData } from 'react-firebase-hooks/firestore'

export default function Recepie(props) {

    const recepieRef = firestore.doc(props.path)
    const [ realtimeRecepie ] = useDocumentData(recepieRef)

    const recepie = realtimeRecepie || props.recepie

    console.log(recepie);

    return (
        <div className="container">
            <RecepieContent recepie={recepie} />
        </div>
    )
}

export async function getStaticProps({ params }) {
    const { username, slug } = params
    const userDoc = await getUserByUsername(username)

    let recepie
    let path

    if(userDoc) {
        const recepieRef = userDoc.ref.collection('recepies').doc(slug)
        recepie = docToJson(await recepieRef.get())
        path = recepieRef.path
    }

    return {
        props: { recepie, path },
        revalidate: 5000,
    }
}

export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await firestore.collectionGroup('recepies').get()

    const paths = snapshot.docs.map((doc) => {
        const { slug, username } = doc.data()
        return {
            params: { username, slug },
        }
    })

    return {
        paths,
        fallback: 'blocking',
    }
}