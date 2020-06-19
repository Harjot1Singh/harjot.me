import { useState } from 'react'
import useInterval from 'use-interval'

const sequenced = ( index, length ) => ( index === length - 1 ? 0 : index + 1 )
const randomised = ( _, length ) => Math.floor( Math.random() * length )

const useRotatingItem = ( items, { delay = 2000, random = true } = {} ) => {
  const [ index, setIndex ] = useState( 0 )

  const nextIndexFn = random ? randomised : sequenced
  useInterval( () => setIndex( nextIndexFn( index, items.length ) ), delay )

  return items[ index ]
}

export default useRotatingItem
