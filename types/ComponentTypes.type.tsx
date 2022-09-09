import React from 'react';
import { Dispatch, SetStateAction } from 'react';
import { MetadataType, UserType } from './MasterTypes.types';

export interface ListType {
  data: MetadataType[] | UserType[];
  activeItem?: MetadataType | UserType;
  enableItemActions: boolean;
  onListItemClick: Dispatch<SetStateAction<MetadataType | undefined>>
  listItemType?: string;
  editFunction: (arg: MetadataType) => void;
  deleteFunction: (arg: MetadataType) => void;
}

export interface CardType {
  title?: string | undefined,
  actions?: JSX.Element,
  content?: JSX.Element
}