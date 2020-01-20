import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import sampleData from '../sample/data.json'
import { Button, Table, Dropdown } from 'react-bootstrap';
import {
  addNonprofit,
  editNonprofit
} from "../apiWrapper";

class Main extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {currentSemester: 'Spring 2019', semesterList: ["Spring 2019", "Fall 2018"], data: []}
    }

    componentDidMount() {
      this.setState({data: sampleData})
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
              })}
            </Dropdown.Menu>
          </Dropdown> 
          <Button onClick={addNonprofit("Navam", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j")}>
            Add Nonprofit
          </Button>
          <Table>
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
                  <td><Button onclick={editNonprofit("Kiva", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j")}>Edit</Button></td>
                </tr>
              )
            })}
          </tbody>
          </Table>
        </div>
      );
    }
  }

export default Main;