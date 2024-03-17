import '../assets/css/Home.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { useState, useEffect } from "react";

const Home = () => {

  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
  });
  const [formDataUpdate, setFormDataUpdate] = useState({
    titleUpdate: '',
  });

  const [editItem, setEditItem] = useState({
    itemId: null
  })

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const fetchData = async () => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    try {
      const response = await fetch(`${backendUrl}/todo_list`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleInputUpdateChange = (event) => {
    const { name, value } = event.target;
    setFormDataUpdate({ ...formDataUpdate, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    fetch(`${backendUrl}/todo_list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      fetchData();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

  const handleCheckboxChange = async (id, e) => {
    const isChecked = e.target.checked;
    
    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      // Make your API call here to update the value
      const response = await fetch(`${backendUrl}/todo_list/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "is_success": isChecked
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update value');
      }
      fetchData();
    } catch (error) {
      console.error('Error updating value:', error);
    }
  }

  const removeItem = async (id, e) =>{

    const backendUrl = process.env.REACT_APP_BACKEND_URL;

    try {
      const response = await fetch(`${backendUrl}/todo_list/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      fetchData();
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  const setIdEditItem = (id, e) =>{
    setEditItem({itemId: id})
  }

  const handleUpdateItem = async (id, e) =>{
    e.preventDefault(); // Prevent default form submission behavior
    const backendUrl = process.env.REACT_APP_BACKEND_URL;
    const body = {'title': formDataUpdate.titleUpdate}
    fetch(`${backendUrl}/todo_list/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      setIdEditItem(null)
      fetchData();
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }

    return (
      <div className="home-container">
          <form onSubmit={handleSubmit}>
          <div className='container-fluid p-0'>
          <div className='row align-items-center'>
            <div className='col-11'>
              <input type="text" name="title" className='content-insert' placeholder='Insert Text...' value={formData.title}
            onChange={handleInputChange} autoComplete="off"/>
            </div>
            <div className='col'>
            <button type="submit" className="btn btn-success w-100" >add</button>
            </div>
          </div>
          </div>
        </form>
        <div className='header-1'>My List</div>
        <div className='my-todo-list mt-3 text-start'>
        {data.map((item, index) => (
          <div className='todo-list' id={`list-${item.id}`} key={index}>
          <div className='form-check check-list-1'>
            <div className='container'>
              <div className='row align-items-center'>
                <div className='col'>
                  <input className="form-check-input" type="checkbox" id={`check-id-${item.id}`} checked={item.is_success} 
                  onChange={(e) => handleCheckboxChange(item.id, e)}
                  />
                </div>
                <div className='col-9'>
                {!editItem.itemId || editItem.itemId !== item.id? (
                    <span className={item.is_success ? 'success-work' : ''}>{item.title}</span>
                  ) : (
                    <div className='d-flex align-items-center'>
                      <form onSubmit={(e) => handleUpdateItem(editItem.itemId, e)} className='w-100'>
                      <input type="text" name="titleUpdate" placeholder='Insert Text...' value={formDataUpdate.titleUpdate}
            onChange={handleInputUpdateChange} autoComplete="off"/>
                  <button type="submit" className="btn btn-success ms-3 update-btn" >update</button>
                    </form>
                    </div>
                    
                  )}
                </div>
                {(!editItem.itemId || editItem.itemId !== item.id) && (
                    <div className='col-2 d-flex gap-2'>
                    {!item.is_success && (
                        <FontAwesomeIcon icon={faPenToSquare} id={`edit-${item.id}`}  onClick={(e) => setIdEditItem(item.id, e)}/>
                      )}
                     <FontAwesomeIcon icon={faTrash} id={`remove-${item.id}`} onClick={(e) => removeItem(item.id, e)} />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </div>
        ))}
        </div>
      </div>
    );
  };
  
  export default Home;