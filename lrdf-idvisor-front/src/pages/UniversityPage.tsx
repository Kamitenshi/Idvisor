import { IonButton, IonContent } from '@ionic/react'
import { Role } from 'lrdf-idvisor-model'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RouteComponentProps } from 'react-router-dom'
import { RootState } from '../app/rootReducer'
import PageWithMenu from '../components/PageWithMenu'
import { getRole } from '../features/session/sessionSlice'

interface UniversityInterface extends RouteComponentProps<{
    name: string
}> {
    role: Role
}
const machin = () => {
    console.log("putain implémente moi la ")
}
const editComponents = (role: Role) => {
    if (role === "advisor") {
        return <IonButton onClick={machin}>Modifier le profil de l'université</IonButton>
    }
    console.log(role)
}



const UniversityPage: React.FC<UniversityInterface> = ({ role, match }) => {
    const [name, setName] = useState(match.params.name)
    console.log('le nom est :', name)
    return (
        <PageWithMenu title="Détails de l'université">
            <IonContent>
                <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                {editComponents(role)}
            </IonContent>
        </PageWithMenu>
    )
}

const dispatchToProps = (state: RootState) => ({
    role: getRole(state)
})

export default connect(dispatchToProps)(UniversityPage)