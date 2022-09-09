import type { AppProps } from 'next/app';
import { MetadataType } from './MasterTypes.types';
import { ReactNode } from 'react';

export interface CustomAppProps extends AppProps {
  getLayout(page: AppProps): AppProps;
}

export interface MetadataComponentProps {
  type: 'skill' | 'industry' | 'capability';
  onMetadataClick: React.Dispatch<React.SetStateAction<MetadataType | undefined>>;
  enableRowActions: boolean;
  activeMetadata?: MetadataType;
}

export interface FormProps {
  renderData: () => Promise<void>;
  setLoadState: React.Dispatch<React.SetStateAction<boolean>>;
  metadataToEdit?: MetadataType;
  metadataType: string;
}

export interface PopupProps {
  renderData: () => Promise<void>;
  metadataToDelete?: MetadataType;
}

export interface HeaderBarProps {
  breadcrumb: Array<string>;
  onMenuClick: () => void;
  show: boolean;
}

export interface LayoutProps {
  children: ReactNode;
}
