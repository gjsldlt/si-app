import type { AppProps } from 'next/app';
import type { NextPage } from 'next'

export interface CustomAppProps extends AppProps {
    getLayout(page: AppProps): AppProps;
} 
