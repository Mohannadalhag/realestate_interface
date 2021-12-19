const axios = require ('axios');
//request interceptor to add the auth token header to requests
axios.interceptors.request.use(
    (config) => {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers["authorization"] = "Bearer " + accessToken;
      }
      return config;
    },
    (error) => {
      Promise.reject(error);
    }
  );

module.exports = {
    get:async(URL)=>
    {
        const response = await axios.get(URL, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
  

        const data = response.data;
        return data;
        
    },
    getbyId:async(URL,id)=>
    {
        const response = await axios.get(`${URL}/${id}`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
                
            }
        });
        const data = response.data;
        return data;
    },
    post:async(URL, body)=>
    {
        const response = await axios.post(URL, body);
  

        const data = response.data;
        return data;
    },
    putWithoutId:async(URL, body)=>
    {
        const response = await axios.put(URL, body);
  

        const data = response.data;
        return data;
    },
    put:async(URL, body, id)=>
    {
        const response = await axios.put(`${URL}/${id}`, body);
        const data = response.data;
        return data;
    },
    patch:async(URL, body, id)=>
    {
        const response = await axios.patch(`${URL}/${id}`, body);
        const data = response.data;
        return data;
    },
    delete:async(URL, id)=>
    {
        const response = await axios.delete(`${URL}/${id}`);
  

        const data = response.data;
        return data;
    }
    
}