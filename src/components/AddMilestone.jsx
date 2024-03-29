import * as React from "react";
import { Button, TextField, Divider, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { domain, endPoints } from "../services/endPoints";
import AddIcon from "@mui/icons-material/Add";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

const defaultValue = {
  title: "",
  body: "",
  reward: "",
};

export default function AddMilestone(props) {
  const [userData, setUserData] = React.useState(defaultValue);
  const handleClose = () => props.close();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  async function addNewMilestone() {
    let token = localStorage.getItem("token");
    let response = await axios.post(
      domain + endPoints.createRecreationMileStone,
      {
        recreationId: props.recreationId,
        title: userData.title,
        desc: userData.body,
        userPoints: parseInt(userData.reward),
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (response.data.success) {
      handleClose();
      props.addNewMileStone(response.data.result);
    }
  }

  return (
    <div>
      <Modal
        open={props.open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Divider style={{ marginTop: "0.8rem", marginBottom: "1rem" }}>
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              style={{ fontSize: "1.5rem" }}
            >
              Add Activity Milestone
            </Typography>
          </Divider>

          <Box
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <TextField
              name="title"
              onChange={(e) => handleChange(e)}
              id="outlined-basic"
              multiline
              rows={2}
              label="Milestone Title"
              variant="outlined"
            />
            <TextField
              name="body"
              onChange={(e) => handleChange(e)}
              multiline
              rows={6}
              id="outlined-basic"
              label="Milestone Body"
              variant="outlined"
            />
            <TextField
              name="reward"
              onChange={(e) => handleChange(e)}
              id="outlined-basic"
              label="Milestone Reward"
              variant="outlined"
              type={"number"}
            />

            <Box style={{ display: "flex", justifyContent: "center" }}>
              <Button
                style={{
                  marginRight: "1rem",
                  color: "red",
                  borderColor: "red",
                }}
                onClick={() => handleClose()}
                variant="outlined"
              >
                Cancel{" "}
                <ClearIcon
                  style={{
                    fontSize: "1.2rem",
                    marginBottom: "0.2rem",
                    marginLeft: "0.2rem",
                  }}
                />
              </Button>
              <Button
                variant="outlined"
                style={{ color: "green", borderColor: "green" }}
                onClick={() => addNewMilestone()}
              >
                Add Milestone
                <AddIcon
                  style={{
                    fontSize: "1.4rem",
                    marginBottom: "0.2rem",
                    marginLeft: "0.2rem",
                  }}
                />
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
