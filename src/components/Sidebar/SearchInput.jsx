import React, { useState } from 'react'
import {IoSearchSharp} from "react-icons/io5"
import api from '../../apis.jsx';
import { useGlobalContext } from '../../context/useContext.jsx';

export const SearchInput = () => {

  const {globalState,setGlobalState}=useGlobalContext();
  const [searchString,setSearchString]=useState();

  const [users,setUsers]=useState([]);

  const handleChange=(e)=>{
    setSearchString(e.target.value);
  }

  const handleSearch=async ()=>{
    try{
      const res=await api.get(`/search/${searchString}`);
      // console.log(res.data);
      // console.log('Users list from search component',users);
      setUsers(res.data.users);
    }catch(err){
      setUsers([])
      console.log(err);
    }
  }

  const addFriend=async (x)=>{
    // console.log(x)
    // console.log(globalState)

    const friendExists = globalState.friends.some(friend => friend._id === x._id);

    // Update state only if x is not already in friends
    if (!friendExists) {
        setGlobalState({
            ...globalState,
            friendId: x._id,
            friends: [...globalState.friends, x],
            friendName:x.userName
        });
    }
    else{
      setGlobalState({
        ...globalState,
        friendId: x._id,
        friends: [...globalState.friends],
        friendName:x.userName

    });

    setUsers([])
    }
  }

  return (
    //Implemented using form in video.
    <div className='w-full relative '>
      {/* <div className='flex'> */}
          <div className='w-11/12 flex'>
            <input type='text' className='input input-bordered rounded-full w-full bg-gray-600 text-gray-300' onChange={(e)=>handleChange(e)} value={searchString}/>
            <button className='btn btn-circle bg-gray-600 text-white ml-3' onClick={()=>handleSearch()}>
                <IoSearchSharp className='w-6 h-6 '/>
            </button>
          </div>
        <div className=' absolute  bg-gray-500 mt-3 w-full min-w-36 overflow-y-scroll max-h-96 ' style={{zIndex:12}}>
          {users?.map((x)=>(
            // <div key={x._id} className='bg-gray-400'>{x.userName}</div>
            <div className=' items-center hover:bg-gray-400 rounded-full border-2  w-11/12 pt-1 pb-1 text-gray-700 items-center text-center' key={x._id} onClick={()=>addFriend(x)}>
              <div className=' text-2xl font-semibold'>{x.userName}</div>  
          </div>
          ))}
        </div>
      {/* </div> */}
    </div>
  )
}


// style={{position:'relative',right:'4rem'}}