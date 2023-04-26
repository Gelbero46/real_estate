import { useState } from "react"
import { useRouter } from "next/router"
import Image from "next/image"
import { Flex, Box, Text, Icon } from '@chakra-ui/react'
import { BsFilter } from 'react-icons/bs'

import SearchFilters from "@/components/SearchFilters"
import Property from "@/components/Property"
import noresult from '../images/noresult.svg'
import { baseUrl, fetchApi } from "@/utils/fetchApi"


export const getServerSideProps = async ( { query } ) => {
  const purpose = query.purpose || 'for-rent';
  const rentFrequency = query.rentFrequency || 'yearly';
  const minPrice = query.minPrice || '0';
  const maxPrice = query.maxPrice || '1000000';
  const roomsMin = query.roomsMin || '0';
  const bathsMin = query.bathsMin || '0';
  const sort = query.sort || 'price-desc';
  const areaMax = query.areaMax || '35000';
  const locationExternalIDs = query.locationExternalIDs || '5002';
  const categoryExternalID = query.categoryExternalID || '4';

  const data = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=${purpose}&categoryExternalID=${categoryExternalID}&bathsMin=${bathsMin}&rentFrequency=${rentFrequency}&priceMin=${minPrice}&priceMax=${maxPrice}&roomsMin=${roomsMin}&sort=${sort}&areaMax=${areaMax}`);
  // const properties = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  console.log(data.hits)

  return {
    props:{
      properties : data?.hits
    }
  }
}

const search = ( { properties } ) => {

   
    const [ searchFilters, SetsearchFilters ] = useState(false);
    const router = useRouter();

    // console.log(router)

  return (
    <Box >
      <Box  background='gray.100'>
        <Flex
                  alignItems='center' 
                  justifyContent='center'
                  borderBottom='1px'
                  borderColor='gray.200'
                  padding='2'
                  cursor="pointer"
                  onClick={ () => SetsearchFilters( ( prevFilter ) => !prevFilter ) }>
              <Text fontWeight='black' fontSize='lg' mr="5px">Search Property By Filters</Text>
              <Icon as={BsFilter} />
          </Flex>

          {
            searchFilters && < SearchFilters />
          }

      </Box>
      
        <Text fontSize="2xl" p='4' fontWeight="bold">
          Properties {router.query.purpose}
        </Text>
        <Flex flexWrap='wrap'>
            {
              properties.map( (property) => {
                return < Property key={property.externalID} property={property} />
              } )
            }
        </Flex>
        {
          properties.length === 0 && (
            <Flex justifyContent='center' alignItems='center' flexDirection='column'>
              <Image alt="no result" src={noresult} />
              <Text fontSize="2xl" marginTop="3">No Results Found</Text>
            </Flex>
          )
        }
    </Box>
  )
}

export default search