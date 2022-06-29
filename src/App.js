import { Container } from "react-bootstrap";
import "./App.css";
import AddForm from "./component/AddForm";
import ListArea from "./component/ListArea";
import { useState } from "react";
import { Button } from "react-bootstrap";
const wkly = 7 * 24;

function App() {
  const [taskList, setTaskList] = useState([]);
  const [ids, setIds] = useState([]);

  const total = taskList.reduce((acc, item) => acc + +item.hr, 0);

  const addTask = (task) => {
    if (total + +task.hr > wkly) {
      return alert("Sorry sir, You don't have enough hrs.");
    }
    setTaskList([...taskList, task]);
  };

  const switchTask = (id, type) => {
    console.log(id, type);

    const switchArg = taskList.map((item, index) => {
      if (item.id === id) {
        item.type = type;
      }
      return item;
    });
    setTaskList(switchArg);
  };
  const handleOnCheck = (e) => {
    const { checked, value, name } = e.target;
    console.log(checked, value, name);
    // if ticked add all ides in ids ohterwise take them out
    if (value === "entry" || value === "bad") {
      let toDeleteIds = [];
      taskList.forEach((item) => {
        if (item.type === value) {
          toDeleteIds.push(item.id);
        }
      });
      if (checked) {
        // add all entry list ids,
        // you cannot use map map throws undefined if size differ and filter thors all the object value not just one value.
        // const entryids = taskList.filter((item) => {
        //   if (item.type == "entry") {
        //     return item.id;
        //   }
        // });

        setIds([...ids, ...toDeleteIds]);
        // console.log(entryids);
      } else {
        // remove all entry list ids
        // when you need to delete small array from big array, bigArray.filter(item), !smallArray.includes(eachBigItem);
        const tempArgs = ids.filter((id) => !toDeleteIds.includes(id));
        setIds(tempArgs);
      }
      return;
    }
    if (checked) {
      // add individual item id
      setIds([...ids, value]);
    } else {
      // remove individual item id
      const filterArg = ids.filter((id) => id !== value);
      setIds(filterArg);
    }
  };

  const handleOnDelete = () => {
    if (!window.confirm("Are you sure you want to delete the selected item?")) {
      return;
    }
    const tempArg = taskList.filter((item) => !ids.includes(item.id));
    setTaskList(tempArg);
    setIds([]);
  };
  console.log(ids);

  return (
    <div className="wrapper">
      <Container>
        <h1 className="text-center py-5">My Not To Do List</h1>
        <AddForm addTask={addTask} />
        <hr />
        <ListArea
          ids={ids}
          taskList={taskList}
          switchTask={switchTask}
          total={total}
          handleOnCheck={handleOnCheck}
        />
        <div className="mt-2">
          {ids.length > 0 && (
            <Button variant="danger" onClick={handleOnDelete}>
              Delete selected task
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
}

export default App;
