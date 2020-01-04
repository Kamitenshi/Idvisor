import { postData } from "../../utils/httpclient"

export const createuniversity = async (
    name: string,
    redirect: () => void,
    setError: (msg: string) => void
) => {
    try {
        await postData('university', 'add', { name })
        redirect()
    }
    catch (e) {
        setError("Impossible d'ajouter l'université") //TODO: error message should display when backend is down
    }
}