import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import session from 'express-session';

dotenv.config();

const app = express();

const salt = 10;

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database successfully!');
});

app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['POST', 'GET', 'DELETE', 'PUT'],
  credentials: true
}));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(
  session({
    key: 'id',
    secret:  process.env.JWTKEY,
    resave: 'false',
    saveUninitialized:false,
  })
);

app.listen(3001, () => {
  console.log("backend is running on port 3001");
});

app.get("/", (req, res) => {
  res.send("Hello! The secondbrain db is working");
});

/* REGISTRATION AND LOGIN*/ 

app.post('/api/register', (req, res) => {
  const sql = "INSERT INTO user (`firstname`, `lastname`, `leetcode`, `email`, `password`) VALUES (?)";
  bcrypt.hash(req.body.password.toString(), salt, (err, hash) => {
    if (err) return res.json({Error: 'Error hashing password'});
    const values = [
      req.body.firstname,
      req.body.lastname,
      req.body.leetcode,
      req.body.email,
      hash
    ]
    db.query(sql, [values], (err, result) => {
      if (err) {
        console.error("Error inserting data in the database:", err);
        return res.json({ Error: "Inserting data error in server" });
      }
      return res.json({ Status: "Success" });
    })
  })
});

app.post('/api/login', (req, res) => {
  const sql = "SELECT * FROM user WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({Error: "Login error in server"});
    if(data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
        if(err) return res.json({Error: "Password does not match"});
        if(response) {
          req.session.user = data[0];
          res.send(data[0]);
        } else {
          return res.json({Error: "Password does not match"});
        }
      })
    } else {
      return res.json({Error: "Email does not exist"});
    }
  })
});

app.get('/api/login', (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
})

app.get('/api/logout', (req, res) => {
  res.clearCookie('id');
  return res.json({Status: "Success"});
})

/* FINANCE */
app.get("/api/getfinance/:id", (req, res) => {
  const userid = req.params.id;
  const sqlSelect = "SELECT * FROM finance WHERE userid = ?";
  db.query(sqlSelect, [userid], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send("Error occurred while fetching finance record.");
  } else {
    console.log("Successfully fetched finance record.");
    res.status(200).send(result);
  }
  });
})

app.post("/api/insertfinance", (req, res) => {
  const userid = req.body.userid;
  const description = req.body.description;
  const amount = req.body.amount;
  const date = req.body.date;

  const sqlInsert = "INSERT INTO finance (userid, description, amount, date) VALUES (?,?,?,?)";
  db.query(sqlInsert, [userid, description, amount, date], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send("Error occurred while inserting finance record.");
  } else {
    res.status(200).send("Finance record inserted successfully.");
  }
  });
});

app.delete("/api/deletefinance/", (req, res) => {
  const id = req.query.id;
  const sqlDelete = "DELETE FROM finance WHERE id = ?";

  db.query(sqlDelete, [id], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send("Error occurred while deleting finance record.");
  } else {
    res.status(200).send("Finance record deleted successfully.");
  }
  });
});

app.put("/api/updatefinance/", (req, res) => {
  const id = req.query.id;
  const description = req.body.description;
  const amount = req.body.amount;
  const date = req.body.date;
  const sqlUpdate = "UPDATE finance SET description =?, amount =?, date =? WHERE id = ?";

  db.query(sqlUpdate, [description, amount, date, id], (err, result) => {
  if (err) {
    console.log(err);
  res.status(500).send("Error occurred while updating finance record.");
    } else {
  res.status(200).send("Finance record updated successfully.");
  }
  });
})

/* ASSIGNMENTS */
app.get("/api/getassignments/:id", (req, res) => {
  const userid = req.params.id;
  const sqlSelect = "SELECT * FROM assignments WHERE userid = ?";
  db.query(sqlSelect, [userid], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while fetching assignments record.");
    } else {
      res.status(200).send(result);
    }
  });
})

app.post("/api/insertassignments/", (req, res) => {
  const userid = req.body.userid;
  const description = req.body.description;
  const date = req.body.date;
  const time = req.body.time;
  const complete = req.body.complete;
  
  const sqlInsert = "INSERT INTO assignments (userid, description, date, time, complete) VALUES (?,?,?,?,?)"
  db.query(sqlInsert, [userid, description, date, time, complete], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error occurred while inserting assignment record.");
    } else {
        res.status(200).send("assignment record inserted successfully.");
    }
  })
});

app.delete("/api/deleteassignments/", (req, res) => {
  const id = req.query.id; // Use req.query.id to get the ID from the request URL
  const sqlDelete = "DELETE FROM assignments WHERE id = ?";
  
  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while deleting assignment record.");
    } else {
      res.status(200).send("assignment record deleted successfully.");
    }
  });
});

app.put("/api/completeassignments/", (req, res) => {
  const id = req.query.id ;
  const sqlComplete = "UPDATE assignments SET complete = NOT complete WHERE id = ?"
  db.query(sqlComplete, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while updating assignment completion status.");
    } else {
      res.status(200).send("Assignment completion status updated successfully.");
    }
  });
})
  
app.put("/api/updateassignments/", (req, res) => {
  const id = req.query.id;
  const description = req.body.description;
  const date = req.body.date;
  const time = req.body.time;
  const sqlUpdate = "UPDATE assignments SET description =?, date =?, time=? WHERE id = ?";
  
  db.query(sqlUpdate, [description, date, time, id], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error occurred while updating assignment record.");
    } else {
        res.status(200).send("assignment record updated successfully.");
    }
  });
});

/* EXAMS */
app.get("/api/getexams/:id", (req, res) => {
  const userid = req.params.id;
    const sqlSelect = "SELECT * FROM exams WHERE userid = ?";
    db.query(sqlSelect, [userid], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred while fetching exams record.");
      } else {
        console.log("Successfully fetched exam record.");
        res.status(200).send(result);
      }
    });
  })
  
app.post("/api/insertexams", (req, res) => {
  const userid = req.body.userid;
  const description = req.body.description;
  const date = req.body.date;
  const time = req.body.time;
  const venue = req.body.venue;
    
  const sqlInsert = "INSERT INTO exams (userid, description, date, time, venue) VALUES (?,?,?,?,?)"
  db.query(sqlInsert, [userid, description, date, time, venue], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error occurred while inserting exam record.");
    } else {
        res.status(200).send("exam record inserted successfully.");
    }
  })
});
  
app.delete("/api/deleteexams/", (req, res) => {
  const id = req.query.id; // Use req.query.id to get the ID from the request URL
  const sqlDelete = "DELETE FROM exams WHERE id = ?";
  
  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while deleting assignment record.");
    } else {
      res.status(200).send("assignment record deleted successfully.");
    }
  });
});
    
app.put("/api/updateexams/", (req, res) => {
  const id = req.query.id;
  const description = req.body.description;
  const date = req.body.date;
  const time = req.body.time;
  const venue = req.body.venue;
  const sqlUpdate = "UPDATE exams SET description =?, date =?, time=?, venue=? WHERE id = ?";
    
  db.query(sqlUpdate, [description, date, time, venue, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while updating exam record.");
    } else {
      res.status(200).send("exam record updated successfully.");
    }
  });
});

/* JOBS */
app.get("/api/getjobs/:id", (req, res) => {
  const userid = req.params.id;
  const sqlSelect = "SELECT * FROM jobs WHERE userid = ?";
  db.query(sqlSelect,[userid], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while fetching jobs record.");
    } else {
      console.log("Successfully fetched job record.");
      res.status(200).send(result);
    }
  });
})
  
app.post("/api/insertjobs", (req, res) => {
  const userid = req.body.userid;
  const company = req.body.company;
  const position = req.body.position;
  const status = req.body.status;
  const next_deadline = req.body.next_deadline;
  const remarks = req.body.remarks;
  
  const sqlInsert = "INSERT INTO jobs (userid, company, position, status, next_deadline, remarks) VALUES (?,?,?,?,?,?)"
  db.query(sqlInsert, [userid, company, position, status, next_deadline, remarks], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error occurred while inserting job record.");
    } else {
        res.status(200).send("job record inserted successfully.");
    }
  })
});
  
app.delete("/api/deletejobs/", (req, res) => {
    const id = req.query.id;
    const sqlDelete = "DELETE FROM jobs WHERE id = ?";
    
    db.query(sqlDelete, [id], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while deleting job record.");
      } else {
          res.status(200).send("job record deleted successfully.");
      }
    });
});
    
app.put("/api/updatejobs/", (req, res) => {
  const id = req.query.id;
  const company = req.body.company;
  const position = req.body.position;
  const status = req.body.status;
  const next_deadline = req.body.next_deadline;
  const remarks = req.body.remarks;
  const sqlUpdate = "UPDATE jobs SET company = ?, position= ?, status = ?, next_deadline = ?, remarks = ? WHERE id = ?";
  
  db.query(sqlUpdate, [company, position, status, next_deadline, remarks, id], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error occurred while updating job record.");
    } else {
        res.status(200).send("job record updated successfully.");
    }
  });
});

/* MODULES */
app.get("/api/getmodules/:id", (req, res) => {
  const userid = req.params.id;
  const sqlSelect = "SELECT * FROM modules WHERE userid = ?";
  db.query(sqlSelect, [userid], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send("Error occurred while fetching modules record.");
  } else {
    console.log("Successfully fetched module record.");
    res.status(200).send(result);
  }
  });
})
  
  app.post("/api/insertmodules", (req, res) => {
    const userid = req.body.userid;
    const module_code = req.body.module_code;
    const description = req.body.description;
    const type = req.body.type;
    const mc = req.body.mc;
  
    const sqlInsert = "INSERT INTO modules (userid, module_code, description, type, mc) VALUES (?,?,?,?,?)";
    db.query(sqlInsert, [userid, module_code, description, type, mc], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred while inserting modules record.");
      } else {
        res.status(200).send("modules record inserted successfully.");
      }
    });
  });
  
  app.delete("/api/deletemodules/", (req, res) => {
    const id = req.query.id;
    const sqlDelete = "DELETE FROM modules WHERE id = ?";
  
    db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while deleting modules record.");
    } else {
      res.status(200).send("modules record deleted successfully.");
    }
    });
  });
  
  app.put("/api/updatemodules/", (req, res) => {
    const id = req.query.id;
    const module_code = req.body.module_code;
    const description = req.body.description;
    const type = req.body.type;
    const mc = req.body.mc;
    const sqlUpdate = "UPDATE modules SET module_code=?, description =?, type=?, mc=? WHERE id = ?";
  
    db.query(sqlUpdate, [module_code, description, type, mc, id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while updating modules record.");
        } else {
      res.status(200).send("modules record updated successfully.");
      }
    });
  })