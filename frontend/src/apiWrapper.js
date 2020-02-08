import axios from "axios";

const BASE_URL = "https://rocky-scrubland-28747.herokuapp.com/";

export const addNonprofit = async (name, media, first, last, email, linkedin, fname, position, last_updated,
    status, comments, semester) => {
  const requestString = `${BASE_URL}add`;
  var bodyFormData = new FormData();
  bodyFormData.append('name', name);
  bodyFormData.append('media', media);
  bodyFormData.append('first', first);
  bodyFormData.append('last', last);
  bodyFormData.append('email', email);
  bodyFormData.append('linkedin', linkedin);
  bodyFormData.append('fname', fname);
  bodyFormData.append('position', position);
  bodyFormData.append('last_updated', last_updated);
  bodyFormData.append('status', status);
  bodyFormData.append('comments', comments);
  bodyFormData.append('semester', semester);

  let response = await  axios({
    method: 'post',
    url: requestString,
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data'}
  })
  .catch(error => {
    return {
      type: "ADD_NONPROFIT_FAIL",
      error
    };
  });
  return response;
};


export const newSemester = async (name, prev_sem) => {
const requestString = `${BASE_URL}new_sem`;
var bodyFormData = new FormData();
bodyFormData.append('name', name);
bodyFormData.append('prev_sem', prev_sem);

let response = await  axios({
  method: 'post',
  url: requestString,
  data: bodyFormData,
  headers: {'Content-Type': 'multipart/form-data'}
})
.catch(error => {
  return {
    type: "ADD_NONPROFIT_FAIL",
    error
  };
});
return response
};

export const editNonprofit = async (name, media, first, last, email, linkedin, fname, position, last_updated,
    status, comments, semester, prev_name) => {
    const requestString = `${BASE_URL}edit`;
    var bodyFormData = new FormData();
  bodyFormData.append('name', name);
  bodyFormData.append('media', media);
  bodyFormData.append('first', first);
  bodyFormData.append('last', last);
  bodyFormData.append('email', email);
  bodyFormData.append('linkedin', linkedin);
  bodyFormData.append('fname', fname);
  bodyFormData.append('position', position);
  bodyFormData.append('last_updated', last_updated);
  bodyFormData.append('status', status);
  bodyFormData.append('comments', comments);
  bodyFormData.append('semester', semester);
  bodyFormData.append('prev_name', prev_name);


  let response = await  axios({
    method: 'put',
    url: requestString,
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data'}
  })
      .catch(error => {
        return {
          type: "EDIT_NONPROFIT_FAIL",
          error
        };
      });
      return response;
  };

  export const deleteNonprofit = async (name, semester) => {
    const requestString = `${BASE_URL}delete`;
    var bodyFormData = new FormData();
  bodyFormData.append('name', name);
  bodyFormData.append('semester', semester);

  let response = await  axios({
    method: 'delete',
    url: requestString,
    data: bodyFormData,
    headers: {'Content-Type': 'multipart/form-data'}
  })
      .catch(error => {
        return {
          type: "DELETE_NONPROFIT_FAIL",
          error
        };
      });
      return response;
  };

  export const semesterList = async () => {
    const requestString = `${BASE_URL}semester_list`;

  let response = await axios.get(requestString)
        .catch(error => {
          return {
            type: "GET_SEMESTER_LIST_FAIL",
            error
          };
        });
  return response
      
  };

  export const semesterData = async (semester) => {
    const requestString = `${BASE_URL}semester_data`;
    
    let response = await  axios.get(requestString, {
    params: {
      semester: semester
    }
  })
      .catch(error => {
        return {
          type: "GET_SEMESTER_DATA_FAIL",
          error
        };
      });
      return response
  };

  export const nonprofitInfo = async (nonprofit_info) => {
    const requestString = `${BASE_URL}nonprofit_info`;
    
    let response = await  axios.get(requestString, {
    params: {
      nonprofit_info: nonprofit_info
    }
  })
      .catch(error => {
        return {
          type: "GET_NONPROFIT_INFO_FAIL",
          error
        };
      });
      return response;
  };
