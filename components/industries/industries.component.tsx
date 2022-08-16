import { useEffect, useState } from 'react';
import { IndustryType } from '../../types/MasterTypes.types';
import { getIndustries, addIndustry } from '../../services/industry.service'
import LoaderComponent from '../loader/loader.component';
import IndustryForm from './industryForm.component';
import { PlusIcon, XIcon } from '@heroicons/react/solid'

export default function Industries({ children }: PageProps) {
    const tailwindClasses = {
        container: "fixed flex flex-col bg-white p-1 min-h-[520px]  md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg",
        toolbar: "flex flex-row",
        title: "flex-1",
        addButton: "h-iconbutton w-iconbutton flex items-center justify-center p-0",
        list: "flex flex-col h-[100px]",
        lineItem: "",
    }

    const [industryList, setIndustryList] = useState<IndustryType[]>([]);
    const [loadState, setLoadState] = useState<Boolean>(true);
    const [addState, setAddState] = useState<Boolean>(false);

    const renderData = async () => {
        setAddState(false);
        setLoadState(true);
        setIndustryList(await getIndustries());
        setLoadState(false);
    }

    const addNewIndustry = () => {
        setAddState(!addState);
    };

    const renderList = () => {
        return (
            <div className={tailwindClasses.list}>
                {!loadState && industryList.map((item, index) => (
                    <div
                        key={`manager-line-item-${index}`}
                        className={tailwindClasses.lineItem}
                    >
                        {item.name}
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
                    <p className={tailwindClasses.title}>
                        Industriessssss
                    </p>
                    <button className={tailwindClasses.addButton} onClick={addNewIndustry}>
                        {
                            addState
                                ? (<XIcon className="h-5 w-5 text-blue-500" />)
                                : (<PlusIcon className="h-5 w-5 text-blue-500" />)
                        }
                    </button>
                </div>
                {
                    addState
                        ? (<IndustryForm renderData={renderData} setLoadState={setLoadState} />)
                        : (renderList())
                }
            </div>
        </div>
    )
}

type PageProps = {
    children?: any
}