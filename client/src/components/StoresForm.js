import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.min.css';

function StoresForm({storesList, editStoresList, clearForm, setClearForm}) {

const [stores, setStores] = useState([]);
const [selectedStores, setSelectedStores] = useState([]);
const [newStoreName, setNewStoreName] = useState('');
const [errors, setErrors] = useState([]);


  useEffect(()=>{
    fetch('/stores')
    .then(r => r.json())
    .then(data=> setStores(data))
// eslint-disable-next-line
  },[])

  useEffect(()=>{
    if(clearForm){
        setSelectedStores([]);
        storesList([]);
        setClearForm(false)
    }
// eslint-disable-next-line
  },[clearForm])

  useEffect(()=>{
    if(editStoresList){
        setSelectedStores(editStoresList)
    }
// eslint-disable-next-line
  },[editStoresList])

  
  function handleCheckboxChange(e, index){
    const newSelectedStores = [...selectedStores];
    if (e.target.checked) {
      newSelectedStores.push(stores[index].id);
    } else {
      const storeIndex = newSelectedStores.indexOf(stores[index].id);
      if (storeIndex > -1) {
        newSelectedStores.splice(storeIndex, 1);
      }
    }
    setSelectedStores(newSelectedStores);
    storesList(newSelectedStores);
  };

  const handleNewStoreNameChange = (event) => {
    setNewStoreName(event.target.value);
  };

  async function handleAddStore(){
    if (newStoreName.trim() !== '') {
        const response = await fetch('/stores', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newStoreName }),
        })
        const data = await response.json()
        if (response.ok) {
          const newStore = data
          setStores([...stores, newStore]);
          setNewStoreName('');
        } else {
          setErrors(data.errors);
        }
    }
  };

  return (
          <div className="columns is-multiline">
            {stores.map((store, index) => (
              <div className="column is-one-quarter" key={index}>
                <div className="field">
                  <label className="checkbox">
                    <input type="checkbox" checked={selectedStores.indexOf(store.id) > -1} onChange={(event) => handleCheckboxChange(event, index)} />
                    {store.name}
                  </label>
                </div>
              </div>
            ))}
            <div className="column is-one-quarter">
              <div className="field">
                <label className="label">Add a store:</label>
                <div className="control">
                  <input className="input" type="text" value={newStoreName} onChange={handleNewStoreNameChange} placeholder="Store name" />
                  <p className="help is-danger">
                    {errors ? errors.name : null}
                    </p>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-small is-primary" type="button" onClick={handleAddStore}>Add</button>
                </div>
              </div>
            </div>
          </div>
  );
}

export default StoresForm;
