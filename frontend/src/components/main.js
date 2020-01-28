import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import sampleData from '../sample/data.json'
import { Button, Table, Dropdown, Modal } from 'react-bootstrap';
import {
  addNonprofit,
  editNonprofit
} from "../apiWrapper";

class Main extends React.Component {
    constructor(props) {
      super(props);
      this.state = {currentSemester: 'Spring 2019', semesterList: ["Spring 2019", "Fall 2018"], data: [], addModal: false, editModal: false, anyModal: false,
      addValues: {Nonprofit:"", FirstName: "", LastName: "", EmailAddress: "", Linkedin: "", Position: "", LastUpdate: "", Status: "", Comments: ""},
      editValues: {Nonprofit:"", FirstName: "", LastName: "", EmailAddress: "", Linkedin: "", Position: "", LastUpdate: "", Status: "", Comments: ""}}
    }

    setAll = (obj, val) => Object.keys(obj).forEach(k => obj[k] = val);

    componentDidMount() {
      this.setState({data: sampleData})
    }

    addModalToggle = () => {
      var addValues = {...this.state.addValues}
      this.setAll(addValues, "")
      this.setState({ addModal: !this.state.addModal, anyModal: !this.state.anyModal, addValues });
      console.log(this.state.addModal)
    }

    handleAddSubmit(e) {
      console.log(this.state.addValues)
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

      this.setState({ editModal: !this.state.editModal, anyModal: !this.state.anyModal, editValues });
      console.log(this.state.editValues)
    }

    handleEditSubmit(e) {
      console.log(this.state.editValues)
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
                <Dropdown.Item onClick={() => {this.setState({currentSemester: row})}}>{row}</Dropdown.Item>
                )
              })}LastName
            </Dropdown.Menu>
          </Dropdown> 

          <Button onClick={this.addModalToggle}>
            Add Nonprofit
          </Button>
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
            {this.state.data.filter(word => word.Semester === this.state.currentSemester).map((row) =>{
              return (
                <tr>
                  <td>{row['Nonprofit']}</td>
                  <td>{row['Media']}</td>
                  <td>{row['First Name']}</td>
                  <td>{row['Last Name']}</td>
                  <td>{row['Email Address']}</td>
                  <td>{row['Linkedin']}</td>
                  <td>{row['Linked FName']}</td>
                  <td>{row['Position']}</td>
                  <td>{row['Last Update']}</td>
                  <td>{row['Status']}</td>
                  <td>{row['Comments']}</td>
                  <td>{row['Semester']}</td>
                  <td><Button onClick={() => {this.editModalToggle(row['Nonprofit'],row['Media'],row['First Name'], row['Last Name'], row['Email Address'], row['Linkedin'], row['Linked FName'], 
                    row['Position'], row['Last Update'], row['Status'], row['Comments'])}}>Edit</Button></td>
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