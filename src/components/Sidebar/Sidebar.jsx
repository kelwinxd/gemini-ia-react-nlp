import './Sidebar.css'
import {assets} from '../../assets/assets' 
import { useContext, useState } from 'react'
import { Context } from '../../context/Context'

const Sidebar = () => {

   const [extend, setExtend] = useState(true)
   const {onSent,prevPrompt, setRecentPrompt} = useContext(Context)

  return (
    <div className='sidebar'>
      <div className="top">
            <img className='menu' src={assets.menu_icon} onClick={() => setExtend(!extend)} alt="" />
            <div className="new-chat">
              <img src={assets.plus_icon} alt=""  />
              {extend ? <p>New Chat</p> : null  } 
            </div>
            <div className="recent">
         <p className="recent-title">Recent</p>
           {prevPrompt.map((i,index) => (
             <div className="recent-entry">
             <img src={assets.message_icon} alt=""  />
            {extend ?  <p key={index}>{i.slice(0,15)}...</p>  : null} 
           </div>
           ))}
           
          
        </div>
      </div>
        

      <div className="bottom">
        <div className="bottom-item recent-entry">
          <img src={assets.question_icon} alt=""  />
          {extend ? <p>Help</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.history_icon} alt=""  />
          {extend ? <p>Activity</p> : null}
        </div>

        <div className="bottom-item recent-entry">
          <img src={assets.setting_icon} alt=""  />
         {extend ? <p>Settings</p> : null} 
        </div>
      </div>
      </div>
  )
}

export default Sidebar