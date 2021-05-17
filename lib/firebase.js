import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBZr19U_gb7OLS6dOJPbtRgRXD6tNBnuQQ",
    authDomain: "makro-1431c.firebaseapp.com",
    projectId: "makro-1431c",
    storageBucket: "makro-1431c.appspot.com",
    messagingSenderId: "127474371519",
    appId: "1:127474371519:web:999293c511e672712faf0a",
    measurementId: "G-4TCJM34YXB"
}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()
export const storage = firebase.storage()
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export const fromMillis = firebase.firestore.Timestamp.fromMillis

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserByUsername(username) {
    const usersRef = firestore.collection('users')
    const query = usersRef.where('username', '==', username).limit(1)
    const userDoc = (await query.get()).docs[0]
    return userDoc
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function docToJson(doc) {
    const data = doc.data()

    /*const ingredients = await Promise.all(data.ingredients.map(async ing => {
        const ingredient = (await ing.ingredient.get()).data()
        return {
            ammount: ing.ammount,
            ingredient: ingredient
        }
    }))*/

    return {
        ...data,
        // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
        createdAt: data.createdAt.toMillis(),
        updatedAt: data.updatedAt.toMillis(),
        ingredients: []
    }
}