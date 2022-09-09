import { FC, SetStateAction } from 'react';
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
const isMetadata = (arg: any): arg is MetadataType => {
  return arg && arg.description && typeof arg.description == 'string';
};

const ListComponent: FC<ListType> = ({
  data,
  activeItem,
  enableItemActions,
  onListItemClick,
  listItemType,
  editFunction,
  deleteFunction,
}) => {
  //function to call when list item is clicked
  //sets list item to active, adds highlight
  const clickListItemButton = (data: MetadataType | UserType) => {
    if (isMetadata(data)) {
      if (enableItemActions) {
        if (activeItem?._id === data._id) {
          onListItemClick(undefined);
        } else {
          onListItemClick(data);
        }
      } else null;
    } else null;
  };
  return (
    <List
      sx={{
        p: 0,
        position: 'relative',
        overflow: 'auto',
      }}
    >
      {data.map((data) => {
        const activeLine = activeItem?._id === data._id;

        //if description of secondary text exceeeds 45 char limit, adds ellipsis
        let shortDesc: string | undefined = undefined;
        //if secondary text is metadata description
        if (isMetadata(data)) {
          if (data.description?.length > 45) {
            shortDesc = data.description?.substring(0, 45) + '...';
          } else {
            shortDesc = data.description;
          }
        }

        /*!!!TO ADD SECONDARY TEXT FOR USERS HERE!!!*/

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
                        ? isMetadata(data)
                          ? () => editFunction(data)
                          : null
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
                        ? isMetadata(data)
                          ? () => deleteFunction(data)
                          : null
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
                  m: 1,
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
                isMetadata(data) ? clickListItemButton(data) : null;
              }}
            >
              <ListItemText
                sx={{ mr: 5 }}
                disableTypography={false}
                primary={
                  <Typography
                    sx={{ fontSize: '14px', fontWeight: 700 }}
                    variant='subtitle1'
                    component='div'
                    color={activeLine ? 'white' : 'black'}
                  >
                    {isMetadata(data) ? data.name : null}
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
                    {isMetadata(data)
                      ? activeLine
                        ? data.description
                        : shortDesc
                      : null}
                  </Typography>
                }
                secondaryTypographyProps={{}}
              />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};

export default ListComponent;
