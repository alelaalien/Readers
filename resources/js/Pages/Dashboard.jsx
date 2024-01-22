import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFileInvoice, faHeart, faList, faMessage, faPen, faPodcast, faRocket, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components';

export default function Dashboard({ auth, user }) {
    
    user = {name: 'hola', profile_photo_path : 'profile.png'}
    const titles = [{title:"Revelations of self", icon: faUser, url : "revelations_of_self"},
                    {title:"My literary offerings", icon: faHeart, url : "my_literary_offerings"},
                    {title:"Literary treasures i pursue", icon: faSearch, url : "literary_treasures_i_pursue"},
                    {title:"Reflections from my literary journeys", icon:  faPen , url : "reflections_from_my_literary_journeys"},
                    {title:"Delve into my collection of poems", icon: faList , url : "delve_into_my_collection_of_poems"},
                    {title:"Listen to the echoes of my mind", icon: faRocket, url : "listen_to_the_echoes_of_my_mind"},
                    {title:"Explore my podcast anthology", icon: faPodcast, url : "explore_my_podcast_anthology"},
                    {title:"Message me", icon: faMessage, url : "contact"},
                    ];

    return (
        <>
           
        <div id="profiles">  
            <div className='row'>
                <div className='col-lg-4' >
                <Header className='h-screen'>
                            <div className="d-flex flex-column ">
                                <div className="profile">  
                                    <img src= {user.profile_photo_path}  alt="user" className="img-fluid rounded-circle"/>
                                    <h1 className="text-light"><a href="index.html"> </a></h1>
                                    <div className="social-links mt-3 text-center">  
                                    {/* <a href="{{strpos($detail->$sm, 'https://') === 0 ? $detail->$sm : 'https://' . $detail->$sm }}" target="_blank" className="{{$sm}}"><i className="bx bxl-{{$sm}}" style={background: 'transparent'} ></i></a> */}

                                    </div>
                                </div>
                                <nav id="navbar" className="nav-menu navbar nav-profile mb-0">
                                    <ul className='w-full'> 
                                        {
                                            titles.map((el, index) =>(
                                                <li key={index + 'li'}>
                                                    <a href={"#" +el.url} className="nav-link scrollto">
                                                            <FontAwesomeIcon icon={el.icon}/> 
                                                            <span style={{marginLeft : '2%'}} >{el.title}</span>
                                                    </a>
                                                </li> 
                                            )) 
                                        } 
                                    </ul>
                                </nav> 
                            </div>
                        </Header>
                </div>
                <div className='col-lg-8' > 
                    <section id="hero" style={{ backgroundImage: `url('users/${user.profile_photo_path}')` }} className="d-flex flex-column justify-content-center align-items-center h-screen bg-cover">   
                   
                        <div className="hero-container" data-aos="fade-in">
                        <h1 className="editable">{user.name}</h1>
                        <p>I'm <span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer"></span></p>
                        </div> 
                        {/* @if($isProfileOwner)
                            @livewire('editing-button')
                        @endif  */}
                    </section> 
                    <div>
                        {
                        titles.map((el, index) =>(
                            <div key={index + 'div'} id={el.url} className='h-screen'>
                                <h2>{el.title}</h2>
                                        
                                
                            </div> 
                        )) 
                        }  
                    </div> 
                </div>
            </div>
                 
        </div> 
            <div className="mobile-nav-toggle d-lg-none d-md-flex">
                <FontAwesomeIcon icon={faBars}/>
            </div>  
            </>
    );
}

const Header = styled.div`
    transition: all ease-in-out 0.5s;
    transition: all 0.5s;
    padding: 0 15px;
    background:#0b0503;
    overflow-y: auto;
    position: sticky;
    top: 0;
    height: 100vh;
  
   .profile img {
    margin: 15px auto;
    display: block;
    width: 120px;
    border: 8px solid #2c2f3f;
  }
  
   .profile h1 {
    font-size: 24px;
    margin: 0;
    padding: 0;
    font-weight: 600;
    -moz-text-align-last: center;
    text-align-last: center;
    font-family: "Poppins", sans-serif;
  }
  
   .profile h1 a,
   .profile h1 a:hover {
    color: #fff;
    text-decoration: none;
  }
  
   .profile .social-links a {
    font-size: 18px;
    display: inline-block;
    background: #212431;
    color: #fff;
    line-height: 1;
    padding: 8px 0;
    margin-right: 4px;
    border-radius: 50%;
    text-align: center;
    width: 36px;
    height: 36px;
    transition: 0.3s;
  }
  
   .profile .social-links a:hover {
    background: #149ddd;
    color: #fff;
    text-decoration: none;
  }
  `