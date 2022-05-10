const config = {
    'API_URL': "https://illy-vinylshop.herokuapp.com/api",
    'TEST_URL': "https://8080-illydali-proj3ecomm-qpnijq6y2hg.ws-us44.gitpod.io/api",

}


const getHTTPHeaders = (accessToken) => {
    return {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    };
  };


export default { config, getHTTPHeaders }
