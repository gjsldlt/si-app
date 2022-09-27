import { FC } from 'react';
import { MetadataType, UserType } from '../types/MasterTypes.types';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material';

import ButtonComponent from './ButtonComponent';
import { ListType } from '../types/ComponentTypes.type';

//check if data being loaded on to List Component is Metadata
//should create interface checker for Component loading

const isMetadata = (arg: unknown): arg is MetadataType => {
  return Object.prototype.hasOwnProperty.call(arg, "description");
};

const isUser = (arg: unknown): arg is UserType => {
  return Object.prototype.hasOwnProperty.call(arg, "firstName");
};

const ListComponent: FC<ListType> = ({
  data,
  activeItem,
  enableItemActions,
  onListMetadataClick,
  onListUserClick,
  listItemType,
  editFunction,
  deleteFunction,
}) => {
  //function to call when list item is clicked
  //sets list item to active, adds highlight
  const clickListItemButton = (data: unknown) => {
    if (isMetadata(data) && enableItemActions && onListMetadataClick) {
      if (activeItem?._id === data._id) {
        onListMetadataClick(undefined);
      } else {
        onListMetadataClick(data);
      }
    } else if (isUser(data) && enableItemActions && onListUserClick) {
      if (activeItem?._id === data._id) {
        onListUserClick(undefined);
      } else {
        onListUserClick(data);
      }
    } else null;
  };
  return (
    <List
      sx={{
        p: 0,
        position: 'relative',
      }}
    >
      {data.map((data) => {
        const activeLine = activeItem?._id === data._id;

        //if description of secondary text exceeeds 45 char limit, adds ellipsis
        let shortDesc: string | undefined = undefined;

        /*!!!TO ADD SECONDARY TEXT FOR USERS HERE!!!*/
        if (isMetadata(data)) {
          //if secondary text is metadata description
          if (data.description?.length > 45) {
            shortDesc = data.description?.substring(0, 45) + '...';
          } else {
            shortDesc = data.description;
          }
          return (
            <ListItem
              key={`${listItemType}-line-item-${data._id}`}
              component='div'
              disablePadding
              secondaryAction={
                enableItemActions ? (
                  <>
                    <ButtonComponent
                      style='icon'
                      icon={<CreateIcon />}
                      text={['Edit']}
                      color={activeLine ? 'white' : '#0E2040'}
                      handleClick={[
                        //call update function of metadata
                        editFunction
                          ? () => editFunction(data)
                          : null,
                      ]}
                    />
                    <ButtonComponent
                      style='icon'
                      icon={<DeleteIcon />}
                      text={['Remove']}
                      color={activeLine ? 'white' : '#0E2040'}
                      handleClick={[
                        //call delete function of metadata
                        deleteFunction
                          ? () => deleteFunction(data)
                          : null,
                      ]}
                    />
                  </>
                ) : null
              }
            >
              <ListItemButton
                sx={[
                  {
                    my: .5,
                    mx: 1,
                    backgroundColor: '#FAF9F9',
                    borderRadius: '10px',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                  },
                  activeLine
                    ? {
                      backgroundColor: '#0E2040',
                      '&:hover': { backgroundColor: '#0E2040' },
                    }
                    : null,
                ]}
                onClick={() => {
                  //set active CSS styling when list item is clicked
                  clickListItemButton(data)
                }}
              >
                <ListItemText
                  sx={{ mr: 5, lineHeight: 0, }}
                  disableTypography={false}
                  primary={
                    <Typography
                      sx={{ fontSize: '14px', fontWeight: 700 }}
                      variant='subtitle1'
                      component='div'
                      color={activeLine ? 'white' : 'black'}
                    >
                      {data.name}
                    </Typography>
                  }
                  secondary={
                    <Typography
                      sx={{
                        fontSize: '12px',
                        fontWeight: 400,
                        lineHeight: '15px',
                      }}
                      variant='body2'
                      component='span'
                      fontStyle='italic'
                      color={activeLine ? 'white' : 'gray'}
                    >
                      {activeLine
                        ? data.description
                        : shortDesc
                      }
                    </Typography>
                  }
                  secondaryTypographyProps={{}}
                />
              </ListItemButton>
            </ListItem>
          );
        } else {
          <ListItem>
            <ListItemButton>
              <ListItemText>

              </ListItemText>
            </ListItemButton>
          </ListItem>
        }
      })}
    </List>
  );
};

export default ListComponent;
