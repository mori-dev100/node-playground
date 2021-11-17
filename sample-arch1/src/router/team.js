import express from "express";
import teamService from '../application-service/teamService'

const router = express.Router();

router.get("/teams", async (req, res) => {
  const teams = await teamService.fetchAllUsers();

  res.json({ teams: teams.map((team) => team.toJson()) });
});

router.get("/team/:teamId", async (req, res) => {
  const teamId = req.params.teamId;
  const team = await teamService.fetchOneUser(teamId);

  res.json({ team: team.toJson() });
});

export default router;
