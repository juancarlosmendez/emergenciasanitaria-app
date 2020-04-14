import GLOBALS from '../config/Globals.js';

  
  export  function fetchDataAppApi(url,requestBodyJson,onComplete,onFail) {
    fetch(GLOBALS.EMERGENCIES_API_ENDPOINT+url,{
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth-Key': GLOBALS.EMERGENCIES_API_KEY
      }),      
      body: JSON.stringify(requestBodyJson)
    //bring as text() because in this point .json() is unCatcheable
    }).then((response) => response.text()) 
    .then((response) => {
      onComplete(response);          
    })
    .catch(error => {
      //console.error("error 1 network:"+error);
      onError(error);
      
  });
  }
  


  export function fetchData(url) {
    fetch(url,{
      method: 'POST',
      headers: new Headers({
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Auth-Key': GLOBALS.EMERGENCIES_API_KEY
      }),
      /*
      body: JSON.stringify({
        "largePersonGroupId": "golds1",
        "maxNumOfCandidatesReturned": 1,
        "confidenceThreshold": 1               
      })*/
    //}).then((response) => response.text())
    }).then((response) => response.text()) //bring as text() because in this point .json() is unCatcheable
    .then((response) => {
      this.processDataCategories(response);          
    })
    .catch(error => {
      console.error("error 1 network:"+error);
  
      try {
        const value = AsyncStorage.getItem(GLOBALS.ASYNCSTORAGE_CATEGORIES);
        if (value !== null) {
          //AQUI SETEA DE NUEVO TODOS LOS DATOS
          this.processDataCategories(response);  
        }
      } catch (error) {
        // Error retrieving local data
      }
  });
  }
  