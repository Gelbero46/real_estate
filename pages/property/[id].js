import { Box, Flex, Spacer, Text } from '@chakra-ui/layout';
import { Avatar } from '@chakra-ui/avatar';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill, BsHandThumbsDownFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';

import { baseUrl, fetchApi } from '../../utils/fetchApi';
import ImageScrollbar from '../../components/ImageScrollbar';

import {getPropertiesIds} from '@/utils/getPropertiesIds';



const PropertyDetails = ( { propertyDetails: {price, 
                                              rentFrequency, 
                                              rooms, 
                                              title, 
                                              baths, 
                                              area, 
                                              agency, 
                                              isVerified, 
                                              description,
                                              type,
                                              purpose,
                                              furnishingStatus,
                                              amenities,
                                              photos,
                                              } 
                                            } ) => {
                                            
  return (
    <Box maxWidth="1000px" margin="auto" p="4">
        { photos && <ImageScrollbar data={photos} /> }
        <Box padding="20px">
          <Box>
            <Flex alignItems="center" mb="5px">
              {
                isVerified ? <GoVerified color="green" /> : <GoVerified color="gray" />
              }
              
              <Text fontWeight="bold" marginLeft="7px">AED {millify(price)}/monthly</Text>
            </Flex>

          
            <Flex alignItems="center" justifyContent="space-between" maxWidth="250px" color="blue.400">
              <Flex alignItems="center" gap="10px">{rooms} <FaBed /></Flex> |
              <Flex alignItems="center" gap="10px">{baths} <FaBath /></Flex> |
              <Flex alignItems="center" gap="10px">{millify(area)}sqft <BsGridFill /></Flex> 
            </Flex>
          </Box>
          <Box  mt='1.5em'>
              <Text fontWeight="bold" textTransform="upperCase" fontSize="lg">{title}</Text>
              <Text mt="5px" lineHeight="2">{description}</Text>
          </Box>
          <Flex flexWrap="wrap" mt='1.5em'>
              {
                [
                  {
                    name : "type",
                    value: type
                  },
                  {
                    name : "purpose",
                    value: purpose
                  },
                  {
                    name : "furnishingStatus",
                    value: furnishingStatus
                  }
                ].map( (item) => {
                  return(
                    <Flex key={item.name} width="50%" justifyContent="space-between" paddingRight="40px" alignItems="center" paddingY="7px" borderBottom="1px solid #ddd">
                      <Text textTransform="upperCase">{item.name}</Text>
                        <Text textTransform="upperCase" fontWeight="bold">{item.value}</Text>
                    </Flex>
                  )
                } )
              }

          </Flex>

          {
            amenities.length &&
            <Box mt='1.5em'>
              <Text fontSize="2xl" fontWeight="bold">Amenities</Text>
              <Flex color="blue.400" mt="10px" flexWrap='wrap'>
                {/* {console.log(amenities)} */}
                {amenities.map( ({amenities}) => {
                      return(
                        amenities.map(({text}) => {
                          return <Text p="2"
                                        fontWeight="bold"
                                        fontSize="l"
                                        bg="gray.200"
                                        m="1"
                                        borderRadius="5"
                                        key={text}
                                        >{text}</Text>
                        })
                      )
                } )}
              </Flex>
            </Box>
          }
         

        </Box>
        
    </Box>
  )
}


export default PropertyDetails;

// export const getStaticPaths = async () => {

//   const ids = getPropertiesIds()
  
//   return {
//     ids,
//     fallback: false
//   }
// }

export const getServerSideProps = async ( { params : { id } } ) => {
  const data = await fetchApi(`${baseUrl}/properties/detail?externalID=${id}`)
  console.log(data)
  return {
    props: {
      propertyDetails : data
    }
  }

}


// export const getStaticProps = async (context) => {
//     return {
//         props: {}
//       }
// }

