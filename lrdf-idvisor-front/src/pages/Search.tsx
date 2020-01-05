import { IonButton, IonCol, IonContent, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonText } from '@ionic/react'
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

    const displayUniversities = (list: University[]) => {
        console.log("la liste à afficher est ", list)
        const apply = (university: University) => {
            return (
                <>
                    <IonRow>
                        <IonCol>{university.name}</IonCol>
                    </IonRow>
                </>)
        }
        if (searchedValue && list.length === 0) {
            return <IonText color='danger'> Aucun résultat correspondant pour la recherche: {searchedValue}</IonText>
        }
        else if (!searchedValue && list.length === 0) {
            return mapInGrid(['Nom', ''], universities, apply)
        }
        else {
            return mapInGrid(['Nom', ''], list, apply)
        }
    }

    const [showFilters, setShowFilters] = useState(false);


    const returnTrue = () => {
        return true
    }


    const showFiltersModule = () => {
        if (showFilters) {
            return (
                <>
                    <p>Liste des filtres</p>
                    <IonList>
                        <IonItem>
                            <IonLabel>Ville</IonLabel>
                            <IonSelect multiple={returnTrue()}>
                                <IonSelectOption value="caen">Caen</IonSelectOption>
                                <IonSelectOption value="paris1">Paris 1er</IonSelectOption>
                                <IonSelectOption value="paris12">Paris 12e</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Type</IonLabel>
                            <IonSelect interface="popover" multiple={returnTrue()}>
                                <IonSelectOption value="university">Université</IonSelectOption>
                                <IonSelectOption value="curriculum">Formation</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonList>
                </>)
        }
    }

    return (
        <PageWithMenu title='Rechercher une université ou une formation'>
            <IonContent>
                <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                <IonSearchbar onInput={(e) => updateSearchResults(((e.target as any).value) as string)}></IonSearchbar>
                <IonButton onClick={() => setShowFilters(!showFilters)}>Options</IonButton>
                {showFiltersModule()}
                <h1>Résultats de la recherche</h1>
                {displayUniversities(searchResults)}
            </IonContent>
        </PageWithMenu >
    )
}

export default Search