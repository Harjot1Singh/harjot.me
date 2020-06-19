import { useState } from 'react'
import useInterval from 'use-interval'

const useRotatingItem = ( items, delay = 2000 ) => {
  const [ index, setIndex ] = useState( 0 )

  useInterval( () => ( index === items.length - 1 ? setIndex( 0 ) : setIndex( index + 1 ) ), delay )

  return items[ index ]
}

export default useRotatingItem
