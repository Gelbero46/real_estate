import { Box, Text, Flex, Select, Spinner, Icon, Button, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {MdCancel} from 'react-icons/md';
import {ImLocation} from 'react-icons/im';
import Image from 'next/image';

import { filterData, getFilterValues } from '@/utils/filterData';
import { baseUrl, fetchApi } from "@/utils/fetchApi"

const SearchFilters = () => {
  const router = useRouter();

  // const searchByLocation = async () => {
  //   const data = await fetchApi(`${baseUrl}/auto-complete?query=abu&dhabi&hitsPerPage=5&page=0&lang=en`)
  //   console.log('location')
  //   console.log(data?.hits)
  // }

  const [ filters, Setfilters ] = useState(filterData);
  // const [ currentLocation, SetcurrentLocation ] = useState("")

  const searchProperty = (filterValues) => {
    console.log('filterValues', filterValues)
    const path =  router.pathname;
    const { query } = router;
    console.log("path", path, filterValues)
    
    const values = getFilterValues(filterValues)

    values.forEach( (item) => {
      if (item.value && filterValues?.[item.name] ){
        query[item.name]  = item.value;
      }
      
    } )
    console.log("filterValues", values)

    router.push({ pathname : path, query })
  }

  return (
    <Flex alignItems='center' flexWrap='wrap' justifyContent="center">
          {
            filters.map( (filter) => {
              // console.log(filter?.placeholder)
              return (
                <Box key={filter.queryName}>
                    <Select placeholder={filter?.placeholder}
                          w="fit-content"
                          p="2"
                          cursor="pointer"
                          onChange={ (e) => {
                            searchProperty( { [filter.queryName] : e.target.value } )
                          // console.log("filterrrr", filter)

                           }}>
                    {
                      filter?.items?.map( (item) => (
                        <option value={item.value} key={item.value} cursor="pointer">{item.name}</option>
                      ) )
                    }  
                     
                  </Select>
                    
                </Box>
                
              )
            })
          }
          {/* <Box w="fit-content" p="2">
            <InputGroup >
                <InputLeftElement
                pointerEvents='none'
                children={< ImLocation color='gray' />} />
                <Input placeholder='Search Location' type='text' 
                onChange={ (e) => SetcurrentLocation(e.target.value) }
                // onSubmit={console.log("Okay Mamammamama")}
                onKeyDown={searchByLocation}
                />
              </InputGroup>
              <Text>{currentLocation}</Text>
          </Box> */}
           
                     
    </Flex>
  )
}

export default SearchFilters;