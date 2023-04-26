import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from "millify";



import defaultImage from "../images/wineCellar.jpg"

const Property = ( { property : { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID } } ) => {
  return (
    <Link 
    href={`/property/${externalID}`}
    // href={
    //   {
    //     pathname: '/Test', query : {ids : 1}
    //   }
    // } 
    >
      <Flex flexWrap='wrap'  width="420px" p="5" paddingTop="0" justifyContent="flex-start">
        <Box>
          <Image src={coverPhoto? coverPhoto.url : defaultImage} width="500" height={100} alt='banner'/>
        </Box>
        <Box w="full">
          <Flex paddingTop="2" aligntItems="center" justifyContent="space-between">
            <Flex alignItems="center">
              <Box color="green.400">
                {
                  isVerified && <GoVerified />
                }
              </Box>
              <Text paddingLeft="3" fontWeight="bold" fontSize="lg">AED {price && millify(price)}{rentFrequency ? `/${rentFrequency}` : `/monthly`}</Text>
            </Flex>
            <Box>
              <Avatar size="sm" src={agency?.logo?.url} />
            </Box>
          </Flex>
          <Flex maxWidth="250px" alignItems='center' p ='1' justifyContent='space-between' color="blue.400">
              {rooms} <FaBed />  | {baths} <FaBath /> | {millify(area)} sqft <BsGridFill /> 
          </Flex>
          <Text fontSize="lg">
              { title.length > 30 ? `${title.substring(0, 30)}...` : title }
          </Text>
           
        </Box>
      </Flex>
     
       
    </Link>
  )
}

export default Property