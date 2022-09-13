import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

export default function CardComponents({ children }: Props) {
  return <Card sx={{ minWidth: 275 }}>{children}</Card>;
}
type Props = {
  children?: JSX.Element | JSX.Element[];
};