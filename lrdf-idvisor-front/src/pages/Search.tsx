import { IonApp, IonButton, IonContent, IonGrid, IonItem, IonLabel, IonList, IonRow, IonSearchbar, IonSelect, IonSelectOption, IonText } from '@ionic/react'
import { Curriculum, University } from 'lrdf-idvisor-model'
import React, { useEffect, useState } from 'react'
import { RouteComponentProps } from 'react-router-dom'
import { Subtitle, Title } from '../components/CustomText'
import PageWithMenu from '../components/PageWithMenu'
import { getData } from '../utils/httpclient'

interface SearchInterface extends RouteComponentProps { }

const Search: React.FC<SearchInterface> = () => {
    const [universities, setUniversities] = useState<University[]>([])
    const [searchResults, setSearchResults] = useState<University[]>([])
    const [searchedValue, setSearchedValue] = useState<string>('')
    const [refresh] = useState(true)
    const [showFilters, setShowFilters] = useState(false);
    const [sortOrder, setSortOrder] = useState("alpha")
    const [selectType, setSelectType] = useState<string[]>([])

    useEffect(() => {
        async function getAllUniversities() {
            setUniversities(await (await getData('university', 'all')).data.result)
        };
        getAllUniversities()
    }, [refresh])

    useEffect(() => {
        const sortList = (list: University[]) => {
            switch (sortOrder) {
                case "notAlpha": { return list.sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? -1 : 1) }
                default: { return list.sort((a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1) }
            }
        }
        setSearchResults(sortList(universities.filter((value) => (value as University).name.indexOf(searchedValue) > -1)))
    }, [universities, sortOrder, searchedValue])


    const openlink = (curriculum: Curriculum) => {
        let url = curriculum.url.search("www.") === -1 ? "www." + curriculum.url : curriculum.url
        url = curriculum.url.search("http://") === -1 ? "http://" + curriculum.url : curriculum.url
        window.open(url, "_blank")
    }

    const displayUniversities = () => {
        if (searchedValue && searchResults.length === 0) {
            return <IonText color='danger'> Aucun résultat correspondant pour la recherche: {searchedValue}</IonText>
        }
        else {
            return (
                <IonGrid>
                    <IonList>
                        {searchResults.map((result) => {
                            if (selectType.length === 2 || (selectType.length === 1 && selectType[0] === "university")) {
                                return (
                                    <IonItem routerLink={'university/page/' + result.name}>
                                        <IonRow>
                                            Université | {result.name}
                                        </IonRow>
                                    </IonItem>
                                )
                            }
                        })}
                        {searchResults.map((result) => {
                            if (selectType.length === 2 || (selectType.length === 1 && selectType[0] === "curriculum")) {
                                console.log("FAUT PRINT CURI")
                                console.log(result.curriculums)
                                return (
                                    result.curriculums.map((curriculum) => {
                                        return (
                                            <IonItem routerLink={curriculum.name} onClick={() => openlink(curriculum)}>
                                                <IonRow>
                                                    Formation | {curriculum.name} : {curriculum.description}
                                                </IonRow></IonItem>
                                        )


                                    }))
                            }

                        })
                        }
                    </IonList >
                </IonGrid>
            )
        }
    }

    const showFiltersModule = () => {
        if (showFilters) {
            return (
                <>
                    <Subtitle >Liste des filtres</Subtitle>
                    <IonList>
                        <IonItem>
                            <IonLabel>Type</IonLabel>
                            <IonSelect multiple={true} onIonChange={e => { setSelectType(((e.target as any).value)) }}>>
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
                </>
            )
        }
    }

    return (
        <IonApp>
            <PageWithMenu title='Rechercher une université ou une formation'>
                <IonContent>
                    <IonButton routerLink='/' color='secondary'>Retourner au menu principal</IonButton>
                    <IonSearchbar onInput={(e) => setSearchedValue(((e.target as any).value) as string)} placeholder="Rechercher"></IonSearchbar>
                    <IonButton onClick={() => setShowFilters(!showFilters)}>Options</IonButton>
                    {showFiltersModule()}
                    <Title>Résultats de la recherche</Title>
                    {displayUniversities()}
                </IonContent>
            </PageWithMenu >

        </IonApp>
    )
}

export default Search