import { Dispatch, SetStateAction } from 'react';
import { MetadataType, UserType } from './MasterTypes.types';

export interface ListType {
  data: MetadataType[] | UserType[];
  activeItem?: MetadataType | UserType;
  enableItemActions: boolean;
  onListMetadataClick?: Dispatch<SetStateAction<MetadataType | undefined>>;
  onListUserClick?: Dispatch<SetStateAction<UserType | undefined>>;
  listItemType?: string;
  editFunction?: <T extends MetadataType>(arg: T) => void;
  deleteFunction?: <T extends MetadataType>(arg: T) => void;
}

export interface CardType {
  title?: string | undefined,
  actions?: JSX.Element,
  content?: JSX.Element,
  pageCount?: number,
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  renderData?: () => Promise<void>;
}

export interface PopoverType {
  title?: string | undefined,
  content?: JSX.Element
}


export interface ButtonType {
  type?: 'button' | 'submit' | 'reset' | undefined;
  handleClick?: any;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  text: string[];
  disabled?: boolean;
  icon?: any;
  style?: string;
  color?: string;
  placement?:
  | "bottom-end"
  | "bottom-start"
  | "bottom"
  | "left-end"
  | "left-start"
  | "left"
  | "right-end"
  | "right-start"
  | "right"
  | "top-end"
  | "top-start"
  | "top"
  | undefined;
  filter?: boolean;
};