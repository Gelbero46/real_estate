import Link from "next/link"
import Image from "next/image"
import Profilepics from "../images/wineCellar.jpg"
import Property from "@/components/Property"
import { ChakraProvider, Flex, Box, Text, Button } from "@chakra-ui/react"

import {fetchApi, baseUrl} from "@/utils/fetchApi"
import { useState } from "react"

export const getStaticProps = async () => {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`)
  // const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`)
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&id=3529581`)
  return {
    props:{
      propertyForSale : propertyForSale?.hits,
      propertyForRent : propertyForRent?.hits
    }
  }
}

const Banner = ( { purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl } ) => (
  <Flex flexWrap='wrap' gap='5' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={100} alt='banner' />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight='medium'>{purpose} </Text>
      <Text fontSize="3xl" fontWeight='bold'>{title1}<br />{title2} </Text>
      <Text color= "gray.700" fontSize="lg" paddingTop="3" paddingBottom="3" fontWeight='medium'>{desc1}<br />{desc2} </Text>
      <Button fontSize="xl">
        <Link href={linkName}>{buttonText}</Link>
      </Button>
    </Box>
  </Flex>
)

export default function Home( { propertyForSale, propertyForRent } ) {
  console.log(propertyForSale)

  return (
      <div>
          <Banner purpose='RENT A HOME' 
            title1= 'Rental Homes for' 
            title2= "Everyone"
            desc1 = "Explore Apartments, Villas, Homes"
            desc2 = "and more"
            buttonText = "Explore Renting" 
            imageUrl= {Profilepics}
            linkName = "/search?purpose=for-rent" />

        <Flex flexWrap='wrap' alignItems='center' ml='10' mr='10' justifyContent="center">
          {
            propertyForRent.map( (property) => {
              return (
                <Property 
                key={property.externalID}
                property={property} 
                />
              )
            } )
          }
        </Flex>

        <Banner purpose='BUY A HOME' 
            title1= 'Find, Buy & Own Your' 
            title2= " Dream Home"
            desc1 = "Explore Apartments, Villas, Homes"
            desc2 = "and more"
            buttonText = "Explore Renting" 
            imageUrl= {Profilepics}
            linkName = "/search?purpose=for-rent" />
       
        
       <Flex flexWrap='wrap' alignItems='center' ml='10' mr='10' justifyContent="center">
          {
            propertyForSale.map( (property) => {
              return (
             
                  <Property 
                  key={property.externalID}
                  property={property} 
                  />
        
                
              )
            } )
          }
        </Flex>
       
        
      </div>

  )
}
