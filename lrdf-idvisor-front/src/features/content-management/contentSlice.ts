import { postData } from "../../utils/httpclient"

export const createuniversity = async (
    name: string,
    redirect: () => void,
    setError: (msg: string) => void,
    setSuccess: (msg: string) => void
) => {
    setSuccess("")
    setError("")
    try {
        console.log("front send to back with name: ", name)
        await postData('university', 'add', { name })
        setSuccess("Successfully created university with name: ".concat(name))
        redirect()
    }
    catch (e) {
        setError("Impossible d'ajouter l'université") //TODO: error message should display when backend is down
    }
}