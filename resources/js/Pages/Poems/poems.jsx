import { Head } from '@inertiajs/react';
import Guest from '@/Layouts/GuestLayout';
import ReactionBar from '@/Components/ReactionBar';
import CommentList from '@/Components/CommentsList';
import { Parallax } from 'react-parallax';
  
export default function poems({ auth, poem , comments}) {

    const divStyle = {
       height: '500px' 
      };
    return (
        <Guest  auth={auth}> 
            <Head title="Poems" />
             <div className='container-fluid'>
                <div className='row container m-auto w-9/12'>
                    <div className="col-md-12 text-center p-0 bg-white" style={{boxShadow: '0 3px 79px rgb(0, 0, 0)'}}>
                    {/* img */}
                        <div className="mx-auto d-block bg-cover" style={{divStyle}}> 
                            <img src={`${poem.img}`} alt="" />  
                        </div>
                    {/* data */}
                    <hr/>
                    <Parallax blur={0} bgImage={`${poem.img}`} bgImageAlt="the cat" strength={500}>
       <div>
        <h1>Content goes here. Parallax height grows with content height.</h1>
        </div> 
    </Parallax>
                    <h1 className="font-bold text-2xl p-4">{ poem.title }</h1>
                    <p className="whitespace-pre-line">{ poem.content }</p> 
                    <ReactionBar poem={poem}  auth={auth}></ReactionBar> 
                    </div>
                </div> 
                <CommentList item={poem} comments={comments} key={'list' + poem.id} auth={auth}></CommentList>
             </div>
         </Guest>
    );
}
