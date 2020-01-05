import { IonButton, IonCol, IonContent, IonRow, IonSearchbar, IonText } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import PageWithMenu from '../components/PageWithMenu'
import { getData } from '../utils/httpclient'
import { mapInGrid } from '../utils/list'

interface SearchInterface extends RouteComponentProps { }

interface University {
    name: string
}

const Search: React.FC<SearchInterface> = () => {
    const [universities, setUniversities] = useState([])
    const [searchResults, setSearchResults] = useState([])
    const [searchedValue, setSearchedValue] = useState('')
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        async function getAllUniversities() {
            setRefresh(false)
            const result = await (await getData('university', 'all')).data.result
            setUniversities(result)
        }

        getAllUniversities()
    }, [refresh])

    const updateSearchResults = (searchString: string) => {
        setSearchedValue(searchString)
        setSearchResults(universities.filter((value) => (value as University).name.indexOf(searchString) > -1))
    }

    const displayUniversities = (universities: University[]) => {
        const apply = (university: University) => {
            return (
                <>
                    <IonRow>
                        <IonCol>{university.name}</IonCol>
                    </IonRow>
                </>)
        }
        if (searchedValue && universities.length === 0) {
            console.log("ici")
            return <IonText color='danger'> Aucun résultat correspondant pour la recherche: {searchedValue}</IonText>
        }
        else {
            console.log("la", universities, searchedValue)
            return mapInGrid(['Nom', ''], universities, apply)
        }
    }

    return (
        <PageWithMenu title='Rechercher une université ou une formation'>
            <IonContent>
                <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                <IonSearchbar onInput={(e) => updateSearchResults(((e.target as any).value) as string)}></IonSearchbar>
                <h1>Résultats de la recherche</h1>
                {displayUniversities(searchResults)}

            </IonContent>
        </PageWithMenu>
    )
}

export default Search