import React from 'react'

const Tier = ({tierLevel, items}) => {
    const height = 100
  return (
    <div style={{display: 'flex', flexDirection: 'row'}}>
      <p style={
        {display: 'flex', alignItems: 'center',  justifyContent: 'center', width: '100px', height: `${height}px`, margin: 0, 
        borderStyle: 'solid', borderWidth: '1px', borderColor: 'yellow', fontSize: '50px', flex: '1 1 auto'}}>{tierLevel}</p>
      <div style={{display: 'flex', alignItems: 'center',  justifyContent: 'center', flexDirection: 'row', height: `${height}px`, flexGrow: 20 }}>items</div>
    </div>
  )
}

export default Tier