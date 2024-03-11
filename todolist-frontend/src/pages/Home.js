import '../assets/css/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useEffect } from "react";

const Home = () => {

  useEffect(() => {
    console.log("use effect !!")
  });

    return (
      <div className="home-container">
        <div className='container-fluid p-0'>
        <div className='row align-items-center'>
          <div className='col-11'>
            <input type="text" className='content-insert' placeholder='Insert Text...' />
          </div>
          <div className='col'>
          <button type="button" className="btn btn-success w-100">insert</button>
          </div>
        </div>
        </div>
        <div className='header-1'>My List</div>
        <div className='my-todo-list mt-3 text-start'>
          <div className='todo-list' id='list-1'>
            <div className='form-check check-list-1'>
              <div className='container'>
                <div className='row align-items-center'>
                  <div className='col'>
                    <input className="form-check-input" type="checkbox" value="" id="check-id-1" />
                  </div>
                  <div className='col-9'>
                    <span>TODO 1</span>
                  </div>
                  <div className='col-2 d-flex gap-2'>
                   <FontAwesomeIcon icon={faPenToSquare} id='edit-1' />
                   <FontAwesomeIcon icon={faTrash} id='remove-1' />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='line mt-2 mb-2'></div>
          <div className='todo-list' id='list-2'>
          <div className='form-check check-list-2'>
          <div className='container'>
              <div className='row align-items-center'>
                <div className='col'>
                  <input className="form-check-input" type="checkbox" value="" id="check-id-2" />
                </div>
                <div className='col-9'>
                  <span>TODO 2</span>
                </div>
                <div className='col-2 d-flex gap-2'>
                  <FontAwesomeIcon icon={faPenToSquare} id='edit-2' />
                  <FontAwesomeIcon icon={faTrash} id='remove-2' />
                </div>
              </div>
          </div>
          </div>
          </div>
          <div className='line mt-2 mb-2'></div>
        </div>
      </div>
    );
  };
  
  export default Home;