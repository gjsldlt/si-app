import { FC, useState, useEffect } from 'react'

import IndustryForm from './industryForm.component'
import LoaderComponent from '../loader/loader.component'
import { IndustryType } from '../../types/MasterTypes.types'
import { getIndustries, addIndustry } from '../../services/industry.service'

import { PlusIcon, XIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid'

const IndustryComponent: FC = () => {

    const tailwindClasses = {
        container: `relative flex flex-col bg-white p-1 min-h-[200px] md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg`,
        toolbar: `flex flex-row`,
        title: `flex-1`,
        iconButton: `h-iconbutton w-iconbutton flex items-center justify-center p-0`,
        list: `flex flex-col h-[100px]`,
        lineItem: `flex justify-between`,
    }

    const [industryList, setIndustryList] = useState<IndustryType[]>([])
    const [loadState, setLoadState] = useState<Boolean>(true)
    const [addState, setAddState] = useState<Boolean>(false)
    const [industryToEdit, setIndustryToEdit] = useState()

    const renderData = async () => {
        setAddState(false)
        setLoadState(true)
        setIndustryList(await getIndustries())
        setLoadState(false)
    }

    const addNewIndustry = () => {
        setIndustryToEdit(undefined)
        setAddState(!addState)
    }

    const editIndustry = (industry: IndustryType) => {
        setAddState(true)
        setIndustryToEdit(industry)
    }

    const deleteIndustry = (industry: IndustryType) => {

    }

    const renderList = () => {
        return (
            <div className={tailwindClasses.list}>
                {!loadState &&
                    industryList.map((item, index) => (
                        <div
                            key={`manager-line-item-${index}`}
                            className={tailwindClasses.lineItem}
                        >
                            {item.name}
                            <button className={tailwindClasses.iconButton}>
                                <PencilIcon className="h-5 w-5 text-blue-500" onClick={() => { editIndustry(item) }} />
                                <TrashIcon className="h-5 w-5 text-blue-500" onClick={() => { deleteIndustry(item) }} />
                            </button>
                        </div>
                    ))}
            </div>
        )
    }

    useEffect(() => {
        renderData()
    }, [])

    return (
        <div className={tailwindClasses.container}>
            <div className={tailwindClasses.container}>
                {loadState ? <LoaderComponent /> : null}
                <div className={tailwindClasses.toolbar}>
                    <p className={tailwindClasses.title}>Industries</p>
                    <button
                        className={tailwindClasses.iconButton}
                        onClick={addNewIndustry}
                    >
                        {addState ? (
                            <XIcon className="h-5 w-5 text-blue-500" />
                        ) : (
                            <PlusIcon className="h-5 w-5 text-blue-500" />
                        )}
                    </button>
                </div>
                {addState ? (
                    <IndustryForm industryToEdit={industryToEdit} renderData={renderData} setLoadState={setLoadState} />
                ) : (
                    renderList()
                )}
            </div>

            <div></div>
        </div>
    )
}

export default IndustryComponent