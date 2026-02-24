import SideNavbar from './components/SideNavbar'
import { Outlet } from 'react-router'

const PostLayout = () => {
    return (
        <>

            <div className="post-layout">
                <SideNavbar />

                <main className="post-outlet">
                    <Outlet />
                </main>
            </div>
        </>
    )
}

export default PostLayout