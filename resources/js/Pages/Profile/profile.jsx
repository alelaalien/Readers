import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faFileInvoice, faHeart, faList, faMessage, faPen, faPodcast, faRocket, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import styled from 'styled-components';
import { useState } from 'react';
import $ from 'jquery';
import { Modal, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';


export default function Profile({ auth, user, url }) {
 
    const userData = user ? user[0] : null;
  
    const titles = [{title:"Revelations of self", icon: faUser, url : "revelations_of_self", 
                        content: 'This public space serves as your introduction to those visiting your profile, allowing them to get to know you better.',
                        revelation : 'Feel free to share a more detailed introduction about yourself here'},
                    {title:"My literary offerings", icon: faHeart, url : "my_literary_offerings"},
                    {title:"Literary treasures i pursue", icon: faSearch, url : "literary_treasures_i_pursue"},
                    {title:"Reflections from my literary journeys", icon:  faPen , url : "reflections_from_my_literary_journeys"},
                    {title:"Delve into my collection of poems", icon: faList , url : "delve_into_my_collection_of_poems"},
                    {title:"Listen to the echoes of my mind", icon: faRocket, url : "listen_to_the_echoes_of_my_mind"},
                    {title:"Explore my podcast anthology", icon: faPodcast, url : "explore_my_podcast_anthology"},
                    {title:"Message me", icon: faMessage, url : "contact"},
                    ];
    const medias = {
                        facebook : userData.facebook,
                        twitter : userData.twitter,
                        instagram : userData.instagram,
                        youtube : userData.youtube,
                        linkedin : userData.linkedin
                    }
    const iconMapping = {
                        facebook: faFacebook,
                        twitter: faTwitter,
                        instagram: faInstagram,
                        youtube: faYoutube,
                        linkedin: faLinkedin,
                        };
 
    const [isEditing, setIsEditing] = useState(false);
    const [editMedias, setEditMedias] = useState(false);
    const [editDescription, setEditDescription] = useState(false);
    const [editRevelation, setEditRevelation] = useState(false);
    const [currentPic, setCurrentPic] = useState(userData ? userData.pic !== null ? url + '/' + userData.pic : url + '/back.jpg' : url + 'back.jpg');
    const [currentDescription, setCurrentDescription] =useState(userData ? userData.description : title[0].content);
    const [currentRevelation, setCurrentRevelation] =useState(userData ? userData.revelations !== null? userData.revelations : title[0].revelation :title[0].revelation);
    const [show, setShow] = useState(false);

    const [socialMedias, setSocialMedias] = useState(medias);
    // const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = (event) => {
        // setIsHovered(true);
         $(event.target.parentNode).addClass('editor-shadow');
         $(event.target).addClass('btn-edit-profile'); 
    };

    const handleMouseOut = (event) => {
        $(event.target.parentNode).removeClass('editor-shadow');
        $(event.target).removeClass('btn-edit-profile');
    };

    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content');

    const handleEditing = () =>{
        setIsEditing(!isEditing);

        if(!isEditing) {

            setEditDescription(false);
            setEditRevelation(false);
            setEditMedias(false);
        } 
    }

    const handleMedias = () =>{
        setEditMedias(!editMedias);
    }

    const handleEditDescription = () =>{
        setEditDescription(!editDescription);

    }
 
    const saveDescription = (event) =>{

        let item = 'description' ;

        let itemValue = $('#edit-' + item).val();

        saveData(event, item, itemValue);

        setEditDescription(false);
    }

    const saveRevelation = (event) =>{

        let item = 'revelations_of_self' ;

        let itemValue = $('#edit-' + item).val();

        saveData(event, item, itemValue);

        setEditRevelation(false);
    }

    const clearInput = () =>{ $('input[type="file"]').val(''); }
 
    const savePic = async (event) => {
        event.preventDefault();
        const fileInput = document.querySelector('input[type="file"]');
        const file = fileInput.files[0];
        if(!file) return;
        const formData = new FormData();
        formData.append('profile_photo', file);
  
        const options = {
            method: 'POST', 
            body: formData,
            headers :{'X-CSRF-TOKEN' : token}
        };
    
        try {
            const response = await fetch('http://127.0.0.1:8000/savePic', options);
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const responseData = await response.json();
 
                clearInput();
               
                setCurrentPic(url + '/' + responseData);

        } catch (error) {
            console.error('Error:', error);
        }
    };
    const saveData= async(event, item, value) =>{
 
        event.preventDefault();

        const options = {
            headers : {
                'Content-Type' : 'application/json',
                'X-CSRF-TOKEN' : token
            },
            method : 'POST',
            body : JSON.stringify({
                [item] : value
            })
        }  

        const result = await fetch('http://127.0.0.1:8000/saveDescription', options);

        const response = await result.json();
 
        if(response === 1){

            switch (item) {
                case 'description': setCurrentDescription(value);  break;
                case 'revelations_of_self': setCurrentRevelation(value);  break; 
                default: break;
            } 
        }else{  console.error(response); }  
    } 

    const showConfirmationModal = () => {
        Swal.fire({
          title: 'Are you sure?',
          text: 'You will lose the changes', 
          showCancelButton: true,
          confirmButtonText: 'Discard changes',
          cancelButtonText: 'Cancel',
          confirmButtonColor: 'red',
          customClass: {
            popup: 'modal-rev',  
          },
        }).then((result) => {
          if (result.isConfirmed) {

            setEditRevelation(false);
            handleClose();
             
          }  
        });
      };
    
      const saveMedias = async(event) =>{
        
        event.preventDefault();

        let mediaInput = $('.media-editors');

        const newMedias = {};

        for (let i = 0; i < mediaInput.length; i++) {
            const name = $(mediaInput[i]).attr('name');
            const value = $(mediaInput[i]).val();
            newMedias[name] = value;
        }

        const options = {
            headers : {'Content-Type' : 'application/json',
                      'X-CSRF-TOKEN' : token},
            method : 'POST',
            body : JSON.stringify(newMedias)
        } 
        const result = await fetch('http://127.0.0.1:8000/newMedias', options);

        const response = await result.json();

       
        if(response.success){

            setSocialMedias(newMedias);
            setEditMedias(false); 
            

        }else{
            Swal.fire({
                position: "center",
                icon: "error",
                title: response.error,
                showConfirmButton: false,
                timer: 1800
              });
        } 
      }
    

    return (
        <> 
        <div id="profiles">  
        <div className="mobile-nav-toggle d-lg-none d-md-flex">
            <FontAwesomeIcon icon={faBars}/>
        </div>   
            <div className='row'>
                <div className='col-lg-4' >
                    <Header className='h-screen'>
                        <div className="d-flex flex-column ">
                            <div className="profile">  
                                <img src= {currentPic}  alt="user" className="img-fluid rounded-circle"/>
                                <h1 className="text-light"><a href="index.html"> </a></h1>
                                <div className="social-links mt-3 text-center">  
                                </div>
                            </div>

                            <div id='media-links' className='flex justify-content-center'>
                            {
                                Object.keys(socialMedias).map((element, index) =>( 
                                    socialMedias[element] && (
                                 
                                         <a  key={`ml-${index}`}
                                            className='fit'
                                            href={socialMedias[element].startsWith('https://') ? socialMedias[element] : `https://${socialMedias[element]}`} target='_blank'>
                                            <FontAwesomeIcon icon={iconMapping[element]} className="icon mr-2" style={{color: 'wheat',  fontSize: '1.5em'}}/>
                                         </a >  
                                  )
                                ))
                            }   
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
                                    {auth.user && auth.user.id === userData.id &&(
                                        <li className='text-center'><button className='btn btn-danger'>Log out</button></li>
                                    )}
                                </ul>
                            </nav> 
                        </div>
                    </Header>
                </div>
                <div className='col-lg-8' > 
                    <section id="hero" style={{ backgroundImage: `url('${currentPic}')` }} className="d-flex flex-column justify-content-center align-items-center h-screen bg-cover">   
                   
                        <div className="hero-container" data-aos="fade-in">
                            <h1 className="editable">{userData.name}</h1>
                            <p>I'm <span className="typed" data-typed-items="Designer, Developer, Freelancer, Photographer"></span></p>
                        </div>  
                    </section> 
                    <div className='pl-4 pr-8'>  
                        {/* sections */}
                        <div className='min-h-screen' id={titles[0].url}>
                            <div className='d-flex justify-between rounded-lg'> 
                                {auth.user && userData.id === auth.user.id ?
                                    ( 
                                        isEditing ? (
                                            <>
                                                <h2 className='blue bottom-blue pt-4 w-9/12'>{titles[0].title}</h2>
                                                <button className='btn btn-primary self-center fit' onClick={handleEditing}>Close editor</button>
                                            </>
                                        ): (
                                            
                                            <>
                                                <h2 className='bottom-blue blue pt-4 w-9/12'>{titles[0].title}</h2>
                                                <button className='btn btn-primary self-center fit'  onClick={handleEditing}>Edit</button>
                                            </>
                                        )
                                            
                                    ):(
                                        <h2 className='blue bottom-blue'>{titles[0].title}</h2>
                                    ) 
                                }
                            </div> 
                            <div className='row'>
                                <div className='col-12'>  
                                    {isEditing ? 
                                        (
                                            editDescription ? (
                                                <>
                                                    <textarea id='edit-description' defaultValue={currentDescription} className='form-control' rows="2" cols="2"></textarea>
                                                    <div className='ml-auto p-2'>
                                                        <button className='btn btn-danger mb-2 pull-right' onClick={handleEditDescription}>Cancel</button>
                                                        <button className='btn btn-success mb-2 pull-right' onClick={saveDescription}>Save</button> 
                                                    </div> 
                                                </>
                                            ): ( 
                                                    <div className='d-flex justify-between rounded-lg mb-4'>
                                                        <h4 className='text-justify p-4'>{currentDescription}</h4>
                                                        <button className='btn btn-primary mt-4 fit ' 
                                                            onClick={handleEditDescription}
                                                            onMouseOver={handleMouseOver}
                                                            onMouseOut={handleMouseOut}>
                                                            Edit
                                                        </button>
                                                    </div>   
                                            )
                                        ):(
                                            <h4 className='text-justify p-4'>{currentDescription}</h4>

                                        ) 
                                    }
                                </div>
                                <div className='col-4'>
                                    <img src={ currentPic } alt="user pic" />
                                    {isEditing && (
                                        <>
                                        <input type="file" accept='image/*' className='form-control'/>
                                        <div className='d-flex justify-between rounded-lg'>   
                                            <button className='btn btn-danger  self-center fit' onClick={clearInput}>Cancel</button>
                                            <button className='btn btn-success   self-center fit' onClick={savePic}>Save</button>
                                        </div>
                                        </>
                                    )}
                                    
                                </div>
                                <div className='col-8'>
                                    {
                                        isEditing ? (
                                            editRevelation ?(
                                                <>
                                                    <textarea className='form-control' id='edit-revelations_of_self' defaultValue={currentRevelation} rows="10"></textarea>
                                                    <div className='d-flex justify-between'>   
                                                        <button className='btn btn-danger  self-center fit'  onClick={handleShow}>Cancel</button>
                                                        <button className='btn btn-success   self-center fit' onClick={saveRevelation}>Save</button>
                                                    </div>
                                                </>
                                            ):(
                                                <div className='d-flex justify-between rounded-lg'>
                                                    <h5 className='text-justify p-4'>{currentRevelation}</h5>
                                                    <button className='btn btn-primary mt-4 fit'  data-toggle="modal" data-target="#modalEdit"  
                                                        onClick={handleShow}
                                                        onMouseOver={handleMouseOver}
                                                        onMouseOut={handleMouseOut}>
                                                        Edit
                                                    </button>
                                                </div>  
                                            )

                                        ):(
                                          <h5 className='text-justify'>{currentRevelation}</h5>  
                                        )
                                    }
                                    
                                </div>
                            </div>
                            {isEditing &&(
                                <div className='row  m-auto'> 
                                        <div className='col-12'> 
                                            <div className='d-flex justify-between'>
                                                <h5 className='w-full text-center'>Personal info & social medias</h5>
                                                {editMedias ? (
                                                    <>
                                                        <button className='btn btn-danger' onClick={handleMedias}>Cancel</button>
                                                        <button className='btn btn-primary' onClick={saveMedias}>Save</button>
                                                    </>
                                                ):(
                                                    <button className='btn btn-primary' onClick={handleMedias}>Edit</button>
                                                )}
                                                
                                            </div> 
                                            <div className='row'> 
                                            <div className='col-6'>
                                                <div className='form-group'>
                                                    <label className='capitalize'>
                                                        <FontAwesomeIcon icon={faUser} className="icon mr-2"/>
                                                        Name:</label>
                                                        
                                                        {editMedias ? (
                                                             
                                                             <input type="text" className="form-control personal-editor" defaultValue={userData.name}  name="name" />
                                                        ):
                                                        (
                                                            <h6 className='text-muted pl-2 capitalize'>{userData.name}</h6>
                                                        )}

                                                    
                                                </div>
                                            </div>
                                            <div className='col-6'> 
                                            
                                                {
                                                   Object.keys(socialMedias).map((element, index) =>( 
                                                        <div className="form-group" key={`group-${index}`}> 
                                                            <label className='capitalize'>
                                                            <FontAwesomeIcon icon={iconMapping[element]} className="icon mr-2"/>
                                                            {element}:
                                                            </label>
                                                            {
                                                            editMedias ? (
                                                                    <input type="text" className="form-control media-editors" defaultValue={socialMedias[element]}  name={element.toLowerCase()} />
                                                                ):(
                                                                    <h6 className='text-muted pl-2'>

                                                                        {socialMedias[element] ? 
                                                                        <a href={socialMedias[element].startsWith('https://') ? socialMedias[element] : `https://${socialMedias[element]}`} target='_blank'>
                                                                            {socialMedias[element].startsWith('https://') ? socialMedias[element] : `https://${socialMedias[element]}`}
                                                                        </a >: 'No data'}
                                                                    </h6>
                                                                )
                                                            } 
                                                        </div>
                                                    ))
                                                }   
                                            </div>
                                            </div>
                                        </div> 
                                </div>
                            )} 
                        </div> 
                        <div className='h-screen' id={titles[1].url} style={{marginTop:  isEditing ? '3rem' : ''}}>
                            <h2 className='blue bottom-blue'>{titles[1].title}</h2>
                            
                        </div>

                        <div className='h-screen' id={titles[2].url}>
                            <h2 className='blue bottom-blue'>{titles[2].title}</h2>
                            
                        </div>

                        <div className='h-screen' id={titles[3].url}>
                            <h2 className='blue bottom-blue'>{titles[3].title}</h2>
                            
                        </div>

                        <div className='h-screen' id={titles[4].url}>
                            <h2 className='blue bottom-blue'>{titles[4].title}</h2>
                            
                        </div>

                        <div className='h-screen' id={titles[5].url}>
                            <h2 className='blue bottom-blue'>{titles[5].title}</h2>
                            
                        </div>

                        <div className='h-screen' id={titles[6].url}>
                            <h2 className='blue bottom-blue'>{titles[6].title}</h2>
                            
                        </div>

                        <div className='h-screen' id={titles[7].url}>
                            <h2 className='blue bottom-blue'>{titles[7].title}</h2>
                            
                        </div>  
                    </div> 
                </div>
            </div> 
        </div> 

        {/* modal */}  

      <Modal show={show} onHide={handleClose}  dialogClassName="modal-lg" backdrop="static" keyboard={false}>
        <Modal.Header>
          <Modal.Title>Modal de Ejemplo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
           <textarea name="edit-revelation" id="" cols="30" rows="10" 
           defaultValue={currentRevelation}
           className='form-control'></textarea>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={showConfirmationModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal> 
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