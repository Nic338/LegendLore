const baseUrl = "/api/UserProfile";

export const login = (userObject) => {
    return fetch(`${baseUrl}?email=${userObject.email}`)
    .then((r) => r.json())
      .then((userProfile) => {
        if(userProfile.id){
          localStorage.setItem("userProfile", JSON.stringify(userProfile));
          return userProfile
        }
        else{
          return undefined
        }
      });
  };

export const logout = () => {
    localStorage.clear()
};

export const getUserStatus = (email) => {
    return fetch(`${baseUrl}?email=${email}`).then((res) => res.json());
  };

  export const register = (userObject) => {
    return  fetch(`${baseUrl}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userObject),
    })
    .then((response) => response.json())
      .then((savedUserProfile) => {
        localStorage.setItem("userProfile", JSON.stringify(savedUserProfile))
      });
  };