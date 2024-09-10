import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'
import { callAPI } from '../utils/CallApi'
import { useNavigate,createSearchParams } from 'react-router-dom'

const Search = () => {
  
  const [suggestions,setSuggestions] = useState(null);
  const [searchTerm,setSearchTerm] = useState("");
  const [category , setCategory] = useState('All')
  const navigate = useNavigate();


  const onHandleSubmit = (e) => { 
    e.preventDefault();
    navigate({
      pathname: "search",
      search: `${
        createSearchParams({
          category:`${category}`,
          searchTerm:`${searchTerm}`
        })
      }`
    })
    setSearchTerm("");
    setCategory("All") ;
    
  }

  const getSuggestions= ()=>{
       callAPI(`data/suggestions.json`)
       .then((suggestionResults)=>{
        setSuggestions(suggestionResults);
       })

    }

  useEffect(()=>{
    getSuggestions()
  });  

  return (
    <div className='w-[100%]'>
        <div className='flex items-center h-10 bg-amazonClone-yellow rounded  '>
            <select onChange={(e)=>setCategory(e.target.value)} 
            className='p-2 bg-gray-300 text-black border text-xs xl:text-sm' >
                <option >All</option>
                <option >Deals</option>
                <option >Fashion</option>
                <option >Home</option>
                <option >Computers</option>
                <option >Mobiles</option>
                <option >Amazon</option>
            </select>

            <input className='flex grow items-center h-[100%] text-black rounded-l' type="text"  value={searchTerm} 
            onChange={(e)=>setSearchTerm(e.target.value)}/>
           
            <button onClick={onHandleSubmit} className='w-[45px]'>
            <MagnifyingGlassIcon className='h-[27px] ml-1'/>
        </button>
        </div>
        { suggestions &&
          <div className='text-black bg-white w-full z-40 absolute'>
           {
            suggestions.filter((suggestions)=>{
            const currentSearchTerm = searchTerm.toLowerCase();
            const title = suggestions.title.toLowerCase();
            return(
              currentSearchTerm && 
              title.startsWith(currentSearchTerm) &&
              title !== currentSearchTerm
            )
           })
           .slice(0,10)
           .map((suggestion)=>
             <div key={suggestion.id} onClick={()=>setSearchTerm(suggestion.title)}>
              {suggestion.title}
             </div>
           )
          }
          </div>

        }
      
    </div>
  )
}

export default Search