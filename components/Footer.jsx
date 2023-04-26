import { Box, Flex, Text } from "@chakra-ui/react"

const Footer = () => {
  return (
    <Flex justifyContent="center" padding="1em" borderTopWidth="1px" borderColor='gray.100' >
      <Box >
        <Text color="gray.600" >2021 Realtor, Inc.</Text>
      </Box>
    </Flex>
  
  )
}

export default Footer