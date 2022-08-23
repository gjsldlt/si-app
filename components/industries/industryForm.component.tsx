import { render } from '@headlessui/react/dist/utils/render'
import { ChangeEvent, useEffect, useState } from 'react'
import { addIndustry, updateIndustry } from '../../services/industry.service'
import { IndustryType } from '../../types/MasterTypes.types'

export default function IndustryForm({
    renderData,
    setLoadState,
    industryToEdit,
}: PageProps) {

    const [formName, setFormName] = useState(industryToEdit ? industryToEdit.name : '')
    const [formDescription, setFormDescription] = useState(industryToEdit ? industryToEdit.description : '')

    const industryId = industryToEdit ? industryToEdit._id : ''

    const tailwindClasses = {
        form: `flex flex-col`,
        addButton: `mt-[200px] pl-[90px] bg-blue-300`,
        input: `appearance-none block w-[300px] bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white`
    }

    useEffect(() => { }, [])

    const industryOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case 'formName': setFormName(e.target.value); break
            case 'formDescription': setFormDescription(e.target.value); break
            default: break
        }
    }

    const industryOnSubmit = async (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        setLoadState(true)

        if (industryToEdit == null) {
            if (formName !== '' && formDescription !== '') {
                addIndustry(formName, formDescription)
                setFormName('')
                setFormDescription('')
                renderData()
            } else {
                updateIndustry(industryId, setFormName, setFormDescription)
                setFormName('')
                setFormDescription('')
                renderData()
            }
        }
    }

    return (
        <form onSubmit={industryOnSubmit} className="w-full max-w-lg ">
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="formName"
                    >
                        Industry
                    </label>
                    <input
                        onChange={industryOnChange}
                        value={formName}
                        name="formName"
                        required
                        className={tailwindClasses.input}
                        id="formName"
                        type="text"
                        placeholder="ex. Medical"
                    />
                    <label
                        className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        htmlFor="formDescription"
                    >
                        Description
                    </label>
                    <input
                        onChange={industryOnChange}
                        value={formDescription}
                        name="formDescription"
                        required
                        className={tailwindClasses.input}
                        id="formDescription"
                        type="text"
                        placeholder="ex. Provides goods and services to treat patients with curative, preventive, rehabilitative, and palliative care."
                    />
                </div>
                <div className="w-full md:w-1/2 px-3">
                    <button type="submit" className={tailwindClasses.addButton}>
                        Submit
                    </button>
                </div>
            </div>
        </form>
    );
}

type PageProps = {
    renderData: () => {}
    setLoadState: React.Dispatch<React.SetStateAction<Boolean>>
    industryToEdit?: IndustryType
}