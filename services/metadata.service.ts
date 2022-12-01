import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';

import {
  addMetadataQuery,
  getMetadataQuery,
  getPgMetadataQuery,
  updateMetadataQuery,
  deleteMetadataQuery,

} from '../query/metadata.query';

axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common[
  'Accept'
] = `application/json, text/plain, application/graphql, */*`;
// axios.defaults.headers.common['Authorization'] = ``;

//CREATE METADATA TO API

//call API to post data from input box
const addMetadata = async (
  mtdtName: string,
  mtdtDesc: string,
  mtdtType: string
) => {
  const response = await axios.post(GLOBALHELPER.APIURL, {
    query: addMetadataQuery,
    variables: {
      name: mtdtName,
      description: mtdtDesc,
      type: mtdtType,
    },
  });
  return response.data.data.metadataList;
};

//READ METADATA FROM API

//Create function to get metdata from API
const getMetadata = async (mtdtType: string) => {
  const response = await axios.get(GLOBALHELPER.APIURL, {
    params: {
      query: getMetadataQuery,
      variables: {
        type: mtdtType,
      },
    },
  });
  return response.data.data.metadataByType;
};

//READ METADATA FROM API (PAGINATION)

//Create function to get metdata from API
const getPgMetadata = async (mtdtType: string, pageNum: number, numItems: number) => {
  const response = await axios.get(GLOBALHELPER.APIURL, {
    params: {
      query: getPgMetadataQuery,
      variables: {
        options: {
          page: pageNum,
          itemsPerPage: numItems,
          filterFields: [
            "name",
            "description"
          ],
          type: mtdtType,
        },
      },
    }
  });
  return response.data.data.metadataList.paginatedList;
};
//UPDATE METADATA FROM API

//Create function to update metadata in API
//uses POST instead of PUT as PUT is not allowed by the API
const updateMetadata = async (
  mtdtId: string,
  mtdtName: string,
  mtdtDesc: string
) => {
  const response = await axios.post(GLOBALHELPER.APIURL, {
    query: updateMetadataQuery,
    variables: {
      id: mtdtId,
      metadata: {
        name: mtdtName,
        description: mtdtDesc,
      },
    },
  });
  return response.data.data;
};
//DELETE METADATA FROM API

const deleteMetadata = async (mtdtId: string) => {
  const response = await axios.post(GLOBALHELPER.APIURL, {
    query: deleteMetadataQuery,
    variables: {
      id: mtdtId,
    },
  });
  return response.data.data;
};

export { getMetadata, addMetadata, updateMetadata, deleteMetadata, getPgMetadata };
