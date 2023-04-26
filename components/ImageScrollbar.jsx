import { useContext } from "react"
import Image from "next/image"
import { Box, Icon, Flex } from "@chakra-ui/react"
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu"
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa"


const LeftArrow = () => {
    const { scrollPrev } = useContext(VisibilityContext)
    return (
        <Flex justifyContent="center" alignItems="center" margin="1">
            <Icon
                as={FaArrowAltCircleLeft}
                onClick={ () => scrollPrev() }
                fontSize="2xl"
                cursor="pointer"
             />
                 
            
        </Flex>
    )
} 
const RightArrow = () => {
    const { scrollNext } = useContext(VisibilityContext)
    return (
        <Flex justifyContent="center" alignItems="center" margin="1">
            <Icon
                as={FaArrowAltCircleRight}
                onClick={ () => scrollNext() }
                fontSize="2xl"
                cursor="pointer"
             />
                 
            
        </Flex>
    )
} 

const ImageScrollbar = ( { data } ) => {
  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow} style={{overflow : 'hidden'}}>
        {
            data.map( ( image ) => {
                return (
                    <Box width="910px" itemID={image.id} overflow="hidden" p="1" title={image.id} key={image.id}>
                        <Image 
                                alt="property"
                                blurDataURL={image.url}
                                placeholder="blur"  
                                src={image.url} 
                                // fill
                                // quality={40}
                                width={1000}
                                height={500}
                                sizes="( max-width: 500px ) 100px. ( max-width : 1023px ) 400px, 1000px"
                                >

                        </Image>
                    </Box>
                )
            } )
        }
    </ScrollMenu>
  )
}

export default ImageScrollbar