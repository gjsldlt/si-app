export default `query($type:String!){
    metadataByType(type: $type) { 
        _id 
        name 
        description
    }
}`