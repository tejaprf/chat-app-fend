import { SearchInput } from './SearchInput.jsx';
import { Conversations } from './Conversations.jsx';
import { LogOutButton } from './LogOutButton.jsx';


export const Sidebar = () => {
  return (
    // <div className='border-2 border-gray-400 border-solid w-1/3 min-w-48 p-4 flex flex-col bg-gray-300'>
    <div className='border-2 border-gray-400 border-solid w-1/3 min-w-48 p-4 bg-gray-300 flex flex-col'>
        <SearchInput/>
        <div className='flex-1 overflow-auto'>
          <Conversations/>
        </div>
        <LogOutButton />

        {/* <div style={{position:'absolute',bottom:"3.5rem"}}>
         <LogOutButton />
        </div> */}
    </div>
  )
}
