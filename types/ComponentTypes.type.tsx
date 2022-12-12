import { ChangeEvent, Dispatch, SetStateAction } from 'react';
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
  title?: string | undefined;
  actions?: JSX.Element;
  content?: JSX.Element;
  pageCount?: number;
  setCurrentPage?: React.Dispatch<React.SetStateAction<number>>;
  renderData?: () => Promise<void>;
  searchInput?: string;
  childToParent: (searchTerm: string) => void;
}

export interface PopoverType {
  title?: string | undefined;
  content?: JSX.Element;
}

export interface ButtonType {
  type?: 'button' | 'submit' | 'reset' | undefined;
  handleClick: any;
  variant?: 'text' | 'outlined' | 'contained' | undefined;
  text: string[];
  disabled?: boolean;
  icon?: JSX.Element;
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

export interface TextFieldType {
  id?: string;
  name?: string;
  label: string;
  select?: boolean | undefined;
  children?: JSX.Element;
  placeholder?: string;
  variant?: "standard" | "filled" | "outlined" | undefined;
  type?: "number" | "password" | "search" | "email" | undefined;
  value: string | number | undefined;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void | undefined;
  disabled?: boolean | undefined;
  required?: boolean | undefined;
  validation?: { error: boolean | undefined; errorMsg?: string };
  multiline?: { enabled: boolean | undefined; rows: number };
  className?: string;
  ariaLabel?: string;
  fontSize?: number;
  fontSizeLabel?: number;
  size?: 'small' | 'medium' | undefined;
  width?: number;
  maxLength?: number;
};