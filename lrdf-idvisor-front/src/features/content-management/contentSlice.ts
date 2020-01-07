import { University } from "lrdf-idvisor-model"
import { postData } from "../../utils/httpclient"

export const createuniversity = async (
    name: string,
    description: string,
    address: string,
    city: string,
    postalCode: string,
    redirect: () => void,
    setError: (msg: string) => void,
    setSuccess: (msg: string) => void
) => {
    setSuccess("")
    setError("")
    try {
        await postData('university', 'add', { name, description, address, city, postalCode })
        setSuccess("Successfully created university with name: ".concat(name))
        redirect()
    }
    catch (e) {
        setError("Impossible d'ajouter l'université") //TODO: error message should display when backend is down
    }
}

export const createCurriculum = async (
    name: string,
    description: string,
    university: University,
    setError: (msg: string) => void,
    setSuccess: (msg: string) => void
) => {
    setSuccess("")
    setError("")
    try {
        await postData('curriculum', 'add', { name, description, university })
        setSuccess("Formation ajoutée :".concat(name))
    }
    catch (e) {
        setError("Impossible d'ajouter l'université") //TODO: error message should display when backend is down
    }
}
