import { IonCol, IonGrid, IonItem, IonList, IonRow } from '@ionic/react'
import React from 'react'

const mapInComponent = (component: React.ComponentType<any>, props: any, list: any[], apply: (any: any, index: number) => any) => {
    const children = list.map(apply)
    return (React.createElement(component, props, children))
}

interface GridInterface {
    columns: string[]
}

const Grid: React.FC<GridInterface> = ({ columns, children }) => {
    return (
        <IonGrid>
            <IonRow>
                {columns.map((name, key) => { return <IonCol key={key}>{name}</IonCol> })}
            </IonRow>
            {children}
        </IonGrid>
    )
}


export const mapInGrid = (columns: string[], list: any[], apply: (any: any, index: number) => any) => {
    return mapInComponent(Grid, { columns }, list, apply)
}

export const mapInList = (list: any[], apply: (any: any, index: number) => any) => {
    return mapInComponent(IonList, {}, list, apply)
}

export const displayList = (list: any[]) => {
    return (
        mapInList(list, (element, index) => {
            return <IonItem key={index}> {element} </IonItem>
        })
    )
}