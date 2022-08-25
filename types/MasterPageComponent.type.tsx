import type { AppProps } from 'next/app';
import type { NextPage } from 'next'
import { Metadata } from './MasterTypes.types';

export interface CustomAppProps extends AppProps {
    getLayout(page: AppProps): AppProps;
}

export interface MetadataComponentProps {
    type: "skill" | "industry" | "capability"
    onMetadataClick: React.Dispatch<React.SetStateAction<Metadata | undefined>>
    enableRowActions: Boolean
    activeMetadata?: Metadata
}

export interface FormProps {
    renderData: () => {}
    setLoadState: React.Dispatch<React.SetStateAction<Boolean>>
    metadataToEdit?: Metadata
    metadataType: string
}

export interface PopupProps {
    renderData: () => {}
    metadataToDelete?: Metadata
}