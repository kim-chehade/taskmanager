import { db } from "../db.js";

export const getTasks = (req, res) => {
  const query =
    "SELECT t.id, t.description, t.date, s.status " +
    "FROM tasks t " +
    "INNER JOIN status s ON t.status_id = s.id";

  db.query(query, (err, data) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(200).json(data);
    }
  });
};





export const createTask = (req, res) => {
  let statusId = 1; 
  if (req.body.status_id !== undefined) {
    statusId = req.body.status_id;
  }

  const query =
    "INSERT INTO tasks(`description`, `date`, `status_id`) VALUES (?,?,?)";

  const values = [
    req.body.description,
    req.body.date, 
    statusId,
  ];

  db.query(query, values, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json("Task has been created.");
  });
};







export const updateTask = (req, res) => {
 

  const taskID = req.params.id;
  const query = "UPDATE tasks SET `status_id` = ? WHERE `id` = ? ";

  const values = [
    req.body.status_id,
  ];

  db.query(query, [...values, taskID], (queryErr, data) => {
    if (queryErr) {
      return res.status(500).json(queryErr);
    } else {
      return res.json("Task has been updated successfully");
    }
  });
};
