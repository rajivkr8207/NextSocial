import SideNavbar from './components/SideNavbar'
import { Outlet } from 'react-router'

const PostLayout = () => {
    return (
        <>
            <div className='PostLayout'>
                <SideNavbar />
                <div className='post_outlet'>
                    <Outlet />

                </div>
            </div>
        </>
    )
}

export default PostLayout