import { View, Text } from 'react-native'
import React, { useEffect } from 'react'

interface ListingsProps {
  listings: any[],
  category: string,
}
const Listings = ({ listings, category }: ListingsProps) => {
  useEffect(() => {
    console.log("reload listings");
  }, [category])
  return (
    < View >
      <Text>{listings.length}</Text>
    </View >
  )
}

export default Listings