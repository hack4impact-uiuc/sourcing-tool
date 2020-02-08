import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Dropdown, Modal } from 'react-bootstrap';
import {
  addNonprofit,
  editNonprofit,
  newSemester,
  deleteNonprofit,
  semesterData,
  semesterList,
  nonprofitInfo
} from "../apiWrapper";

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {currentSemester: 'Spring 2020', semesterList: ["Spring 2019", "Fall 2018"], data: [], addModal: false, editModal: false, semModal: false, anyModal: false, edit_nonprofit_prev_name: "", newSemName: "",
      addValues: {Nonprofit:"", Media: "", FirstName: "", LastName: "", EmailAddress: "", Linkedin: "", Position: "", LastUpdate: "", Status: "", Comments: ""},
      editValues: {Nonprofit:"", Media: "", FirstName: "", LastName: "", EmailAddress: "", Linkedin: "", Position: "", LastUpdate: "", Status: "", Comments: ""}}
    }

    setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);

    async componentDidMount() {
      let semList = await semesterList();
      let semData = await semesterData(semList['data']['result']['result'][0]['semester'])
      console.log(semList, semData)
      this.setState({data: semData['data']['result']['result'], semesterList:semList['data']['result']['result'], currentSemester: semList['data']['result']['result'][0]['semester']})
    }

    async selectSemester(selected) {
      let semData = await semesterData(selected)
      this.setState({currentSemester: selected, data: semData['data']['result']['result']})
    }

    addModalToggle = () => {
      var addValues = {...this.state.addValues}
      this.setAll(addValues, "")
      this.setState({ addModal: !this.state.addModal, anyModal: !this.state.anyModal, addValues });
    }

    async handleAddSubmit(e) {
      await addNonprofit(this.state.addValues.Nonprofit, this.state.addValues.Media, this.state.addValues.FirstName, this.state.addValues.LastName, this.state.addValues.EmailAddress, this.state.addValues.Linkedin, this.state.addValues.FirstName, this.state.addValues.Position, this.state.addValues.LastUpdate, this.state.addValues.Status, this.state.addValues.Comments, this.state.currentSemester)
      let semData = await semesterData(this.state.currentSemester)
      this.setState({data: semData['data']['result']['result']})
      this.addModalToggle();
    }

    handleAddChange(e) {
      const target = e.target;
      const name = target.name;
      const value = target.value;

      var addValues = {...this.state.addValues}
      addValues[name] = value
  
      this.setState({
        addValues
      });
    }


    semModalToggle = () => {
      this.setState({ semModal: !this.state.semModal, anyModal: !this.state.anyModal, newSemName: "" });
    }

    async handleSemSubmit(e) {
      await newSemester(this.state.newSemName, this.state.currentSemester)
      let semList = await semesterList();
      this.setState({semesterList:semList['data']['result']['result']})
      this.semModalToggle();
    }

    handleSemChange(e) {
      const target = e.target;
      const value = target.value;
  
      this.setState({
        newSemName: value
      });
    }
  
    editModalToggle = (Nonprofit, FirstName, LastName, EmailAddress, Linkedin, Position, LastUpdate, Status, Comments) => {
      var editValues = {...this.state.editValues}
      editValues["Nonprofit"] = Nonprofit
      editValues["FirstName"] = FirstName
      editValues["LastName"] = LastName
      editValues["EmailAddress"] = EmailAddress
      editValues["Linkedin"] = Linkedin
      editValues["Position"] = Position
      editValues["LastUpdate"] = LastUpdate
      editValues["Status"] = Status
      editValues["Comments"] = Comments

      this.setState({ editModal: !this.state.editModal, anyModal: !this.state.anyModal, editValues, edit_nonprofit_prev_name: Nonprofit });
    }

    async handleEditSubmit(e) {
      console.log(this.state.addValues)
      await editNonprofit(this.state.editValues.Nonprofit, this.state.editValues.Media, this.state.editValues.FirstName, this.state.editValues.LastName, this.state.editValues.EmailAddress, this.state.editValues.Linkedin, this.state.editValues.FirstName, this.state.editValues.Position, this.state.editValues.LastUpdate, this.state.editValues.Status, this.state.editValues.Comments, this.state.currentSemester, this.state.edit_nonprofit_prev_name)
      let semData = await semesterData(this.state.currentSemester)
      this.setState({data: semData['data']['result']['result']})
      this.editModalToggle();
    }

    handleEditChange(e) {
      const target = e.target;
      const name = target.name;
      const value = target.value;

      var editValues = {...this.state.editValues}
      editValues[name] = value
  
      this.setState({
        editValues
      });
    }

    async deleteNonprofit(e) {
      deleteNonprofit(e, this.state.currentSemester)
      let semData = await semesterData(this.state.currentSemester)
      this.setState({data: semData['data']['result']['result']})
    }

    render() {
      return(
        <div>
          <Button>
            HOME
          </Button>

          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              Choose Semester
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {this.state.semesterList.map((row) => {
                return (
                <Dropdown.Item onClick={() => {this.selectSemester(row['semester'])}}>{row['semester']}</Dropdown.Item>
                )
              })}
            </Dropdown.Menu>
          </Dropdown> 

          <Button onClick={this.addModalToggle}>
            Add Nonprofit
          </Button>

          <Button onClick={this.semModalToggle}>
            Add New Semester
          </Button>
          {this.state.semModal ? 
            <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Add New Semester</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>
              <label>Enter New Semester Name:</label>
                <input
                  type="text"
                  onChange={e => this.handleSemChange(e)}
                />
            </Modal.Body>
          
            <Modal.Footer>
              <Button variant="secondary" onClick={e => this.semModalToggle(e)}>Close</Button>
              <Button variant="primary" onClick={e => this.handleSemSubmit(e)}>Add</Button>
            </Modal.Footer>
          </Modal.Dialog>
            : null}


          {this.state.addModal ? 
            <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Add Nonprofit</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>
              <label>Enter Nonprofit name:</label>
                <input
                  type="text"
                  name="Nonprofit"
                  onChange={e => this.handleAddChange(e)}
                />
                <label>Enter Media of contact:</label>
                <input
                  type="text"
                  name="Media"
                  onChange={e => this.handleAddChange(e)}
                />
                <label>Enter FirstName of contact:</label>
                <input
                  type="text"
                  name="FirstName"
                  onChange={e => this.handleAddChange(e)}
                />
                <label>Enter LastName of contact:</label>
                <input
                  type="text"
                  name="LastName"
                  onChange={e => this.handleAddChange(e)}
                />
                <label>Enter EmailAddress of contact:</label>
                <input
                  type="text"
                  name="EmailAddress"
                  onChange={e => this.handleAddChange(e)}
                />
                <label>Enter Linkedin of contact:</label>
                <input
                  type="text"
                  name="Linkedin"
                  onChange={e => this.handleAddChange(e)}
                />
                <label>Enter Position of contact:</label>
                <input
                  type="text"
                  name="Position"
                  onChange={e => this.handleAddChange(e)}
                />
                <label>Enter LastUpdate of Nonprofit:</label>
                <input
                  type="text"
                  name="LastUpdate"
                  onChange={e => this.handleAddChange(e)}
                />
                <label>Enter Status of Nonprofit:</label>
                <input
                  type="text"
                  name="Status"
                  onChange={e => this.handleAddChange(e)}
                />
                <label>Enter Comments:</label>
                <input
                  type="text"
                  name="Comments"
                  onChange={e => this.handleAddChange(e)}
                />
            </Modal.Body>
          
            <Modal.Footer>
              <Button variant="secondary" onClick={e => this.addModalToggle(e)}>Close</Button>
              <Button variant="primary" onClick={e => this.handleAddSubmit(e)}>Add</Button>
            </Modal.Footer>
          </Modal.Dialog>
            : null}

          {this.state.editModal ? 
            <Modal.Dialog>
            <Modal.Header>
              <Modal.Title>Edit Nonprofit</Modal.Title>
            </Modal.Header>
          
            <Modal.Body>
              <label>Nonprofit name:</label>
                <input
                  type="text"
                  name="Nonprofit"
                  value={this.state.editValues.Nonprofit}
                  onChange={e => this.handleEditChange(e)}
                />
                <label>Media of contact:</label>
                <input
                  type="text"
                  name="Media"
                  value={this.state.editValues.Media}
                  onChange={e => this.handleEditChange(e)}
                />
                <label>FirstName of contact:</label>
                <input
                  type="text"
                  name="FirstName"
                  value={this.state.editValues.FirstName}
                  onChange={e => this.handleEditChange(e)}
                />
                <label>LastName of contact:</label>
                <input
                  type="text"
                  name="LastName"
                  value={this.state.editValues.LastName}
                  onChange={e => this.handleEditChange(e)}
                />
                <label>EmailAddress of contact:</label>
                <input
                  type="text"
                  name="EmailAddress"
                  value={this.state.editValues.EmailAddress}
                  onChange={e => this.handleEditChange(e)}
                />
                <label>Linkedin of contact:</label>
                <input
                  type="text"
                  name="Linkedin"
                  value={this.state.editValues.Linkedin}
                  onChange={e => this.handleEditChange(e)}
                />
                <label>Position of contact:</label>
                <input
                  type="text"
                  name="Position"
                  value={this.state.editValues.Position}
                  onChange={e => this.handleEditChange(e)}
                />
                <label>LastUpdate of Nonprofit:</label>
                <input
                  type="text"
                  name="LastUpdate"
                  value={this.state.editValues.LastUpdate}
                  onChange={e => this.handleEditChange(e)}
                />
                <label>Status of Nonprofit:</label>
                <input
                  type="text"
                  name="Status"
                  value={this.state.editValues.Status}
                  onChange={e => this.handleEditChange(e)}
                />
                <label>Enter Comments:</label>
                <input
                  type="text"
                  name="Comments"
                  value={this.state.editValues.Comments}
                  onChange={e => this.handleEditChange(e)}
                />
            </Modal.Body>
          
            <Modal.Footer>
              <Button variant="secondary" onClick={e => this.editModalToggle(e)}>Close</Button>
              <Button variant="primary" onClick={e => this.handleEditSubmit(e)}>Edit</Button>
            </Modal.Footer>
          </Modal.Dialog>
            : null}

          {!this.state.anyModal ? <Table>
            <thead>
              <tr>
                <th>Nonprofit</th>
                <th>Media</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Linkedin</th>
                <th>Linked FName</th>
                <th>Position</th>
                <th>Last Update</th>
                <th>Status</th>
                <th>Comments</th>
                <th>Semester</th>
                <th></th>
              </tr>
            </thead>
          <tbody>
            {this.state.data.filter(word => word.semester === this.state.currentSemester).map((row) =>{
              return (
                <tr>
                  <td>{row['name']}</td>
                  <td>{row['media']}</td>
                  <td>{row['first']}</td>
                  <td>{row['last']}</td>
                  <td>{row['email']}</td>
                  <td>{row['linkedin']}</td>
                  <td>{row['fname']}</td>
                  <td>{row['position']}</td>
                  <td>{row['last_updated']}</td>
                  <td>{row['status']}</td>
                  <td>{row['comments']}</td>
                  <td>{row['semester']}</td>
                  <td><Button onClick={() => {this.editModalToggle(row['name'],row['media'],row['first'], row['last'], row['email'], row['linkedin'], row['fname'], 
                    row['position'], row['last_updated'], row['status'], row['comments'])}}>Edit</Button></td>
                  <td><Button onClick={() => {this.deleteNonprofit(row['name'])}}>Delete</Button></td>
                </tr>
              )
            })}
          </tbody>
          </Table>
          : null}
        </div>
      );
    }
  }

export default Main;
