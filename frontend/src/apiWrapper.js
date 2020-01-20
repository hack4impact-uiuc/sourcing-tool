import axios from "axios";

const BASE_URL = "http://localhost:5000/";

export const addNonprofit = (name, media, first, last, email, linkedin, fname, position, last_updated,
    status, comments, semester) => {
  const requestString = `${BASE_URL}add`;
  axios.post(requestString, {
        name: name, 
        media: media, 
        first: first,
        last: last, 
        email: email,
        linkedin: linkedin,
        fname: fname, 
        position: position,
        last_updated: last_updated,
        status: status, 
        comments: comments,
        semester: semester
    })
    .catch(error => {
      return {
        type: "ADD_NONPROFIT_FAIL",
        error
      };
    });
};

export const editNonprofit = (name, media, first, last, email, linkedin, fname, position, last_updated,
    status, comments, semester) => {
    const requestString = `${BASE_URL}edit?nonprofit_name=${name}`;
    return axios
      .put(requestString, {
        name: name, 
        media: media, 
        first: first,
        last: last, 
        email: email,
        linkedin: linkedin,
        fname: fname, 
        position: position,
        last_updated: last_updated,
        status: status, 
        comments: comments,
        semester: semester
      })
      .catch(error => {
        return {
          type: "EDIT_NONPROFIT_FAIL",
          error
        };
      });
  };