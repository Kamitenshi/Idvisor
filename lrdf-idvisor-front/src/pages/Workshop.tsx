import { IonButton, IonInput, IonItem, IonLabel } from '@ionic/react'
import { UserData } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../app/rootReducer'
import PageWithMenu from '../components/PageWithMenu'
import { getUser } from '../features/session/sessionSlice'
import { getData, postData } from '../utils/httpclient'

interface WorkshopItemInterface {
    name: string
}

const WorkshopItem: React.FC<WorkshopItemInterface> = ({ name }) => {
    return (
        <IonItem>
            <IonLabel>
                {name}
            </IonLabel>
        </IonItem>
    )
}

interface WorkshopPageInterface {
    user: UserData
}

interface Workshop {
    name: string
    id: number
}

const WorkshopPage: React.FC<WorkshopPageInterface> = ({ user }) => {
    const [workshops, setWorkshops] = useState<Workshop[]>([])
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const getWorkshops = async () => {
            const response = await getData('workshop', 'all')
            console.log(response.data.result);

            setWorkshops(response.data.result)
            setRefresh(false)
        }
        getWorkshops()
    }, [refresh])

    const [workshopName, setWorkshopName] = useState<string>()
    const createWorkshop = async () => {
        if (workshopName) {
            await postData('workshop', 'create/workshop', { name: workshopName, advisorId: user.id })
            setWorkshopName(undefined)
            setRefresh(true)
        }
    }

    const displayedWorkshops = workshops.map((workshop: Workshop, key: number) => <IonItem key={key} routerLink={`/workshop/${workshop.name}/${workshop.id}`} button={true}><IonLabel>{workshop.name}</IonLabel></IonItem>)
    return (
        <PageWithMenu title={"Ateliers"}>
            <IonInput placeholder="Nom du nouvel atelier" type='text' value={workshopName}
                onIonInput={(e) => setWorkshopName((e.target as HTMLInputElement).value)} />
            <IonButton onClick={createWorkshop}>Créer un nouvel atelier</IonButton>
            {displayedWorkshops}
        </PageWithMenu>
    )
}

const dispatchToProps = (state: RootState) => ({
    user: getUser(state)
})

export default connect(dispatchToProps)(WorkshopPage)