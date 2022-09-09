import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { MetadataType, UserType } from './MasterTypes.types';

export interface ListType {
  data: MetadataType[] | UserType[];
  activeItem?: MetadataType | UserType;
  enableItemActions: boolean;
  onListItemClick: Dispatch<SetStateAction<MetadataType | undefined>>
  listItemType?: string;
  editFunction?: <T extends MetadataType>(arg: T) => void;
  deleteFunction?: <T extends MetadataType>(arg: T) => void;
}

export interface CardType {
  title?: string | undefined,
  actions?: JSX.Element,
  content?: JSX.Element
}