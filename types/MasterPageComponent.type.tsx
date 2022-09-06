import type { AppProps } from 'next/app';
import type { NextPage } from 'next'
import { Metadata } from './MasterTypes.types';

export interface CustomAppProps extends AppProps {
    getLayout(page: AppProps): AppProps;
}

export interface MetadataComponentProps {
    type: "skill" | "industry" | "capability"
    onMetadataClick: React.Dispatch<React.SetStateAction<Metadata | undefined>>
    enableRowActions: boolean
    activeMetadata?: Metadata
}

export interface FormProps {
    renderData: () => Promise<void>
    setLoadState: React.Dispatch<React.SetStateAction<boolean>>
    metadataToEdit?: Metadata
    metadataType: string
    setAction?: any
    setSuccess?:any
}

export interface PopupProps {
    renderData: () => Promise<void>
    metadataToDelete?: Metadata
}