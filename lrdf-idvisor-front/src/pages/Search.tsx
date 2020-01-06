import { IonApp, IonButton, IonCol, IonContent, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonText } from '@ionic/react'
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
    const [universities, setUniversities] = useState<University[]>([])
    const [searchResults, setSearchResults] = useState<University[]>([])
    const [searchedValue, setSearchedValue] = useState('')
    const [refresh, setRefresh] = useState(true)
    const [showFilters, setShowFilters] = useState(false);
    const [sortOrder, setSortOrder] = useState("alpha")

    useEffect(() => { getAllUniversities() }, [refresh])
    useEffect(() => { updateSearchResults(searchedValue) }, [universities])
    useEffect(() => { updateSearchResults(searchedValue) }, [sortOrder])

    async function getAllUniversities() {
        setUniversities(await (await getData('university', 'all')).data.result)
    }

    const updateSearchResults = (searchString: string) => {
        setSearchedValue(searchString)
        setSearchResults(sortList(universities.filter((value) => (value as University).name.indexOf(searchString) > -1)))
    }

    const displayUniversities = () => {
        console.log("le resultat à afficher est ", searchResults)
        const apply = (university: University) => {
            return (
                <IonRow>
                    <IonCol>{university.name}</IonCol>
                </IonRow>)
        }
        if (searchedValue && searchResults.length === 0) {
            return <IonText color='danger'> Aucun résultat correspondant pour la recherche: {searchedValue}</IonText>
        }
        else {
            return mapInGrid(['Nom', ''], searchResults, apply)
        }
    }

    const sortList = (list: University[]) => {
        console.log("tri de la liste :", list)
        switch (sortOrder) {
            case "notAlpha": { return list.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1) }
            default: { return list.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) }
        }
    }

    const showFiltersModule = () => {
        if (showFilters) {
            return (
                <>
                    <p>Liste des filtres</p>
                    <IonList>
                        <IonItem>
                            <IonLabel>Ville</IonLabel>
                            <IonSelect multiple={true} onIonChange={e => console.log((e.target as any).value)}>
                                <IonSelectOption value="caen">Caen</IonSelectOption>
                                <IonSelectOption value="paris1">Paris 1er</IonSelectOption>
                                <IonSelectOption value="paris12">Paris 12e</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Type</IonLabel>
                            <IonSelect multiple={true}>
                                <IonSelectOption value="university">Université</IonSelectOption>
                                <IonSelectOption value="curriculum">Formation</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                        <IonItem>
                            <IonLabel>Trier par</IonLabel>
                            <IonSelect onIonChange={e => { setSortOrder((e.target as any).value) }}>
                                <IonSelectOption value="aplha">De A à Z</IonSelectOption>
                                <IonSelectOption value="notAlpha">De Z à A</IonSelectOption>
                            </IonSelect>
                        </IonItem>
                    </IonList>
                </>)
        }
    }

    return (
        <IonApp>
            <PageWithMenu title='Rechercher une université ou une formation'>
                <IonContent>
                    <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                    <IonSearchbar onInput={(e) => updateSearchResults(((e.target as any).value) as string)}></IonSearchbar>
                    <IonButton onClick={() => setShowFilters(!showFilters)}>Options</IonButton>
                    <IonButton onClick={() => updateSearchResults(searchedValue)}>Rafraichir</IonButton>
                    <IonButton onClick={() => setRefresh(true)}>Test</IonButton>



                    {showFiltersModule()}
                    <h1>Résultats de la recherche</h1>
                    {displayUniversities()}
                </IonContent>
            </PageWithMenu >

        </IonApp>
    )
}

export default Search