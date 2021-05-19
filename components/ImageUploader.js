import { useState } from 'react'
import { auth, storage, STATE_CHANGED } from '~/lib/firebase'
import Loader from '~/components/Loader'
import { BsImage } from 'react-icons/bs'
import { styled } from '@stitches/react'
import { colors } from '~/styles'

// Uploads images to Firebase Storage
export default function ImageUploader({ onDownloadUrlReady }) {

    const [uploading, setUploading] = useState(false)
    const [progress, setProgress] = useState(0)
    const [downloadURL, setDownloadURL] = useState(null)

    // Creates a Firebase Upload Task
    const uploadFile = async (e) => {
        // Get the file
        const file = Array.from(e.target.files)[0]
        const extension = file.type.split('/')[1]

        // Makes reference to the storage bucket location
        const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`)
        setUploading(true)

        // Starts the upload
        const task = ref.put(file)

        // Listen to updates to upload task
        task.on(STATE_CHANGED, (snapshot) => {
        const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0)
        setProgress(pct)

        // Get downloadURL AFTER task resolves (Note: this is not a native Promise)
        task
            .then((d) => ref.getDownloadURL())
            .then((url) => {
                setDownloadURL(url)
                setUploading(false)
                onDownloadUrlReady(url)
            })
        })
    }

    return (
        <div className="box">
            <Loader visible={uploading} />
            {uploading && <h3 className="pt-8">{progress}%</h3>}

            {!uploading && (
                <label className="btn">
                    <Icon className="icon-l clickable" />
                    <input type="file" onChange={uploadFile} accept="image/x-png,image/gif,image/jpeg" />
                </label>
            )}

            {/*downloadURL && <code className="upload-snippet">{`![alt](${downloadURL})`}</code>*/}
        </div>
    )
}

const Icon = styled(BsImage, {
    background: '#fff',
    border: '3px solid #fff',
    borderRadius: '6px',
    borderTop: 'none',
    borderBottom: 'none',
    width: '36px',
    height: '33px',
    cursor: 'pointer',
    color: colors.text,
    '&:hover': {
        color: colors.accent,
    },
})
