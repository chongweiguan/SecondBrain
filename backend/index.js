import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import mysql from 'mysql';
import bcrypt from 'bcrypt';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const salt = 10;

const db = mysql.createConnection({
  host: process.env.DBHOST,
  user: process.env.DBUSER,
  password: process.env.DBPASSWORD,
  database: process.env.DB
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: ['http://localhost:5173'],
  methods: ['POST', 'GET'],
  credentials: true
}));

app.listen(3001, () => {
  console.log("backend is running on port 3001");
});

app.get("/", (req, res) => {
  res.send("Hello! The secondbrain db is working");
});

/* REGISTRATION AND LOGIN*/ 
app.post('/api/register', (req, res) => {
  const sql = "INSERT INTO login (`firstname`, `lastname`, `leetcode`, `email`, `password`) VALUES (?)";
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
  const sql = "SELECT * FROM login WHERE email = ?";
  db.query(sql, [req.body.email], (err, data) => {
    if (err) return res.json({Error: "Login error in server"});
    if(data.length > 0) {
      bcrypt.compare(req.body.password.toString(), data[0].password, (err, response) => {
        if(err) return res.json({Error: "Password does not match"});
        if(response) {
          const id = data[0].id;
          const token = jwt.sign({id}, "jwt-secret-key", {expiresIn: '1d'});
          res.cookie('token', token);
          return res.json({Status: "Success"});
        } else {
          return res.json({Error: "Password does not match"});
        }
      })
    } else {
      return res.json({Error: "Email does not exist"});
    }
  })
});

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if(!token) {
    return res.json({Error: 'You are not authenticated'});
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if(err) {
        return res.json({Error: "Token is not valid"});
      } else {
        req.id = decoded.id;
        next();
      }
    })
  }
}

app.get('/api', verifyUser, (req, res) => {
  return res.json({Status: "Success", id: req.id});
})

app.get('/api/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({Status: "Success"});
})

/* FINANCE */
app.get("/api/getfinance", (req, res) => {
  const sqlSelect = "SELECT * FROM finance";
  db.query(sqlSelect, (err, result) => {
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
  const description = req.body.description;
  const category = req.body.category;
  const amount = req.body.amount;
  const datetime = req.body.dateTime;

  const sqlInsert = "INSERT INTO finance (description, category, amount, datetime) VALUES (?,?,?,?)";
  db.query(sqlInsert, [description, category, amount, datetime], (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send("Error occurred while inserting finance record.");
  } else {
    res.status(200).send("Finance record inserted successfully.");
  }
  });
});

app.delete("/api/deletefinance/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM finance WHERE id = ?";

  db.query(sqlDelete, id, (err, result) => {
  if (err) {
    console.log(err);
    res.status(500).send("Error occurred while deleting finance record.");
  } else {
    res.status(200).send("Finance record deleted successfully.");
  }
  });
});

app.put("/api/updatefinance/:id", (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  const category = req.body.category;
  const amount = req.body.amount;
  const datetime = req.body.dateTime;
  const sqlUpdate = "UPDATE finance SET description =?, category =?, amount =?, datetime =? WHERE id = ?";

  db.query(sqlUpdate, [description, category, amount, datetime, id], (err, result) => {
  if (err) {
    console.log(err);
  res.status(500).send("Error occurred while updating finance record.");
    } else {
  res.status(200).send("Finance record updated successfully.");
  }
  });
})

/* ASSIGNMENTS */
app.get("/api/getassignments", (req, res) => {
  const sqlSelect = "SELECT * FROM assignments";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while fetching assignments record.");
    } else {
        console.log("Successfully fetched assignment record.");
      res.status(200).send(result);
    }
  });
})

app.post("/api/insertassignments", (req, res) => {
  const description = req.body.description;
  const datetime = req.body.dateTime;
  const complete = req.body.complete;
  
  const sqlInsert = "INSERT INTO assignments (description, datetime, complete) VALUES (?,?,?)"
  db.query(sqlInsert, [description, datetime, complete], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error occurred while inserting assignment record.");
    } else {
        res.status(200).send("assignment record inserted successfully.");
    }
  })
});

app.delete("/api/deleteassignments/:id", (req, res) => {
  const id = req.params.id;
  const sqlDelete = "DELETE FROM assignments WHERE id = ?";
  
  db.query(sqlDelete, id, (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error occurred while deleting assignment record.");
    } else {
        res.status(200).send("assignment record deleted successfully.");
    }
  });
});
  
app.put("/api/updateassignments/:id", (req, res) => {
  const id = req.params.id;
  const description = req.body.description;
  const datetime = req.body.dateTime;
  const complete = req.body.complete;
  const sqlUpdate = "UPDATE assignments SET description =?, datetime =?, complete=? WHERE id = ?";
  
  db.query(sqlUpdate, [description, datetime, complete, id], (err, result) => {
    if (err) {
        console.log(err);
        res.status(500).send("Error occurred while updating assignment record.");
    } else {
        res.status(200).send("assignment record updated successfully.");
    }
  });
});

/* EXAMS */
app.get("/api/getexams", (req, res) => {
    const sqlSelect = "SELECT * FROM exams";
    db.query(sqlSelect, (err, result) => {
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
    const description = req.body.description;
    const datetime = req.body.dateTime;
    const complete = req.body.complete;
    
    const sqlInsert = "INSERT INTO exams (description, datetime, complete) VALUES (?,?,?)"
    db.query(sqlInsert, [description, datetime, complete], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while inserting exam record.");
      } else {
          res.status(200).send("exam record inserted successfully.");
      }
    })
});
  
app.delete("/api/deleteexams/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM exams WHERE id = ?";
    
    db.query(sqlDelete, id, (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while deleting exam record.");
      } else {
          res.status(200).send("exam record deleted successfully.");
      }
    });
});
    
app.put("/api/updateexams/:id", (req, res) => {
    const id = req.params.id;
    const company = req.body.company;
    const next_deadline = req.body.next_deadline;
    const complete = req.body.complete;
    const sqlUpdate = "UPDATE exams SET company =?, next_deadline =?, complete=? WHERE id = ?";
    
    db.query(sqlUpdate, [company, next_deadline, complete, id], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while updating exam record.");
      } else {
          res.status(200).send("exam record updated successfully.");
      }
    });
});

/* JOBS */
app.get("/api/getjobs", (req, res) => {
    const sqlSelect = "SELECT * FROM jobs";
    db.query(sqlSelect, (err, result) => {
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
    const company = req.body.company;
    const next_deadline = req.body.next_deadline;
    const status = req.body.status;
    const position = req.body.position;
    const remarks = req.body.remarks;
    
    const sqlInsert = "INSERT INTO jobs (company, position, next_deadline, status, remarks) VALUES (?,?,?,?,?)"
    db.query(sqlInsert, [company, next_deadline, status, position, remarks], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while inserting job record.");
      } else {
          res.status(200).send("job record inserted successfully.");
      }
    })
});
  
app.delete("/api/deletejobs/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM jobs WHERE id = ?";
    
    db.query(sqlDelete, id, (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while deleting job record.");
      } else {
          res.status(200).send("job record deleted successfully.");
      }
    });
});
    
app.put("/api/updatejobs/:id", (req, res) => {
    const id = req.params.id;
    const company = req.body.company;
    const next_deadline = req.body.next_deadline;
    const status = req.body.status;
    const position = req.body.position;
    const remarks = req.body.remarks;
    const sqlUpdate = "UPDATE jobs SET company = ?, next_deadline = ?, status = ? position = ? remarks = ? WHERE id = ?";
    
    db.query(sqlUpdate, [company, next_deadline, status, position, remarks, status, id], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while updating job record.");
      } else {
          res.status(200).send("job record updated successfully.");
      }
    });
});

/* MODULES */
app.get("/api/getmodules", (req, res) => {
    const sqlSelect = "SELECT * FROM modules";
    db.query(sqlSelect, (err, result) => {
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
    const description = req.body.description;
    const module_code = req.body.module_code;
    const complete = req.body.complete;
    const year = req.body.year;
  
    const sqlInsert = "INSERT INTO modules (description, module_code, complete, year) VALUES (?,?,?,?)";
    db.query(sqlInsert, [description, module_code, complete, year], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while inserting modules record.");
    } else {
      res.status(200).send("modules record inserted successfully.");
    }
    });
  });
  
  app.delete("/api/deletemodules/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM modules WHERE id = ?";
  
    db.query(sqlDelete, id, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send("Error occurred while deleting modules record.");
    } else {
      res.status(200).send("modules record deleted successfully.");
    }
    });
  });
  
  app.put("/api/updatemodules/:id", (req, res) => {
    const id = req.params.id;
    const description = req.body.description;
    const module_code = req.body.module_code;
    const complete = req.body.complete;
    const year = req.body.year;
    const sqlUpdate = "UPDATE modules SET description =?, module_code =?, complete =?, year =? WHERE id = ?";
  
    db.query(sqlUpdate, [description, module_code, complete, year, id], (err, result) => {
    if (err) {
      console.log(err);
    res.status(500).send("Error occurred while updating modules record.");
      } else {
    res.status(200).send("modules record updated successfully.");
    }
    });
  })


  /* LEETCODE PATTERNS */
  app.get("/api/getleetcode", (req, res) => {
    const sqlSelect = "SELECT * FROM leetcode";
    db.query(sqlSelect, (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).send("Error occurred while fetching leetcode record.");
      } else {
        console.log("Successfully fetched leetcode record.");
        res.status(200).send(result);
      }
    });
  })
  
  app.post("/api/insertleetcode", (req, res) => {
    const pattern = req.body.pattern;
    const complete = req.body.complete;
    
    const sqlInsert = "INSERT INTO leetcode (pattern, complete) VALUES (?,?)"
    db.query(sqlInsert, [pattern, complete], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while inserting leetcode record.");
      } else {
          res.status(200).send("leetcode record inserted successfully.");
      }
    })
  });
  
  app.delete("/api/deleteleetcode/:id", (req, res) => {
    const id = req.params.id;
    const sqlDelete = "DELETE FROM leetcode WHERE id = ?";
    
    db.query(sqlDelete, id, (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while deleting leetcode record.");
      } else {
          res.status(200).send("leetcode record deleted successfully.");
      }
    });
  });
    
  app.put("/api/updateleetcode/:id", (req, res) => {
    const id = req.params.id;
    const pattern = req.body.pattern;
    const complete = req.body.complete;
    const sqlUpdate = "UPDATE leetcode SET pattern =?, complete=? WHERE id = ?";
    
    db.query(sqlUpdate, [pattern, complete, id], (err, result) => {
      if (err) {
          console.log(err);
          res.status(500).send("Error occurred while updating leetcode record.");
      } else {
          res.status(200).send("leetcode record updated successfully.");
      }
    });
  });