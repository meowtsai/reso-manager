import React from "react";
import Select from 'react-select'


const TagsSelect = ({tags,channels, onIdChange, currentId})=> {
    let tmpList
    
    if (Array.isArray(tags) && Array.isArray(channels)) {
      if (tags.length>0 && channels.length>0) {
        tmpList = channels.filter(c=>c.tags.length>0).reduce( (prev, curr)=> ([...prev, ...curr.tags] ),[]);
        //console.log("tmpList", tmpList)
  
        const listItems = tags.map(t=> ({label:t.name, value:t._id, count: tmpList.filter(g=> g===t._id).length})).filter(c=> c.count!==0).sort((a,b)=> b.count- a.count).map(d =>({label:d.label + "("+d.count+")", value:d.value}))
        return <Select defaultValue={listItems.filter(x=>x.value===currentId)[0]} onChange={(e)=>onIdChange(e.value) } options={[{label:"所有標籤", value:""},...listItems]}  />
      }
      else 
      {
        return null
      }
      
    }
    else {
      return null
    }
  }

  export default TagsSelect;