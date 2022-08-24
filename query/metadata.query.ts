//query string for API post request
export const addMetadataQuery = `mutation CreateMetadata
  (
    $name: String!,
    $description: String!,
    $type: String!
  )
  {
    addMetadata (metadata:
      {
      name: $name,
      description: $description,
      type: $type
      }
    )
    {
      _id
      name
      description
    }
  }`
//query string for API get request
export const getMetadataQuery =  `query($type:String!) {
	metadataByType(type:$type) {
		_id 
		name 
		description
		}
}`

//query string for API put request
export const updateMetadataQuery = `mutation UpdateMetadata(
  $id:String!
  $metadata: MetadataUpdateFields!
){
  updateMetadata(
    id:$id,
    metadata:$metadata
  ){
    _id
    name
    description
    type
    createdAt
  }
}`

export const deleteMetadataQuery = `mutation DeleteMetadata($id: String!) {
  deleteMetadata(id: $id) 
  {
    message
  }
}`

