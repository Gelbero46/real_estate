
import {fetchApi, baseUrl} from "@/utils/fetchApi"

const getPropertiesIds = async () => {
    const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
    const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)

    console.log(propertyForSale)
    const ids = propertyForSale?.hits.map( (prop) => {
      console.log("ok", prop.id)
      return {
        params : {
          id : prop.id
        },
      }
    }  )

    const ids2 = propertyForRent?.hits.map( (prop) => {
      console.log("ok", prop.id)
      return {
        params : {
          id : prop.id
        },
      }
    }  )

    const merged = [...ids, ...ids2];
  console.log("My ids", merged)
  return merged
}

export default getPropertiesIds