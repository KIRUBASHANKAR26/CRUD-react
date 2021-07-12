import React,{ useState,useEffect } from 'react';
import "./style.css";
import Api from "../../api/api";


const Taskform = () => {

    const [taskSaved, setTasksaved] = useState([])
    const [createTask,setcreateTask] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [inputDate, setInputdate] = useState("");
    const [inputTime, setInputtime] = useState("");
    const [assignUser, setAssignUser] = useState("")
    const [editTask, seteditTask] = useState(false)
    const [EditValue, setEditValue] = useState("")
    const [EditDate, setEditDate] = useState("")
    const [EditTime, setEditTime] = useState("")
    const [EditUser, setEditUser] = useState("")
    const [editId, seteditId] = useState("")

    const handleInputTask = (e) => {
        setInputValue(e.target.value)
    }  
    const handleInputDate = (e) => {
        setInputdate(e.target.value)
    }  
    const handleInputTime = (e) => {
        setInputtime(e.target.value)
    }    
    const handleInputUser = (e) => {
        setAssignUser(e.target.value)
    }
    const editInputTask = (e) => {
        setEditValue(e.target.value)
    }  
    const editInputDate = (e) => {
        setEditDate(e.target.value)
    }  
    const editInputTime = (e) => {
        setEditTime(e.target.value)
    }    
    const editInputUser = (e) => {
        setEditUser(e.target.value)
    }    
    const taskDetails = (e) => {
        e.preventDefault();
        let request = {
            id:taskSaved?.length + 1,
            task:inputValue,
            date:inputDate,
            time:inputTime,
            author:assignUser
        }
        console.log(request)
        const response = Api.post("/task",request);
        setTasksaved([...taskSaved], response.data)
        setcreateTask(false)
    }

    useEffect(() => {
        Api.get('/task')
            .then(function (response) {
                setTasksaved(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    })
    const editButton = (e) => {
        setcreateTask(false)
        seteditTask(true)
        var editIndex = e.target.id;
        let editData = taskSaved?.filter((item =>  item.id === +editIndex))
        editData?.map(item => 
            {
            seteditId(item.id)
            setEditValue(item.task)
            setEditDate(item.data)
            setEditTime(item.time)
            setEditUser(item.author)}
        );
    }
    const updateTask = (e) => {
        e.preventDefault();
        let id = e.target.id;
        console.log("id",id);
        let request = {
            id:id,
            task:EditValue,
            date:EditDate,
            time:EditTime,
            author:EditUser
        }
        console.log(request)
        const response = Api.put(`/task/${id}`,request);
        setTasksaved([...taskSaved], response.data)
        seteditTask(false)
    }
    const create =  (e) => {
        setcreateTask(true);
    }
    const deleteTask = async (e) => {
        e.preventDefault();
        let deleteId = e.target.id;
        console.log("deleteId",deleteId)
        window.confirm("ARE YOU SURE")
        const response = await Api.delete(`/task/${deleteId}`);
        setTasksaved([...taskSaved], response.data)
        seteditTask(false);
    }

    return ( 
        <div style={{display:"inline-block",width:"74vw",maxWidth:"100%",position: "relative",
        top: "-15rem"}}>
        <div className="container">
            <div className="form-header">
                <h5>Task {taskSaved?.length}</h5>
                <button onClick={create}><i className="fas fa-plus"></i></button>
            </div>
            <div className={createTask? "form-section active" : "form-section"}> 
                <form>   
                    <div>
                        <h5>Task Description</h5>
                        <input type="text"  value={inputValue} onChange={handleInputTask} />
                    </div>
                    <div>
                        <div className="date-time">
                            <div>
                                <h5>Date</h5>
                                <input type="date" value={inputDate} onChange={handleInputDate}/>
                            </div>
                            <div>
                                <h5>Time</h5>
                                <input type="time"  value={inputTime} onChange={handleInputTime} />
                            </div>
                        </div>
                        <div>
                            <h5>Assign User</h5>
                            <input type="name"  value={assignUser} onChange={handleInputUser} />
                        </div>
                        <div className="buttons">
                            <button>Cancel</button>
                            <button type="submit" onClick={taskDetails}>Save</button>
                        </div>
                    </div>
                    
                </form>
            </div>
            <div className={editTask? "edit-form active" : "edit-form"}> 
                <form>   
                    <div>
                        <h5>Task Description</h5>
                        <input type="text"  defaultValue={EditValue} onChange={editInputTask} />
                    </div>
                    <div>
                        <div className="date-time">
                            <div>
                                <h5>Date</h5>
                                <input type="date" defaultValue={EditDate} onChange={editInputDate}/>
                            </div>
                            <div>
                                <h5>Time</h5>
                                <input type="time"  defaultValue={EditTime} onChange={editInputTime} />
                            </div>
                        </div>
                        <div>
                            <h5>Assign User</h5>
                            <input type="name"  defaultValue={EditUser} onChange={editInputUser} />
                        </div>
                        <div className="buttons">
                            <button className="delete-button"  onClick={deleteTask}><i id={editId} className="fas fa-trash-alt"></i></button>
                            <button className= "cancel-button">Cancel</button>
                            <button type="submit" id={editId} onClick={updateTask}>Save</button>
                        </div>
                    </div>
                    
                </form>
            </div>
            <div>
            {
                taskSaved?.map((item) => 
                <div key={item.id} id={item.id}  className="save-data">
                    <p>{item.task}</p>
                    <p>{item.date}</p>
                    <p>{item.author}</p>
                    <button className="edit" onClick={editButton}>
                        <i id={item.id} className="fas fa-edit"></i></button>
                </div>)
            }
            </div>

        </div>
    </div>    
     );
}

export default Taskform;